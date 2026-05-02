export type MetricItem = {
  value: number;
  label: string;
  detail: string;
  suffix?: string;
  prefix?: string;
  decimals?: number;
};

export const metrics: MetricItem[] = [
  {
    value: 352,
    label: "Federal IT operation led",
    detail: "Manager-of-managers as Branch Chief: 12 direct reports + 340 field IT staff across 170 SSA Hearings Offices, serving 7,000+ employees",
  },
  {
    value: 170,
    label: "Nationwide offices unified",
    detail: "End-to-end IT service delivery across all SSA Hearings Offices",
  },
  {
    value: 99.9,
    label: "System availability",
    suffix: "%",
    decimals: 1,
    detail: "Sustained for mission-critical platforms serving millions of users",
  },
  {
    value: 20,
    label: "Downtime reduction",
    suffix: "%",
    detail: "Through proactive monitoring, dashboards, and ITIL-driven CSI",
  },
  {
    value: 2,
    label: "Multi-agent AI systems shipped",
    detail: "RFP Factory and Futures Bot — designed, coded, and operating in production",
  },
  {
    value: 200,
    label: "Federal IT portfolio",
    suffix: "M+",
    prefix: "$",
    detail: "Multi-year Agile IT service & infrastructure programs at SSA",
  },
];
