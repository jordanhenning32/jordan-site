import { sourceLoader } from "./load-source.mjs";

export const genericError = "\n\nSorry — the concierge hit a problem reaching the model. Try again in a moment, or use the email or Calendly link.";

export function chatFixture({ env = {}, stream, mocks = {} } = {}) {
  const calls = [];
  const logs = { error: [], warn: [] };
  const logger = {
    error: (...args) => logs.error.push(args),
    warn: (...args) => logs.warn.push(args),
  };
  class Anthropic {
    constructor(options) {
      this.messages = {
        stream: (body, requestOptions) => {
          calls.push({ options, body, requestOptions });
          return stream ? stream(body, requestOptions) : (async function* () {
            yield { type: "content_block_delta", delta: { type: "text_delta", text: "Hello " } };
            yield { type: "content_block_delta", delta: { type: "text_delta", text: "Jordan." } };
          })();
        },
      };
    }
  }
  const load = sourceLoader({
    env: { NODE_ENV: "production", ANTHROPIC_API_KEY: "test-key-no-real-credentials", ...env },
    mocks: { "@anthropic-ai/sdk": Anthropic, "@/lib/system-prompt": { SYSTEM_PROMPT: "test system prompt" }, ...mocks },
    logger,
  });
  return { ...load("src/app/api/chat/route.ts"), load, calls, logs };
}

export function chatRequest({ origin = "https://jordanhenning.com", referer, ip = "203.0.113.7", body = { messages: [{ role: "user", content: "hi" }] }, raw, signal } = {}) {
  const headers = { "Content-Type": "application/json", "x-real-ip": ip };
  if (origin !== null) headers.Origin = origin;
  if (referer) headers.Referer = referer;
  return new Request("http://127.0.0.1/api/chat", {
    method: "POST", headers, body: raw ?? JSON.stringify(body), signal,
  });
}
