import posthog from "posthog-js";

/** Safe wrapper — never throws, no-ops on the server or before init. */
function safeCapture(event: string, props?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  try {
    posthog?.capture?.(event, props);
  } catch {
    // intentionally swallow — analytics must never break the page
  }
}

const JD_KEYWORDS = [
  "responsibilities",
  "qualifications",
  "requirements",
  "must have",
  "ideal candidate",
  "we're looking",
  "we are looking",
  "we're hiring",
  "we are hiring",
  "experience with",
  "background in",
  "preferred qualifications",
  "minimum qualifications",
  "what you'll do",
  "what you will do",
  "about the role",
  "about the position",
  "the team",
  "you will",
  "you'll",
];

/** Heuristic: is this message likely a pasted JD or role description?
 *  True if length is large OR moderately large + multi-line + contains JD keywords. */
export function isLikelyJDPaste(text: string): boolean {
  const len = text.length;
  if (len >= 400) return true;
  const lower = text.toLowerCase();
  const matches = JD_KEYWORDS.filter((k) => lower.includes(k)).length;
  const newlines = (text.match(/\n/g) ?? []).length;
  if (len >= 200 && (matches >= 2 || newlines >= 2)) return true;
  return false;
}

export const track = {
  // Chatbot
  chatbotOpened: () => safeCapture("chatbot_opened"),
  chatbotMessageSent: (props: { messageLength: number; messageIndex: number }) =>
    safeCapture("chatbot_message_sent", props),
  chatbotLikelyJDPaste: (props: { messageLength: number }) =>
    safeCapture("chatbot_likely_jd_paste", props),

  // Resume
  resumeRoleSelected: (roleId: string) =>
    safeCapture("resume_role_selected", { roleId }),
  resumeDownloaded: (props: { roleId: string; format: "pdf" | "docx" }) =>
    safeCapture("resume_downloaded", props),

  // Contact / outbound
  calendlyOpened: (source: "embed_button" | "hero_cta" | "playbook_cta" | "essay_cta") =>
    safeCapture("calendly_opened", { source }),
  externalLinkClicked: (
    destination: "github" | "linkedin" | "email" | "phone" | "calendly_external",
    source?: string,
  ) => safeCapture("external_link_clicked", { destination, source }),

  // Long-form content
  playbookViewed: () => safeCapture("playbook_viewed"),
  essayViewed: (slug: string) => safeCapture("essay_viewed", { slug }),
  pdfPrintClicked: (page: "playbook" | "essay") =>
    safeCapture("pdf_print_clicked", { page }),
};
