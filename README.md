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

### Chat abuse protection
`/api/chat` rejects requests whose Origin/Referer is not jordanhenning.com (localhost is allowed outside production; the deployment's own URL is allowed on Vercel previews) and rate-limits per IP plus a site-wide daily cap.

- **Store:** add "Upstash for Redis" from the Vercel Marketplace and connect it to the project. It injects `UPSTASH_REDIS_REST_URL`/`UPSTASH_REDIS_REST_TOKEN` or `KV_REST_API_URL`/`KV_REST_API_TOKEN`; either pair works, but only as a complete pair (URL and token both set, Upstash pair preferred). Without them the limiter is per-instance memory only (a warning is logged in production), so limits are not shared across serverless instances.
- **Limits (optional env vars):**

| Var | Default | Meaning |
|---|---|---|
| `CHAT_RATE_PER_MINUTE` | 10 | requests per IP per minute (sliding window) |
| `CHAT_RATE_PER_DAY` | 60 | requests per IP per day |
| `CHAT_GLOBAL_PER_DAY` | 300 | requests across all visitors per day |

Counters are keyed on a daily-rotating SHA-256 hash of the IP, never the IP itself, and Upstash analytics are off.

## Tests
```bash
npm test   # guard, route, Redis wiring and documentation tests (Node 22.6+)
PLAYWRIGHT_BROWSERS_PATH=.pipeline/browsers npx playwright install chromium
npm run build
npm run test:e2e   # browser + HTTP checks against local Next.js and a fake model service
```
