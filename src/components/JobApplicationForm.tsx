"use client";

import { useState } from "react";
import { deliver, sendSubmissionEmail } from "@/lib/emailjs";

type JobApplicationFormProps = {
  jobId: number;
  /** Shown in the notification email. */
  jobTitle?: string;
  action: (formData: FormData) => Promise<unknown>;
};

export function JobApplicationForm({ jobId, jobTitle = "", action }: JobApplicationFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.set("jobId", String(jobId));
    if (String(formData.get("website") ?? "")) {
      setSubmitted(true); // honeypot filled → bot
      return;
    }
    const v = (k: string) => String(formData.get(k) ?? "");
    setPending(true);
    try {
      await deliver(
        () =>
          sendSubmissionEmail({
            formType: "job application",
            name: v("fullName"),
            replyTo: v("email"),
            fields: {
              Role: jobTitle ? `${jobTitle} (#${jobId})` : `Job #${jobId}`,
              Name: v("fullName"),
              Email: v("email"),
              Phone: v("phone"),
              Experience: v("experience"),
              Note: v("coverNote"),
            },
          }),
        () => action(formData)
      );
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setPending(false);
    }
  }

  if (submitted) {
    return (
      <div role="status" className="border border-green p-6 bg-green/5">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-green mb-2">
          Application received
        </p>
        <p className="editorial text-xl text-ink leading-tight">
          Someone from our team will be in touch.
        </p>
        <p className="mt-3 text-[13px] leading-relaxed text-ink/75">
          A person at Job Nexus HR reads every application — you won&apos;t get an auto-reply.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {/* Honeypot: hidden from people; bots that fill it are dropped silently */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
      <div>
        <label htmlFor="apply-fullName" className="block font-mono text-[10px] uppercase tracking-[0.18em] text-muted mb-2">
          Full name <span aria-hidden className="text-dark-green">*</span>
        </label>
        <input required id="apply-fullName" name="fullName" className="field-input" />
      </div>
      <div>
        <label htmlFor="apply-email" className="block font-mono text-[10px] uppercase tracking-[0.18em] text-muted mb-2">
          Email <span aria-hidden className="text-dark-green">*</span>
        </label>
        <input required type="email" id="apply-email" name="email" className="field-input" />
      </div>
      <div>
        <label htmlFor="apply-phone" className="block font-mono text-[10px] uppercase tracking-[0.18em] text-muted mb-2">
          Phone <span aria-hidden className="text-dark-green">*</span>
        </label>
        <input required type="tel" id="apply-phone" name="phone" className="field-input" />
      </div>
      <div>
        <label htmlFor="apply-experience" className="block font-mono text-[10px] uppercase tracking-[0.18em] text-muted mb-2">
          Experience (optional)
        </label>
        <input
          id="apply-experience" name="experience"
          placeholder="e.g. 4 years"
          className="field-input"
        />
      </div>
      <div>
        <label htmlFor="apply-coverNote" className="block font-mono text-[10px] uppercase tracking-[0.18em] text-muted mb-2">
          Note (optional)
        </label>
        <textarea id="apply-coverNote" name="coverNote" rows={3} className="field-input resize-none" />
      </div>
      {error && (
        <p role="alert" className="border-l-2 border-red-700 bg-red-700/5 px-4 py-3 text-[13px] text-red-800">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        aria-busy={pending}
        data-cursor="cta"
        className="w-full bg-ink text-off-white border border-ink hover:bg-green hover:text-ink hover:border-green px-5 py-4 font-mono text-[11px] uppercase tracking-[0.18em] transition-all duration-500 disabled:opacity-50"
      >
        {pending ? "Sending…" : "Submit application →"}
      </button>
    </form>
  );
}
