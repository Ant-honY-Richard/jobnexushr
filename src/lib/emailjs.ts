/**
 * EmailJS — sends every form submission to the Job Nexus HR inbox.
 *
 * Uses EmailJS's REST endpoint directly (same thing the @emailjs/browser package calls), so there is
 * no extra dependency. Keys come from NEXT_PUBLIC_EMAILJS_* env vars (see .env.example and
 * EMAILJS-SETUP.md). Without them `emailEnabled` is false and forms fall back to the database only.
 *
 * The recipient is passed as `to_email`: in the EmailJS template set **To Email** to `{{to_email}}`
 * (or type the address there directly).
 */
export const NOTIFY_EMAIL = "anthonyrichard@jobnexushr.com";

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "";
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "";

export const emailEnabled = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);

/** Turns a submission into a readable plain-text block for the email body (`{{details}}`). */
function toDetails(fields: Record<string, string>) {
  return Object.entries(fields)
    .filter(([, v]) => v && v.trim())
    .map(([k, v]) => `${k}: ${v.trim()}`)
    .join("\n");
}

export async function sendSubmissionEmail(opts: {
  formType: string;
  /** Visitor's address — used as Reply-To so you can answer straight from your inbox. */
  replyTo: string;
  name: string;
  /** Labelled fields shown in the email, in this order. */
  fields: Record<string, string>;
}) {
  if (!emailEnabled) throw new Error("EmailJS is not configured");
  const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: SERVICE_ID,
      template_id: TEMPLATE_ID,
      user_id: PUBLIC_KEY,
      template_params: {
        to_email: NOTIFY_EMAIL,
        form_type: opts.formType,
        from_name: opts.name,
        reply_to: opts.replyTo,
        subject: `New ${opts.formType} — ${opts.name}`,
        details: toDetails(opts.fields),
        page_url: typeof window !== "undefined" ? window.location.href : "",
        submitted_at: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
        ...opts.fields,
      },
    }),
  });
  if (!res.ok) throw new Error(`EmailJS ${res.status}: ${await res.text()}`);
}

/**
 * Sends the email and saves to the database side by side. The visitor sees success if either one
 * worked, so a missing database (or a temporary EmailJS hiccup) does not lose the enquiry.
 */
export async function deliver(email: () => Promise<void>, save: () => Promise<unknown>) {
  const results = await Promise.allSettled([emailEnabled ? email() : Promise.reject(new Error("email off")), save()]);
  results.forEach((r) => r.status === "rejected" && console.warn(r.reason));
  if (results.every((r) => r.status === "rejected")) throw new Error("Submission failed");
}
