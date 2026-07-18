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

// One send-ready fusion résumé serves both lanes; the buttons tailor the
// framing a recruiter reads, then download the same strong AI-leadership PDF.
const AI_RESUME = "/resumes/Jordan-Henning-Resume-AI-Delivery.pdf";

export const roleResumes: RoleResume[] = [
  {
    id: "ai-delivery",
    label: "AI Engineering & Delivery Leadership",
    shortLabel: "AI Delivery Leadership",
    pitch:
      "For Head of AI, Director of AI Engineering, AI Delivery Lead, and GenAI Engineering Manager — federal or commercial. Leads with five production multi-agent systems built hands-on and the delivery-team leadership to ship them.",
    matchPoints: [
      "5 production multi-agent AI systems designed, coded, and operated hands-on",
      "Multi-provider orchestration, RAG, and eval/review gates; a dev system that ships verified code",
      "Led multi-tier delivery teams · $200M+ delivered · 99.9% uptime discipline",
    ],
    file: AI_RESUME,
    icon: "cpu",
  },
  {
    id: "federal-ai",
    label: "Federal / GovCon AI Delivery Leadership",
    shortLabel: "Federal AI Delivery",
    pitch:
      "For GM/VP/Director of Federal AI Services and AI delivery leadership at primes and emerging federal-AI firms — where winning federal work and leading multi-agent AI delivery is the job. The federal moat plus hands-on AI.",
    matchPoints: [
      "Public Trust cleared (eligible to reinstate) · FAC-P/PM · FedRAMP / ATO posture",
      "RFP Factory — 34-agent federal proposal automation, 40h → 2h, in production",
      "17 yrs federal IT · Branch Chief, 170 offices, 99.9% uptime · $200M+ delivered",
    ],
    file: AI_RESUME,
    icon: "landmark",
  },
];

export const universalResumes = {
  full: {
    label: "Send-ready résumé (2 pages)",
    description:
      "The default — ATS-friendly and send-ready. Leads with the five production AI systems, AI delivery leadership, and the federal record that makes the combination rare. This is the one to send.",
    file: AI_RESUME,
  },
  brief: {
    label: "Same résumé · ATS-optimized",
    description:
      "The same 2-page résumé, single-column with selectable text — safe for cold ATS uploads.",
    file: AI_RESUME,
  },
} as const;

// Backward-compat: a flat array of all resumes (used elsewhere if needed).
export const tailoredResumes = [
  {
    label: universalResumes.full.label,
    description: universalResumes.full.description,
    file: universalResumes.full.file,
  },
  ...roleResumes.map((r) => ({
    label: r.label,
    description: r.pitch,
    file: r.file,
  })),
] as const;
