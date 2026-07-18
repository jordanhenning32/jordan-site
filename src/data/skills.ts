// radarSkills and skillMatrix are INDEX-ALIGNED — the card at index i renders
// radarSkills[i].score. Keep the two arrays in the same order and length.
export const radarSkills = [
  { label: "Multi-Agent AI Systems", short: "Multi-Agent AI", score: 95 },
  { label: "AI Delivery Leadership", short: "AI Delivery", score: 94 },
  { label: "Global Service Strategy", short: "Service Strategy", score: 96 },
  { label: "Executive Stakeholder Engagement", short: "Stakeholder Eng", score: 95 },
  { label: "Incident & Escalation Mgmt", short: "Incident Mgmt", score: 95 },
  { label: "Federal Acquisition & Compliance", short: "Acquisition", score: 92 },
  { label: "ITIL / SLA Governance", short: "ITIL / SLA", score: 92 },
  { label: "Resource & Capacity Planning", short: "Capacity Plan", score: 90 },
] as const;

export type SkillCard = {
  title: string;
  summary: string;
  proof: string[];
};

export const skillMatrix: SkillCard[] = [
  {
    title: "Multi-Agent AI Systems",
    summary:
      "Designs, builds, and operates production multi-agent AI systems himself — and leads the delivery of them. Architects multi-provider LLM orchestration, RAG, agent role-separation, and review/eval gates, then directs the work: reads the architecture, reviews the code, and knows what to ask of the engineers because he has shipped it. The hands-on depth is what makes him able to lead AI teams, not just sponsor them.",
    proof: [
      "Five production multi-agent systems designed, coded, and operated hands-on — a dev system, federal proposal automation, a trading desk, marketing automation, and a grounded résumé engine",
      "RFP Factory — parses RFP documents, orchestrates research/strategy/drafting/review agents in parallel, ships polished SME-ready drafts (40h → 2h)",
      "Multi-provider routing (Anthropic + OpenAI + Google + xAI), RAG, deterministic eval/verification gates, prompt engineering at the agent-system level",
      "Process → agent translation: 17 years running real operations means he agentifies the workflows that genuinely benefit — not demos",
    ],
  },
  {
    title: "AI Delivery Leadership",
    summary:
      "Leads the teams and pipelines that ship production agentic systems — architecture direction, eval and review gates, and delivery governance — with the hands-on depth to judge the work, not just approve it.",
    proof: [
      "Encoded a full engineering org as agents — architect, coder, adversarial tester, security reviewer, senior QA sign-off — with deterministic verification before code ships",
      "Runs AI delivery the way a real org ships: separation of duties, independent review, a security gate, and 'done' defined as an eval gate, not a vibe",
      "Federal-scale delivery discipline (99.9% uptime, 170 offices) applied to production AI — reliability, cost, and safety as first-class concerns",
    ],
  },
  {
    title: "Global Service Strategy",
    summary:
      "Unify fragmented service models across distributed offices into a single delivery framework with shared SLAs, monitoring, and escalation paths.",
    proof: [
      "Standardized service operations across 170 SSA Hearings Offices nationwide",
      "Designed escalation tiers and SLA governance for a 340-technician field IT operation across 170 offices (12 direct reports)",
      "Aligned procurement, vendor management, and lifecycle refresh to mission outcomes",
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
    title: "Federal Acquisition & Compliance",
    summary:
      "Federal procurement fluency built across SSA, the State of PA, and Quadratic Digital — knows which vehicle to pursue, which compliance posture to maintain, and which prime relationships unlock specific markets.",
    proof: [
      "Former FAC-P/PM-IT · GSA MAS Schedule, STARS III, 8(a)/SDVOSB/HUBZone, IDIQ/BPA pursuit experience",
      "Two PA Invitation-to-Qualify (ITQ) vehicles obtained at Quadratic · qualified into PA Small Disadvantaged Business program",
      "FedRAMP-aligned delivery posture · ATO governance across SSA mission-critical systems and Quadratic Digital programs",
      "Subcontracting Quadratic into Nava on CMS modernization — embedded into a marquee civic-tech federal prime",
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
    title: "Resource & Capacity Planning",
    summary:
      "Match staffing, budget, and infrastructure to actual service demand — on-time, under-budget, audit-ready.",
    proof: [
      "$200M+ in IT projects delivered cumulatively over a 5-year IT PM tenure, consistently within scope",
      "Multimillion-dollar print consolidation generated multi-year savings",
      "Lifecycle infrastructure refresh completed on-time and under-budget",
    ],
  },
];
