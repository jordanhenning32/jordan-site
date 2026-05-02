import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Calendar, Mail, Printer } from "lucide-react";
import { profile } from "@/data";
import { GithubIcon, LinkedinIcon } from "@/components/primitives/BrandIcons";
import { PrintButton } from "@/components/primitives/PrintButton";

export function LongformHeader({ page }: { page: "playbook" | "essay" }) {
  return (
    <header className="print-topnav sticky top-0 z-30 -mx-6 mb-12 flex items-center justify-between border-b border-border/40 bg-background/85 px-6 py-4 backdrop-blur-xl print:hidden">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        {profile.name}
      </Link>
      <PrintButton page={page}>
        <Printer className="h-4 w-4" />
        Save as PDF
      </PrintButton>
    </header>
  );
}

export type Companion = {
  eyebrow: string;
  href: string;
  label: string;
};

export function LongformFooter({
  callToAction,
  companion,
}: {
  callToAction: string;
  companion?: Companion;
}) {
  return (
    <>
      <footer className="mt-16 border-t border-border/40 pt-10 print:hidden">
        {companion && (
          <div className="mb-8 rounded-2xl border border-border/60 bg-background-elev/40 p-5">
            <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-accent">
              {companion.eyebrow}
            </div>
            <Link
              href={companion.href}
              className="group mt-2 inline-flex items-baseline gap-2 text-base font-semibold tracking-tight text-foreground hover:text-accent md:text-lg"
            >
              {companion.label}
              <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        )}

        <div className="mb-6 text-sm text-muted">{callToAction}</div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href={profile.calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
          >
            <Calendar className="h-4 w-4" />
            Book 15 minutes
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background-elev/60 px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent/40 hover:bg-background-elev"
          >
            <Mail className="h-4 w-4" />
            {profile.email}
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background-elev/60 px-3 py-3 text-sm text-muted transition-colors hover:border-accent/40 hover:text-foreground"
          >
            <GithubIcon className="h-4 w-4" />
            GitHub
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background-elev/60 px-3 py-3 text-sm text-muted transition-colors hover:border-accent/40 hover:text-foreground"
          >
            <LinkedinIcon className="h-4 w-4" />
            LinkedIn
          </a>
        </div>

        <div className="mt-8 text-xs text-muted">
          © {new Date().getFullYear()} {profile.name}. {profile.title}.
        </div>
      </footer>

      <div className="hidden print:mt-12 print:block print:text-xs print:text-zinc-500">
        {profile.name} · {profile.email} · {profile.phone} · {profile.calendlyUrl}
      </div>
    </>
  );
}
