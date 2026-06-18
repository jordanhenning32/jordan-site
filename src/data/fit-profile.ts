export type FitItem = {
  icon: "building" | "rocket";
  title: string;
  detail: string;
};

export const fitProfile = {
  bestFit: [
    {
      icon: "building",
      title: "Federal services delivery leadership",
      detail:
        "VP / Director of Service Delivery, GM of Federal AI Services, or Senior Director Federal Programs at federal primes and services firms — where 99.9% uptime, federal portfolio delivery at scale, and hands-on AI capability all matter in the same role.",
    },
    {
      icon: "rocket",
      title: "Federal AI services growth",
      detail:
        "GM, VP, or Practice Director at emerging federal AI services firms — where someone who can both win federal contracts and sponsor multi-agent AI delivery is the job, not a side capability.",
    },
  ] as FitItem[],
  lessIdealFit: [
    "VP Product or VP Engineering at commercial tech (different level/tenure pattern)",
    "IC engineering roles",
    "Pre-revenue seed-stage where federal credibility doesn't carry weight",
    "Roles where AI is a marketing layer rather than a real operational change",
  ],
};
