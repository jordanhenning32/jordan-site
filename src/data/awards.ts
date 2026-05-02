export type Award = {
  title: string;
  year: string;
  issuer: string;
  detail: string;
  icon: "award" | "star" | "heart" | "badge" | "shield";
};

export const awards: Award[] = [
  {
    title: "Public Trust Clearance",
    year: "2008–2025",
    issuer: "U.S. Federal Government · High Risk Tier",
    detail:
      "Held throughout 17-year SSA tenure. Federal background investigation; cleared to handle PII at the Social Security Administration. Eligible to reinstate.",
    icon: "shield",
  },
  {
    title: "SSA Commissioner Award",
    year: "2021",
    issuer: "Kilolo Kijakazi · Acting Commissioner, SSA",
    detail:
      "Awarded by SSA Acting Commissioner Kilolo Kijakazi for spearheading the emergency COVID-19 medical document upload system on MySSA — conceived, built, deployed, and adopted in weeks rather than the typical 12+ month enterprise cycle. Kept nationwide disability-claim processing alive during widespread office closures.",
    icon: "award",
  },
  {
    title: "Bronze Star",
    year: "2006",
    issuer: "U.S. Army · 101st Airborne Division",
    detail:
      "Awarded for meritorious service in a combat zone during a tour in Iraq.",
    icon: "star",
  },
  {
    title: "Purple Heart",
    year: "2006",
    issuer: "U.S. Army",
    detail:
      "Awarded for wounds received in action during the same tour in Iraq.",
    icon: "heart",
  },
  {
    title: "FAC-P/PM Certification",
    year: "2020",
    issuer: "Federal Acquisition Institute",
    detail:
      "Federal Acquisition Certification for Program & Project Managers — the federal government's standard credential for IT program leadership.",
    icon: "badge",
  },
];

export type TeamOutcome = {
  stat: string;
  label: string;
  detail: string;
};

export const teamOutcomes: TeamOutcome[] = [
  {
    stat: "100%",
    label: "Direct-report retention",
    detail:
      "Twelve direct reports across three years as Branch Chief — zero attrition. Federal IT promotion is slot-based, not performance-based, so retention is the real signal: the team I built chose to stay through a period of high federal turnover.",
  },
  {
    stat: "4 of 4",
    label: "Mentees promoted into PM leadership",
    detail:
      "Every project manager I mentored as a senior PM at SSA went on to run their own programs successfully — the career-development outcome the org structure made possible.",
  },
];

export const referencesAvailable = {
  note: "References provided after first conversation, per professional courtesy.",
  breakdown: [
    "2 Federal CIO / Director-level",
    "2 SSA peer Branch Chiefs",
    "Multiple direct reports across SSA + Quadratic Digital",
  ],
};
