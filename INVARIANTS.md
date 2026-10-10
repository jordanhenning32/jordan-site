# Invariants

Rules that must always hold in this project. Every review checks the diff against each one.

- PostHog init in src/components/layout/PostHogProvider.tsx keeps `persistence: "memory"`.
- PostHog init keeps `disable_session_recording: true`.
- PostHog init keeps `capture_pageview: false`, with pageviews sent manually by PostHogPageView.
- No code calls `posthog.identify`.
- posthog-js is imported only in src/components/layout/PostHogProvider.tsx and src/lib/analytics.ts.
- Analytics calls in src/lib/analytics.ts go through `safeCapture`, which never throws.
- `ANTHROPIC_API_KEY` is read only under src/app/api/.
- No environment variable named `NEXT_PUBLIC_ANTHROPIC*` exists anywhere in src.
- next, react, react-dom and eslint-config-next are pinned to exact versions (no ^ or ~) in package.json.
- package-lock.json is committed and in sync with package.json (`npm ci` works).
- Site copy and data live in src/data/*. Positioning changes also update src/lib/system-prompt.ts.
- Quadratic Digital is never described as an SDVOSB.
- Timeline dates match LinkedIn. "17 years" refers to total federal service.
