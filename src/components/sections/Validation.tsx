"use client";
import { motion } from "framer-motion";
import {
  Award as AwardIcon,
  Star,
  Heart,
  BadgeCheck,
  ShieldCheck,
  Users,
  GraduationCap,
  UserCheck,
} from "lucide-react";
import { awards, teamOutcomes, referencesAvailable, type Award } from "@/data";
import { Section } from "@/components/primitives/Section";

const ICON_MAP: Record<Award["icon"], React.ElementType> = {
  award: AwardIcon,
  star: Star,
  heart: Heart,
  badge: BadgeCheck,
  shield: ShieldCheck,
};

const OUTCOME_ICONS = [Users, GraduationCap];

export function Validation() {
  return (
    <Section
      id="validation"
      eyebrow="Third-party signal"
      title="Awards, retention, references — the parts I can't self-assert."
      description="Recognitions issued by institutions. Outcomes measured by the teams I led. References available after the first conversation."
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {awards.map((a, i) => {
          const Icon = ICON_MAP[a.icon];
          const accentClass =
            a.icon === "heart" || a.icon === "star"
              ? "border-accent-2/40 bg-accent-2/10 text-accent-2"
              : "border-accent/40 bg-accent/10 text-accent";
          return (
            <motion.article
              key={a.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="glass relative flex h-full flex-col gap-3 overflow-hidden rounded-2xl p-5"
            >
              <div className="flex items-start justify-between">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl border ${accentClass}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
                  {a.year}
                </span>
              </div>
              <div>
                <h3 className="text-base font-semibold tracking-tight text-foreground">
                  {a.title}
                </h3>
                <div className="mt-0.5 text-xs text-accent">{a.issuer}</div>
              </div>
              <p className="mt-auto text-sm leading-relaxed text-muted">{a.detail}</p>
            </motion.article>
          );
        })}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1fr_1.1fr]">
        {teamOutcomes.map((o, i) => {
          const Icon = OUTCOME_ICONS[i % OUTCOME_ICONS.length];
          return (
            <motion.div
              key={o.label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="glass relative overflow-hidden rounded-2xl p-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-accent/40 bg-accent/10 text-accent">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
                  Team outcome
                </span>
              </div>
              <div className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
                <span className="gradient-text tabular-nums">{o.stat}</span>
              </div>
              <div className="mt-1 text-sm font-medium text-foreground">{o.label}</div>
              <p className="mt-3 text-sm leading-relaxed text-muted">{o.detail}</p>
            </motion.div>
          );
        })}

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.5, delay: 0.18 }}
          className="glass relative flex flex-col overflow-hidden rounded-2xl p-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-accent/40 bg-accent/10 text-accent">
              <UserCheck className="h-5 w-5" />
            </div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
              References
            </span>
          </div>
          <div className="mt-4 text-base font-semibold tracking-tight text-foreground">
            Available after first conversation
          </div>
          <p className="mt-2 text-xs text-muted">{referencesAvailable.note}</p>
          <ul className="mt-4 space-y-2 text-sm">
            {referencesAvailable.breakdown.map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-foreground/85">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </Section>
  );
}
