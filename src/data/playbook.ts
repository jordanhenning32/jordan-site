export type PlaybookItem = { heading: string; body: string };
export type PlaybookPhase = {
  id: string;
  range: string;
  tagline: string;
  items: PlaybookItem[];
  output: string;
};

export const playbook = {
  slug: "playbook",
  eyebrow: "Playbook",
  title: "The First 90 Days",
  subtitle: "How I'd Run a New VP of Federal Services Delivery Role",
  hook:
    "The real risk in a new senior role isn't moving too slow, it's moving fast on the wrong things. The first 90 days are about earning the standing to make the decisions that matter, then making them. Here's how I'd structure it.",
  premise: {
    title: "Operating premise",
    lead: "Listen more than I speak; then ship visible wins on the things I'm certain about.",
    body:
      "I've been the new leader walking into a federal IT branch, and I've been a new growth officer at a commercial firm. Both lessons were the same: the org watches what you decide, but it remembers what you ship. Decide carefully in the first 30 days. Ship visibly by Day 90.",
  },
  phases: [
    {
      id: "phase-1",
      range: "Days 1–30",
      tagline: "Listen, see, map",
      items: [
        {
          heading: "Federal customer + agency stakeholder listening tour.",
          body:
            "Direct conversations with the top ten federal program POCs and the five most recently escalated agency cases. I want the gap, in their words, between what we said we'd deliver and what they actually experienced. Federal customers don't churn quietly — they go silent first, then we lose the recompete. The contracting officer who can save your next contract is the contracting officer who's already taken your call.",
        },
        {
          heading: "Internal listening tour.",
          body:
            "My direct reports first, then every layer below. By Day 30 I've heard from a named individual in every region, every shift, every team. Three questions: What's working? What's broken? What would you fix tomorrow if you had the authority?",
        },
        {
          heading: "Operational baseline.",
          body:
            "I pull the SLA and KPI data myself before I trust the dashboards. Three checks: the metric is measuring what we think it's measuring, the data feeding it is clean, and the variance is explained, not smoothed. The gap between reported uptime and felt uptime is where service organizations die, I learned that at SSA, and I'll never trust a green dashboard again without verifying the methodology.",
        },
        {
          heading: "Capture pipeline + vehicle audit.",
          body:
            "I pull the full BD pipeline myself by Day 14: active proposals, upcoming recompetes (mine and adjacent), pursue/no-pursue calls in the next 90 days, and the contract vehicles we're on (GSA MAS, OASIS+, STARS III, agency-specific BPAs). Two questions I'm answering: are we on the right vehicles for the work we actually want, and are we losing recompetes we should be winning? Compliance posture (FedRAMP, ATO, CMMC where applicable) gets the same audit treatment — expiring controls are quiet revenue killers.",
        },
        {
          heading: "Process inventory.",
          body:
            "Every recurring workflow the team owns, sized by hours, cost, and customer impact. This is where the agent thesis starts to take shape: which workflows are still SOPs because no one has pushed back?",
        },
        {
          heading: "Cultural read.",
          body:
            "What does the team think we do? What does the customer think we do? The delta is the work.",
        },
      ],
      output:
        "Day 30 memo to the CEO. Current state of service delivery, capture pipeline, and compliance posture. Top three risks, top five opportunities, and one decision I need from leadership.",
    },
    {
      id: "phase-2",
      range: "Days 31–60",
      tagline: "Triage, decide, stage",
      items: [
        {
          heading: "Pick three.",
          body:
            "Three initiatives that move the needle this quarter and next. Everything else goes to a parking lot or a delegated owner. The discipline isn't picking three good things, it's saying “not now” to ten others.",
        },
        {
          heading: "Make the unblocking hire.",
          body:
            "The single role whose absence is dragging the org. Not a reorg, one hire that unlocks two layers of work.",
        },
        {
          heading: "Deploy the agent thesis.",
          body:
            "By Day 60 I want one agent automation piloted on a workflow we already do, compressing labor hours, not eliminating headcount. The pilot is small, observable, and has a clean kill-switch. This is where the technical fluency earns its keep: I can scope, sponsor, and unblock the build without a translator. I won't be writing the production code; I'll be the executive who knows immediately whether the team's plan is sound.",
        },
        {
          heading: "Customer-facing rhythm starts.",
          body:
            "Every top-ten federal program POC has had a face-to-face (or video) with me at least once. Their named Account Executive or Program Manager knows I'm the escalation point if the program is at risk. The agency-side stakeholder relationships get the same treatment — federal services is a relationship business, and the calls you've already taken are the recompetes you're going to win.",
        },
        {
          heading: "Reorganize only where unambiguous.",
          body:
            "Don't reshuffle in the dark. If a team is structurally wrong and I'm certain, fix it. Otherwise wait, the cost of a wrong reorg compounds for two quarters.",
        },
      ],
      output:
        "Day 60 quarterly plan. Three commitments, three explicit “we are not fixing this right now” items, and the agent hire that makes the next 90 days possible.",
    },
    {
      id: "phase-3",
      range: "Days 61–90",
      tagline: "Ship, stand up, set the pace",
      items: [
        {
          heading: "One visible win.",
          body:
            "A program save, a recompete momentum shift, a recurring incident eliminated, a contract-vehicle move in our direction, a process compressed from a week to a day. Federal services rewards visible operational wins, not vision speeches. Shipping confirms the operating cadence.",
        },
        {
          heading: "Repeatable rhythm in place.",
          body:
            "Weekly KPI review, monthly customer review, quarterly all-hands. The cadence outlives any single decision.",
        },
        {
          heading: "Agent pilot decision.",
          body:
            "The pilot has either converted to production or has a documented “no, here's why” — either outcome is valuable; ambiguity isn't.",
        },
        {
          heading: "Six-month plan published.",
          body:
            "Specific enough to be wrong. Not so vague it can never be measured.",
        },
      ],
      output:
        "Day 90 review with the team and the executive sponsor. We exit “new VP” mode and enter operating cadence.",
    },
  ] as PlaybookPhase[],
  donts: {
    title: "What I will NOT do in the first 90 days",
    items: [
      "Reorg the team unless something is on fire",
      "Promise a roadmap I haven't pressure-tested with customers",
      "Pick fights I haven't earned the standing to win",
      "Hide. The team needs to see me decide, including when I'm wrong",
    ],
  },
  closing: {
    title: "Why this works",
    lead: "Three things, one of them mine alone.",
    paragraphs: [
      "Federal-scale service delivery taught me that the difference between a 95% and a 99.9% organization isn't talent or budget — it's discipline applied to the right things in the right order. Combat experience taught me that hesitation costs more than imperfect decisions made on time. And technical fluency from shipping my own multi-agent systems means I can sponsor, scope, and judge automation work in real time, not after a six-week analyst study.",
      "The first 90 days aren't about proving I belong. They're about earning the standing to do the next 270 days well — and showing the team a leader who decides, ships, and tells them the truth.",
    ],
  },
} as const;
