export type Milestone = {
  period: string;
  role: string;
  org: string;
  location?: string;
  highlight: string;
  bullets: string[];
  tags: string[];
};

export const timeline: Milestone[] = [
  {
    period: "Apr 2025 – Present",
    role: "Chief Growth Officer",
    org: "Quadratic Digital",
    highlight:
      "Driving growth at a 12-person services firm serving state, federal, and prime-subcontract clients — pairing proven go-to-market discipline with the multi-agent AI tooling I build hands-on.",
    bullets: [
      "Designing and shipping RFP Factory — a multi-agent proposal automation system that compresses 40-hour proposal cycles into 2 hours of human review, a 20× reduction no traditional GTM team can match.",
      "Subcontracting multiple roles to Nava on CMS modernization programs — embedding Quadratic into a marquee civic-tech delivery prime that supports healthcare-focused federal modernization work.",
      "Won two PA Invitation-to-Qualify (ITQ) vehicles and qualified Quadratic into the PA Small Disadvantaged Business program; pursuing capture across GSA MAS Schedule, STARS III, 8(a)/SDVOSB/HUBZone vehicles, and IDIQ/BPA structures.",
      "Operates a FedRAMP-certified delivery posture — AI-services builds run alongside ATO-aligned controls so the federal compliance baseline is the starting point, not an afterthought.",
      "Executing cross-sector growth strategy across federal and commercial markets — pricing architecture, solution scoping, offer-portfolio development.",
      "Winning high-value strategic contracts and building executive partnerships in highly regulated environments where service delivery and AI maturity have to coexist.",
    ],
    tags: ["Federal Procurement", "FedRAMP", "Nava Subcontract (CMS)", "Multi-Agent Systems", "PA ITQ ×2"],
  },
  {
    period: "Jan 2022 – Apr 2025",
    role: "Branch Chief, Hearings Office IT Oversight",
    org: "Social Security Administration",
    location: "Baltimore, MD",
    highlight: "Led 352-person service organization across 170 nationwide offices at 99.9% availability.",
    bullets: [
      "Owned end-to-end service strategy, incident/problem management, escalation handling, root-cause analysis, and SLA/KPI governance.",
      "Reduced system downtime 20% through enhanced monitoring frameworks, dashboards, proactive prevention, and ITIL-driven continual service improvement.",
      "Directed multimillion-dollar budgeting, procurement, vendor relationships, and full lifecycle infrastructure refresh — on-time, under-budget.",
      "Championed cross-functional collaboration with CIO-level leadership, engineering, security, and stakeholder teams; ensured regulatory compliance and audit readiness — including FedRAMP and ATO governance across mission-critical systems.",
      "Oversaw staffing, resource planning, and performance optimization to deliver consistent, high-quality customer outcomes in a 24/7 environment.",
    ],
    tags: ["Service Delivery", "ITIL", "FedRAMP / ATO", "SLA/KPI Governance", "352 People"],
  },
  {
    period: "Sep 2016 – Jan 2022",
    role: "IT Project Manager (FAC-P/PM Certified)",
    org: "Social Security Administration",
    location: "Baltimore, MD",
    highlight: "Directed multi-year Agile IT programs exceeding $200M in portfolio value — millions saved.",
    bullets: [
      "Led centralized print services consolidation — single-vendor architecture and renegotiated contracts saving the agency millions.",
      "Implemented agency-wide BI platform — Tableau + WebFocus selection, integration, training, and ongoing maintenance.",
      "Consolidated 7 legacy Operational Data Stores into one modern Appeals Database — accuracy, speed, and cost efficiency.",
      "Partnered with the U.S. Department of Veterans Affairs in 2016 to enable secure cross-agency disability-evidence sharing — surfacing VA medical records earlier in the SSA disability-claim process to accelerate veteran benefit approvals.",
      "Spearheaded the emergency COVID-19 medical document upload system on MySSA — earned a prestigious SSA Commissioner Award.",
      "Leveraged ServiceNow for ITSM, workflow automation, incident tracking, and self-service at enterprise scale.",
    ],
    tags: ["FAC-P/PM", "$200M Portfolio", "VA Cross-Agency", "Commissioner Award", "ServiceNow"],
  },
  {
    period: "Aug 2008 – Sep 2016",
    role: "Systems Analyst · Area Systems Coordinator · Claims Representative",
    org: "Social Security Administration",
    location: "Baltimore, MD",
    highlight: "Reduced system downtime 20% across high-volume beneficiary systems; Tier-3 across multiple field offices.",
    bullets: [
      "Proactive analysis, troubleshooting, process redesign, and enhanced monitoring strengthened production reliability.",
      "Delivered Tier-3 IT support and systems administration; increased uptime and staff productivity through targeted training and resolution.",
      "Contributed to early MySSA iterations — leveraging field-office Claims Rep experience to inform online service transitions.",
    ],
    tags: ["Tier-3 Support", "Production Reliability", "MySSA", "Field Operations"],
  },
  {
    period: "Jan 2001 – Jan 2009",
    role: "Infantry Soldier · Transportation Specialist",
    org: "U.S. Army · 101st Airborne Division",
    highlight: "Three combat tours · Bronze Star · Purple Heart.",
    bullets: [
      "Iraq and Afghanistan deployments with the 101st Airborne.",
      "Developed executive-level leadership, adaptability, resilience, and performance under extreme pressure.",
      "Directly transferable foundation for high-stakes service-delivery escalations and customer engagements.",
    ],
    tags: ["Bronze Star", "Purple Heart", "101st Airborne", "Combat Veteran"],
  },
  {
    period: "Jan 2007 – Aug 2008",
    role: "Software Developer",
    org: "MTD Products",
    location: "Valley City, OH",
    highlight: "Manufacturing and inventory-management applications in Agile environment.",
    bullets: [
      "Delivered updates ahead of schedule with emphasis on reliability and operational efficiency.",
    ],
    tags: ["Agile", "Manufacturing Systems"],
  },
];
