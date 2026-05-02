"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

export type DiagramStage = {
  label: string;
  detail?: string;
  agents?: readonly string[];
  providers?: readonly string[];
  tone?: "input" | "process" | "loop" | "output";
  loopBack?: boolean;
};

const TONE_STYLES: Record<NonNullable<DiagramStage["tone"]>, string> = {
  input:
    "border-emerald-400/35 bg-emerald-400/8",
  process: "border-border/70 bg-background-elev/60",
  loop: "border-accent-2/40 bg-accent-2/8",
  output:
    "border-accent/40 bg-accent/10",
};

const PROVIDER_STYLES: Record<string, string> = {
  Sonnet: "border-accent/40 bg-accent/10 text-accent",
  Opus: "border-accent/40 bg-accent/10 text-accent",
  Haiku: "border-accent/40 bg-accent/10 text-accent",
  Claude: "border-accent/40 bg-accent/10 text-accent",
  Gemini: "border-amber-400/40 bg-amber-400/10 text-amber-300",
  "Gemini Pro": "border-amber-400/40 bg-amber-400/10 text-amber-300",
  GPT: "border-emerald-400/40 bg-emerald-400/10 text-emerald-300",
  "GPT-5.5": "border-emerald-400/40 bg-emerald-400/10 text-emerald-300",
  OpenAI: "border-emerald-400/40 bg-emerald-400/10 text-emerald-300",
  Python: "border-border/70 bg-background-elev/60 text-muted",
  Deterministic: "border-border/70 bg-background-elev/60 text-muted",
};

function providerClass(p: string) {
  return PROVIDER_STYLES[p] || "border-border/70 bg-background-elev/60 text-muted";
}

export function BuildDiagram({
  stages,
  caption,
  className,
}: {
  stages: DiagramStage[];
  caption?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative rounded-xl border border-border/60 bg-background/40 p-4",
        className,
      )}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-accent">
          Architecture
        </div>
        {caption && (
          <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted">
            {caption}
          </div>
        )}
      </div>

      <div className="relative">
        <div
          className="pointer-events-none absolute left-1/2 top-4 bottom-4 w-px -translate-x-1/2 bg-gradient-to-b from-accent/0 via-accent/35 to-accent/0"
          aria-hidden
        />

        <ol className="relative space-y-2.5">
          {stages.map((s, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
              className={cn(
                "relative rounded-lg border px-3.5 py-2.5 backdrop-blur-sm",
                TONE_STYLES[s.tone ?? "process"],
              )}
            >
              {s.loopBack && (
                <div
                  className="absolute -left-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-accent-2"
                  aria-hidden
                  title="Auto-loop"
                >
                  ↻
                </div>
              )}
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.15em] text-foreground">
                  {s.label}
                </span>
                {s.detail && (
                  <span className="text-[11px] text-muted">{s.detail}</span>
                )}
              </div>
              {s.agents && s.agents.length > 0 && (
                <div className="mt-1.5 text-[11px] leading-snug text-foreground/80">
                  {s.agents.join(" · ")}
                </div>
              )}
              {s.providers && s.providers.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {s.providers.map((p) => (
                    <span
                      key={p}
                      className={cn(
                        "rounded-full border px-1.5 py-0.5 text-[9px] font-mono uppercase tracking-[0.1em]",
                        providerClass(p),
                      )}
                    >
                      {p}
                    </span>
                  ))}
                </div>
              )}
            </motion.li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export const rfpFactoryStages: DiagramStage[] = [
  {
    label: "RFP Upload",
    detail: "PDF · DOCX",
    tone: "input",
  },
  {
    label: "Intake",
    agents: ["compliance_matrix", "validator", "metadata"],
    providers: ["Sonnet", "Haiku"],
  },
  {
    label: "Strategy",
    detail: "Shortfall + gap analysis",
    agents: ["shortfall_strategist"],
    providers: ["Opus"],
  },
  {
    label: "Outline + Team",
    agents: ["outline_agent", "team_composer"],
    providers: ["Sonnet"],
  },
  {
    label: "Cost",
    detail: "Dual-pipeline market research",
    agents: ["market_researcher", "cost_analyst", "cost_reviewer"],
    providers: ["Gemini", "Claude", "GPT-5.5"],
  },
  {
    label: "Draft",
    detail: "Per-section with auto-resolve",
    agents: ["writer_team", "needs_human_resolver"],
    providers: ["Sonnet", "Haiku"],
  },
  {
    label: "Review (auto-loop, cap 4)",
    agents: ["reviewer_a", "reviewer_b"],
    providers: ["Opus", "Gemini"],
    tone: "loop",
    loopBack: true,
  },
  {
    label: "Polish",
    detail: "Cross-section consistency",
    agents: ["final_polish_detector", "final_polish_applier"],
    providers: ["Gemini Pro", "Sonnet"],
  },
  {
    label: "Export DOCX",
    detail: "compile_proposal_to_docx",
    tone: "output",
  },
];

export const futuresBotStages: DiagramStage[] = [
  {
    label: "Market Data",
    detail: "MES · MCL · NinjaTrader feed",
    tone: "input",
  },
  {
    label: "Regime Engine",
    detail: "v3 classifier · transition tracking",
    providers: ["Deterministic"],
  },
  {
    label: "Strategy Scanners",
    detail: "10+ deterministic pattern detectors",
    agents: [
      "Breakout · Retest · ORB",
      "RSI(2) · Liquidity Sweep · BB-RSI",
      "Cup-Handle · BOS Order Block · AVWAP",
    ],
    providers: ["Deterministic"],
  },
  {
    label: "Signal Ranking",
    detail: "zone_guard · ranking",
    providers: ["Python"],
  },
  {
    label: "5-Agent Committee",
    detail: "Two-stage blind debate + synthesis",
    agents: ["Technical Analyst · Bull · Bear · Risk Manager · Devil's Advocate"],
    providers: ["OpenAI", "Claude", "Gemini"],
    tone: "loop",
  },
  {
    label: "Risk Gates",
    detail: "L2 walls · news adjacency · session · 6-tick scratch",
    providers: ["Python"],
  },
  {
    label: "Order Execution",
    detail: "Programmatic SIM/live placement · scaled exits",
    tone: "output",
  },
  {
    label: "Causal Post-Mortem",
    detail: "Every loss → root cause → regime params",
    agents: ["batch_post_mortem · causal classifier"],
    providers: ["Haiku"],
    loopBack: true,
  },
];
