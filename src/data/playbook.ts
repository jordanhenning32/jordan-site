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
  subtitle: "How I'd Run a New Head of AI Delivery Role",
  hook:
    "The real risk in a new senior role isn't moving too slow — it's shipping fast on the wrong things. The first 90 days are about earning the standing to make the decisions that matter, then making them. Here's how I'd run them leading an AI delivery organization.",
  premise: {
    title: "Operating premise",
    lead: "Listen more than I speak; then ship visible wins on the things I'm certain about — including a real agentic system in production.",
    body:
      "I've walked in as the new leader of a federal IT branch, as a growth officer at a commercial firm, and I've shipped production multi-agent systems with my own hands. The lesson is always the same: the org watches what you decide, but it remembers what you ship. Decide carefully in the first 30 days. Put a real AI system in front of users by Day 90.",
  },
  phases: [
    {
      id: "phase-1",
      range: "Days 1–30",
      tagline: "Listen, see, map",
      items: [
        {
          heading: "User + stakeholder listening tour.",
          body:
            "Direct conversations with the people who depend on the AI work and the sponsors who fund it. I want the gap, in their words, between what the system was supposed to do and what they actually experienced. AI programs don't fail loudly — trust erodes quietly, then the system gets shelved. The user who's stopped relying on it already knows exactly why.",
        },
        {
          heading: "Team listening tour.",
          body:
            "My direct reports first, then every engineer. Three questions: What's working? What's broken? What would you fix tomorrow if you had the authority? I want to know who the real builders are, and where the process is fighting them instead of helping them ship.",
        },
        {
          heading: "System + eval baseline.",
          body:
            "I read the architecture and the eval/quality gates myself before I trust any dashboard. Three checks: the eval is measuring what we think it's measuring, the data feeding it is clean, and the failure modes are understood, not smoothed over. The gap between 'the demo works' and 'it's reliable in production' is where AI programs die — I've built the gates that close it.",
        },
        {
          heading: "Model, cost, and vendor audit.",
          body:
            "Provider mix, per-run cost, latency, and where we're locked in. Two questions I'm answering: are we routing each job to the model that's actually best for it, and is spend tracked to outcomes or bleeding on no-op calls? I've built multi-provider routing myself, so this is a read I can do without a translator.",
        },
        {
          heading: "Process inventory.",
          body:
            "Every recurring workflow the org owns, sized by hours, cost, and impact. Which of these genuinely deserve to become agents — and which are fine as SOPs? Seventeen years running real operations is how I tell the difference between a workflow worth agentifying and a demo that impresses no one who has to live with it.",
        },
        {
          heading: "Trust + safety read.",
          body:
            "What can the system do unsupervised, and what must stay human-gated? Where's the kill-switch, and has anyone tested it? For anything regulated or federal, the compliance baseline (FedRAMP, ATO, data handling) is the starting line, not an afterthought.",
        },
      ],
      output:
        "Day 30 memo to leadership: current state of the AI delivery org, eval and quality posture, the cost picture, top three risks, top five opportunities, and the one decision I need from leadership.",
    },
    {
      id: "phase-2",
      range: "Days 31–60",
      tagline: "Triage, decide, stage",
      items: [
        {
          heading: "Pick three.",
          body:
            "Three initiatives that move the needle this quarter and next. Everything else goes to a parking lot or a delegated owner. The discipline isn't picking three good things — it's saying “not now” to ten others.",
        },
        {
          heading: "Make the unblocking hire.",
          body:
            "The single role whose absence is dragging the team. Not a reorg — one hire that unlocks two layers of work.",
        },
        {
          heading: "Stand up the delivery discipline.",
          body:
            "The exact discipline I built into my own multi-agent dev system, applied to the team: separation of duties, independent review, a security/safety gate, and evals that actually block a bad release. AI teams ship faster when 'done' is defined by a gate, not a vibe — and I've proven the pattern in production.",
        },
        {
          heading: "Ship one real thing to production.",
          body:
            "By Day 60 I want one agentic capability live on a workflow we already do — compressing labor hours, not eliminating headcount. Small, observable, clean kill-switch. This is where the hands-on depth earns its keep: I can scope, review, and unblock the build in real time, because I've shipped systems like it myself. I lead the build; I don't wait for a six-week analyst study to tell me if the plan is sound.",
        },
        {
          heading: "Reorganize only where unambiguous.",
          body:
            "Don't reshuffle in the dark. If a team is structurally wrong and I'm certain, fix it. Otherwise wait — the cost of a wrong reorg compounds for two quarters.",
        },
      ],
      output:
        "Day 60 quarterly plan: three commitments, three explicit “we are not fixing this right now” items, and the hire plus delivery gates that make the next 90 days possible.",
    },
    {
      id: "phase-3",
      range: "Days 61–90",
      tagline: "Ship, stand up, set the pace",
      items: [
        {
          heading: "One visible win.",
          body:
            "An agentic capability in production, a recurring failure eliminated, a cost curve bent, a cycle compressed from a week to a day. Shipping confirms the operating cadence — vision speeches don't.",
        },
        {
          heading: "Repeatable rhythm in place.",
          body:
            "Weekly eval/quality review, monthly stakeholder review, quarterly roadmap. The cadence outlives any single decision.",
        },
        {
          heading: "Production decision on the pilot.",
          body:
            "The pilot has either converted to production or has a documented “no, here's why” — either outcome is valuable; ambiguity isn't.",
        },
        {
          heading: "Six-month plan published.",
          body:
            "Specific enough to be wrong. Measurable enough to hold.",
        },
      ],
      output:
        "Day 90 review with the team and the executive sponsor. We exit “new leader” mode and enter operating cadence.",
    },
  ] as PlaybookPhase[],
  donts: {
    title: "What I will NOT do in the first 90 days",
    items: [
      "Reorg the team unless something is on fire",
      "Promise a roadmap I haven't pressure-tested with users and the data",
      "Ship an AI capability to production without an eval gate and a kill-switch",
      "Hide. The team needs to see me decide, including when I'm wrong",
    ],
  },
  closing: {
    title: "Why this works",
    lead: "Three things, one of them mine alone.",
    paragraphs: [
      "Federal-scale delivery taught me that the difference between a 95% and a 99.9% organization isn't talent or budget — it's discipline applied to the right things in the right order. Combat taught me that hesitation costs more than an imperfect decision made on time. And shipping my own production multi-agent systems means I can scope, review, and judge agentic work in real time — I lead the build, not sponsor it from a distance.",
      "The first 90 days aren't about proving I belong. They're about earning the standing to do the next 270 days well — and showing the team a leader who decides, ships, and tells them the truth.",
    ],
  },
} as const;
