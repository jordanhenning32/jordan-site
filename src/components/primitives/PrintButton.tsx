"use client";
import { track } from "@/lib/analytics";

export function PrintButton({
  children,
  page,
}: {
  children: React.ReactNode;
  page?: "playbook" | "essay";
}) {
  return (
    <button
      type="button"
      onClick={() => {
        if (page) track.pdfPrintClicked(page);
        window.print();
      }}
      className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3.5 py-1.5 text-xs font-medium text-accent transition-colors hover:bg-accent/20"
    >
      {children}
    </button>
  );
}
