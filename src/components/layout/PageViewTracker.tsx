"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

/** Fires a one-time custom event on mount. Use to mark long-form content views
 *  (the global pageview from PostHogProvider already fires for every route). */
export function PageViewTracker({
  event,
}: {
  event: "playbook" | { type: "essay"; slug: string };
}) {
  useEffect(() => {
    if (event === "playbook") {
      track.playbookViewed();
    } else {
      track.essayViewed(event.slug);
    }
  }, [event]);

  return null;
}
