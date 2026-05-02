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
    tagline: "Autonomous multi-agent futures trading",
    status: "Live since Feb 2026 · 24/5 · 62% win rate over ~500 trades",
    outcome: "62% win rate · ~500 trades · net-positive PnL",
    summary:
      "A multi-agent trading system that monitors futures markets, generates signals, manages risk, and executes trades autonomously 24/5 — using proprietary strategies developed from 12 years of personal markets research. Live since February 2026: ~8 trades per day across the 24-hour cycle, 62% win rate over the first ~500 trades, net-positive PnL. Built end-to-end as a research platform for pressure-testing multi-agent design patterns under conditions where mistakes cost real money — the same composure-under-fire discipline that runs a service desk runs a trading desk.",
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
        alt: "Futures Bot system analytics dashboard showing equity curve, win rate, trade count, and drawdown",
        caption: "Performance analytics · 503 trades · 62% win · drawdown-controlled equity curve",
      },
    ],
  },
];
