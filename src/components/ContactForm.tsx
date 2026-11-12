"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { CONTACT } from "@/lib/site";
import { deliver, sendSubmissionEmail } from "@/lib/emailjs";
import { JNIcon, type IconName } from "./icons/JNIcon";

type ContactFormProps = {
  action: (formData: FormData) => Promise<unknown>;
  types: { value: string; label: string }[];
};

/** Line icons used inside the fields (24px grid, 1.6 stroke). */
const ICONS = {
  user: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 0 1 14 0",
  mail: "M4 6h16v12H4zM4 7l8 6 8-6",
  phone:
    "M6.6 3.5h2.6l1.3 3.6-1.8 1.2a11 11 0 0 0 5 5l1.2-1.8 3.6 1.3v2.6a2 2 0 0 1-2.2 2A15.5 15.5 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2Z",
  building: "M5 20V4h9v16M14 9h5v11M8 8h3M8 12h3M8 16h3M3 20h18",
  send: "M21 3 10 14M21 3l-7 18-4-7-7-4z",
  check: "M5 12.5 10 17l9-10",
  lock: "M7 11V8a5 5 0 0 1 10 0v3M5 11h14v10H5z",
};

function Icon({ d, className = "h-5 w-5" }: { d: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={d} />
    </svg>
  );
}

/** Inquiry options: icon, one-line hint, and quick prompts for the message box. */
const KIND: Record<string, { icon: IconName; hint: string; prompts: string[]; placeholder: string; company: string }> = {
  employer: {
    icon: "employer",
    hint: "Roles to fill",
    prompts: ["Roles", "Number of people", "Location", "Start date"],
    placeholder: "Which roles, how many people, where and by when?",
    company: "Company",
  },
  candidate: {
    icon: "candidate",
    hint: "Find a job",
    prompts: ["Role I want", "Experience", "Preferred city", "Notice period"],
    placeholder: "What kind of role are you looking for, and where?",
    company: "Current company",
  },
  partnership: {
    icon: "nexus",
    hint: "Work together",
    prompts: ["Organisation", "What you have in mind"],
    placeholder: "Tell us about your organisation and the idea.",
    company: "Organisation",
  },
  other: {
    icon: "message",
    hint: "Anything else",
    prompts: ["My question"],
    placeholder: "How can we help?",
    company: "Company",
  },
};

/** Floating-label field: the label sits inside the box and lifts when you type or focus. */
function Field({
  id,
  name,
  label,
  icon,
  type = "text",
  required,
  autoComplete,
  onInput,
}: {
  id: string;
  name: string;
  label: React.ReactNode;
  icon: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  onInput?: () => void;
}) {
  return (
    <div className="group relative">
      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink/40 transition-colors group-focus-within:text-green">
        <Icon d={icon} />
      </span>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        placeholder=" "
        onInput={onInput}
        className="peer block w-full rounded-2xl border border-ink/12 bg-white pb-2.5 pl-12 pr-4 pt-6 text-[16px] text-ink outline-none transition-[border-color,box-shadow] duration-300 focus:border-green focus:shadow-[0_0_0_4px_rgba(14,149,106,0.12)] md:text-[15px]"
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-12 top-2 text-[11px] font-medium uppercase tracking-[0.08em] text-ink/55 transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-[15px] peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-placeholder-shown:text-ink/50 peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-[11px] peer-focus:uppercase peer-focus:tracking-[0.08em] peer-focus:text-green"
      >
        {label}
      </label>
    </div>
  );
}

const Step = ({ n, children }: { n: string; children: React.ReactNode }) => (
  <p className="mb-3 flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.12em] text-ink/80">
    <span className="grid h-6 w-6 place-items-center rounded-full bg-green/12 font-mono text-[11px] text-dark-green">{n}</span>
    {children}
  </p>
);

