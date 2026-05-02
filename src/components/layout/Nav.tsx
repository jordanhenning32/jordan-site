"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { profile } from "@/data";

const links = [
  { href: "#impact", label: "Impact" },
  { href: "#timeline", label: "Career" },
  { href: "#builds", label: "Builds" },
  { href: "#validation", label: "Proof" },
  { href: "/playbook", label: "Playbook" },
  { href: "/essays/vision-over-syntax", label: "Essay" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      const max = document.body.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(100, (y / max) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all",
        scrolled
          ? "border-b border-border/60 bg-background/80 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-2 whitespace-nowrap text-sm font-semibold tracking-tight">
          <span className="inline-block h-2 w-2 rounded-full bg-accent shadow-[0_0_12px_2px_rgba(56,189,248,0.6)]" />
          {profile.name}
        </a>
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3 py-1.5 text-sm text-muted transition-colors hover:bg-background-elev/70 hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="whitespace-nowrap rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent shadow-[0_0_24px_-8px_rgba(56,189,248,0.6)] transition-colors hover:bg-accent/20"
        >
          Book a call
        </a>
      </div>
      <div className="h-px w-full bg-border/30">
        <div
          className="h-px bg-gradient-to-r from-accent via-accent-2 to-accent transition-[width] duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>
    </header>
  );
}
