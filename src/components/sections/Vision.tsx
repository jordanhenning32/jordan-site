"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Compass, Hammer, GitBranch, Rocket } from "lucide-react";
import { vision } from "@/data";

const TENET_ICONS = [Compass, Hammer, GitBranch, Rocket];

export function Vision() {
  return (
    <section
      id="vision"
      className="relative overflow-hidden border-y border-border/40 py-24 md:py-32"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden
        style={{
          background:
            "radial-gradient(900px 500px at 50% 0%, rgba(99, 165, 230, 0.08), transparent 60%), radial-gradient(700px 400px at 50% 100%, rgba(209, 165, 110, 0.05), transparent 60%)",
        }}
      />
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.5 }}
          className="mb-3 inline-flex items-center gap-2 rounded-full border border-border/70 bg-background-elev/60 px-3 py-1 text-xs font-medium uppercase tracking-[0.22em] text-accent"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          {vision.eyebrow}
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="max-w-4xl text-balance text-3xl font-semibold leading-[1.08] tracking-tight md:text-5xl lg:text-[3.6rem]"
        >
          <span className="gradient-text">{vision.headline}</span>
        </motion.h2>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[1.15fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-5 text-lg leading-relaxed text-foreground/90 md:text-xl md:leading-[1.55]"
          >
            {vision.body.map((p, i) => (
              <p
                key={i}
                className={i === vision.body.length - 1 ? "text-foreground" : undefined}
              >
                {p}
              </p>
            ))}
            <Link
              href="/essays/vision-over-syntax"
              className="group inline-flex items-center gap-1.5 pt-2 text-sm font-medium text-accent transition-colors hover:text-foreground md:text-base"
            >
              Read the full argument
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass relative flex flex-col gap-5 rounded-2xl p-6 md:p-7"
          >
            <div className="absolute left-0 top-6 h-12 w-px bg-gradient-to-b from-accent to-transparent" />
            <div className="text-xs font-mono uppercase tracking-[0.22em] text-accent">
              Operating Tenets
            </div>
            <ul className="space-y-5">
              {vision.tenets.map((t, i) => {
                const Icon = TENET_ICONS[i % TENET_ICONS.length];
                return (
                  <li key={t.title} className="flex gap-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-accent/30 bg-accent/10 text-accent">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-semibold text-foreground">{t.title}</div>
                      <p className="mt-1 text-sm leading-relaxed text-muted">{t.detail}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
