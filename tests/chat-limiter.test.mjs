import { test } from "node:test";
import assert from "node:assert/strict";
import { createServer } from "node:http";
import { setTimeout as delay } from "node:timers/promises";
import { Ratelimit as UpstashRatelimit } from "@upstash/ratelimit";
import { sourceLoader } from "./helpers/load-source.mjs";
import { chatFixture, chatRequest } from "./helpers/chat-fixture.mjs";

function sdkHarness(env, reject = false) {
  const configs = [];
  const redisConfigs = [];
  const calls = [];
  const warnings = [];
  class Redis { constructor(options) { redisConfigs.push(options); } }
  class Ratelimit {
    static slidingWindow(count, window) { return { algorithm: "sliding", count, window }; }
    static fixedWindow(count, window) { return { algorithm: "fixed", count, window }; }
    constructor(options) { configs.push(options); this.options = options; }
    async limit(key) {
      calls.push([this.options.prefix, key]);
      if (reject) throw new Error("test Redis unavailable");
      return { success: true, reset: Date.now() + 86_400_000, remaining: 1 };
    }
  }
  const mocks = { "@upstash/redis": { Redis }, "@upstash/ratelimit": { Ratelimit } };
  const load = sourceLoader({ env, mocks, logger: { warn: (...args) => warnings.push(args), error() {} } });
  return { ...load("src/lib/chat-limiter.ts"), configs, redisConfigs, calls, warnings, mocks };
}

test("limiter regression: expired SDK cache identifiers disappear without another request", async (t) => {
  // Use the installed SDK. Only Redis is replaced by a store reporting exhausted caps.
  const caches = [];
  class Redis {
    async evalsha(_sha, keys, args) {
      const cap = Number(args[0]);
      return [keys[0].startsWith("chat:min:") ? -1 : cap + 1, cap];
    }
  }
  class Ratelimit extends UpstashRatelimit {
    constructor(options) {
      super(options);
      caches.push(this.ctx.cache.cache);
    }
  }
  const load = sourceLoader({
    env: { UPSTASH_REDIS_REST_URL: "http://127.0.0.1:3999", UPSTASH_REDIS_REST_TOKEN: "fake" },
    mocks: { "@upstash/redis": { Redis }, "@upstash/ratelimit": { Ratelimit } },
  });
  const limiters = load("src/lib/chat-limiter.ts").getChatLimiters();
  const realNow = Date.now.bind(Date);
  const started = realNow();
  const justBeforeMidnight = Date.parse("2026-10-10T23:59:59.000Z");
  t.mock.method(Date, "now", () => justBeforeMidnight + realNow() - started);
  for (const limiter of [limiters.minute, limiters.day, limiters.global]) {
    assert.equal((await limiter.limit("0123456789abcdef")).success, false);
  }
  assert.deepEqual(caches.map((cache) => cache.size), [1, 1, 1], "blocked decisions are cached across warm invocations");
  await delay(1500);
  assert.deepEqual(caches.map((cache) => cache.size), [0, 0, 0], "expired identifiers must not be retained in a quiet SDK cache");
});

test("limiter: both Marketplace credential pairs select Redis, prefixes and analytics privacy are configured", async () => {
  for (const env of [
    { UPSTASH_REDIS_REST_URL: "http://127.0.0.1:3999", UPSTASH_REDIS_REST_TOKEN: "fake" },
    { KV_REST_API_URL: "http://127.0.0.1:3999", KV_REST_API_TOKEN: "fake" },
  ]) {
    const h = sdkHarness(env);
    const limits = h.getChatLimiters();
    assert.equal(h.getChatLimiters(), limits);
    assert.deepEqual(h.redisConfigs, [{ url: "http://127.0.0.1:3999", token: "fake" }]);
    assert.deepEqual(h.configs.map((c) => [c.prefix, c.analytics, c.limiter]), [
      ["chat:min", false, { algorithm: "sliding", count: 10, window: "1 m" }],
      ["chat:day", false, { algorithm: "fixed", count: 60, window: "1 d" }],
      ["chat:global", false, { algorithm: "fixed", count: 300, window: "1 d" }],
    ]);
    assert.ok(h.configs.every((config) => !Object.hasOwn(config, "timeout")), "retain SDK's default timeout");
    const result = await limits.minute.limit("0123456789abcdef");
    assert.equal(result.success, true);
    assert.ok(result.reset > Date.now());
    assert.deepEqual(Object.keys(result).sort(), ["reset", "success"]);
  }
});

