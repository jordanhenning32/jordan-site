import type { Metadata } from "next";
import { playbook, profile, essayBySlug } from "@/data";
import { PageViewTracker } from "@/components/layout/PageViewTracker";
import { LongformHeader, LongformFooter } from "@/components/layout/LongformShell";

const companionEssay = essayBySlug("vision-over-syntax");

export const metadata: Metadata = {
  title: `${playbook.title} — ${playbook.subtitle}`,
  description: playbook.hook,
  openGraph: {
    type: "article",
    title: `${playbook.title} — ${playbook.subtitle}`,
    description: playbook.hook,
    siteName: profile.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${playbook.title} — ${playbook.subtitle}`,
    description: playbook.hook,
  },
};

export default function PlaybookPage() {
  return (
    <article className="print-document mx-auto flex max-w-3xl flex-col px-6 pb-24">
      <PageViewTracker event="playbook" />
      <LongformHeader page="playbook" />

      <div className="mb-14">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/70 bg-background-elev/60 px-3 py-1 text-xs font-medium uppercase tracking-[0.22em] text-accent">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          {playbook.eyebrow}
        </div>
        <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
          <span className="gradient-text">{playbook.title}</span>
        </h1>
        <p className="mt-4 text-lg leading-snug tracking-tight text-foreground md:text-2xl">
          {playbook.subtitle}
        </p>
        <p className="mt-8 text-base leading-relaxed text-muted md:text-lg md:leading-[1.7]">
          {playbook.hook}
        </p>
      </div>

      <section className="border-t border-border/50 py-10">
        <h2 className="text-xs font-mono uppercase tracking-[0.22em] text-accent">
          {playbook.premise.title}
        </h2>
        <p className="mt-4 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          {playbook.premise.lead}
        </p>
        <p className="mt-5 text-base leading-relaxed text-muted md:text-lg md:leading-[1.7]">
          {playbook.premise.body}
        </p>
      </section>

      {playbook.phases.map((phase) => (
        <section
          key={phase.id}
          id={phase.id}
          className="print-block border-t border-border/50 py-10"
        >
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-4xl">
              {phase.range}
            </h2>
            <span className="text-base text-accent md:text-lg">·</span>
            <span className="text-base text-accent md:text-lg">{phase.tagline}</span>
          </div>

          <ul className="mt-8 space-y-7">
            {phase.items.map((item, i) => (
              <li key={i}>
                <span className="text-base font-semibold text-foreground md:text-lg">
                  {item.heading}
                </span>{" "}
                <span className="text-base leading-relaxed text-muted md:text-lg md:leading-[1.7]">
                  {item.body}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-xl border border-accent/30 bg-accent/8 p-5">
            <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-accent">
              Output
            </div>
            <p className="mt-2 text-base leading-relaxed text-foreground/90 md:text-lg md:leading-[1.65]">
              {phase.output}
            </p>
          </div>
        </section>
      ))}

      <section className="border-t border-border/50 py-10">
        <h2 className="text-xs font-mono uppercase tracking-[0.22em] text-accent">
          {playbook.donts.title}
        </h2>
        <ul className="mt-6 space-y-3">
          {playbook.donts.items.map((d) => (
            <li
              key={d}
              className="flex gap-3 text-base leading-relaxed text-foreground/90 md:text-lg md:leading-[1.65]"
            >
              <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              {d}
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-border/50 py-10">
        <h2 className="text-xs font-mono uppercase tracking-[0.22em] text-accent">
          {playbook.closing.title}
        </h2>
        <p className="mt-4 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          {playbook.closing.lead}
        </p>
        {playbook.closing.paragraphs.map((p, i) => (
          <p
            key={i}
            className="mt-5 text-base leading-relaxed text-muted md:text-lg md:leading-[1.7]"
          >
            {p}
          </p>
        ))}
      </section>

      <LongformFooter
        callToAction="Want to talk about how this maps to your role? I'm a 15-minute conversation away."
        companion={
          companionEssay
            ? {
                eyebrow: "Companion essay",
                href: `/essays/${companionEssay.slug}`,
                label: `${companionEssay.title} ${companionEssay.subtitle}`,
              }
            : undefined
        }
      />
    </article>
  );
}
