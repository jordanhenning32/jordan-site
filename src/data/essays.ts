export type EssaySection = {
  heading: string;
  paragraphs: string[];
};

export type Essay = {
  slug: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  intro: string[];
  sections: EssaySection[];
};

export const essays: Essay[] = [
  {
    slug: "vision-over-syntax",
    eyebrow: "Essay",
    title: "If you can dream it, you can build it.",
    subtitle: "So why are we still hiring people who can only build?",
    intro: [
      "We've been telling ourselves a story about engineering hiring for two decades: that the right way to find talent is to stress-test syntax. Whiteboard a binary tree. Reverse a string in O(n) time. Spend five hours on system design. The candidate who codes cleanest under pressure wins.",
      "That story made sense when the bottleneck was implementation. It hasn't been the bottleneck for two years.",
    ],
    sections: [
      {
        heading: "The bottleneck shifted",
        paragraphs: [
          "Tools, compute, agents, none of these are scarce anymore. A senior engineer in 2026 works in an environment where the marginal cost of writing correct code has collapsed. The hard part of the job is no longer typing.",
          "What's scarce is taste. Judgment. The instinct to recognize which problem is actually worth solving, which workflow deserves to become an agent, and which architecture will hold up when the second cohort of customers shows up. The hard work is end-to-end synthesis: holding the entire product picture in your head, choosing what to ship, and shipping it without losing the conviction that started the project.",
          "That's vision. And vision doesn't show up on a LeetCode test.",
        ],
      },
      {
        heading: "Hiring tests for the era you trained in",
        paragraphs: [
          "Most engineering interviews still optimize for the era when typing fast and remembering data structures was the differentiator. The five-hour loop. The sterile algorithmic puzzle. The system-design exercise framed as if scaling Twitter is the universal problem.",
          "These tests miss the candidate who would have actually built RFP Factory or Futures Bot, the candidate who can look at a 40-hour proposal workflow, scope it down to a multi-agent system, ship it in weeks, and have it running in production by the time the interview panel has finished arguing about a graph-traversal problem.",
          "The mismatch is now expensive. Engineering orgs hire well-tested individual contributors who can't ship product. Executive teams hire well-tested executives who can't read what their own engineers are doing. Both groups are expensive. Both miss the candidate who actually moves the needle.",
        ],
      },
      {
        heading: "What 2026 hiring should look like",
        paragraphs: [
          "For a senior engineer, the right test isn't “reverse a string.” It's “show me your last six months of prompts.”",
          "Show me the agent graphs you've architected. The eval harnesses you wrote when you couldn't trust the model. The decisions you made about which parts of your workflow stayed human and which became autonomous. Walk me through the trade-offs. Tell me when you killed an agent that wasn't working and what you replaced it with.",
          "That single conversation tells me more about a candidate than any whiteboard session, because it tests for the exact skills 2026 engineering work actually requires: synthesis, taste, end-to-end ownership, and the technical depth to know what's possible.",
          "For an executive, the right test isn't a leadership case study. Hand them a real workflow your team owns. Watch them decide which parts deserve to become agents. Listen for the questions they don't ask, because the executive who doesn't ask the right technical questions is the executive who'll spend two years and $5M on the wrong build.",
          "The interview becomes a working session, not a performance review. The signal jumps an order of magnitude.",
        ],
      },
      {
        heading: "What I've actually shipped",
        paragraphs: [
          "I've spent the last year practicing what I'm describing.",
          "RFP Factory took a 40-hour proposal workflow and compressed it to two hours of human review, twenty-times cycle compression on a process I had personally watched fail at scale. Specialized agents handle research, strategy, drafting, and compliance review in parallel. I designed it, coded it, and operate it. The hard part wasn't the syntax. The hard part was knowing which parts of the workflow should stay human, which parts deserved automation, and how to instrument the system so a subject-matter expert could actually trust the output.",
          "Futures Bot is the same shape: a multi-agent system trading the futures markets 24/5, built on twelve years of personal markets research. Live since February 2026 with a 62% win rate across the first ~500 trades. The architectural question, when does an agent decide, when does a human override, where does the kill-switch live, was the entire game. The Python was the easy part.",
          "Both systems are evidence of what 2026 engineering actually requires. Not deep syntax wizardry. End-to-end synthesis.",
        ],
      },
      {
        heading: "The shift hiring needs to make",
        paragraphs: [
          "Stop testing for the era you trained in. Start testing for the era you're hiring into.",
          "Look at a candidate's last six months of work, not their last six years of credentials. Watch them make a real decision on a real workflow. Hire for the eyes, the judgment, and the bias to ship.",
          "The syntax has been commoditized for two years now. It's time the interviews caught up.",
          "If you can dream it, you can build it. Hire the people who can do both.",
        ],
      },
    ],
  },
];

export const essayBySlug = (slug: string) => essays.find((e) => e.slug === slug);
