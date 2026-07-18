# Jordan Henning — Personal Site

Personal site for AI engineering & delivery leadership roles (federal + commercial). Single-page composition with an animated metrics dashboard, interactive timeline, AI-builds showcase with live screenshots, skills radar, "Battlefield to Boardroom" leadership bridge, tailored resumes, long-form playbook + essay, and a Claude-powered concierge chatbot that answers JD-specific fit questions.

## Stack
- Next.js 16 (App Router, Turbopack) + React 19 + TypeScript
- Tailwind v4
- Framer Motion (scroll-triggered animations)
- Chart.js + react-chartjs-2 (skills radar)
- Anthropic SDK — streaming `/api/chat` on Claude Sonnet 4.6 with prompt caching
- PostHog (cookieless, IP-off, no session recording)

## Run locally
```bash
npm install
cp .env.example .env.local   # add ANTHROPIC_API_KEY + NEXT_PUBLIC_POSTHOG_*
npm run dev
```

Visit http://localhost:3000.

## Edit the content

All site copy and data live in [`src/lib/profile.ts`](src/lib/profile.ts) — single source of truth:

| Export | Drives |
|---|---|
| `profile` | name, contact, Calendly URL, clearance, availability |
| `metrics` | 6 animated dashboard tiles |
| `timeline` | career milestones (newest first) |
| `radarSkills` / `skillMatrix` | competencies + proof bullets |
| `battlefieldToBoardroom` | military → IT mappings |
| `aiBuilds` | RFP Factory + Futures Bot cards (incl. screenshots) |
| `thoughtLeadership` | insight cards |
| `roleResumes` / `universalResumes` | resume picker + downloads |
| `fitProfile` | "where I want to play" filter |
| `awards` / `teamOutcomes` | validation section |
| `playbook` | 90-day VP playbook (`/playbook` route) |
| `essays` | long-form essays (`/essays/[slug]` routes) |

The chatbot's system prompt is hand-authored in [`src/lib/system-prompt.ts`](src/lib/system-prompt.ts) but pulls fact data from `profile.ts`. When positioning changes, update both.

## Resume

The send-ready résumé is `public/resumes/Jordan-Henning-Resume-AI-Delivery.pdf` (one fusion résumé for both the AI-delivery and federal-AI lanes; the download buttons only change the framing a recruiter reads). It is generated with reportlab; regenerate when positioning changes.

## Deploy
Vercel (recommended — zero-config Next.js + streaming):
```bash
npx vercel
# add ANTHROPIC_API_KEY + NEXT_PUBLIC_POSTHOG_KEY + NEXT_PUBLIC_POSTHOG_HOST in dashboard
```
