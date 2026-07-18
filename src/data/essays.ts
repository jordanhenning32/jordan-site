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
          "Futures Bot is the same shape: a multi-agent system that trades the futures markets, built end-to-end as a personal R&D platform. The architectural question, when does an agent decide, when does a human override, where does the kill-switch live, was the entire game. The Python was the easy part.",
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
  {
    slug: "the-model-was-never-the-hard-part",
    eyebrow: "Essay",
    title: "The model was never the hard part.",
    subtitle: "The rarest skill in AI product work is reading the workflow — fast.",
    intro: [
      "The industry is obsessed with the model. Which one benchmarks highest this month, which framework to standardize on, how to squeeze a few more points out of a prompt. It's a comfortable obsession, because it's measurable. It's also mostly beside the point.",
      "The AI systems that make it into production and stay there rarely win on the model. They win because someone understood the workflow cold — saw exactly which part of a messy real-world process deserved to be automated, which part had to stay human, and where the whole thing would break. That understanding is the scarce resource. The model is the commodity.",
    ],
    sections: [
      {
        heading: "The model is the commodity now",
        paragraphs: [
          "Swapping one frontier model for another is a config change. The providers are converging, the wrappers are interchangeable, and 'prompt engineering' is a skill with a shrinking half-life. None of that is where the leverage is.",
          "The leverage is in the part that doesn't transfer: understanding the actual process you're pointing the model at. When I built RFP Factory, the Python was the easy part. The hard part was knowing which steps of a 40-hour federal proposal workflow had to stay human, which ones deserved automation, and how to instrument the system so a contracting officer could trust the output. No model choice solves that. Only knowing the workflow does.",
        ],
      },
      {
        heading: "Where AI products actually die",
        paragraphs: [
          "AI products almost never fail because the model was too weak. They fail upstream of the model, in the read of the process.",
          "Someone automates the judgment call that should have stayed human. Someone misses the edge case that everyone who actually does the job knows cold. Someone ships a beautiful demo of the wrong ten percent — the flashy part, not the part where the hours and the risk actually live. By the time the model is even involved, the mistake has already been made.",
          "The people who live inside a workflow carry a map of it that no dataset contains: the exceptions, the handoffs, the quiet places where trust breaks. Miss that map and it doesn't matter how strong your model is. You've just automated the wrong thing, faster.",
        ],
      },
      {
        heading: "It's a speed skill, not only a depth skill",
        paragraphs: [
          "Understanding a workflow isn't enough. You have to understand it fast.",
          "You rarely get months to marinate. You drop into a domain, a team, a process you didn't build, and you have days to see its real shape — where the hours go, which steps are rote and which are judgment, where a human has to own the decision, where the failure modes hide. The person who reads that quickly ships in weeks. The person who can't spends a quarter building the wrong thing with excellent engineering.",
          "Speed of comprehension is also what makes you portable. It's the difference between someone who's only useful in the domain they came from and someone you can drop into a new one and trust to find the real problem before they ever touch the model.",
        ],
      },
      {
        heading: "Seventeen years of operations is an unfair advantage",
        paragraphs: [
          "I don't pick AI projects from a tech-trend deck. I pick them from workflows I've personally owned and watched fail.",
          "Every system I've built started as a process I already understood from the inside. RFP Factory came from federal proposals I'd lived through. My marketing system runs the marketing I do myself. The résumé engine came out of job-hunting. The multi-agent dev system is a software organization modeled as agents — because I've run the human version. I knew where each one would break before I wrote a line, which is exactly why they shipped in weeks and survived contact with reality.",
          "That's what seventeen years running real federal operations actually bought me. Not a rolodex — a trained instinct for reading a process quickly and knowing what it can bear.",
        ],
      },
      {
        heading: "If you're hiring for AI, test for this",
        paragraphs: [
          "Stop quizzing candidates on model trivia and framework preferences. The model will keep getting better on its own; you're not hiring someone to babysit a benchmark.",
          "Hand them a real workflow your team owns and watch what they do with it. How fast do they find the failure points? Do they know which steps should stay human? Do they ask the questions that reveal they've thought about where the hours and the risk live — or do they reach for the model first? The candidate who reads your process fastest is the one who'll turn that model into a product instead of a demo.",
          "The model was never the hard part. Hire the person who knows what it's for.",
        ],
      },
    ],
  },
];

export const essayBySlug = (slug: string) => essays.find((e) => e.slug === slug);
