export type BridgeItem = {
  military: { title: string; detail: string };
  it: { title: string; detail: string };
};

export const battlefieldToBoardroom: BridgeItem[] = [
  {
    military: {
      title: "Resilience under fire",
      detail: "Three combat tours with the 101st Airborne. Bronze Star, Purple Heart.",
    },
    it: {
      title: "Composure in high-stakes escalations",
      detail: "Owns the room when production is down and millions of users are affected.",
    },
  },
  {
    military: {
      title: "Scaling teams in chaos",
      detail: "Led infantry units through deployment cycles where adaptability decided outcomes.",
    },
    it: {
      title: "352-person service organization",
      detail: "Manager-of-managers across 12 direct and 340 indirect reports across 170 offices.",
    },
  },
  {
    military: {
      title: "Mission-critical decisions",
      detail: "Trained to make irreversible calls with incomplete information, under time pressure.",
    },
    it: {
      title: "99.9% uptime SLA governance",
      detail: "Same decisiveness applied to incident command for regulated, 24/7 platforms.",
    },
  },
  {
    military: {
      title: "Doctrine + improvisation",
      detail: "Followed playbooks where they worked; rewrote them when reality demanded.",
    },
    it: {
      title: "ITIL discipline + pragmatic delivery",
      detail: "Operationalized ITIL where it created value, never as bureaucratic theater.",
    },
  },
  {
    military: {
      title: "Service to mission",
      detail: "Volunteered, served, sacrificed — and shows up the same way every shift since.",
    },
    it: {
      title: "Mission-driven service ownership",
      detail: "Treats every SLA, every customer outcome, every audit as a personal commitment.",
    },
  },
];
