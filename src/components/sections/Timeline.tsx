"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { timeline } from "@/data";
import { Section } from "@/components/primitives/Section";
import { cn } from "@/lib/cn";

export function Timeline() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section
      id="timeline"
      eyebrow="Career arc"
      title="From one combat tour to AI delivery leadership."
      description="A 25-year arc through the 101st Airborne, federal IT delivery at scale, and now shipping and leading production AI. Click any milestone for the detail."
    >
      <div className="relative">
        <div
          className="pointer-events-none absolute left-[18px] top-2 bottom-2 w-px bg-gradient-to-b from-accent/0 via-accent/40 to-accent-2/30 md:left-[22px]"
          aria-hidden
        />
        <ul className="space-y-4">
          {timeline.map((m, i) => {
            const isOpen = open === i;
            return (
              <li key={i} className="relative pl-12 md:pl-16">
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className={cn(
                    "absolute left-2 top-5 h-4 w-4 rounded-full border-2 md:left-3",
                    isOpen
                      ? "border-accent bg-background shadow-[0_0_0_4px_rgba(56,189,248,0.18)]"
                      : "border-accent/60 bg-background",
                  )}
                />
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.45, delay: i * 0.04 }}
                  className={cn(
                    "glass overflow-hidden rounded-2xl transition-colors",
                    isOpen && "border-accent/40",
                  )}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-start justify-between gap-4 p-5 text-left"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-mono uppercase tracking-widest text-accent">
                        {m.period}
                      </div>
                      <div className="mt-1 text-lg font-semibold tracking-tight md:text-xl">
                        {m.role}
                      </div>
                      <div className="text-sm text-muted">
                        {m.org}
                        {m.location ? ` · ${m.location}` : ""}
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-foreground/90 md:text-base">
                        {m.highlight}
                      </p>
                    </div>
                    <ChevronDown
                      className={cn(
                        "mt-1 h-5 w-5 shrink-0 text-muted transition-transform",
                        isOpen && "rotate-180 text-accent",
                      )}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-border/60 px-5 py-5">
                          <ul className="space-y-2.5 text-sm leading-relaxed text-muted md:text-[0.95rem]">
                            {m.bullets.map((b, j) => (
                              <li key={j} className="flex gap-3">
                                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                                <span className="text-foreground/85">{b}</span>
                              </li>
                            ))}
                          </ul>
                          <div className="mt-5 flex flex-wrap gap-2">
                            {m.tags.map((t) => (
                              <span
                                key={t}
                                className="rounded-full border border-border/70 bg-background-elev/60 px-2.5 py-1 text-xs text-muted"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
