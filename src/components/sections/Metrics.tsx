"use client";
import { motion } from "framer-motion";
import { metrics } from "@/data";
import { Counter } from "@/components/primitives/Counter";
import { Section } from "@/components/primitives/Section";

export function Metrics() {
  return (
    <Section
      id="impact"
      eyebrow="Federal delivery record"
      title="The delivery record, in numbers."
      description="Every number below is from real federal and commercial work — hover or tap any metric for the source."
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="group glass relative overflow-hidden rounded-2xl p-6 transition-colors hover:border-accent/40"
          >
            <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-accent/10 blur-2xl transition-opacity group-hover:bg-accent/20" />
            <div className="text-4xl font-semibold tracking-tight md:text-5xl">
              <span className="gradient-text">
                <Counter
                  value={m.value}
                  decimals={m.decimals ?? 0}
                  prefix={m.prefix ?? ""}
                  suffix={m.suffix ?? ""}
                />
              </span>
            </div>
            <div className="mt-2 text-sm font-medium text-foreground">{m.label}</div>
            <div className="mt-3 text-sm leading-relaxed text-muted">{m.detail}</div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