export function ContactForm({ action, types }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [kind, setKind] = useState<string>("");
  const [message, setMessage] = useState("");
  const [done, setDone] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);
  const msgRef = useRef<HTMLTextAreaElement>(null);

  const meta = KIND[kind] ?? KIND.employer;

  // Progress: inquiry type, name, valid email, message.
  function measure(nextKind = kind, nextMessage = message) {
    const f = formRef.current;
    if (!f) return;
    const name = (f.elements.namedItem("name") as HTMLInputElement | null)?.value.trim();
    const email = f.elements.namedItem("email") as HTMLInputElement | null;
    setDone(
      Number(Boolean(nextKind)) +
        Number(Boolean(name)) +
        Number(Boolean(email?.value.trim() && email.validity.valid)) +
        Number(Boolean(nextMessage.trim()))
    );
  }

  function addPrompt(p: string) {
    const next = `${message}${message && !message.endsWith("\n") ? "\n" : ""}${p}: `;
    setMessage(next);
    measure(kind, next);
    requestAnimationFrame(() => {
      const t = msgRef.current;
      if (t) {
        t.focus();
        t.setSelectionRange(next.length, next.length);
      }
    });
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    if (String(formData.get("website") ?? "")) {
      setSubmitted(true); // honeypot filled → bot; pretend it worked
      return;
    }
    const v = (k: string) => String(formData.get(k) ?? "");
    setPending(true);
    try {
      await deliver(
        () =>
          sendSubmissionEmail({
            formType: "website enquiry",
            name: v("name"),
            replyTo: v("email"),
            fields: {
              "Inquiry type": v("subject"),
              Name: v("name"),
              Email: v("email"),
              Phone: v("phone"),
              Company: v("company"),
              Message: v("message"),
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
      <div role="status" className="rounded-3xl bg-gradient-to-br from-green/[0.1] to-white p-8 text-center ring-1 ring-green/25">
        <span className="relative mx-auto grid h-16 w-16 place-items-center rounded-full bg-green text-white">
          <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-green/30 [animation-duration:2s]" />
          <Icon d={ICONS.check} className="relative h-8 w-8" />
        </span>
        <h3 className="editorial mt-6 text-[1.9rem] leading-tight tracking-[-0.03em] text-ink">Message received.</h3>
        <p className="mx-auto mt-3 max-w-sm text-[15px] leading-relaxed text-ink/75">
          A person at Job Nexus HR will reply within one business day.
        </p>
      </div>
    );
  }

  const pct = (done / 4) * 100;

  return (
    <form ref={formRef} onSubmit={onSubmit} onInput={() => measure()}>
      {/* Honeypot: hidden from people; bots that fill it are dropped silently */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
      {/* Progress */}
      <div className="mb-7" aria-live="polite">
        <div className="mb-2 flex items-center justify-between text-[12px] font-medium text-ink/60">
          <span>{done === 4 ? "Ready to send" : "A few quick details"}</span>
          <span className="font-mono text-dark-green">{done}/4</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-ink/[0.06]">
          <div className="h-full rounded-full bg-gradient-to-r from-green to-dark-green transition-[width] duration-500" style={{ width: `${pct}%` }} />
        </div>
      </div>

      {/* 01 — who */}
      <fieldset>
        <legend className="contents">
          <Step n="01">I&apos;m getting in touch because…<span className="text-green">*</span></Step>
        </legend>
        <div className="grid grid-cols-2 gap-3">
          {types.map((t) => {
            const k = KIND[t.value] ?? KIND.other;
            const on = kind === t.value;
            return (
              <label
                key={t.value}
                className={`group relative flex cursor-pointer flex-col items-start gap-3 rounded-2xl border p-3.5 transition-all duration-300 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-green/40 ${
                  on
                    ? "border-green bg-green text-white shadow-[0_16px_30px_-16px_rgba(14,149,106,0.9)]"
                    : "border-ink/12 bg-white hover:-translate-y-0.5 hover:border-green/50"
                }`}
              >
                <input
                  type="radio"
                  name="subject"
                  value={t.label}
                  required
                  className="sr-only"
                  checked={on}
                  onChange={() => {
                    setKind(t.value);
                    measure(t.value);
                  }}
                />
                <span className={`grid h-10 w-10 place-items-center rounded-full ${on ? "bg-white/20" : "bg-green/10"}`}>
                  <JNIcon name={k.icon} className={`h-5 w-5 ${on ? "jn-icon-on-green" : ""}`} />
                </span>
                <span>
                  <span className="block text-[14px] font-semibold leading-tight">{t.label}</span>
                  <span className={`mt-0.5 block text-[12px] ${on ? "text-white/80" : "text-muted"}`}>{k.hint}</span>
                </span>
                {on && (
                  <span className="absolute right-3 top-3 grid h-5 w-5 place-items-center rounded-full bg-white text-green">
                    <Icon d={ICONS.check} className="h-3.5 w-3.5" />
                  </span>
                )}
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* 02 — details */}
      <div className="mt-8">
        <Step n="02">How do we reach you?</Step>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field id="contact-name" name="name" required autoComplete="name" icon={ICONS.user} label={<>Your name <span className="text-green">*</span></>} />
          <Field id="contact-email" name="email" type="email" required autoComplete="email" icon={ICONS.mail} label={<>Email <span className="text-green">*</span></>} />
          <Field id="contact-phone" name="phone" type="tel" autoComplete="tel" icon={ICONS.phone} label="Phone (optional)" />
          <Field id="contact-company" name="company" autoComplete="organization" icon={ICONS.building} label={`${meta.company} (optional)`} />
        </div>
      </div>

      {/* 03 — message */}
      <div className="mt-8">
        <Step n="03">
          <label htmlFor="contact-message">
            What do you need?<span className="text-green">*</span>
          </label>
        </Step>
        <div className="rounded-2xl border border-ink/12 bg-white transition-[border-color,box-shadow] duration-300 focus-within:border-green focus-within:shadow-[0_0_0_4px_rgba(14,149,106,0.12)]">
          <textarea
            ref={msgRef}
            required
            id="contact-message"
            name="message"
            rows={4}
            maxLength={5000}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={kind ? meta.placeholder : "Choose an option above, or just start typing."}
            className="block w-full resize-none rounded-t-2xl bg-transparent px-4 pt-4 text-[16px] leading-relaxed text-ink outline-none placeholder:text-ink/45 md:text-[15px]"
          />
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-ink/[0.06] px-3 py-2.5">
            <div className="flex flex-wrap gap-1.5">
              <span className="self-center pr-1 text-[12px] text-muted">Add:</span>
              {meta.prompts.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => addPrompt(p)}
                  className="rounded-full border border-green/30 bg-green/[0.06] px-2.5 py-1 text-[12px] font-medium text-dark-green transition-colors hover:border-green hover:bg-green hover:text-white"
                >
                  + {p}
                </button>
              ))}
            </div>
            <span className="font-mono text-[11px] text-ink/40">{message.length}/5000</span>
          </div>
        </div>
      </div>

      {error && (
        <p role="alert" className="mt-5 rounded-xl border border-red-700/30 bg-red-700/5 px-4 py-3 text-[14px] text-red-800">
          {error} If it keeps failing, email{" "}
          <a href={`mailto:${CONTACT.email}`} className="underline">{CONTACT.email}</a> or call{" "}
          <a href={`tel:${CONTACT.tel}`} className="underline">{CONTACT.phone}</a>.
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        aria-busy={pending}
        data-cursor="cta"
        className="group relative mt-8 flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-forest px-6 py-4 text-[16px] font-semibold text-white transition-colors duration-500 hover:bg-green disabled:opacity-60"
      >
        <span className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-1">
          <Icon d={ICONS.send} className="h-5 w-5" />
        </span>
        {pending ? "Sending…" : "Send message"}
        <span className="btn-arrow">→</span>
      </button>

      <p className="mt-4 flex items-center justify-center gap-2 text-[13px] text-ink/65">
        <Icon d={ICONS.lock} className="h-4 w-4" />
        Your information is safe with us ·{" "}
        <Link href="/privacy" className="underline underline-offset-2 hover:text-green">
          Privacy
        </Link>
      </p>
    </form>
  );
}
