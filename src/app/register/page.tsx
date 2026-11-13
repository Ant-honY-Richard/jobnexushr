import Link from "next/link";
import { RegisterForm } from "@/components/RegisterForm";
import { CONTACT, NO_FEE, whatsappLink } from "@/lib/site";

export const metadata = {
  title: "Register for jobs — Job Nexus HR",
  description:
    "Register once in 30 seconds and a recruiter will call you when a matching job opens. Free for candidates — we never charge any fee.",
};

const STEPS = [
  { title: "Register", body: "Name, phone, city and the job you want — about 30 seconds." },
  { title: "We call you", body: "A recruiter gets in touch when a role matches you." },
  { title: "Interview & join", body: "We help you prepare, and stay reachable after you start." },
];

export default function RegisterPage() {
  return (
    <section
      className="relative overflow-hidden pb-14 pt-28 lg:pb-20 lg:pt-32"
      style={{ background: "linear-gradient(180deg, #F2F8F5 0%, #F6FAF8 45%, #FAF9F7 100%)" }}
    >
      <div
        className="relative mx-auto grid grid-cols-1 items-start gap-y-10 px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-x-14 lg:gap-y-8 lg:px-10"
        style={{ maxWidth: "1480px" }}
      >
        {/* Intro + safety promise (first on every screen) */}
        <div className="max-lg:order-1 lg:col-start-1 lg:row-start-1">
          <span className="inline-flex items-center gap-2 rounded-full border border-green/25 bg-white px-3 py-1.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-dark-green">
            <span className="h-1.5 w-1.5 rounded-full bg-green" aria-hidden />
            For job seekers
          </span>
          <h1
            className="editorial mt-5 text-[clamp(2.6rem,10vw,4rem)] leading-[1] tracking-[-0.04em] text-ink lg:text-[clamp(3rem,4.6vw,4.6rem)]"
            style={{ fontWeight: 700 }}
          >
            Register once.
            <br />
            <span className="text-green">We&apos;ll call you.</span>
          </h1>
          <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-ink/75">
            Tell us the kind of work you want. When a matching role opens with one of our clients, a recruiter
            calls you — no need to keep checking.
          </p>

          {/* Safety promise — the most important line for candidates */}
          <div className="mt-7 flex max-w-lg items-start gap-4 rounded-2xl border border-green/30 bg-white p-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-green text-white">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M12 3 5 6v5c0 4.4 3 8.3 7 9.5 4-1.2 7-5.1 7-9.5V6l-7-3Z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </span>
            <span>
              <span className="block text-[16px] font-semibold text-ink">{NO_FEE}</span>
              <span className="mt-0.5 block text-[14px] leading-relaxed text-ink/70">
                If anyone asks you for money in the name of Job Nexus HR, don&apos;t pay — call us on {CONTACT.phone}.
              </span>
            </span>
          </div>
        </div>

        {/* Steps + alternatives — after the form on phones, under the intro on desktop */}
        <div className="max-lg:order-3 lg:col-start-1 lg:row-start-2">
          <ol className="max-w-lg space-y-3">
            {STEPS.map((s, i) => (
              <li key={s.title} className="flex gap-4">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-green/12 font-mono text-[12px] text-dark-green">
                  {i + 1}
                </span>
                <span className="pt-1">
                  <span className="block text-[15px] font-semibold text-ink">{s.title}</span>
                  <span className="block text-[14px] text-ink/70">{s.body}</span>
                </span>
              </li>
            ))}
          </ol>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={whatsappLink("Hi Job Nexus HR, I'd like to register for jobs. My name is ")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-[15px] font-semibold text-white transition-transform hover:scale-[1.02]"
            >
              Register on WhatsApp instead
            </a>
            <Link href="/candidates" className="py-2 text-[15px] font-medium text-dark-green underline-offset-4 hover:underline">
              How we help candidates →
            </Link>
          </div>
        </div>

        <div className="relative order-none rounded-[28px] border border-white bg-white p-6 shadow-[0_40px_90px_-40px_rgba(4,46,39,0.45)] max-lg:order-2 sm:p-8 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:p-10">
          <h2 className="text-[clamp(1.5rem,2.4vw,2rem)] font-semibold leading-tight tracking-[-0.02em] text-ink">Your details</h2>
          <p className="mb-7 mt-1 text-[15px] text-ink/70">Takes about 30 seconds. Fields with * are required.</p>
          <RegisterForm />
        </div>
      </div>
    </section>
  );
}
