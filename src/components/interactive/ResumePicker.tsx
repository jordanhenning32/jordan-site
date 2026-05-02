"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Crown,
  Cpu,
  Download,
  Kanban,
  Landmark,
  Package,
  Server,
  TrendingUp,
} from "lucide-react";
import { roleResumes, universalResumes, type RoleResume } from "@/data";
import { cn } from "@/lib/cn";
import { track } from "@/lib/analytics";

const ICON_MAP: Record<RoleResume["icon"], React.ElementType> = {
  crown: Crown,
  cpu: Cpu,
  package: Package,
  kanban: Kanban,
  server: Server,
  landmark: Landmark,
  trending: TrendingUp,
};

export function ResumePicker() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = roleResumes.find((r) => r.id === selectedId) ?? null;

  return (
    <div>
      <div className="text-sm uppercase tracking-widest text-accent">Resume</div>
      <p className="mt-2 text-base font-semibold tracking-tight text-foreground md:text-lg">
        What position are you looking to fill?
      </p>

      <div className="relative mt-5 min-h-[220px]">
        <AnimatePresence mode="wait" initial={false}>
          {selected === null ? (
            <motion.div
              key="picker"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.2 }}
            >
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {roleResumes.map((role) => {
                  const Icon = ICON_MAP[role.icon];
                  return (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => {
                        setSelectedId(role.id);
                        track.resumeRoleSelected(role.id);
                      }}
                      className="group flex items-center gap-3 rounded-xl border border-border/60 bg-background-elev/40 p-3 text-left transition-all hover:border-accent/50 hover:bg-background-elev/70"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-accent/30 bg-accent/10 text-accent transition-colors group-hover:border-accent/60 group-hover:bg-accent/20">
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-semibold leading-tight text-foreground">
                        {role.shortLabel}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.22 }}
              className="rounded-xl border border-accent/40 bg-accent/[0.06] p-5"
            >
              <button
                type="button"
                onClick={() => setSelectedId(null)}
                className="group inline-flex items-center gap-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
              >
                <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
                Pick a different role
              </button>

              <div className="mt-3 flex items-start gap-3">
                {(() => {
                  const Icon = ICON_MAP[selected.icon];
                  return (
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-accent/40 bg-accent/15 text-accent">
                      <Icon className="h-5 w-5" />
                    </div>
                  );
                })()}
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-accent">
                    Resume tailored for
                  </div>
                  <div className="text-base font-semibold tracking-tight text-foreground md:text-lg">
                    {selected.label}
                  </div>
                </div>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-foreground/85">
                {selected.pitch}
              </p>

              <ul className="mt-3 space-y-1.5">
                {selected.matchPoints.map((m) => (
                  <li
                    key={m}
                    className="flex gap-2.5 text-xs leading-relaxed text-muted"
                  >
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent-2" />
                    <span className="text-foreground/80">{m}</span>
                  </li>
                ))}
              </ul>

              <a
                href={selected.file}
                download
                onClick={() =>
                  track.resumeDownloaded({
                    roleId: selected.id,
                    format: "pdf",
                  })
                }
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
              >
                <Download className="h-4 w-4" />
                Download tailored PDF
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className={cn(
        "mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-border/50 pt-4 text-xs text-muted",
      )}>
        <span className="text-foreground/70">Or grab a universal version:</span>
        <a
          href={universalResumes.brief.file}
          download
          onClick={() =>
            track.resumeDownloaded({ roleId: "universal-brief", format: "pdf" })
          }
          className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background-elev/40 px-3 py-1.5 text-xs text-foreground/85 transition-colors hover:border-accent/40 hover:text-accent"
        >
          <Download className="h-3 w-3" />
          {universalResumes.brief.label}
        </a>
        <a
          href={universalResumes.full.file}
          download
          onClick={() =>
            track.resumeDownloaded({ roleId: "universal-full", format: "pdf" })
          }
          className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background-elev/40 px-3 py-1.5 text-xs text-foreground/85 transition-colors hover:border-accent/40 hover:text-accent"
        >
          <Download className="h-3 w-3" />
          {universalResumes.full.label}
        </a>
      </div>
    </div>
  );
}
