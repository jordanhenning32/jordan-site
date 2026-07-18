"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Cpu, Workflow } from "lucide-react";
import { aiBuilds } from "@/data";
import { Section } from "@/components/primitives/Section";
import { BuildDiagram, rfpFactoryStages, devSystemStages, futuresBotStages } from "@/components/primitives/BuildDiagram";

const ICONS = [Workflow, Cpu];
const DIAGRAMS = [
  { stages: rfpFactoryStages, caption: "Human-checkpointed pipeline · grounded RAG · FAR-compliant · multi-provider" },
  { stages: devSystemStages, caption: "Plan → code → adversarial test → security gate → QA sign-off → deterministic verify" },
  { stages: futuresBotStages, caption: "Market-regime engine · risk-gated order protocol · operator observability" },
];

export function AIBuilds() {
  return (
    <Section
      id="builds"
      eyebrow="Selected builds"
      title="Built these myself. This is the work I lead."
      description="Every system here began as a workflow Jordan had already run — which is the point: what actually makes an AI product work is understanding the process deeply and quickly enough to know what deserves to be automated, where it breaks, and where a human stays in the loop. These are self-directed multi-agent systems he designed, coded, and operates hands-on (RFP Factory runs in production at Quadratic) — the depth behind the leadership. The next role is leading AI delivery as a player-coach: setting the architecture direction, leading the engineering team, and owning the delivery outcome — with the authority that comes from having built and shipped the work himself."
    >
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {aiBuilds.map((b, i) => {
          const Icon = ICONS[i % ICONS.length];
          return (
            <motion.article
              key={b.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className="glass relative flex h-full flex-col gap-5 overflow-hidden rounded-2xl p-6 md:p-7"
            >
              <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-accent/8 blur-3xl" />
              <header className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-accent/40 bg-accent/10 text-accent">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <h3 className="text-xl font-semibold tracking-tight md:text-2xl">{b.name}</h3>
                    <span className="rounded-full border border-emerald-400/40 bg-emerald-400/10 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-widest text-emerald-300">
                      {b.status}
                    </span>
                  </div>
                  <div className="mt-1 text-sm text-accent">{b.tagline}</div>
                </div>
              </header>

              {b.outcome && (
                <div className="rounded-xl border border-accent/30 bg-accent/8 px-4 py-3">
                  <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-accent">
                    Outcome
                  </div>
                  <div className="mt-1 text-base font-semibold tracking-tight text-foreground">
                    {b.outcome}
                  </div>
                </div>
              )}

              <p className="text-sm leading-relaxed text-foreground/85 md:text-[0.95rem]">
                {b.summary}
              </p>

              <ul className="space-y-2 text-sm leading-relaxed text-muted">
                {b.capabilities.map((c) => (
                  <li key={c} className="flex gap-3">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    <span className="text-foreground/85">{c}</span>
                  </li>
                ))}
              </ul>

              {DIAGRAMS[i] && (
                <BuildDiagram
                  stages={DIAGRAMS[i].stages}
                  caption={DIAGRAMS[i].caption}
                />
              )}

              {b.screenshots && b.screenshots.length > 0 && (
                <div>
                  <div className="mb-2 text-[10px] font-mono uppercase tracking-[0.2em] text-accent">
                    Live screenshots · click to enlarge
                  </div>
                  <div
                    className={
                      b.screenshots.length === 1
                        ? "grid grid-cols-1 gap-2"
                        : b.screenshots.length === 2 || b.screenshots.length === 4
                          ? "grid grid-cols-2 gap-2"
                          : "grid grid-cols-2 gap-2 sm:grid-cols-3"
                    }
                  >
                    {b.screenshots.map((s) => (
                      <a
                        key={s.src}
                        href={s.src}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group relative block overflow-hidden rounded-lg border border-border/60 bg-background-elev/40 transition-all hover:border-accent/50 ${
                          b.screenshots!.length === 1 ? "aspect-video" : "aspect-[4/3]"
                        }`}
                        title={s.caption ?? s.alt}
                      >
                        <Image
                          src={s.src}
                          alt={s.alt}
                          fill
                          className="object-cover object-top transition-opacity group-hover:opacity-90"
                          sizes={
                            b.screenshots!.length === 1
                              ? "(max-width: 768px) 100vw, 600px"
                              : "(max-width: 768px) 33vw, 200px"
                          }
                        />
                        {s.caption && (
                          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/95 via-background/70 to-transparent px-2 pb-1.5 pt-3">
                            <div
                              className={`line-clamp-2 leading-tight text-foreground/85 ${
                                b.screenshots!.length === 1
                                  ? "text-[11px]"
                                  : "text-[9px]"
                              }`}
                            >
                              {s.caption}
                            </div>
                          </div>
                        )}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-auto flex flex-wrap gap-1.5 border-t border-border/50 pt-4">
                {b.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-border/70 bg-background-elev/60 px-2.5 py-1 font-mono text-[11px] text-muted"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.article>
          );
        })}
      </div>
    </Section>
  );
}
