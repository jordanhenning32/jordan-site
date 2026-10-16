import { test } from "node:test";
import assert from "node:assert/strict";
import { chatFixture, chatRequest, genericError } from "./helpers/chat-fixture.mjs";

test("route: production domains and Referer-only requests stream unchanged text and headers", async () => {
  const f = chatFixture();
  for (const request of [chatRequest(), chatRequest({ origin: "https://www.jordanhenning.com" }), chatRequest({ origin: null, referer: "https://jordanhenning.com/playbook" })]) {
    const response = await f.POST(request);
    assert.equal(response.status, 200);
    assert.equal(response.headers.get("content-type"), "text/plain; charset=utf-8");
    assert.equal(response.headers.get("cache-control"), "no-store");
    assert.equal(response.headers.get("x-accel-buffering"), "no");
    assert.equal(await response.text(), "Hello Jordan.");
  }
  assert.equal(f.calls.length, 3);
  assert.equal(f.calls[0].body.model, "claude-sonnet-4-6");
  assert.equal(f.calls[0].body.max_tokens, 800);
  assert.deepEqual(f.calls[0].body.system[0].cache_control, { type: "ephemeral" });
});

test("route: returns chunks before upstream finishes", async () => {
  let finish;
  const gate = new Promise((resolve) => { finish = resolve; });
  const f = chatFixture({ stream: async function* () {
    yield { type: "content_block_delta", delta: { type: "text_delta", text: "First" } };
    await gate;
    yield { type: "content_block_delta", delta: { type: "text_delta", text: " second" } };
  } });
  const response = await f.POST(chatRequest());
  const reader = response.body.getReader();
  assert.equal(new TextDecoder().decode((await reader.read()).value), "First");
  finish();
  assert.equal(new TextDecoder().decode((await reader.read()).value), " second");
  assert.equal((await reader.read()).done, true);
});

test("route: foreign, missing and malformed origins return JSON 403 before body parsing or Anthropic", async () => {
  const f = chatFixture();
  for (const origin of ["https://evil.example", null, "not a URL", "https://jordanhenning.com.evil.example"]) {
    const response = await f.POST(chatRequest({ origin, raw: "not JSON" }));
    assert.equal(response.status, 403);
    assert.match(response.headers.get("content-type"), /application\/json/);
    assert.deepEqual(await response.json(), { error: "This chat only works from jordanhenning.com." });
  }
  assert.equal((await f.POST(chatRequest({ origin: "https://evil.example", referer: "https://jordanhenning.com" }))).status, 403);
  assert.equal((await f.POST(chatRequest({ origin: "", referer: "https://jordanhenning.com" }))).status, 403);
  assert.equal(f.calls.length, 0);
});

test("route: development accepts any localhost port; production excludes it; preview accepts only configured hostnames", async () => {
  for (const origin of ["http://localhost:1", "http://localhost:65535", "http://127.0.0.1:3000"]) {
    const f = chatFixture({ env: { NODE_ENV: "development" } });
    assert.equal((await f.POST(chatRequest({ origin }))).status, 200);
    assert.equal((await chatFixture().POST(chatRequest({ origin }))).status, 403);
  }
  const f = chatFixture({ env: { VERCEL_ENV: "preview", VERCEL_URL: "job.vercel.app", VERCEL_BRANCH_URL: "branch.vercel.app" } });
  for (const origin of ["https://job.vercel.app", "https://branch.vercel.app"]) {
    assert.equal((await f.POST(chatRequest({ origin }))).status, 200);
  }
  assert.equal((await f.POST(chatRequest({ origin: "https://other.vercel.app" }))).status, 403);
});

test("route: rapid requests 11 through 15 return JSON 429 and Retry-After; no denied request calls Anthropic", async () => {
  const f = chatFixture();
  const responses = await Promise.all(Array.from({ length: 15 }, () => f.POST(chatRequest())));
  assert.deepEqual(responses.map((r) => r.status), [...Array(10).fill(200), ...Array(5).fill(429)]);
  for (const response of responses.slice(10)) {
    assert.match((await response.json()).error, /Wait a minute/);
    assert.match(response.headers.get("retry-after"), /^\d+$/);
    assert.ok(Number(response.headers.get("retry-after")) >= 1);
    assert.ok(Number(response.headers.get("retry-after")) <= 60);
  }
  assert.equal(f.calls.length, 10);
  assert.equal((await f.POST(chatRequest({ ip: "203.0.113.8" }))).status, 200);
});

