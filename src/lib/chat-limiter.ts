import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { DEFAULT_LIMITS, MemoryLimiter, readLimit, redisCredentials, type Limiter } from "@/lib/chat-guard";

type ChatLimiters = {
  minute: Limiter;
  day: Limiter;
  global: Limiter;
  limits: { perMinute: number; perDay: number; globalPerDay: number };
};

// Module-level singleton so Upstash's ephemeral cache (and the memory fallback) survive warm invocations.
let limiters: ChatLimiters | undefined;

// The SDK only evicts a blocked identifier when it is queried again. Daily IP
// rotation means that may never happen, so expire its warm-invocation cache too.
class ExpiringCache extends Map<string, number> {
  private timer?: ReturnType<typeof setTimeout>;
  private cleanupAt = Infinity;

  override set(key: string, reset: number): this {
    super.set(key, reset);
    this.scheduleCleanup(reset);
    return this;
  }

  private scheduleCleanup(reset: number) {
    if (reset >= this.cleanupAt) return;
    if (this.timer) clearTimeout(this.timer);
    this.cleanupAt = reset;
    this.timer = setTimeout(() => {
      this.timer = undefined;
      this.cleanupAt = Infinity;
      const now = Date.now();
      let nextReset = Infinity;
      for (const [key, expires] of this) {
        if (expires <= now) this.delete(key);
        else nextReset = Math.min(nextReset, expires);
      }
      if (nextReset < Infinity) this.scheduleCleanup(nextReset);
    }, Math.max(1, reset - Date.now()));
    this.timer.unref();
  }
}

function wrap(rl: Ratelimit): Limiter {
  return {
    async limit(key) {
      try {
        const { success, reset } = await rl.limit(key);
        return { success, reset };
      } catch {
        // The SDK fails open on timeout, but immediate Redis errors reject.
        // Keep the same availability policy without logging identifiers.
        console.error("[api/chat] Rate limiter unavailable; allowing this request.");
        return { success: true, reset: Date.now() };
      }
    },
  };
}

function build(): ChatLimiters {
  const limits = {
    perMinute: readLimit(process.env, "CHAT_RATE_PER_MINUTE", DEFAULT_LIMITS.perMinute),
    perDay: readLimit(process.env, "CHAT_RATE_PER_DAY", DEFAULT_LIMITS.perDay),
    globalPerDay: readLimit(process.env, "CHAT_GLOBAL_PER_DAY", DEFAULT_LIMITS.globalPerDay),
  };

  const credentials = redisCredentials(process.env);

  if (credentials) {
    const redis = new Redis(credentials);
    // analytics: false keeps identifiers and geo data out of the Upstash console.
    // The SDK's default 5 s timeout fails open, so a Redis outage never takes the chat down.
    return {
      minute: wrap(new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(limits.perMinute, "1 m"), prefix: "chat:min", analytics: false, ephemeralCache: new ExpiringCache() })),
      day: wrap(new Ratelimit({ redis, limiter: Ratelimit.fixedWindow(limits.perDay, "1 d"), prefix: "chat:day", analytics: false, ephemeralCache: new ExpiringCache() })),
      global: wrap(new Ratelimit({ redis, limiter: Ratelimit.fixedWindow(limits.globalPerDay, "1 d"), prefix: "chat:global", analytics: false, ephemeralCache: new ExpiringCache() })),
      limits,
    };
  }

  if (process.env.NODE_ENV === "production") {
    console.warn("[api/chat] Rate limiting is per-instance only until Upstash env vars are set.");
  }
  return {
    minute: new MemoryLimiter(limits.perMinute, 60_000),
    // Daily windows reset at UTC midnight, like Redis, so the global cap is per calendar day.
    day: new MemoryLimiter(limits.perDay, 86_400_000, Date.now, true),
    global: new MemoryLimiter(limits.globalPerDay, 86_400_000, Date.now, true),
    limits,
  };
}

export function getChatLimiters(): ChatLimiters {
  limiters ??= build();
  return limiters;
}
