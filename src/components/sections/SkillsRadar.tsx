"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { radarSkills, skillMatrix } from "@/data";
import { Section } from "@/components/primitives/Section";
import { cn } from "@/lib/cn";

const SkillsRadarChart = dynamic(() => import("./SkillsRadarChart"), {
  ssr: false,
  loading: () => (
    <div
      className="mx-auto aspect-square w-full max-w-md animate-pulse rounded-full bg-accent/5"
      aria-hidden
    />
  ),
});

export function SkillsRadar() {
  const [active, setActive] = useState(0);
  const [colors, setColors] = useState({
    accent: "rgb(56, 189, 248)",
    accentFill: "rgba(56, 189, 248, 0.18)",
    muted: "rgb(148, 163, 184)",
    grid: "rgba(56, 189, 248, 0.18)",
  });

  useEffect(() => {
    const styles = getComputedStyle(document.documentElement);
    const norm = (raw: string) => raw.trim().replace(/\s+/g, ", ");
    const accentTriplet = norm(styles.getPropertyValue("--accent"));
    const mutedTriplet = norm(styles.getPropertyValue("--muted"));
    setColors({
      accent: `rgb(${accentTriplet})`,
      accentFill: `rgba(${accentTriplet}, 0.18)`,
      muted: `rgb(${mutedTriplet})`,
      grid: `rgba(${accentTriplet}, 0.22)`,
    });
  }, []);

  const labels = radarSkills.map((s) => s.short);
  const values = radarSkills.map((s) => s.score);

  return (
    <Section
      id="skills"
      eyebrow="Competency profile"
      title="Quantified strengths, with proof on demand."
      description="The radar reflects core executive competencies. Click any card to see the receipts — actual outcomes from federal and commercial work."
    >
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_1fr]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7 }}
          className="glass rounded-2xl p-6"
        >
          <div className="mx-auto aspect-square w-full max-w-md">
            <SkillsRadarChart labels={labels} values={values} colors={colors} />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-3">
          {skillMatrix.map((s, i) => {
            const isActive = active === i;
            return (
              <motion.button
                key={s.title}
                onClick={() => setActive(i)}
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className={cn(
                  "glass rounded-2xl p-5 text-left transition-all",
                  isActive
                    ? "border-accent/50 shadow-[0_0_28px_-12px_rgba(56,189,248,0.5)]"
                    : "hover:border-accent/30",
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold tracking-tight md:text-base">
                    {s.title}
                  </div>
                  <div className="font-mono text-xs text-accent">
                    {radarSkills[i]?.score ?? "—"}/100
                  </div>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.summary}</p>
                {isActive && (
                  <motion.ul
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 space-y-2 overflow-hidden border-t border-border/50 pt-4"
                  >
                    {s.proof.map((p) => (
                      <li
                        key={p}
                        className="flex gap-3 text-sm leading-relaxed text-foreground/85"
                      >
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-2" />
                        {p}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
