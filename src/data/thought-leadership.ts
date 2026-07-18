export type ThoughtPiece = {
  title: string;
  hook: string;
  body: string;
  tags: string[];
};

export const thoughtLeadership: ThoughtPiece[] = [
  {
    title: "The Visionary-Builder Premium in 2026",
    hook: "The bottleneck is no longer the idea. It's the operator who can see the whole product and ship it without flinching.",
    body:
      "Every executive can write a strategy memo. Every engineer can write a function. The compounding leaders right now are the ones who can do both — hold the end-state in their head, write the agent graph that runs the business logic, sit in the customer call that exposes the gap, and then go fix it themselves before lunch. That hybrid wasn't possible a decade ago at any kind of scale; the tooling forced specialization. With multi-agent systems, modern dev environments, and AI-augmented engineering, the visionary builder is finally tractable. Hire for it.",
    tags: ["Vision", "Technical Leadership", "Builder-Executive"],
  },
  {
    title: "What Modeling a Dev Org as Agents Taught Me About Leading Engineers",
    hook: "I built an entire software-engineering organization out of AI agents — and it taught me more about human teams than the reverse.",
    body:
      "My multi-agent dev system separates the work the way a real org does: an architect who plans, a coder who builds, an adversarial tester who never grades their own work, a security reviewer with a hard block, and a senior sign-off before anything ships. Encoding that made the principles undeniable — the author is the worst judge of their own work, independent review isn't bureaucracy, and 'trust' is a gate, not a feeling. Whether the team is agents or engineers, the leader's job is the same: set the structure that makes good work the default and bad work hard to ship.",
    tags: ["Engineering Leadership", "Multi-Agent Systems", "Delivery"],
  },
  {
    title: "Why ‘Done’ in AI Delivery Is an Eval Gate, Not a Vibe",
    hook: "The fastest way to lose trust in an AI system is to ship on ‘looks good to me.’",
    body:
      "When I built my multi-agent dev system, the hardest problem wasn't getting agents to write code — it was defining 'done.' An LLM saying 'this looks correct' isn't evidence; a deterministic verifier that actually runs the tests, builds, and lint is. So shipping is gated on real passing results, plus an independent security review and a senior sign-off. AI teams that redefine 'done' as an objective gate — evals that can actually block a release — ship faster and get trusted; the ones that ship on vibes get audited and shelved. Leading AI delivery is mostly the discipline of building those gates and holding the line.",
    tags: ["AI Delivery", "Evals", "Engineering Leadership"],
  },
  {
    title: "Grounding: Making AI Output You Can Stake a Contract On",
    hook: "A proposal that invents a past-performance citation isn't a shortcut — it's a debarment risk.",
    body:
      "Both of my highest-stakes systems — RFP Factory for federal proposals and a grounded résumé engine — refuse to export anything unless every factual claim traces to a verified source. That single constraint — a groundedness gate at the end of the pipeline, not a disclaimer at the top — is the difference between AI you can put in front of a contracting officer and AI you can only demo. In regulated delivery, hallucination isn't a quality bug; it's a compliance failure. Leading AI delivery means designing for provenance from the first line, not bolting it on after the first embarrassing output.",
    tags: ["Grounding", "Compliance", "Applied AI"],
  },
  {
    title: "Federal-Scale Delivery Lessons for Leading AI Teams",
    hook: "Running IT for 170 offices at 99.9% uptime taught me the part of AI delivery nobody demos: what happens at 3 AM when it breaks.",
    body:
      "The tooling is never the hard problem — standardization, escalation discipline, and honest telemetry are. The same monitoring frameworks, SLA governance, and incident command that unified a nationwide federal footprint translate directly to running production AI: one operational picture across model performance and cost, a team that reads your composure before the runbook, and the discipline to triage by what's reversible. Combat taught me what's worth panicking about; federal-scale delivery taught me how to make 99.9% a habit, not an accident. Both are exactly what a 24/7 AI delivery organization needs.",
    tags: ["AI Operations", "Delivery Leadership", "Veteran Perspective"],
  },
];
