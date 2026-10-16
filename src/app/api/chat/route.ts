import Anthropic from "@anthropic-ai/sdk";
import { SYSTEM_PROMPT } from "@/lib/system-prompt";
import { chatCopy } from "@/data/chat";
import { allowedHosts, clientIp, ipKey, isOriginAllowed } from "@/lib/chat-guard";
import { getChatLimiters } from "@/lib/chat-limiter";

export const runtime = "nodejs";
export const maxDuration = 60;

type IncomingMessage = { role: "user" | "assistant"; content: string };

const MODEL = "claude-sonnet-4-6";

function json(status: number, body: unknown, extraHeaders?: Record<string, string>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...extraHeaders },
  });
}

function retryAfter(resetMs: number) {
  return { "Retry-After": String(Math.max(1, Math.ceil((resetMs - Date.now()) / 1000))) };
}

export async function POST(req: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return json(500, { error: "ANTHROPIC_API_KEY is not configured." });
  }

  const hosts = allowedHosts(process.env);
  if (!isOriginAllowed(req.headers.get("origin"), req.headers.get("referer"), hosts)) {
    return json(403, { error: chatCopy.forbidden });
  }

  // Checked before the body is parsed so abusive callers never reach Anthropic.
  const { minute, day, global } = getChatLimiters();
  const key = ipKey(clientIp(req.headers));
  const m = await minute.limit(key);
  if (!m.success) {
    return json(429, { error: chatCopy.minuteLimit }, retryAfter(m.reset));
  }
  const d = await day.limit(key);
  if (!d.success) {
    return json(429, { error: chatCopy.dailyLimit }, retryAfter(d.reset));
  }
  const g = await global.limit("global");
  if (!g.success) {
    return json(429, { error: chatCopy.globalLimit }, retryAfter(g.reset));
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return json(400, { error: "Invalid JSON body." });
  }

  const incoming = body && typeof body === "object" && "messages" in body ? body.messages : undefined;
  if (incoming !== undefined && !Array.isArray(incoming)) {
    return json(400, { error: "Last message must be from user." });
  }
  const messages = ((incoming ?? []) as IncomingMessage[])
    .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .slice(-20)
    .map((m) => ({
      role: m.role,
      content: m.content.slice(0, 4000),
    }));

  if (messages.length === 0 || messages[messages.length - 1].role !== "user") {
    return json(400, { error: "Last message must be from user." });
  }

  const client = new Anthropic({ apiKey });
  const encoder = new TextEncoder();
  const upstreamAbort = new AbortController();
  const signal = AbortSignal.any([req.signal, upstreamAbort.signal]);
  let cancelled = false;

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const response = await client.messages.stream({
          model: MODEL,
          max_tokens: 800,
          system: [
            {
              type: "text",
              text: SYSTEM_PROMPT,
              cache_control: { type: "ephemeral" },
            },
          ],
          messages,
        }, { signal });

        for await (const event of response) {
          if (signal.aborted) break;
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        if (!cancelled) controller.close();
      } catch (err) {
        if (signal.aborted) {
          if (!cancelled) controller.close();
          return;
        }
        // Upstream detail stays in the server log; the client only gets a generic sentence.
        console.error("[api/chat] upstream error", err);
        controller.enqueue(encoder.encode(`\n\n${chatCopy.upstreamError}`));
        controller.close();
      }
    },
    cancel() {
      cancelled = true;
      upstreamAbort.abort();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Accel-Buffering": "no",
    },
  });
}
