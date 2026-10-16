import { test } from "node:test";
import assert from "node:assert/strict";
import { setTimeout as delay } from "node:timers/promises";
import {
  allowedHosts,
  clientIp,
  ipKey,
  isOriginAllowed,
  MemoryLimiter,
  PRODUCTION_HOSTS,
  readLimit,
  redisCredentials,
} from "../src/lib/chat-guard.ts";

function headers(map: Record<string, string>) {
  return { get: (name: string) => map[name.toLowerCase()] ?? null };
}

test("isOriginAllowed: production hosts pass", () => {
  assert.equal(isOriginAllowed("https://jordanhenning.com", null, PRODUCTION_HOSTS), true);
  assert.equal(isOriginAllowed("https://www.jordanhenning.com", null, PRODUCTION_HOSTS), true);
  assert.equal(isOriginAllowed("https://JordanHenning.com", null, PRODUCTION_HOSTS), true);
});

test("guard: Origin takes precedence over Referer and preview hosts are ignored in production", () => {
  assert.equal(isOriginAllowed("https://evil.example", "https://jordanhenning.com", PRODUCTION_HOSTS), false);
  assert.equal(isOriginAllowed("null", "https://jordanhenning.com", PRODUCTION_HOSTS), false);
  const prod = allowedHosts({ NODE_ENV: "production", VERCEL_ENV: "production", VERCEL_URL: "job.vercel.app" });
  assert.equal(isOriginAllowed("https://job.vercel.app", null, prod), false);
  assert.equal(isOriginAllowed("http://127.0.0.1:9999", null, allowedHosts({})), true);
});

test("guard regression: a present but empty Origin cannot fall back to an allowed Referer", () => {
  assert.equal(isOriginAllowed("", "https://jordanhenning.com/playbook", PRODUCTION_HOSTS), false);
});

test("readLimit: only positive safe integers are accepted", () => {
  for (const value of [undefined, "", "0", "-1", "1.5", "NaN", "1e3", "9007199254740992"]) {
    assert.equal(readLimit({ LIMIT: value }, "LIMIT", 10), 10, String(value));
  }
  for (const value of ["1", " 25 ", "001"]) assert.equal(readLimit({ LIMIT: value }, "LIMIT", 10), Number(value));
});

test("ipKey: UTC day boundary is stable regardless of the timestamp's local offset", () => {
  assert.equal(ipKey("203.0.113.7", new Date("2026-10-10T23:00:00-04:00")), ipKey("203.0.113.7", new Date("2026-10-11T03:00:00Z")));
  assert.notEqual(ipKey("203.0.113.7", new Date("2026-10-10T23:59:59Z")), ipKey("203.0.113.7", new Date("2026-10-11T00:00:00Z")));
});

test("MemoryLimiter: exact reset boundary and concurrency retain fixed-window caps", async () => {
  let now = 0;
  const limiter = new MemoryLimiter(10, 60_000, () => now);
  const results = await Promise.all(Array.from({ length: 15 }, () => limiter.limit("hash")));
  assert.equal(results.filter((result) => result.success).length, 10);
  now = 60_000;
  assert.deepEqual(await limiter.limit("hash"), { success: true, reset: 120_000 });
});

test("MemoryLimiter: expired entries are reclaimed when the cache exceeds 1000 keys", async () => {
  let now = 0;
  const limiter = new MemoryLimiter(1, 60_000, () => now);
  for (let i = 0; i < 1001; i++) await limiter.limit(`key-${i}`);
  now = 60_000;
  await limiter.limit("new-key");
  const stored = Reflect.get(limiter, "hits") as Map<string, unknown>;
  assert.equal(stored.size, 1);
});

test("MemoryLimiter regression: expired IP hashes are removed even in a quiet cache below 1000 keys", async () => {
  const limiter = new MemoryLimiter(1, 20);
  await limiter.limit("0123456789abcdef");
  await delay(100);
  const stored = Reflect.get(limiter, "hits") as Map<string, unknown>;
  assert.equal(stored.size, 0, "expired identifiers must not remain stored indefinitely");
});

test("isOriginAllowed: foreign, missing and malformed origins fail", () => {
  assert.equal(isOriginAllowed("https://evil.example", null, PRODUCTION_HOSTS), false);
  assert.equal(isOriginAllowed("https://jordanhenning.com.evil.example", null, PRODUCTION_HOSTS), false);
  assert.equal(isOriginAllowed(null, null, PRODUCTION_HOSTS), false);
  assert.equal(isOriginAllowed("not a url", null, PRODUCTION_HOSTS), false);
});

test("isOriginAllowed: Referer is used when Origin is absent", () => {
  assert.equal(isOriginAllowed(null, "https://jordanhenning.com/playbook", PRODUCTION_HOSTS), true);
  assert.equal(isOriginAllowed(null, "https://evil.example/", PRODUCTION_HOSTS), false);
});

test("isOriginAllowed: localhost on any port only outside production", () => {
  const dev = allowedHosts({ NODE_ENV: "development" });
  const prod = allowedHosts({ NODE_ENV: "production" });
  assert.equal(isOriginAllowed("http://localhost:3000", null, dev), true);
  assert.equal(isOriginAllowed("http://localhost:4123", null, dev), true);
  assert.equal(isOriginAllowed("http://localhost:3000", null, prod), false);
});

