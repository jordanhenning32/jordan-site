import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { essayBySlug, playbook, profile } from "@/data";
import { PageViewTracker } from "@/components/layout/PageViewTracker";
import { LongformHeader, LongformFooter } from "@/components/layout/LongformShell";

const essay = essayBySlug("vision-over-syntax");

export const metadata: Metadata = essay
  ? {
      title: `${essay.title} ${essay.subtitle}`,
      description: essay.intro[0],
      openGraph: {
        type: "article",
        title: `${essay.title} ${essay.subtitle}`,
        description: essay.intro[0],
        siteName: profile.name,
        authors: [profile.name],
      },
      twitter: {
        card: "summary_large_image",
        title: `${essay.title} ${essay.subtitle}`,
        description: essay.intro[0],
      },
    }
  : {};

export default function VisionOverSyntaxEssay() {
  if (!essay) notFound();

  return (
    <article className="print-document mx-auto flex max-w-3xl flex-col px-6 pb-24">
      <PageViewTracker event={{ type: "essay", slug: "vision-over-syntax" }} />
      <LongformHeader page="essay" />

      <div className="mb-14">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/70 bg-background-elev/60 px-3 py-1 text-xs font-medium uppercase tracking-[0.22em] text-accent">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          {essay.eyebrow}
        </div>
        <h1 className="text-balance text-3xl font-semibold leading-[1.08] tracking-tight md:text-5xl lg:text-[3.4rem]">
          <span className="gradient-text">{essay.title}</span>
        </h1>
        <p className="mt-4 text-balance text-xl leading-snug tracking-tight text-foreground md:text-3xl md:leading-[1.15]">
          {essay.subtitle}
        </p>
        <div className="mt-10 space-y-5">
          {essay.intro.map((p, i) => (
            <p
              key={i}
              className="text-base leading-relaxed text-muted md:text-lg md:leading-[1.7]"
            >
              {p}
            </p>
          ))}
        </div>
      </div>

      {essay.sections.map((section) => (
        <section
          key={section.heading}
          className="print-block border-t border-border/50 py-10"
        >
          <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            {section.heading}
          </h2>
          <div className="mt-6 space-y-5">
            {section.paragraphs.map((p, i) => (
              <p
                key={i}
                className="text-base leading-relaxed text-foreground/90 md:text-lg md:leading-[1.7]"
              >
                {p}
              </p>
            ))}
          </div>
        </section>
      ))}

      <LongformFooter
        callToAction="If this thesis maps to a role you're hiring for, I'm a 15-minute conversation away."
        companion={{
          eyebrow: "Companion playbook",
          href: "/playbook",
          label: `${playbook.title} ${playbook.subtitle}`,
        }}
      />
    </article>
  );
}
