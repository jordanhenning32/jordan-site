export type RoleResume = {
  id: string;
  label: string;
  shortLabel: string;
  pitch: string;
  matchPoints: string[];
  file: string;
  icon:
    | "crown"
    | "cpu"
    | "package"
    | "kanban"
    | "server"
    | "landmark"
    | "trending";
};

export const roleResumes: RoleResume[] = [
  {
    id: "ai-delivery",
    label: "AI Engineering & Delivery Leadership",
    shortLabel: "AI Delivery Leadership",
    pitch:
      "Resume tailored for Head of AI, Director of AI Engineering, AI Delivery Lead, and Federal AI services leadership. Leads with five production multi-agent systems built hands-on, delivery-team leadership, and the federal record that makes the combination rare.",
    matchPoints: [
      "5 production multi-agent AI systems designed, coded, and operated hands-on",
      "RFP Factory — 34-agent federal proposal automation, 40h → 2h (~20×), in production",
      "Led 12 reports + IT governance across 170 offices at 99.9% availability; $200M+ delivered",
    ],
    file: "/resumes/Jordan-Henning-Resume-AI-Delivery.pdf",
    icon: "cpu",
  },
  {
    id: "service-ops",
    label: "Federal Service Delivery / Operations",
    shortLabel: "Federal Service Delivery",
    pitch:
      "Resume tailored for federal AI services and services-delivery leadership at primes and contractors — GM Federal AI Services and senior delivery roles. Leads with 99.9% uptime, 170-office scale, and production multi-agent AI capability layered on enterprise service operations.",
    matchPoints: [
      "99.9% availability sustained across 170 nationwide offices for millions of users",
      "20% downtime reduction via ITIL-driven monitoring and continual service improvement",
      "Multimillion-dollar vendor lifecycle management · 24/7 federal service operations",
    ],
    file: "/resumes/Jordan-Henning-Resume-Service-Ops.pdf",
    icon: "server",
  },
  {
    id: "federal-it",
    label: "Federal IT Leadership",
    shortLabel: "Federal IT Leadership",
    pitch:
      "Resume tailored for federal contractors and federal services firms — defense AI, civilian-agency programs, and prime/sub roles where federal experience, clearance, and FAC-P/PM are core requirements.",
    matchPoints: [
      "Public Trust High Risk clearance · held throughout SSA tenure · eligible to reinstate",
      "17 years SSA · Branch Chief · FAC-P/PM · SSA Commissioner Award (2021)",
      "101st Airborne combat veteran",
    ],
    file: "/resumes/Jordan-Henning-Resume-Federal-IT.pdf",
    icon: "landmark",
  },
  {
    id: "program-pm",
    label: "Project / Program Management",
    shortLabel: "Project / Program Mgmt",
    pitch:
      "Resume tailored for senior PM/PgM roles at federal contractors and services firms. Leads with FAC-P/PM certification, federal-scale delivery discipline, and named transformation projects.",
    matchPoints: [
      "FAC-P/PM certified · $200M+ in IT projects delivered on-time, under-budget",
      "BI platform implementation · 7-ODS consolidation · centralized print savings",
      "100% direct-report retention · 4 of 4 mentees promoted into PM leadership",
    ],
    file: "/resumes/Jordan-Henning-Resume-Program-PM.pdf",
    icon: "kanban",
  },
];

export const universalResumes = {
  full: {
    label: "AI leadership resume (2 pages, send-ready)",
    description:
      "The default — ATS-friendly and send-ready. Leads with the five production AI systems, AI delivery leadership, and the federal record that makes the combination rare. This is the one to send.",
    file: "/resumes/Jordan-Henning-Resume-AI-Delivery.pdf",
  },
  brief: {
    label: "2-page brief (ATS-friendly)",
    description:
      "Tightened to 2 pages with brief bullets. Use for cold ATS uploads where length is constrained.",
    file: "/resumes/Jordan-Henning-Resume-Brief.pdf",
  },
} as const;

// Backward-compat: a flat array of all resumes (used elsewhere if needed).
export const tailoredResumes = [
  {
    label: universalResumes.full.label,
    description: universalResumes.full.description,
    file: universalResumes.full.file,
  },
  {
    label: universalResumes.brief.label,
    description: universalResumes.brief.description,
    file: universalResumes.brief.file,
  },
  ...roleResumes.map((r) => ({
    label: r.label,
    description: r.pitch,
    file: r.file,
  })),
] as const;