test("limiter: custom caps and credential precedence are wired; malformed caps use defaults", () => {
  const h = sdkHarness({
    UPSTASH_REDIS_REST_URL: "http://127.0.0.1:3999", UPSTASH_REDIS_REST_TOKEN: "preferred", KV_REST_API_URL: "ignored", KV_REST_API_TOKEN: "ignored",
    CHAT_RATE_PER_MINUTE: "3", CHAT_RATE_PER_DAY: "20", CHAT_GLOBAL_PER_DAY: "90",
  });
  assert.deepEqual(h.getChatLimiters().limits, { perMinute: 3, perDay: 20, globalPerDay: 90 });
  assert.equal(h.redisConfigs[0].token, "preferred");
  const invalid = sdkHarness({ CHAT_RATE_PER_MINUTE: "0", CHAT_RATE_PER_DAY: "2.5", CHAT_GLOBAL_PER_DAY: "abc" });
  assert.deepEqual(invalid.getChatLimiters().limits, { perMinute: 10, perDay: 60, globalPerDay: 300 });
});

test("limiter: memory fallback survives warm invocations and warns exactly once only in production", async () => {
  for (const NODE_ENV of ["production", "development"]) {
    const h = sdkHarness({ NODE_ENV });
    const first = h.getChatLimiters();
    for (let i = 0; i < 10; i++) assert.equal((await h.getChatLimiters().minute.limit("0123456789abcdef")).success, true);
    assert.equal((await first.minute.limit("0123456789abcdef")).success, false);
    assert.equal(h.configs.length, 0);
    assert.equal(h.warnings.length, NODE_ENV === "production" ? 1 : 0);
  }
  const f = chatFixture();
  assert.equal(await (await f.POST(chatRequest())).text(), "Hello Jordan.");
  await f.POST(chatRequest());
  assert.equal(f.logs.warn.length, 1);
});

test("limiter regression: fast Redis rejection fails open and chat still streams", async () => {
  const env = { UPSTASH_REDIS_REST_URL: "http://127.0.0.1:3999", UPSTASH_REDIS_REST_TOKEN: "fake" };
  const h = sdkHarness(env, true);
  const f = chatFixture({ env, mocks: h.mocks });
  const response = await f.POST(chatRequest());
  assert.equal(response.status, 200);
  assert.equal(await response.text(), "Hello Jordan.");
  assert.equal(f.calls.length, 1);
});

