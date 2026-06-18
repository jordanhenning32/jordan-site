export type AIBuild = {
  name: string;
  tagline: string;
  status: string;
  outcome?: string;
  summary: string;
  capabilities: string[];
  stack: string[];
  screenshots?: { src: string; alt: string; caption?: string }[];
};

export const aiBuilds: AIBuild[] = [
  {
    name: "RFP Factory",
    tagline: "Multi-agent proposal automation",
    status: "In production · Quadratic Digital",
    outcome: "40h → 2h per proposal · 20× faster",
    summary:
      "An end-to-end system that ingests federal and commercial RFP documents and produces polished, SME-ready proposal drafts. Specialized agents handle research, strategy, drafting, and compliance review in parallel — compressing a 40-hour proposal task into 2 labor hours of human review, a 20× reduction in cycle time, with a human always in the loop on the final pass.",
    capabilities: [
      "Decomposes unstructured RFP packets into structured response workstreams and compliance matrices",
      "Orchestrates research, strategy, drafting, and review agents concurrently",
      "Routes each task to the LLM provider that performs best for it (Anthropic, OpenAI, or Gemini)",
      "Persists project state in a relational store with full audit history for SME review",
    ],
    stack: [
      "Python 3.14",
      "Anthropic + OpenAI + Gemini",
      "SQLAlchemy 2.0",
      "Alembic",
      "NiceGUI",
      "ThreadPoolExecutor",
      "Prompt engineering",
    ],
    screenshots: [
      {
        src: "/img/rfp-factory-pipeline.png",
        alt: "RFP Factory pipeline view showing multiple proposals in flight",
        caption: "Live pipeline · multiple proposals in flight",
      },
      {
        src: "/img/rfp-factory-compliance.png",
        alt: "RFP Factory compliance matrix with 246 auto-extracted requirement items",
        caption: "Compliance matrix · 246 items auto-extracted from RFP packet",
      },
      {
        src: "/img/rfp-factory-gaps.png",
        alt: "RFP Factory gap analysis with framing decisions across 65 gaps",
        caption: "Gap analysis · framing decisions across 65 gaps",
      },
      {
        src: "/img/rfp-factory-cost-review.png",
        alt: "RFP Factory adversarial cost review with critical, major, and minor findings",
        caption: "Adversarial cost review · Gemini Pro + GPT-5.5 in parallel",
      },
    ],
  },
  {
    name: "Futures Bot",
    tagline: "Autonomous multi-agent trading desk",
    status: "Personal R&D · multi-agent trading desk",
    outcome: "Solo-built, end-to-end multi-agent system",
    summary:
      "A multi-agent trading desk that ingests futures market data, generates signals, manages risk, and manages orders autonomously — built end-to-end as a personal R&D platform for pressure-testing multi-agent design patterns under live-market conditions. The signal here is the engineering: specialized agents, hard-coded risk guardrails, and operator-level observability, designed and built solo.",
    capabilities: [
      "Real-time futures market data ingestion and feature engineering",
      "Specialized agents for signal generation, risk management, and order execution",
      "Programmatic order placement with hard-coded risk guardrails",
      "Runs autonomously with operator-level observability",
    ],
    stack: [
      "Python",
      "Multi-agent orchestration",
      "Real-time market data",
      "Algorithmic execution",
      "Risk management",
    ],
    screenshots: [
      {
        src: "/img/tradingbot-cockpit.JPG",
        alt: "Futures Bot live market intent cockpit showing LLM reasoning, confidence scoring, and accuracy tracking",
        caption: "Live LLM intent cockpit · multi-agent reasoning + confidence scoring per setup",
      },
      {
        src: "/img/tradingbot-hypothesis.JPG",
        alt: "Futures Bot hypothesis matrix with bull, range, and bear scenarios and approve/deny governance",
        caption: "Hypothesis matrix · agent-proposed strategies with human approve/deny governance",
      },
      {
        src: "/img/tradingbot-live-desk-view.JPG",
        alt: "Futures Bot live desk view with production telemetry across instruments and trade review inbox",
        caption: "Live desk view · production telemetry across instruments + trade outcome tracking",
      },
      {
        src: "/img/tradingbot.jpg",
        alt: "Futures Bot system analytics dashboard showing equity curve and drawdown observability",
        caption: "System analytics · equity-curve and drawdown observability",
      },
    ],
  },
  {
    name: "Shadow Edge Tools",
    tagline: "NinjaTrader 8 add-on product line",
    status: "In production · shadowedgetools.com",
    outcome: "Designed, built, and sold end-to-end",
    summary:
      "A commercial product line of NinjaTrader 8 trading add-ons (Bracket Boss, Drawdown Guardian, with more in the pipeline) — owned end-to-end: the add-ons themselves, the storefront, checkout, and support. Full solo ownership from code to go-to-market, shipping real software to paying customers.",
    capabilities: [
      "Built and shipped multiple NinjaTrader 8 trading add-ons as commercial products",
      "Designed and launched the storefront, product catalog, and checkout flow",
      "Owns the full go-to-market: pricing, licensing, fulfillment, and customer support",
    ],
    stack: [
      "NinjaTrader 8 (NinjaScript / C#)",
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind 4",
      "Lemon Squeezy",
      "Vercel",
    ],
  },
  {
    name: "Marketing Ops Console",
    tagline: "Multi-agent marketing & CRM automation",
    status: "In production · internal (Shadow Edge Tools)",
    outcome: "Runs a daily marketing loop end-to-end",
    summary:
      "A multi-agent marketing-operations system that runs a daily marketing loop end-to-end: campaign generation, compliance checks, consent-based lead capture, email-nurture queueing, distribution, and analytics reporting — with dry-run safety gates and human approval required before anything goes live. The CRM/marketing counterpart to RFP Factory: agents do the work, a human owns the go/no-go.",
    capabilities: [
      "Orchestrates campaign generation, compliance review, and distribution as agent stages",
      "Consent-based lead capture and email-nurture queueing with audit trails",
      "Analytics import and daily operations reporting",
      "Dry-run-by-default safety gates; nothing publishes without human approval",
    ],
    stack: [
      "Python",
      "Multi-agent orchestration",
      "Marketing automation",
      "CRM / lead capture",
      "Compliance gating",
    ],
  },
];
