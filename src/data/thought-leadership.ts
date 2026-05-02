export type ThoughtPiece = {
  title: string;
  hook: string;
  body: string;
  tags: string[];
};

export const thoughtLeadership: ThoughtPiece[] = [
  {
    title: "ITIL in the Age of HPC and AI",
    hook: "Most ITIL implementations weren't designed for GPU clusters that cost more per hour than a small office.",
    body:
      "ITIL's core disciplines — incident, problem, change, and capacity management — still matter at HPC and AI scale, but the failure modes have shifted. A failed CI run on a 1,024-GPU job is a different kind of incident than a Tier-1 ticket. The next generation of service governance has to stitch together model performance telemetry, GPU utilization, and traditional ITSM workflows into a single operational picture. The orgs that get this right will have an unfair cost advantage; the ones that don't will burn millions on idle silicon.",
    tags: ["ITIL", "HPC", "AI Operations"],
  },
  {
    title: "Scaling Mission-Critical Services from 170 Offices to Global Deployments",
    hook: "What changes when you go from 170 offices to global isn't the playbook — it's the latency and the regulators.",
    body:
      "Centralizing service operations across 170 SSA Hearings Offices taught me that the hard problem is never tooling — it's standardization. The same monitoring framework, escalation tiering, and SLA discipline that unified a nationwide footprint translates directly to globally-distributed HPC and AI service delivery. The differences are timezone-aware on-call rotation, jurisdictional data residency, and a deeper investment in self-service so customers don't wait for a follow-the-sun handoff.",
    tags: ["Service Delivery", "Standardization", "Scale"],
  },
  {
    title: "Veteran Lessons for 24/7 AI Service Delivery",
    hook: "Combat doesn't teach you to panic less. It teaches you what's worth panicking about.",
    body:
      "When a P1 fires at 3 AM and the customer is on the call, the team you've built reads your composure first and the runbook second. Military service taught me to triage by what's reversible and what isn't, to delegate before I'm overwhelmed, and to keep talking even when the picture is incomplete. Those habits are exactly what a 24/7 AI service organization needs — because the cost of a frozen incident commander scales with the cost of the platform.",
    tags: ["Leadership", "Incident Command", "Veteran Perspective"],
  },
  {
    title: "The Visionary-Builder Premium in 2026",
    hook: "The bottleneck is no longer the idea. It's the operator who can see the whole product and ship it without flinching.",
    body:
      "Every executive can write a strategy memo. Every engineer can write a function. The compounding leaders right now are the ones who can do both — hold the end-state in their head, write the agent graph that runs the business logic, sit in the customer call that exposes the gap, and then go fix it themselves before lunch. That hybrid wasn't possible a decade ago at any kind of scale; the tooling forced specialization. With multi-agent systems, modern dev environments, and AI-augmented engineering, the visionary builder is finally tractable. Hire for it.",
    tags: ["Vision", "Technical Leadership", "Builder-Executive"],
  },
  {
    title: "Why Service Revenue Beats License Revenue at AI Scale",
    hook: "Customers don't buy AI capability — they buy outcomes wrapped in a managed service.",
    body:
      "Enterprise customers don't want a model API; they want guaranteed throughput, compliance posture, and a human accountable when something breaks. The companies winning the AI service market are pricing on outcomes, attaching managed services aggressively, and treating their delivery org as a profit center — not a cost.",
    tags: ["Growth Strategy", "Service Revenue", "AI GTM"],
  },
];
