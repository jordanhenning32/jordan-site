import { createServer } from "node:http";
import { spawn } from "node:child_process";
import { resolve } from "node:path";

// Only this local upstream sees chat messages; no model credits or real credentials.
let calls = 0;
const pendingStreams = new Set();
const upstream = createServer(async (req, res) => {
  if (req.url === "/calls") {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ calls }));
    return;
  }
  if (req.url === "/finish-stream") {
    for (const finish of pendingStreams) finish();
    pendingStreams.clear();
    res.end("finished");
    return;
  }
  let raw = "";
  for await (const chunk of req) raw += chunk;
  const body = JSON.parse(raw);
  calls++;
  const last = body.messages.at(-1).content;
  if (last === "force upstream failure") {
    res.writeHead(401, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ type: "error", error: { type: "authentication_error", message: "PRIVATE-UPSTREAM-DETAIL" } }));
    return;
  }
  res.writeHead(200, { "Content-Type": "text/event-stream", "Cache-Control": "no-cache" });
  const event = (type, data) => res.write(`event: ${type}\ndata: ${JSON.stringify({ type, ...data })}\n\n`);
  event("message_start", { message: { id: "test-message", type: "message", role: "assistant", model: "claude-sonnet-4-6", content: [], stop_reason: null, stop_sequence: null, usage: { input_tokens: 1, output_tokens: 0 } } });
  event("content_block_start", { index: 0, content_block: { type: "text", text: "" } });
  event("content_block_delta", { index: 0, delta: { type: "text_delta", text: "A streamed " } });
  const finish = () => {
    event("content_block_delta", { index: 0, delta: { type: "text_delta", text: "reply." } });
    event("content_block_stop", { index: 0 });
    event("message_delta", { delta: { stop_reason: "end_turn", stop_sequence: null }, usage: { output_tokens: 2 } });
    event("message_stop", {});
    res.end();
  };
  const timer = last === "slow stream" ? undefined : setTimeout(finish, 30);
  if (last === "slow stream") pendingStreams.add(finish);
  res.on("close", () => {
    clearTimeout(timer);
    pendingStreams.delete(finish);
  });
});

await new Promise((done) => upstream.listen(3211, "127.0.0.1", done));
const development = process.argv.includes("--dev");
const next = spawn(process.execPath, [resolve("node_modules/next/dist/bin/next"), development ? "dev" : "start", "--hostname", "127.0.0.1", "--port", "3210"], {
  cwd: process.cwd(), stdio: "inherit", windowsHide: true,
  env: {
    ...process.env, NODE_ENV: development ? "development" : "production", NEXT_TELEMETRY_DISABLED: "1",
    ANTHROPIC_API_KEY: "test-key-no-real-credentials", ANTHROPIC_BASE_URL: "http://127.0.0.1:3211",
    UPSTASH_REDIS_REST_URL: "", UPSTASH_REDIS_REST_TOKEN: "", KV_REST_API_URL: "", KV_REST_API_TOKEN: "",
    NEXT_PUBLIC_POSTHOG_KEY: "", NEXT_PUBLIC_POSTHOG_HOST: "",
    CHAT_RATE_PER_MINUTE: "10", CHAT_RATE_PER_DAY: "60", CHAT_GLOBAL_PER_DAY: "300",
  },
});
function shutdown() {
  next.kill();
  upstream.close();
}
process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
next.on("exit", (code) => { upstream.close(); process.exitCode = code ?? 0; });