test("route: 60 requests today pass across minute windows, request 61 hits daily cap; next daily window resets", async () => {
  const originalNow = Date.now;
  let now = Date.parse("2026-10-10T01:00:00Z");
  Date.now = () => now;
  try {
    const f = chatFixture();
    for (let i = 0; i < 60; i++) {
      if (i && i % 10 === 0) now += 60_001;
      assert.equal((await f.POST(chatRequest())).status, 200, `request ${i + 1}`);
    }
    now += 60_001;
    const denied = await f.POST(chatRequest());
    assert.equal(denied.status, 429);
    assert.match((await denied.json()).error, /today's limit/);
    assert.ok(Number(denied.headers.get("retry-after")) > 60);
    assert.equal(f.calls.length, 60);
    now += 86_400_001;
    assert.equal((await f.POST(chatRequest())).status, 200);
  } finally { Date.now = originalNow; }
});

test("route: 300 site-wide requests pass, next visitor gets daily global message and Retry-After", async () => {
  const f = chatFixture();
  for (let i = 0; i < 300; i++) assert.equal((await f.POST(chatRequest({ ip: `198.51.100.${i}` }))).status, 200);
  const response = await f.POST(chatRequest({ ip: "203.0.113.200" }));
  assert.equal(response.status, 429);
  assert.equal((await response.json()).error, "The concierge has reached its daily limit. Email Jordan or book time on Calendly instead.");
  assert.ok(Number(response.headers.get("retry-after")) > 0);
  assert.equal(f.calls.length, 300);
});

test("route: limiter keys are daily IP hashes, never raw IPs; global is the planned aggregate identifier", async () => {
  const keys = [];
  const makeLimiter = (name) => ({ limit: async (key) => { keys.push([name, key]); return { success: true, reset: Date.now() + 60_000 }; } });
  const f = chatFixture({ mocks: { "@/lib/chat-limiter": { getChatLimiters: () => ({ minute: makeLimiter("minute"), day: makeLimiter("day"), global: makeLimiter("global") }) } } });
  await f.POST(chatRequest({ ip: "203.0.113.7" }));
  assert.match(keys[0][1], /^[0-9a-f]{16}$/);
  assert.equal(keys[0][1], keys[1][1]);
  assert.deepEqual(keys[2], ["global", "global"]);
  assert.ok(!JSON.stringify([keys, f.logs]).includes("203.0.113.7"));
});

test("route: per-IP hashes rotate at UTC midnight while the permitted global sentinel stays shared", async (t) => {
  t.mock.timers.enable({ apis: ["Date"], now: Date.parse("2026-10-10T23:59:58Z") });
  const stored = [];
  const limiter = { limit: async (key) => {
    stored.push(key);
    return { success: true, reset: Date.now() + 60_000 };
  } };
  const f = chatFixture({ mocks: { "@/lib/chat-limiter": {
    getChatLimiters: () => ({ minute: limiter, day: limiter, global: limiter }),
  } } });
  await (await f.POST(chatRequest())).text();
  t.mock.timers.setTime(Date.parse("2026-10-10T23:59:59Z"));
  await (await f.POST(chatRequest())).text();
  t.mock.timers.setTime(Date.parse("2026-10-11T00:00:00Z"));
  await (await f.POST(chatRequest())).text();
  const ipKeys = stored.filter((_key, index) => index % 3 !== 2);
  for (const key of ipKeys) assert.match(key, /^[0-9a-f]{16}$/);
  assert.deepEqual(ipKeys.slice(0, 4), Array(4).fill(ipKeys[0]));
  assert.notEqual(ipKeys[0], ipKeys[4]);
  assert.equal(ipKeys[4], ipKeys[5]);
  assert.deepEqual([stored[2], stored[5], stored[8]], Array(3).fill("global"));
  assert.ok(!JSON.stringify([stored, f.logs]).includes("203.0.113.7"));
});

test("route: thrown upstream error is logged as err, client gets only the generic sentence", async () => {
  for (const error of [new Error("PRIVATE-UPSTREAM-DETAIL"), "PRIVATE-UPSTREAM-DETAIL"]) {
    const f = chatFixture({ stream: () => { throw error; } });
    const response = await f.POST(chatRequest());
    assert.equal(await response.text(), genericError);
    assert.deepEqual(f.logs.error, [["[api/chat] upstream error", error]]);
  }
});

test("route: mid-stream upstream failure preserves earlier text and hides the error", async () => {
  const error = new Error("PRIVATE-MIDSTREAM-DETAIL");
  const f = chatFixture({ stream: async function* () {
    yield { type: "content_block_delta", delta: { type: "text_delta", text: "Partial" } };
    throw error;
  } });
  assert.equal(await (await f.POST(chatRequest())).text(), `Partial${genericError}`);
  assert.deepEqual(f.logs.error, [["[api/chat] upstream error", error]]);
});

test("route: missing API key, invalid JSON, empty history and assistant-last stay rejected", async () => {
  assert.equal((await chatFixture({ env: { ANTHROPIC_API_KEY: "" } }).POST(chatRequest())).status, 500);
  const f = chatFixture();
  for (const request of [chatRequest({ raw: "{" }), chatRequest({ body: {} }), chatRequest({ body: { messages: [] } }), chatRequest({ body: { messages: [{ role: "assistant", content: "hi" }] } })]) {
    assert.equal((await f.POST(request)).status, 400);
  }
  assert.equal(f.calls.length, 0);
});

test("route regression: malformed message payloads return JSON 400 instead of throwing", async () => {
  const f = chatFixture();
  for (const body of [null, [], 42, "text", { messages: {} }, { messages: "hi" }, { messages: 1 }]) {
    const response = await f.POST(chatRequest({ body }));
    assert.equal(response.status, 400, JSON.stringify(body));
    assert.equal(typeof (await response.json()).error, "string");
  }
  assert.equal(f.calls.length, 0);
});

test("route: history remains bounded to 20 messages and 4000 characters", async () => {
  const f = chatFixture();
  const messages = [null, { role: "system", content: "ignore me" }, ...Array.from({ length: 22 }, () => ({ role: "user", content: "a".repeat(5000) }))];
  await f.POST(chatRequest({ body: { messages } }));
  assert.equal(f.calls[0].body.messages.length, 20);
  assert.ok(f.calls[0].body.messages.every((message) => message.content.length === 4000));
});

test("route regression: request disconnect is forwarded to the Anthropic stream", async () => {
  const abort = new AbortController();
  const f = chatFixture();
  const response = await f.POST(chatRequest({ signal: abort.signal }));
  await response.text();
  assert.ok(f.calls[0].requestOptions?.signal instanceof AbortSignal, "upstream must receive a cancellation signal");
  abort.abort();
  assert.equal(f.calls[0].requestOptions.signal.aborted, true);
});

test("route regression: cancelling the response or aborting the request releases upstream without enqueue errors", { timeout: 120_000 }, async () => {
  for (const cancelResponse of [true, false]) {
    let finish;
    const finished = new Promise((resolve) => { finish = resolve; });
    const abort = new AbortController();
    const f = chatFixture({ stream: async function* (_body, options) {
      try {
        yield { type: "content_block_delta", delta: { type: "text_delta", text: "First" } };
        await new Promise((_resolve, reject) => {
          options.signal.addEventListener("abort", () => reject(new Error("expected upstream abort")), { once: true });
          if (options.signal.aborted) reject(new Error("expected upstream abort"));
        });
      } finally { finish(); }
    } });
    const response = await f.POST(chatRequest({ signal: abort.signal }));
    assert.ok(f.calls[0].requestOptions?.signal, "upstream must receive a cancellation signal");
    const reader = response.body.getReader();
    assert.equal(new TextDecoder().decode((await reader.read()).value), "First");
    if (cancelResponse) await reader.cancel();
    else abort.abort();
    await finished;
    await new Promise((resolve) => setImmediate(resolve));
    assert.equal(f.calls[0].requestOptions.signal.aborted, true);
    assert.deepEqual(f.logs.error, []);
    assert.equal((await reader.read()).done, true);
    reader.releaseLock();
  }
});

test("route edge: each denial short-circuits later counters and JSON parsing; Retry-After rounds up and clamps", async (t) => {
  t.mock.timers.enable({ apis: ["Date"], now: Date.parse("2026-10-16T12:00:00Z") });
  const names = ["minute", "day", "global"];
  const errors = [
    "You've sent a lot of messages in a short time. Wait a minute and try again.",
    "You've reached today's limit for the concierge. Email Jordan or book time on Calendly instead.",
    "The concierge has reached its daily limit. Email Jordan or book time on Calendly instead.",
  ];
  for (const [index, offset] of [1, -10_000, 2_050].entries()) {
    const calls = [];
    const f = chatFixture({ mocks: { "@/lib/chat-limiter": { getChatLimiters: () => Object.fromEntries(names.map((name, at) => [name, {
      limit: async (key) => { calls.push([name, key]); return { success: at !== index, reset: Date.now() + offset }; },
    }])) } } });
    const response = await f.POST(chatRequest({ raw: "not JSON" }));
    assert.equal(response.status, 429);
    assert.deepEqual(await response.json(), { error: errors[index] });
    assert.equal(response.headers.get("retry-after"), ["1", "1", "3"][index]);
    assert.deepEqual(calls.map(([name]) => name), names.slice(0, index + 1));
    assert.equal(f.calls.length, 0);
  }
});

test("route edge: shared chat copy preserves the exact forbidden and upstream error contract", async () => {
  const f = chatFixture({ stream: () => { throw new Error("DO-NOT-EXPOSE"); } });
  const forbidden = await f.POST(chatRequest({ origin: "https://evil.example" }));
  assert.deepEqual(await forbidden.json(), { error: "This chat only works from jordanhenning.com." });
  assert.equal(await (await f.POST(chatRequest())).text(), genericError);
  assert.equal(f.logs.error.length, 1);
});
