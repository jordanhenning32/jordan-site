"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import posthog from "posthog-js";

const KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";

let initialized = false;

function initPostHog() {
  if (initialized) return;
  if (typeof window === "undefined") return;
  if (!KEY) return;
  initialized = true;
  posthog.init(KEY, {
    api_host: HOST,
    // Privacy-friendly: no cookies, no localStorage of identifying data.
    persistence: "memory",
    // No IP capture — set on the project too, but belt + suspenders.
    ip: false,
    // We capture pageviews manually in PostHogPageView so client-side route
    // changes are tracked too.
    capture_pageview: false,
    // Pageleave events still fire (used by some funnels).
    capture_pageleave: true,
    // Autocapture for clicks/inputs is fine and lightweight.
    autocapture: true,
    // Do not record sessions — left off intentionally.
    disable_session_recording: true,
    // Anonymous-only person profiles (we never identify users on this site).
    person_profiles: "identified_only",
    // Quiet console in dev unless debugging.
    loaded: () => {
      // intentional no-op
    },
  });
}

function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!initialized) return;
    if (!pathname) return;
    let url = window.location.origin + pathname;
    const qs = searchParams?.toString();
    if (qs) url += `?${qs}`;
    posthog.capture("$pageview", { $current_url: url });
  }, [pathname, searchParams]);

  return null;
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Defer init off the critical render path. PostHog isn't needed for FCP/LCP.
    // requestIdleCallback isn't in Safari, so fall back to setTimeout.
    type IdleSchedulerWindow = Window &
      typeof globalThis & {
        requestIdleCallback?: (cb: () => void, options?: { timeout: number }) => number;
      };
    const w = window as IdleSchedulerWindow;
    const schedule =
      typeof w.requestIdleCallback === "function"
        ? (cb: () => void) => w.requestIdleCallback!(cb, { timeout: 2000 })
        : (cb: () => void) => window.setTimeout(cb, 1);
    const handle = schedule(initPostHog);
    return () => {
      // Best-effort cleanup; both schedulers tolerate missing IDs.
      if (typeof handle === "number") window.clearTimeout(handle);
    };
  }, []);

  return (
    <>
      {children}
      <Suspense fallback={null}>
        <PostHogPageView />
      </Suspense>
    </>
  );
}
