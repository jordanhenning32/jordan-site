"use client";
import { ArrowUp } from "lucide-react";
import { profile } from "@/data";
import { track } from "@/lib/analytics";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-background-elev/30 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-3 px-6 text-sm text-muted md:flex-row md:items-center md:justify-between">
        <div>
          © {new Date().getFullYear()} {profile.name}. Service-connected disabled veteran.
        </div>
        <div className="flex gap-5">
          <a
            className="hover:text-foreground"
            href={`mailto:${profile.email}`}
            onClick={() => track.externalLinkClicked("email", "footer")}
          >
            Email
          </a>
          <a
            className="hover:text-foreground"
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track.externalLinkClicked("github", "footer")}
          >
            GitHub
          </a>
          <a
            className="hover:text-foreground"
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track.externalLinkClicked("linkedin", "footer")}
          >
            LinkedIn
          </a>
          <a
            className="hover:text-foreground"
            href={profile.calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track.externalLinkClicked("calendly_external", "footer")}
          >
            Calendly
          </a>
        </div>
      </div>
      <div className="mx-auto mt-6 flex max-w-6xl flex-col items-start gap-3 px-6 text-[11px] text-muted/70 md:flex-row md:items-center md:justify-between">
        <div>
          Privacy-friendly analytics · no cookies, no IP storage, no session recording.
        </div>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="group inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background-elev/40 px-3 py-1.5 text-xs text-muted transition-colors hover:border-accent/40 hover:text-accent"
          aria-label="Back to top"
        >
          Back to top
          <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
        </button>
      </div>
    </footer>
  );
}
