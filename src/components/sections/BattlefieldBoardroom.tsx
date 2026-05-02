"use client";
import { motion } from "framer-motion";
import { Shield, Server } from "lucide-react";
import { battlefieldToBoardroom } from "@/data";
import { Section } from "@/components/primitives/Section";

export function BattlefieldBoardroom() {
  return (
    <Section
      id="bridge"
      eyebrow="Battlefield to Boardroom"
      title="The leadership the rest of the field can't replicate."
      description="Three combat tours with the 101st Airborne — Bronze Star, Purple Heart — translated directly into how I run incident command, scale service organizations, and show up for customers under pressure."
    >
      <div className="space-y-3">
        {battlefieldToBoardroom.map((row, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="glass grid grid-cols-1 overflow-hidden rounded-2xl md:grid-cols-[1fr_auto_1fr]"
          >
            <div className="flex gap-4 p-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-accent-2/40 bg-accent-2/10 text-accent-2">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-accent-2">
                  Military
                </div>
                <div className="mt-1 text-base font-semibold tracking-tight md:text-lg">
                  {row.military.title}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted">{row.military.detail}</p>
              </div>
            </div>

            <div className="hidden items-center justify-center px-2 md:flex">
              <div className="h-full w-px bg-gradient-to-b from-transparent via-border to-transparent" />
            </div>

            <div className="flex gap-4 border-t border-border/60 p-6 md:border-l md:border-t-0">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-accent/40 bg-accent/10 text-accent">
                <Server className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-accent">
                  IT Services Delivery
                </div>
                <div className="mt-1 text-base font-semibold tracking-tight md:text-lg">
                  {row.it.title}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted">{row.it.detail}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4"
      >
        {[
          { k: "3", v: "Combat tours" },
          { k: "★", v: "Bronze Star" },
          { k: "♥", v: "Purple Heart" },
          { k: "101st", v: "Airborne Division" },
        ].map((b) => (
          <div key={b.v} className="glass rounded-xl p-4 text-center">
            <div className="text-2xl font-semibold text-accent-2">{b.k}</div>
            <div className="mt-1 text-xs uppercase tracking-widest text-muted">{b.v}</div>
          </div>
        ))}
      </motion.div>
    </Section>
  );
}
