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
    name: "Multi-Agent Dev System",
    tagline: "An entire software-engineering org, modeled as agents",
    status: "In production · builds the systems on this page",
    outcome: "The engineered process behind every other system here",
    summary:
      "A pipeline that models a whole dev organization as role-separated AI agents — architect, coder, adversarial tester, bug-fixer, a security reviewer, and a senior QA sign-off — with deterministic verification before any code ships. It encodes how a real engineering team ships safe, quality software: separation of duties, independent review, security and QA gates, and proof-before-done. This is the opposite of 'vibe coding' — it's the engineered process that makes AI-built code trustworthy, and it built the other systems on this page.",
    capabilities: [
      "Role-separated agents with independent adversarial review — no agent grades its own work",
      "A security gate (BLOCK/CLEAN) and a senior QA sign-off (APPROVE/BLOCK) before anything ships",
      "A deterministic verifier runs the real tests/builds/lint — 'looks good' from an LLM is never enough",
      "Multi-provider routing (Claude plans and reviews, GPT-5.5 codes) with institutional-memory lessons carried across runs",
    ],
    stack: [
      "Python",
      "Claude (Opus / Sonnet)",
      "GPT-5.5 / Codex CLI",
      "Multi-agent orchestration",
      "Deterministic verification",
      "MCP",
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
    name: "Résumé Engine",
    tagline: "Grounded multi-agent resume & cover-letter system",
    status: "Personal · production",
    outcome: "Every claim traced to a verified fact before export",
    summary:
      "A 20-agent system that writes job-tailored resumes and cover letters grounded in a knowledge base of real experience — with a hard groundedness gate that blocks export unless every claim traces to a verified fact, plus ATS/recruiter simulation and dual-model QC. Built to make AI-written application material trustworthy, not hallucinated.",
    capabilities: [
      "Groundedness verifier — a blocking gate: no export until every claim maps to a knowledge-base fact",
      "ATS + recruiter simulation and knockout detection before drafting",
      "Independent dual-model QC (Claude + Grok) with a consolidator",
      "pgvector retrieval over a personal knowledge base; per-role multi-provider routing",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Postgres + pgvector",
      "Anthropic + Google + xAI",
      "Vercel AI SDK",
    ],
    screenshots: [
      {
        src: "/img/resume-talos-dashboard.png",
        alt: "Résumé Engine dashboard showing the 10-step quality-gated pipeline and knowledge-base fact count",
        caption: "Dashboard · 10-step quality-gated pipeline + live KB fact count",
      },
      {
        src: "/img/resume-talos-screening.png",
        alt: "AI screening coverage with keyword and semantic ATS scores and a simulated recruiter-triage verdict",
        caption: "AI screening · keyword + semantic ATS scores and a recruiter-triage verdict",
      },
      {
        src: "/img/resume-talos-knowledge-base.png",
        alt: "Knowledge base of grounded professional history — documents, chunks, and extracted facts",
        caption: "Knowledge base · grounded history every claim traces back to",
      },
      {
        src: "/img/resume-talos-templates.png",
        alt: "Export template picker with three ATS-aware résumé layouts, each producing DOCX and PDF",
        caption: "Export · three ATS-aware layouts, each producing DOCX + PDF",
      },
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
    screenshots: [
      {
        src: "/img/marketing-ops-daily.png",
        alt: "Daily Ops control panel — one-click actions where AI does the work and a human approves",
        caption: "Daily Ops · the AI control panel that runs the marketing loop",
      },
      {
        src: "/img/marketing-ops-content.png",
        alt: "Content Multiplier — drop a long-form video to auto-transcribe, cut Shorts, and prep multi-platform distribution",
        caption: "Content Multiplier · one long video → shorts, clips, and multi-platform drafts",
      },
      {
        src: "/img/marketing-ops-distribution.png",
        alt: "Distribution kit from one run — X thread, blog post, email, Reddit and LinkedIn drafts plus clips",
        caption: "Distribution kit · X, blog, email, Reddit, LinkedIn drafts + clips from one run",
      },
      {
        src: "/img/marketing-ops-listening.png",
        alt: "Listening Radar — finds risk-management conversations, scores them, and drafts value-first replies for review",
        caption: "Listening Radar · drafts value-first replies for human review — never auto-posts",
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
];
