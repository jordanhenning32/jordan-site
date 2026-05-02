"use client";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export type RadarColors = {
  accent: string;
  accentFill: string;
  muted: string;
  grid: string;
};

export default function SkillsRadarChart({
  labels,
  values,
  colors,
}: {
  labels: string[];
  values: number[];
  colors: RadarColors;
}) {
  const data = {
    labels,
    datasets: [
      {
        label: "Competency",
        data: values,
        backgroundColor: colors.accentFill,
        borderColor: colors.accent,
        borderWidth: 2,
        pointBackgroundColor: colors.accent,
        pointBorderColor: "#0b1224",
        pointHoverBackgroundColor: "#fbbf24",
        pointHoverBorderColor: "#0b1224",
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  return (
    <Radar
      data={data}
      options={{
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          r: {
            min: 0,
            max: 100,
            ticks: {
              display: false,
              stepSize: 25,
            },
            angleLines: { color: colors.grid },
            grid: { color: colors.grid },
            pointLabels: {
              color: colors.muted,
              font: { size: 11, weight: 500 },
            },
          },
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "#0b1224",
            titleColor: "#f8fafc",
            bodyColor: "#cbd5e1",
            borderColor: colors.grid,
            borderWidth: 1,
            padding: 12,
            callbacks: {
              label: (ctx) => `${ctx.parsed.r}/100`,
            },
          },
        },
      }}
    />
  );
}
