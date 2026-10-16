# PRODUCT.md — jordan-site

## Who it serves
Recruiters, hiring managers and executive search firms looking at Jordan Henning for AI engineering and delivery leadership roles (federal and commercial). Jordan, the solo operator, maintains it.

## What it does
- A single-page personal site: animated metrics dashboard, career timeline, AI-builds showcase with real screenshots, skills radar, "Battlefield to Boardroom" leadership bridge, validation (awards and team outcomes), and a "where I want to play" fit filter.
- Downloadable résumé (one send-ready PDF in `public/resumes/`; the role picker only changes the framing).
- Long-form content: the 90-day playbook (`/playbook`) and essays (`/essays/<slug>`).
- A Claude-powered concierge chatbot (`/api/chat`, streaming, with prompt caching) that answers fit questions for a pasted job description.
- Privacy-respecting analytics through PostHog.

## What it does not do
- No user accounts, sign-in, payments or stored visitor data.
- No session recording, no cookies or identifying storage, no visitor identification.
- No inflated or unverifiable claims.
- The chat API keeps short-lived abuse counters keyed on a daily-rotating hash of the IP (never the IP itself) that expire within 24 hours.

## Non-negotiables (locked rules)
- Read the relevant guide in `node_modules/next/dist/docs/` before writing Next.js code. This Next.js 16 has breaking changes (AGENTS.md).
- Honest claims only: no inflated counts (such as agent counts), and "production" labels only where true.
- LinkedIn is the authoritative record for timeline dates.
- "17 years" means total federal service, not 17 years of IT leadership.
- Quadratic Digital is not an SDVOSB. Never label it as one.
- Job-seeking language stays discreet.
- Site content and data live in `src/data/*`. The chatbot prompt in `src/lib/system-prompt.ts` must be updated whenever positioning changes.
- Analytics: PostHog with persistence "memory", IP discarded, session recording off, pageviews captured manually, no `identify`. Analytics must never break the page; capture calls are wrapped so they never throw.
- `ANTHROPIC_API_KEY` stays on the server (`src/app/api/chat/route.ts`) and is never exposed through `NEXT_PUBLIC_*`.
- next, react, react-dom and eslint-config-next stay pinned to exact versions.

## Tone
Plain, confident and specific. A player-coach leader's voice, backed by evidence, with no hype.

## What "done" means
`npm run lint`, `npx tsc --noEmit`, `npm run build` and `npm test` pass. Pages render on phone and desktop with no console errors. Analytics privacy settings are intact. Every factual claim matches the authoritative record. The change deploys by pushing to master (Vercel).
