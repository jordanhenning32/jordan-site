"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Building2,
  Calendar,
  Compass,
  Mail,
  MapPin,
  Phone,
  Rocket,
  ShieldCheck,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/primitives/BrandIcons";
import { profile, fitProfile } from "@/data";
import { Section } from "@/components/primitives/Section";
import { ResumePicker } from "@/components/interactive/ResumePicker";
import { track } from "@/lib/analytics";

const FIT_ICONS = {
  building: Building2,
  rocket: Rocket,
};

export function Contact() {
  return (
    <Section
      id="contact"
      eyebrow="Let's talk"
      title="Hiring for federal services delivery? Three ways to evaluate fit."
      description="Paste your JD into the chatbot for a fit map · read the 90-day Playbook to see how Jordan would run the role · book a 15-minute intro below. Calendar is live, resumes are pre-tailored, chatbot is grounded in everything on this site."
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.05fr_1fr]">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.5 }}
          className="glass rounded-2xl p-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-accent/40 bg-accent/10 text-accent">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm uppercase tracking-widest text-accent">Calendly</div>
                <div className="text-base font-semibold">15-minute executive intro</div>
              </div>
            </div>
            <a
              href={profile.calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track.calendlyOpened("embed_button")}
              className="rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background"
            >
              Open in tab
            </a>
          </div>
          <div className="mt-5 overflow-hidden rounded-xl border border-border/60">
            <iframe
              src={`${profile.calendlyUrl}?hide_gdpr_banner=1&background_color=0a1224&text_color=eef2ff&primary_color=38bdf8`}
              title="Schedule with Jordan"
              className="h-[640px] w-full bg-background-elev"
              loading="lazy"
            />
          </div>
        </motion.div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="glass relative overflow-hidden rounded-2xl p-6"
          >
            <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-accent/10 blur-3xl" />
            <div className="flex items-center gap-2 text-sm uppercase tracking-widest text-accent">
              <Compass className="h-4 w-4" />
              Currently exploring
            </div>
            <p className="mt-3 text-sm leading-relaxed text-foreground/90">
              {profile.availability}
            </p>
            <Link
              href="/playbook"
              className="group mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-foreground"
            >
              Want a sense of how I'd run the role? Read the 90-day playbook
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>

            <div className="mt-6 border-t border-border/50 pt-5">
              <div className="text-xs font-mono uppercase tracking-[0.22em] text-accent">
                Where I want to play
              </div>

              <div className="mt-4 space-y-4">
                {fitProfile.bestFit.map((item) => {
                  const Icon = FIT_ICONS[item.icon];
                  return (
                    <div key={item.title} className="flex gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-accent/30 bg-accent/10 text-accent">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-semibold text-foreground">
                          {item.title}
                        </div>
                        <p className="mt-1 text-xs leading-relaxed text-muted">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 rounded-xl border border-border/50 bg-background-elev/40 p-4">
                <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-muted">
                  Less of a fit
                </div>
                <p className="mt-2 text-xs leading-relaxed text-muted">
                  {fitProfile.lessIdealFit.join(" · ")}
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3 border-t border-border/50 pt-4 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted" />
                <div className="text-xs leading-relaxed text-muted">
                  <div className="text-foreground">Work arrangement</div>
                  <div className="mt-1">{profile.workArrangement}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-muted" />
                <div className="text-xs leading-relaxed text-muted">
                  <div className="text-foreground">Federal eligibility</div>
                  <div className="mt-1">
                    <span className="font-medium text-foreground/90">{profile.clearance}</span> ·
                    {" "}
                    {profile.clearanceDetail}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass rounded-2xl p-6"
          >
            <div className="text-sm uppercase tracking-widest text-accent">Direct contact</div>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted" />
                <a
                  className="hover:text-accent"
                  href={`mailto:${profile.email}`}
                  onClick={() => track.externalLinkClicked("email", "contact_card")}
                >
                  {profile.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted" />
                <a
                  className="hover:text-accent"
                  href={`tel:${profile.phone.replace(/\D/g, "")}`}
                  onClick={() => track.externalLinkClicked("phone", "contact_card")}
                >
                  {profile.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <GithubIcon className="h-4 w-4 text-muted" />
                <a
                  className="hover:text-accent"
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track.externalLinkClicked("github", "contact_card")}
                >
                  github.com/{profile.githubHandle}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <LinkedinIcon className="h-4 w-4 text-muted" />
                <a
                  className="hover:text-accent"
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track.externalLinkClicked("linkedin", "contact_card")}
                >
                  LinkedIn
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-muted" />
                {profile.location}
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass rounded-2xl p-6"
          >
            <ResumePicker />
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
