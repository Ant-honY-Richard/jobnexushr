"use client";

import { useState } from "react";
import { CONTACT, NO_FEE, whatsappLink } from "@/lib/site";
import { emailEnabled, sendSubmissionEmail } from "@/lib/emailjs";

const JOB_TYPES = [
  "Warehouse & logistics",
  "Delivery & driving",
  "Retail & store",
  "Manufacturing & production",
  "Customer support / BPO",
  "Office & back-office",
  "IT & technology",
  "Healthcare support",
  "Hospitality",
  "Other",
];

const EXPERIENCE = ["Fresher", "Less than 1 year", "1–3 years", "3–5 years", "5+ years"];

const label = "mb-2 block text-[14px] font-medium text-ink";
const field =
  "w-full rounded-xl border border-ink/12 bg-white px-4 py-3.5 text-[16px] text-ink outline-none transition-[border-color,box-shadow] duration-300 placeholder:text-muted/80 focus:border-green focus:shadow-[0_0_0_3px_rgba(14,149,106,0.14)] md:text-[15px]";
const Req = () => <span className="text-green"> *</span>;

/** 30-second candidate registration: emailed to the team via EmailJS (no database needed). */
export function RegisterForm() {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    if (String(f.get("website") ?? "")) return setState("done"); // honeypot
    const v = (k: string) => String(f.get(k) ?? "").trim();
    setState("sending");
    try {
      if (!emailEnabled) throw new Error("EmailJS not configured");
      await sendSubmissionEmail({
        formType: "candidate registration",
        name: v("name"),
        replyTo: v("email") || CONTACT.email,
        fields: {
          Name: v("name"),
          Phone: v("phone"),
          City: v("city"),
          "Job type": v("jobType"),
          Experience: v("experience"),
          Email: v("email"),
          "CV link": v("cv"),
          Note: v("note"),
        },
      });
      setState("done");
    } catch (err) {
      console.error(err);
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div role="status" className="rounded-3xl bg-gradient-to-br from-green/[0.1] to-white p-8 text-center ring-1 ring-green/25">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-green text-white">
          <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M5 12.5 10 17l9-10" />
          </svg>
        </span>
        <h3 className="editorial mt-6 text-[1.9rem] leading-tight tracking-[-0.03em] text-ink">You&apos;re registered.</h3>
        <p className="mx-auto mt-3 max-w-sm text-[15px] leading-relaxed text-ink/75">
          A recruiter will call you when a role matches. {NO_FEE}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit}>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="reg-name" className={label}>Full name<Req /></label>
          <input id="reg-name" name="name" required autoComplete="name" placeholder="Your name" className={field} />
        </div>
        <div>
          <label htmlFor="reg-phone" className={label}>Phone (WhatsApp)<Req /></label>
          <input id="reg-phone" name="phone" type="tel" required autoComplete="tel" inputMode="tel" placeholder="10-digit mobile" pattern="[0-9+\s-]{10,15}" className={field} />
        </div>
        <div>
          <label htmlFor="reg-city" className={label}>City<Req /></label>
          <input id="reg-city" name="city" required autoComplete="address-level2" placeholder="e.g. Bangalore" className={field} />
        </div>
        <div>
          <label htmlFor="reg-type" className={label}>Job you want<Req /></label>
          <select id="reg-type" name="jobType" required defaultValue="" className={`${field} cursor-pointer`}>
            <option value="" disabled>Choose one</option>
            {JOB_TYPES.map((j) => (
              <option key={j}>{j}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="reg-exp" className={label}>Experience</label>
          <select id="reg-exp" name="experience" defaultValue="" className={`${field} cursor-pointer`}>
            <option value="">Choose one</option>
            {EXPERIENCE.map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="reg-email" className={label}>Email <span className="font-normal text-muted">(optional)</span></label>
          <input id="reg-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" className={field} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="reg-cv" className={label}>CV link <span className="font-normal text-muted">(optional — Google Drive or similar)</span></label>
          <input id="reg-cv" name="cv" type="url" placeholder="https://" className={field} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="reg-note" className={label}>Anything else <span className="font-normal text-muted">(optional)</span></label>
          <textarea id="reg-note" name="note" rows={3} placeholder="Shift you prefer, when you can start…" className={`${field} resize-none`} />
        </div>
      </div>

      {state === "error" && (
        <p role="alert" className="mt-5 rounded-xl border border-red-700/30 bg-red-700/5 px-4 py-3 text-[14px] text-red-800">
          Sorry, that didn&apos;t send. Please message us on{" "}
          <a className="underline" href={whatsappLink("Hi Job Nexus HR, I'd like to register for jobs.")} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>{" "}
          or call <a className="underline" href={`tel:${CONTACT.tel}`}>{CONTACT.phone}</a>.
        </p>
      )}

      <button
        type="submit"
        disabled={state === "sending"}
        aria-busy={state === "sending"}
        className="mt-7 flex w-full items-center justify-center gap-3 rounded-2xl bg-forest px-6 py-4 text-[16px] font-semibold text-white transition-colors duration-500 hover:bg-green disabled:opacity-60"
      >
        {state === "sending" ? "Sending…" : "Register for jobs"} <span aria-hidden>→</span>
      </button>
      <p className="mt-4 text-center text-[13px] text-ink/70">
        <span className="font-semibold text-dark-green">{NO_FEE}</span> Your details are only used to match you with jobs.
      </p>
    </form>
  );
}
