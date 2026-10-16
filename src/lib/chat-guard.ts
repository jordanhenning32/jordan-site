import { createHash } from "node:crypto";

// Pure abuse-guard logic for /api/chat. No `@/` imports so `node --test` can load it directly.

export const PRODUCTION_HOSTS = ["jordanhenning.com", "www.jordanhenning.com"];

type GuardEnv = {
  NODE_ENV?: string;
  VERCEL_ENV?: string;
  VERCEL_URL?: string;
  VERCEL_BRANCH_URL?: string;
};

function hostnameOf(value: string): string | null {
  try {
    return new URL(value.includes("://") ? value : `https://${value}`).hostname.toLowerCase();
  } catch {
    return null;
  }
}

export function allowedHosts(env: GuardEnv): string[] {
  const hosts = [...PRODUCTION_HOSTS];
  if (env.NODE_ENV !== "production") hosts.push("localhost", "127.0.0.1");
  if (env.VERCEL_ENV === "preview") {
    for (const value of [env.VERCEL_URL, env.VERCEL_BRANCH_URL]) {
      const host = value ? hostnameOf(value) : null;
      if (host) hosts.push(host);
    }
  }
  return hosts;
}

export function isOriginAllowed(origin: string | null, referer: string | null, hosts: string[]): boolean {
  const source = origin ?? referer;
  if (!source) return false;
  let url: URL;
  try {
    url = new URL(source);
  } catch {
    return false;
  }
  // hostname ignores the port, so any localhost port passes in dev.
  const hostname = url.hostname.toLowerCase();
  return hosts.some((h) => h.toLowerCase() === hostname);
}

export function clientIp(headers: { get(name: string): string | null }): string {
  const real = headers.get("x-real-ip")?.trim();
  if (real) return real;
  const first = headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return first || "unknown";
}

// Rotates daily so counters cannot be correlated across days; the raw IP is never stored.
export function ipKey(ip: string, now = new Date()): string {
  const utcDate = now.toISOString().slice(0, 10);
  return createHash("sha256").update(`${utcDate}:${ip}`).digest("hex").slice(0, 16);
}

export type LimitResult = { success: boolean; reset: number };
export type Limiter = { limit(key: string): Promise<LimitResult> };

// Fixed-window counter per key. Per-instance only; used when Upstash is not configured.
// `aligned` starts windows at multiples of windowMs since the epoch (UTC midnight for a
// day window), matching Upstash's fixedWindow; otherwise a window starts at a key's first hit.
export class MemoryLimiter implements Limiter {
  private hits = new Map<string, { count: number; resetAt: number }>();
  private max: number;
  private windowMs: number;
  private now: () => number;
  private aligned: boolean;
  private cleanupTimer?: ReturnType<typeof setTimeout>;
  private cleanupAt = Infinity;

  // Plain fields, not parameter properties: `node --experimental-strip-types` cannot run those.
  constructor(max: number, windowMs: number, now: () => number = Date.now, aligned = false) {
    this.max = max;
    this.windowMs = windowMs;
    this.now = now;
    this.aligned = aligned;
  }

  private scheduleCleanup(resetAt: number) {
    if (resetAt >= this.cleanupAt) return;
    if (this.cleanupTimer) clearTimeout(this.cleanupTimer);
    this.cleanupAt = resetAt;
    this.cleanupTimer = setTimeout(() => {
      this.cleanupTimer = undefined;
      this.cleanupAt = Infinity;
      const t = this.now();
      let nextReset = Infinity;
      for (const [key, entry] of this.hits) {
        if (entry.resetAt <= t) this.hits.delete(key);
        else nextReset = Math.min(nextReset, entry.resetAt);
      }
      if (nextReset < Infinity) this.scheduleCleanup(nextReset);
    }, Math.max(1, resetAt - this.now()));
    // One timer per limiter removes expired identifiers even without another request.
    // It must not keep a serverless invocation or a test process alive.
    this.cleanupTimer.unref();
  }

  async limit(key: string): Promise<LimitResult> {
    const t = this.now();
    if (this.hits.size > 1000) {
      for (const [k, v] of this.hits) if (v.resetAt <= t) this.hits.delete(k);
    }
    let entry = this.hits.get(key);
    if (!entry || entry.resetAt <= t) {
      const resetAt = this.aligned ? (Math.floor(t / this.windowMs) + 1) * this.windowMs : t + this.windowMs;
      entry = { count: 0, resetAt };
      this.hits.set(key, entry);
      this.scheduleCleanup(entry.resetAt);
    }
    entry.count += 1;
    return { success: entry.count <= this.max, reset: entry.resetAt };
  }
}

export function readLimit(env: Record<string, string | undefined>, name: string, fallback: number): number {
  const raw = env[name]?.trim();
  if (!raw || !/^\d+$/.test(raw)) return fallback;
  const n = Number(raw);
  return Number.isSafeInteger(n) && n > 0 ? n : fallback;
}

// The Vercel Marketplace Upstash integration sets one or both pairs depending on when it was
// provisioned. Pick one complete, nonempty pair so a stray half-pair never mixes credentials
// from different databases (auth would fail and every limiter would fail open).
export function redisCredentials(env: Record<string, string | undefined>): { url: string; token: string } | null {
  for (const [urlName, tokenName] of [
    ["UPSTASH_REDIS_REST_URL", "UPSTASH_REDIS_REST_TOKEN"],
    ["KV_REST_API_URL", "KV_REST_API_TOKEN"],
  ]) {
    const url = env[urlName]?.trim();
    const token = env[tokenName]?.trim();
    if (url && token) return { url, token };
  }
  return null;
}

export const DEFAULT_LIMITS = { perMinute: 10, perDay: 60, globalPerDay: 300 };
