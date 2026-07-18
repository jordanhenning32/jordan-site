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
      "As co-owner and CGO, I own the firm's AI product build end-to-end — I architect, build, and operate the production multi-agent AI systems and own their delivery — alongside cross-sector growth strategy. Hands-on AI delivery at a 14-person federal IT services firm.",
    bullets: [
      "Designed and ship RFP Factory — a 34-agent proposal-automation system that compresses 40-hour proposal cycles into 2 hours of human review (~20×), in production with grounded RAG and FAR/compliance guardrails.",
      "Built the multi-agent marketing/CRM system that runs the firm's content and lead operations end-to-end behind human-approval safety gates.",
      "Operate a FedRAMP-aligned delivery posture — AI builds run alongside ATO-aligned controls so the federal compliance baseline is the starting point, not an afterthought.",
      "Embedded the firm as a subcontractor to Nava on CMS modernization; won two PA Invitation-to-Qualify (ITQ) vehicles and qualified into the PA Small Disadvantaged Business program.",
      "Lead cross-sector growth strategy across federal and commercial markets — pricing, solution scoping, and capture.",
    ],
    tags: ["Multi-Agent AI", "AI Delivery", "FedRAMP", "Nava / CMS", "Federal + Commercial"],
  },
  {
    period: "Jan 2022 – Apr 2025",
    role: "Branch Chief, Hearings Office IT Oversight",
    org: "Social Security Administration",
    location: "Baltimore, MD",
    highlight: "Managed 12 direct reports (incl. 2 team leads) and set IT governance, policy & standards for a 340-technician field operation across 170 nationwide Hearings Offices, serving 7,000+ SSA employees at 99.9% availability.",
    bullets: [
      "Owned end-to-end service strategy, incident/problem management, escalation handling, root-cause analysis, and SLA/KPI governance for IT services delivered to 7,000+ Hearings Office employees nationwide.",
      "Reduced system downtime 20% through enhanced monitoring frameworks, dashboards, proactive prevention, and ITIL-driven continual service improvement.",
      "Directed multimillion-dollar budgeting, procurement, vendor relationships, and full lifecycle infrastructure refresh — on-time, under-budget.",
      "Championed cross-functional collaboration with CIO-level leadership, engineering, security, and stakeholder teams; ensured regulatory compliance and audit readiness — including FedRAMP and ATO governance across mission-critical systems.",
      "Oversaw staffing, resource planning, and performance optimization for the 12-person team and the 340-technician field IT operation it governed — delivering consistent customer outcomes in a 24/7 environment.",
    ],
    tags: ["Service Delivery", "ITIL", "FedRAMP / ATO", "12 Direct Reports", "170 Offices · 7K+ Users"],
  },
  {
    period: "Sep 2016 – Jan 2022",
    role: "IT Project Manager (FAC-P/PM-IT Certified)",
    org: "Social Security Administration",
    location: "Baltimore, MD",
    highlight: "Led delivery of $200M+ in IT projects across matrixed teams over the tenure — on-time, under-budget, millions saved.",
    bullets: [
      "Led centralized print services consolidation — single-vendor architecture and renegotiated contracts saving the agency millions.",
      "Implemented agency-wide BI platform — Tableau + WebFocus selection, integration, training, and ongoing maintenance.",
      "Consolidated 7 legacy Operational Data Stores into one modern Appeals Database — accuracy, speed, and cost efficiency.",
      "Partnered with the U.S. Department of Veterans Affairs in 2016 to enable secure cross-agency disability-evidence sharing — surfacing VA medical records earlier in the SSA disability-claim process to accelerate veteran benefit approvals.",
      "Spearheaded the emergency COVID-19 medical document upload system on MySSA — earned a prestigious SSA Commissioner Award.",
      "Leveraged ServiceNow for ITSM, workflow automation, incident tracking, and self-service at enterprise scale.",
    ],
    tags: ["FAC-P/PM-IT", "$200M+ Delivered", "VA Cross-Agency", "Commissioner Award", "ServiceNow"],
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
    highlight: "Combat tour in Iraq with the 101st Airborne.",
    bullets: [
      "Iraq deployment with the 101st Airborne.",
      "Developed executive-level leadership, adaptability, resilience, and performance under extreme pressure.",
      "Directly transferable foundation for high-stakes technical leadership and decision-making under pressure.",
    ],
    tags: ["101st Airborne", "Combat Veteran"],
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
