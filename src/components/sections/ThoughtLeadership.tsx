"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { thoughtLeadership, playbook, essayBySlug } from "@/data";
import { Section } from "@/components/primitives/Section";
import { FeaturedWork } from "@/components/primitives/FeaturedWork";
import { cn } from "@/lib/cn";

const visionEssay = essayBySlug("vision-over-syntax");

export function ThoughtLeadership() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section
      id="thoughts"
      eyebrow="Insights"
      title="Perspectives shaping the next era of IT services."
      description="Short, opinionated takes on leading AI delivery — how modern teams ship production agentic systems that are grounded, gated, and trusted. Start with the featured long-form pieces below — or click into any short take."
    >
      <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <FeaturedWork
          href="/playbook"
          eyebrow="Featured · Playbook"
          title={playbook.title}
          subtitle={playbook.subtitle}
          hook={playbook.hook}
          ctaText="Read the full playbook"
        />
        {visionEssay && (
          <FeaturedWork
            href={`/essays/${visionEssay.slug}`}
            eyebrow="Featured · Essay"
            title={visionEssay.title}
            subtitle={visionEssay.subtitle}
            hook={visionEssay.intro[0]}
            ctaText="Read the essay"
            delay={0.08}
          />
        )}
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {thoughtLeadership.map((t, i) => {
          const isOpen = open === i;
          return (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className={cn(
                "glass overflow-hidden rounded-2xl transition-colors",
                isOpen && "border-accent/40",
              )}
            >
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-start justify-between gap-4 p-6 text-left"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap gap-2 text-xs font-mono uppercase tracking-widest text-accent">
                    {t.tags.map((tag) => (
                      <span key={tag}>#{tag.replace(/\s+/g, "")}</span>
                    ))}
                  </div>
                  <h3 className="mt-3 text-lg font-semibold tracking-tight md:text-xl">
                    {t.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/85 md:text-[0.95rem]">
                    {t.hook}
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
                    <div className="border-t border-border/60 px-6 pb-6 pt-5">
                      <p className="text-sm leading-relaxed text-muted md:text-[0.95rem]">
                        {t.body}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
