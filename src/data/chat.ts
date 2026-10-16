// Visitor-facing concierge messages shared by /api/chat and the chat widget.
// No imports: the route's node:test harness loads this file directly.
export const chatCopy = {
  forbidden: "This chat only works from jordanhenning.com.",
  minuteLimit: "You've sent a lot of messages in a short time. Wait a minute and try again.",
  dailyLimit: "You've reached today's limit for the concierge. Email Jordan or book time on Calendly instead.",
  globalLimit: "The concierge has reached its daily limit. Email Jordan or book time on Calendly instead.",
  upstreamError:
    "Sorry — the concierge hit a problem reaching the model. Try again in a moment, or use the email or Calendly link.",
  unavailable: (email: string) =>
    `Sorry — the concierge isn't available right now. Try ${email} or the Calendly link.`,
};
