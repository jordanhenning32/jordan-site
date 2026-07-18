export type FitItem = {
  icon: "building" | "rocket";
  title: string;
  detail: string;
};

export const fitProfile = {
  bestFit: [
    {
      icon: "rocket",
      title: "AI delivery / engineering leadership",
      detail:
        "Head of AI, Director of AI Engineering, AI Delivery Lead, or GenAI Engineering Manager — leading the teams that ship production multi-agent systems, where the leader has to read the architecture and direct the work, not just approve it. Federal or commercial.",
    },
    {
      icon: "building",
      title: "Federal / GovCon AI delivery leadership",
      detail:
        "GM, VP, or Practice Director of Federal AI Services at primes and emerging federal-AI firms — where winning federal work AND leading multi-agent AI delivery is the job, and clearance plus federal delivery discipline are the moat.",
    },
  ] as FitItem[],
  lessIdealFit: [
    "Pure individual-contributor roles with no team to lead",
    "Roles where AI is a marketing veneer rather than real operational delivery",
    "Pre-revenue seed-stage where federal credibility and delivery scale don't carry weight",
  ],
};
