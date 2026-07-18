"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { profile } from "@/data";
import { cn } from "@/lib/cn";
import { isLikelyJDPaste, track } from "@/lib/analytics";

type Msg = { role: "user" | "assistant"; content: string };

const STARTERS = [
  "Is Jordan a fit for a Head of AI / AI delivery leadership role?",
  "What's the most impressive thing he's built?",
  "How does his federal delivery background strengthen an AI leadership role?",
  "Which resume version should I download?",
];

const INTRO: Msg = {
  role: "assistant",
  content:
    `Hi — I'm a concierge for ${profile.name}'s candidacy. Ask me about his career at SSA and Quadratic Digital, the production AI systems he's shipped, or how his background maps to a role you're hiring for. I can also point you to the right resume version or his Calendly.`,
};

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([INTRO]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || streaming) return;

    const userMsgIndex = messages.filter((m) => m.role === "user").length;
    track.chatbotMessageSent({
      messageLength: trimmed.length,
      messageIndex: userMsgIndex,
    });
    if (isLikelyJDPaste(trimmed)) {
      track.chatbotLikelyJDPaste({ messageLength: trimmed.length });
    }

    const next: Msg[] = [...messages, { role: "user", content: trimmed }];
    setMessages(next);
    setInput("");
    setStreaming(true);

    setMessages((cur) => [...cur, { role: "assistant", content: "" }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      if (!res.body) throw new Error("No response stream.");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setMessages((cur) => {
          const copy = [...cur];
          const last = copy[copy.length - 1];
          if (last && last.role === "assistant") {
            copy[copy.length - 1] = { ...last, content: last.content + chunk };
          }
          return copy;
        });
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Network error.";
      setMessages((cur) => {
        const copy = [...cur];
        const last = copy[copy.length - 1];
        if (last && last.role === "assistant") {
          copy[copy.length - 1] = {
            ...last,
            content:
              last.content +
              `\n\nSorry — couldn't reach the model (${message}). Try ${profile.email} or the Calendly link.`,
          };
        }
        return copy;
      });
    } finally {
      setStreaming(false);
    }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    void send(input);
  }

  return (
    <>
      <button
        onClick={() => {
          setOpen((v) => {
            const next = !v;
            if (next) track.chatbotOpened();
            return next;
          });
        }}
        aria-label={open ? "Close chat" : "Ask about Jordan"}
        className={cn(
          "fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full text-background shadow-[0_8px_40px_-8px_rgba(56,189,248,0.6)] transition-all",
          open
            ? "bg-foreground"
            : "bg-gradient-to-br from-accent to-accent-2 hover:scale-105",
        )}
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <X className="h-6 w-6" />
            </motion.span>
          ) : (
            <motion.span
              key="msg"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <MessageCircle className="h-6 w-6" />
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {!open && (
          <motion.div
            key="cta"
            initial={{ opacity: 0, x: 16, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{
              opacity: 0,
              x: 16,
              scale: 0.92,
              transition: { duration: 0.18, delay: 0 },
            }}
            transition={{ delay: 1.2, duration: 0.45, ease: "easeOut" }}
            className="fixed bottom-7 right-[5.25rem] z-40 hidden max-w-[280px] items-center gap-2 rounded-2xl border border-border/70 bg-background/95 px-4 py-2.5 text-sm leading-snug text-foreground shadow-2xl backdrop-blur-xl md:flex"
          >
            <Sparkles className="h-4 w-4 shrink-0 text-accent" />
            <span>Ask me anything you would like to know about Jordan</span>
            <span
              aria-hidden
              className="absolute right-[-6px] top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 border-r border-t border-border/70 bg-background"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.22 }}
            className="fixed bottom-24 right-4 z-50 flex h-[min(640px,calc(100vh-7rem))] w-[min(420px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-border/70 bg-background/95 backdrop-blur-xl shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-border/60 bg-background-elev/60 px-4 py-3">
              <div className="flex items-center gap-2.5">
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-2 text-background">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm font-semibold leading-none">Ask about Jordan</div>
                  <div className="mt-1 text-xs text-muted">Powered by Claude Sonnet 4.6</div>
                </div>
              </div>
              <span className="rounded-full border border-emerald-400/40 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-widest text-emerald-300">
                Live
              </span>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex",
                    m.role === "user" ? "justify-end" : "justify-start",
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[88%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                      m.role === "user"
                        ? "bg-accent/15 text-foreground border border-accent/30"
                        : "bg-background-elev/70 text-foreground/90 border border-border/60",
                    )}
                  >
                    {m.content || (
                      <span className="inline-flex items-center gap-1.5 text-muted">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent [animation-delay:120ms]" />
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent [animation-delay:240ms]" />
                      </span>
                    )}
                  </div>
                </div>
              ))}

              {messages.length <= 1 && (
                <div className="space-y-2 pt-1">
                  {STARTERS.map((s) => (
                    <button
                      key={s}
                      onClick={() => void send(s)}
                      className="w-full rounded-xl border border-border/60 bg-background-elev/40 px-3 py-2 text-left text-xs text-muted transition-colors hover:border-accent/40 hover:bg-background-elev hover:text-foreground"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <form
              onSubmit={onSubmit}
              className="border-t border-border/60 bg-background-elev/40 p-3"
            >
              <div className="flex items-end gap-2 rounded-xl border border-border/70 bg-background px-3 py-2 focus-within:border-accent/50">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      void send(input);
                    }
                  }}
                  rows={1}
                  placeholder="Ask about Jordan's experience…"
                  className="max-h-32 flex-1 resize-none bg-transparent text-sm text-foreground placeholder:text-muted focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || streaming}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-background transition-opacity disabled:opacity-30"
                  aria-label="Send"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-2 px-1 text-[10px] text-muted">
                Replies grounded in Jordan's resume and SSA highlights. Outside that, the bot will
                point you to him directly.
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
