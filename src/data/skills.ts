export const radarSkills = [
  { label: "Global Service Strategy", short: "Service Strategy", score: 96 },
  { label: "Incident & Escalation Mgmt", short: "Incident Mgmt", score: 95 },
  { label: "Federal Acquisition & Compliance", short: "Acquisition", score: 92 },
  { label: "ITIL / SLA Governance", short: "ITIL / SLA", score: 92 },
  { label: "Multi-Agent AI Systems", short: "Multi-Agent AI", score: 92 },
  { label: "Resource & Capacity Planning", short: "Capacity Plan", score: 90 },
  { label: "Executive Stakeholder Engagement", short: "Stakeholder Eng", score: 95 },
] as const;

export type SkillCard = {
  title: string;
  summary: string;
  proof: string[];
};

export const skillMatrix: SkillCard[] = [
  {
    title: "Global Service Strategy",
    summary:
      "Unify fragmented service models across distributed offices into a single delivery framework with shared SLAs, monitoring, and escalation paths.",
    proof: [
      "Standardized service operations across 170 SSA Hearings Offices nationwide",
      "Designed escalation tiers and SLA governance for a 352-person organization",
      "Aligned procurement, vendor management, and lifecycle refresh to mission outcomes",
    ],
  },
  {
    title: "Incident & Escalation Management",
    summary:
      "Reduce mean-time-to-resolution and prevent recurrence through ITIL-driven incident, problem, and root-cause discipline.",
    proof: [
      "Cut downtime 20% through enhanced monitoring frameworks and proactive prevention",
      "Owned executive-level escalation handling for high-volume beneficiary platforms",
      "Implemented dashboards and KPIs that surfaced systemic issues before user impact",
    ],
  },
  {
    title: "ITIL / SLA Governance",
    summary:
      "Operationalize ITIL practices that hold up under audit and deliver predictable customer outcomes.",
    proof: [
      "ITIL-driven continual service improvement across SSA enterprise",
      "Maintained 99.9% availability for mission-critical, regulated platforms",
      "ServiceNow ITSM workflow automation and self-service at enterprise scale",
    ],
  },
  {
    title: "Multi-Agent AI Systems",
    summary:
      "Built two production multi-agent systems himself — fluency receipts, not a continuing identity. The technical depth is what makes the executive role sharper: reads architecture without a translator, judges senior AI hires on instinct, sets delivery strategy that accounts for what the tech can actually do.",
    proof: [
      "Process → agent translation: 17 years running real federal service operations means he can spot the workflows that genuinely benefit from agentification (and the ones that don't), so the systems he ships solve actual bottlenecks",
      "RFP Factory — multi-agent proposal automation: parses RFP documents, orchestrates research/strategy/drafting/review agents in parallel, ships polished SME-ready drafts",
      "Futures Bot — autonomous multi-agent system trading futures markets in real time",
      "Production stack: Python 3.14, multi-provider LLM (Anthropic + OpenAI + Gemini), SQLAlchemy 2.0, Alembic, NiceGUI, ThreadPoolExecutor parallelization, prompt engineering at the agent-system level",
      "Implemented agency-wide BI platform (Tableau + WebFocus) at SSA — same instinct for turning data into decisions, scaled to enterprise",
    ],
  },
  {
    title: "Federal Acquisition & Compliance",
    summary:
      "Federal procurement fluency built across SSA, the State of PA, and Quadratic Digital — knows which vehicle to pursue, which compliance posture to maintain, and which prime relationships unlock specific markets.",
    proof: [
      "FAC-P/PM certified · GSA MAS Schedule, STARS III, 8(a)/SDVOSB/HUBZone, IDIQ/BPA pursuit experience",
      "Two PA Invitation-to-Qualify (ITQ) vehicles obtained at Quadratic · qualified into PA Small Disadvantaged Business program",
      "FedRAMP-certified delivery posture · ATO governance across SSA mission-critical systems and Quadratic Digital programs",
      "Subcontracting Quadratic into Nava on CMS modernization — embedded into a marquee civic-tech federal prime",
    ],
  },
  {
    title: "Resource & Capacity Planning",
    summary:
      "Match staffing, budget, and infrastructure to actual service demand — on-time, under-budget, audit-ready.",
    proof: [
      "Multi-year Agile IT portfolios exceeding $200M delivered consistently within scope",
      "Multimillion-dollar print consolidation generated multi-year savings",
      "Lifecycle infrastructure refresh completed on-time and under-budget",
    ],
  },
  {
    title: "Executive Stakeholder Engagement",
    summary:
      "Translate technical reality into executive narrative — earning trust with CIOs, vendors, and regulators.",
    proof: [
      "CIO-level cross-functional collaboration spanning engineering, security, and policy",
      "Drives executive partnerships with state agencies and federal primes at Quadratic Digital — pairing GTM discipline with multi-agent AI capability",
      "SSA Commissioner Award for COVID-19 emergency document upload delivery",
    ],
  },
];
