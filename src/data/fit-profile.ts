export type FitItem = {
  icon: "building" | "rocket";
  title: string;
  detail: string;
};

export const fitProfile = {
  bestFit: [
    {
      icon: "rocket",
      title: "AI delivery leadership (player-coach)",
      detail:
        "AI Delivery Lead, Senior AI Engineering Manager, or Director of AI Delivery — a hands-on player-coach who sets the architecture and quality bar and leads the delivery of multi-agent AI systems, reading the code and directing the work, not just approving it. Federal or commercial.",
    },
    {
      icon: "building",
      title: "Federal / GovCon AI delivery leadership",
      detail:
        "Director or Practice Lead of Federal AI Services at primes and emerging federal-AI firms — where winning federal work AND leading multi-agent AI delivery is the job, and Public Trust eligibility plus a decade of federal delivery discipline are the moat.",
    },
  ] as FitItem[],
  lessIdealFit: [
    "Pure individual-contributor roles with no team to lead",
    "Roles where AI is a marketing veneer rather than real operational delivery",
    "Pre-revenue seed-stage where federal credibility and delivery scale don't carry weight",
  ],
};
