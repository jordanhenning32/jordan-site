"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";

export function FeaturedWork({
  href,
  eyebrow,
  title,
  subtitle,
  hook,
  ctaText,
  delay = 0,
}: {
  href: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  hook: string;
  ctaText: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.55, delay }}
    >
      <Link
        href={href}
        className="group glass relative flex h-full flex-col overflow-hidden rounded-2xl p-6 transition-all hover:border-accent/50 hover:shadow-[0_0_36px_-12px_rgba(99,165,230,0.45)] md:p-8"
      >
        <div
          className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-accent/12 blur-3xl transition-opacity group-hover:bg-accent/20"
          aria-hidden
        />
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.22em] text-accent">
            <Sparkles className="h-3 w-3" />
            {eyebrow}
          </div>
          <ArrowUpRight className="h-5 w-5 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
        </div>

        <h3 className="mt-5 text-xl font-semibold tracking-tight md:text-2xl">{title}</h3>
        {subtitle && (
          <p className="mt-1.5 text-sm text-foreground/80 md:text-base">{subtitle}</p>
        )}

        <p className="mt-4 flex-1 text-sm leading-relaxed text-muted md:text-[0.95rem]">
          {hook}
        </p>

        <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-accent">
          {ctaText}
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>
      </Link>
    </motion.div>
  );
}
