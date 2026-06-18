export type BridgeItem = {
  military: { title: string; detail: string };
  it: { title: string; detail: string };
};

export const battlefieldToBoardroom: BridgeItem[] = [
  {
    military: {
      title: "Resilience under fire",
      detail: "Combat tour in Iraq with the 101st Airborne. Bronze Star, Purple Heart.",
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
      title: "Federal IT leadership across 170 offices",
      detail: "12 direct reports (incl. 2 team leads), with IT governance and standards authority over a 340-technician field operation nationwide, serving 7,000+ Hearings Office employees.",
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
