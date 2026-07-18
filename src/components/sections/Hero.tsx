"use client";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Mail } from "lucide-react";
import { profile, portraits } from "@/data";
import { RotatingPortrait } from "@/components/interactive/RotatingPortrait";
import { GithubIcon } from "@/components/primitives/BrandIcons";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28">
      <div className="absolute inset-0 -z-10 subtle-grid" aria-hidden />
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-border/70 bg-background-elev/70 px-3 py-1.5 text-xs font-medium uppercase tracking-widest text-accent"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_rgba(56,189,248,0.8)]" />
            Available for AI engineering & delivery leadership
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl"
          >
            <span className="gradient-text">Mission-critical</span> IT services,
            <br className="hidden md:block" /> delivered at executive scale.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-muted md:text-xl"
          >
            {profile.tagline}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
            >
              <Calendar className="h-4 w-4" />
              Book 15 minutes
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href={profile.resumeDefault}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background-elev/60 px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent/40 hover:bg-background-elev"
            >
              Download resume
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-full px-3 py-3 text-sm text-muted transition-colors hover:text-foreground"
            >
              <Mail className="h-4 w-4" />
              {profile.email}
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background-elev/60 px-3 py-3 text-sm text-muted transition-colors hover:border-accent/40 hover:text-foreground"
            >
              <GithubIcon className="h-4 w-4" />
              GitHub
            </a>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted"
          >
            <span>Public Trust · Reinstatement Eligible</span>
            <span className="text-border">•</span>
            <span>Former FAC-P/PM-IT</span>
            <span className="text-border">•</span>
            <span>SSA Commissioner Award</span>
            <span className="text-border">•</span>
            <span>MBA, Malone</span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative mx-auto w-full max-w-sm"
        >
          <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-accent/15 via-accent/0 to-accent-2/10 blur-2xl" />
          <div className="glass overflow-hidden rounded-3xl">
            <RotatingPortrait portraits={portraits} />
            <div className="border-t border-border/60 bg-background-elev/40 px-5 py-4">
              <div className="text-sm font-semibold text-foreground">{profile.name}</div>
              <div className="text-xs text-muted">
                {profile.title} · {profile.subtitle}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