test("limiter: actual Redis SDK sends only hashed IP keys, namespaced counters and expiring scripts to local REST store", async () => {
  const commands = [];
  const counts = new Map();
  const server = createServer(async (req, res) => {
    let raw = "";
    for await (const chunk of req) raw += chunk;
    const payload = JSON.parse(raw);
    res.setHeader("Content-Type", "application/json");
    const answer = (command) => {
      commands.push(command);
      if (command[0].toLowerCase() === "evalsha") return { error: "NOSCRIPT No matching script. Please use EVAL." };
      const keys = command.slice(3, 3 + Number(command[2]));
      const args = command.slice(3 + Number(command[2]));
      const limit = Number(args[0]);
      // The fixture supplies atomic store usage; SDK/route must honor its decision.
      const identifier = keys[0].split(":").slice(0, -1).join(":");
      const used = (counts.get(identifier) ?? 0) + 1;
      counts.set(identifier, used);
      return { result: [keys[0].startsWith("chat:min:") ? limit - used : used, limit] };
    };
    res.end(JSON.stringify(Array.isArray(payload[0]) ? payload.map(answer) : answer(payload)));
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  try {
    const f = chatFixture({ env: { KV_REST_API_URL: `http://127.0.0.1:${server.address().port}`, KV_REST_API_TOKEN: "local-only" } });
    assert.equal(await (await f.POST(chatRequest())).text(), "Hello Jordan.");
    const evaluated = commands.filter((c) => c[0].toLowerCase() === "eval");
    assert.equal(evaluated.length, 3);
    assert.match(evaluated[0][3], /^chat:min:[0-9a-f]{16}:\d+$/);
    assert.match(evaluated[1][3], /^chat:day:[0-9a-f]{16}:\d+$/);
    assert.match(evaluated[2][3], /^chat:global:global:\d+$/);
    for (const c of evaluated) assert.match(c[1], /PEXPIRE/);
    for (const c of evaluated.slice(1)) assert.equal(Number(c[3 + Number(c[2]) + 1]), 86_400_000);
    assert.ok(!JSON.stringify([commands, f.logs]).includes("203.0.113.7"));
    assert.ok(commands.every((c) => ["eval", "evalsha"].includes(c[0].toLowerCase())), "no analytics/geo commands");
    const burst = await Promise.all(Array.from({ length: 14 }, () => f.POST(chatRequest())));
    assert.equal(burst.filter((response) => response.status === 200).length, 9);
    const denied = burst.filter((response) => response.status === 429);
    assert.equal(denied.length, 5);
    for (const response of denied) {
      assert.match((await response.json()).error, /Wait a minute/);
      assert.ok(Number(response.headers.get("retry-after")) >= 1);
    }
    assert.equal(f.calls.length, 10, "Redis-denied calls never reach Anthropic");
    assert.ok(!JSON.stringify([commands, f.logs, [...counts.keys()]]).includes("203.0.113.7"));
  } finally {
    server.closeAllConnections();
    await new Promise((resolve) => server.close(resolve));
  }
});

test("limiter regression: a stray or empty Upstash half-pair never mixes with a complete KV pair", () => {
  const kv = { KV_REST_API_URL: "http://127.0.0.1:3998", KV_REST_API_TOKEN: "kv-token" };
  for (const stray of [{ UPSTASH_REDIS_REST_URL: "http://stale.example" }, { UPSTASH_REDIS_REST_TOKEN: "stale" }, { UPSTASH_REDIS_REST_URL: "", UPSTASH_REDIS_REST_TOKEN: "" }]) {
    const h = sdkHarness({ ...stray, ...kv });
    h.getChatLimiters();
    assert.deepEqual(h.redisConfigs, [{ url: "http://127.0.0.1:3998", token: "kv-token" }], JSON.stringify(stray));
  }
  const half = sdkHarness({ UPSTASH_REDIS_REST_URL: "http://stale.example", KV_REST_API_TOKEN: "kv-token" });
  half.getChatLimiters();
  assert.equal(half.configs.length, 0, "no complete pair falls back to memory");
});

test("limiter regression: memory global cap is per UTC day, so midday does not reopen it", async (t) => {
  t.mock.timers.enable({ apis: ["Date"], now: Date.parse("2026-10-09T12:00:00Z") });
  const f = chatFixture();
  assert.equal((await f.POST(chatRequest({ ip: "198.51.100.250" }))).status, 200);
  t.mock.timers.setTime(Date.parse("2026-10-10T08:00:00Z"));
  for (let i = 0; i < 300; i++) assert.equal((await f.POST(chatRequest({ ip: `198.51.${Math.floor(i / 250)}.${i % 250}` }))).status, 200, `request ${i + 1}`);
  t.mock.timers.setTime(Date.parse("2026-10-10T12:00:01Z"));
  const denied = await f.POST(chatRequest({ ip: "203.0.113.201" }));
  assert.equal(denied.status, 429);
  assert.match((await denied.json()).error, /reached its daily limit/);
  assert.equal(f.calls.length, 301);
  t.mock.timers.setTime(Date.parse("2026-10-11T00:00:00Z"));
  assert.equal((await f.POST(chatRequest({ ip: "203.0.113.202" }))).status, 200);
});

test("limiter edge: SDK cache respects refreshed deadlines and an earlier second identifier", (t) => {
  let now = 1000;
  const timers = [];
  t.mock.method(Date, "now", () => now);
  t.mock.method(globalThis, "setTimeout", (callback, delay) => {
    const handle = { callback, delay, cancelled: false, unreferenced: false, unref() { this.unreferenced = true; } };
    timers.push(handle);
    return handle;
  });
  t.mock.method(globalThis, "clearTimeout", (handle) => { handle.cancelled = true; });
  const h = sdkHarness({ UPSTASH_REDIS_REST_URL: "http://127.0.0.1:3999", UPSTASH_REDIS_REST_TOKEN: "fake" });
  h.getChatLimiters();
  const cache = h.configs[0].ephemeralCache;
  cache.set("0123456789abcdef", 1030);
  cache.set("fedcba9876543210", 1010);
  cache.set("0123456789abcdef", 1050);
  assert.equal(timers[0].cancelled, true, "the earlier deadline must replace the original timer");
  now = 1010;
  timers.at(-1).callback();
  assert.equal(cache.has("fedcba9876543210"), false);
  assert.equal(cache.has("0123456789abcdef"), true, "a refreshed identifier must survive the earlier expiry");
  assert.equal(timers.at(-1).delay, 40);
  now = 1050;
  timers.at(-1).callback();
  assert.equal(cache.size, 0);
  assert.ok(timers.every((timer) => timer.unreferenced), "cache cleanup must not keep the process alive");
});