test("allowedHosts: production excludes localhost, preview adds Vercel URLs", () => {
  const prod = allowedHosts({ NODE_ENV: "production", VERCEL_ENV: "production" });
  assert.ok(!prod.includes("localhost"));
  assert.ok(!prod.includes("127.0.0.1"));

  const preview = allowedHosts({
    NODE_ENV: "production",
    VERCEL_ENV: "preview",
    VERCEL_URL: "jordan-site-abc123.vercel.app",
    VERCEL_BRANCH_URL: "jordan-site-git-feature.vercel.app",
  });
  assert.ok(preview.includes("jordan-site-abc123.vercel.app"));
  assert.ok(preview.includes("jordan-site-git-feature.vercel.app"));
  assert.equal(isOriginAllowed("https://jordan-site-abc123.vercel.app", null, preview), true);
});

test("clientIp: x-real-ip, then first x-forwarded-for entry, then unknown", () => {
  assert.equal(clientIp(headers({ "x-real-ip": "1.2.3.4", "x-forwarded-for": "5.6.7.8" })), "1.2.3.4");
  assert.equal(clientIp(headers({ "x-forwarded-for": " 5.6.7.8 , 9.9.9.9" })), "5.6.7.8");
  assert.equal(clientIp(headers({})), "unknown");
});

test("ipKey: 16 hex chars, rotates daily, never contains the raw IP", () => {
  const ip = "203.0.113.7";
  const a = ipKey(ip, new Date("2026-10-10T12:00:00Z"));
  const b = ipKey(ip, new Date("2026-10-11T12:00:00Z"));
  assert.match(a, /^[0-9a-f]{16}$/);
  assert.notEqual(a, b);
  assert.ok(!a.includes(ip));
  assert.equal(a, ipKey(ip, new Date("2026-10-10T23:59:59Z")));
});

test("MemoryLimiter: allows max per window, denies the next, resets after the window", async () => {
  let t = 1_000_000;
  const limiter = new MemoryLimiter(10, 60_000, () => t);
  for (let i = 0; i < 10; i++) {
    const r = await limiter.limit("k");
    assert.equal(r.success, true, `request ${i + 1} should pass`);
    assert.ok(r.reset > t);
  }
  const denied = await limiter.limit("k");
  assert.equal(denied.success, false);
  assert.ok(denied.reset > t);

  assert.equal((await limiter.limit("other")).success, true);

  t += 60_001;
  assert.equal((await limiter.limit("k")).success, true);
});

test("redisCredentials: picks one complete, nonempty pair and never mixes pairs", () => {
  const kv = { KV_REST_API_URL: "https://kv.example", KV_REST_API_TOKEN: "kv-token" };
  assert.deepEqual(redisCredentials({ UPSTASH_REDIS_REST_URL: "https://up.example", UPSTASH_REDIS_REST_TOKEN: "up-token", ...kv }), { url: "https://up.example", token: "up-token" });
  assert.deepEqual(redisCredentials({ UPSTASH_REDIS_REST_URL: "https://stale.example", ...kv }), { url: "https://kv.example", token: "kv-token" });
  assert.deepEqual(redisCredentials({ UPSTASH_REDIS_REST_TOKEN: "stale-token", ...kv }), { url: "https://kv.example", token: "kv-token" });
  assert.deepEqual(redisCredentials({ UPSTASH_REDIS_REST_URL: "", UPSTASH_REDIS_REST_TOKEN: " ", ...kv }), { url: "https://kv.example", token: "kv-token" });
  assert.equal(redisCredentials({ UPSTASH_REDIS_REST_URL: "https://up.example", KV_REST_API_TOKEN: "kv-token" }), null);
  assert.equal(redisCredentials({}), null);
});

test("MemoryLimiter aligned: a daily window resets at UTC midnight, not 24 hours after the first hit", async () => {
  let now = Date.parse("2026-10-09T12:00:00Z");
  const limiter = new MemoryLimiter(300, 86_400_000, () => now, true);
  assert.equal((await limiter.limit("global")).success, true);
  now = Date.parse("2026-10-10T08:00:00Z");
  for (let i = 0; i < 300; i++) assert.equal((await limiter.limit("global")).success, true, `today request ${i + 1}`);
  const denied = await limiter.limit("global");
  assert.equal(denied.success, false);
  assert.equal(denied.reset, Date.parse("2026-10-11T00:00:00Z"));
  now = Date.parse("2026-10-10T12:00:01Z");
  assert.equal((await limiter.limit("global")).success, false, "noon today must not reopen the cap");
  now = Date.parse("2026-10-11T00:00:00Z");
  assert.equal((await limiter.limit("global")).success, true);
});

test("guard edge: SHA-256 vector includes the UTC date, separator, and IPv6 address", () => {
  assert.equal(ipKey("2001:db8::7", new Date("2026-10-15T23:30:00-04:00")), "26bb81be75e0c6bc");
});

test("guard edge: deceptive hosts and credential-style URLs cannot bypass the allowlist", () => {
  for (const origin of ["https://jordanhenning.com@evil.example", "https://jordanhenning.com.evil.example", "https://evil-jordanhenning.com", "https://jordanhenning.com%2eevil.example"]) {
    assert.equal(isOriginAllowed(origin, "https://jordanhenning.com", PRODUCTION_HOSTS), false, origin);
  }
  const preview = allowedHosts({ NODE_ENV: "production", VERCEL_ENV: "preview", VERCEL_URL: "https://JOB.vercel.app:443/path", VERCEL_BRANCH_URL: "not a valid URL" });
  assert.equal(isOriginAllowed("https://job.vercel.app", null, preview), true);
  assert.equal(isOriginAllowed("https://other.vercel.app", null, preview), false);
});

test("guard edge: blank real-IP headers fall back without storing forwarded chains", () => {
  assert.equal(clientIp(headers({ "x-real-ip": "  ", "x-forwarded-for": " 2001:db8::7 , 198.51.100.1 " })), "2001:db8::7");
  assert.equal(clientIp(headers({ "x-forwarded-for": "  , 198.51.100.1" })), "unknown");
});
