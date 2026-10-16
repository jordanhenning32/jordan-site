import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

test("documentation: Upstash setup, either credentials, default caps, fallback and hashed-counter privacy are documented", () => {
  const readme = readFileSync(new URL("../README.md", import.meta.url), "utf8");
  const product = readFileSync(new URL("../PRODUCT.md", import.meta.url), "utf8");
  for (const value of ["Upstash for Redis", "Vercel Marketplace", "UPSTASH_REDIS_REST_URL", "UPSTASH_REDIS_REST_TOKEN", "KV_REST_API_URL", "KV_REST_API_TOKEN", "per-instance memory", "npm test"]) assert.ok(readme.includes(value), value);
  for (const [name, count] of [["CHAT_RATE_PER_MINUTE", 10], ["CHAT_RATE_PER_DAY", 60], ["CHAT_GLOBAL_PER_DAY", 300]]) assert.match(readme, new RegExp(`${name}[^\\n]+\\| ${count} \\|`));
  assert.match(product, /daily-rotating hash of the IP \(never the IP itself\).*expire within 24 hours/);
});

test("test setup: Playwright configuration preserves the inherited browser environment", () => {
  const script = `
    import assert from 'node:assert/strict';
    const before = process.env.PLAYWRIGHT_BROWSERS_PATH;
    await import('./playwright.config.ts');
    assert.equal(process.env.PLAYWRIGHT_BROWSERS_PATH, before,
      'test configuration must not redirect the inherited browser environment');
  `;
  const child = spawnSync(process.execPath, ["--experimental-strip-types", "--input-type=module", "-e", script], {
    encoding: "utf8", timeout: 30_000,
  });
  assert.equal(child.status, 0, child.stderr || child.error?.message);
});
