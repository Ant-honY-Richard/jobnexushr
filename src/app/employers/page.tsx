import { PageHero } from "@/components/PageHero";
import { SignatureLine } from "@/components/SignatureLine";
import { CTASection } from "@/components/CTASection";
import { ServiceFinder } from "@/components/ServiceFinder";

export const metadata = {
  title: "For Employers — Job Nexus HR",
  description: "Workforce partner for organizations that need dependable people and structured deployment across all industries.",
};

const JOURNEY = [
  {
    code: "01",
    name: "Tell us",
    body: "Share the roles, numbers, locations and deadlines. A person reads it — not a ticket system.",
  },
  {
    code: "02",
    name: "Understand",
    body: "We confirm the details, ask what went wrong before and agree what success looks like.",
  },
  {
    code: "03",
    name: "Build",
    body: "We plan sourcing, screening, start dates, attendance and support — all under one account manager.",
  },
  {
    code: "04",
    name: "Deploy",
    body: "Start dates are coordinated, with documents and onboarding in order.",
  },
  {
    code: "05",
    name: "Support",
    body: "Payroll, attendance, grievances and escalations — all handled by the same account team.",
  },
];

const NEEDS = [
  {
    code: "01",
    name: "Understanding",
    body: "We understand the role before we send anyone. Your brief is captured, not guessed.",
  },
  {
    code: "02",
    name: "Consistency",
    body: "Your account doesn't restart when people change. Same contact, same history.",
  },
  {
    code: "03",
    name: "Responsiveness",
    body: "When your needs change, we adjust quickly — without paperwork getting in the way.",
  },
  {
    code: "04",
    name: "Accountability",
    body: "We tell you what we can fill — and what we can't. Honesty comes first.",
  },
  {
    code: "05",
    name: "Continuity",
    body: "We aim for a long relationship, not a one-off placement.",
  },
];

export default function EmployersPage() {
  return (
    <>
      <PageHero
        index="/ For Employers"
        label="For employers"
        title={
          <>
            Hiring made simple.
            <br />
            <span className="text-green">Support that stays.</span>
          </>
        }
        description="For businesses that need dependable people — one specialist or a full site — and a partner who stays accountable after they start."
        visual={{ asset: "page-employers", icon: "employer", label: "For Employers" }}
      />

      {/* Journey */}
      <section className="bg-off-white py-14 lg:py-24 border-t border-rule overflow-hidden">
        <div className="mx-auto px-6 lg:px-10" style={{ maxWidth: "1480px" }}>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted mb-4">
            / Employer journey
          </p>
          <h2 className="editorial text-[clamp(2rem,4.5vw,4rem)] leading-[1] tracking-[-0.035em] text-ink max-w-4xl mb-10">
            How we work with
            <br />
            <span className="text-green">your team.</span>
          </h2>

          <div className="relative">
            <div className="absolute left-0 right-0 top-8 h-px bg-rule hidden lg:block" />
            <SignatureLine className="absolute left-0 right-0 top-8 hidden lg:block" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-y-12 gap-x-6">
              {JOURNEY.map((s) => (
                <article
                  key={s.code}
                  className="relative border border-rule bg-off-white p-6 lg:p-8 hover:border-green transition-colors duration-500"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <span className="w-3 h-3 rounded-full bg-off-white border border-green" />
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                      {s.code}
                    </span>
                  </div>
                  <h3 className="editorial text-2xl lg:text-xl xl:text-3xl text-ink leading-tight tracking-[-0.03em] mb-3">
                    {s.name}
                  </h3>
                  <p className="text-[13px] leading-relaxed text-muted">
                    {s.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ServiceFinder
        title={
          <>
            Start from
            <br />
            <span className="text-green">your situation.</span>
          </>
        }
        intro="Choose the line that sounds most like your situation. Services can be combined, and you keep one account manager either way."
      />

      {/* Needs */}
      <section className="bg-ink text-off-white py-14 lg:py-24 border-t border-rule">
        <div className="mx-auto px-6 lg:px-10" style={{ maxWidth: "1480px" }}>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-off-white/50 mb-4">
            / Our commitments
          </p>
          <h2 className="editorial text-[clamp(2rem,5vw,4.5rem)] leading-[0.98] tracking-[-0.035em] text-off-white max-w-4xl mb-10">
            What you can
            <br />
            <span className="text-green">expect from us.</span>
          </h2>

          <div className="space-y-px bg-off-white/15">
            {NEEDS.map((n) => (
              <div
                key={n.code}
                className="group grid grid-cols-12 gap-6 items-baseline bg-ink p-8 lg:p-10 hover:bg-off-white/[0.03] transition-colors duration-500"
              >
                <div className="col-span-2 lg:col-span-1">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-green">
                    {n.code}
                  </span>
                </div>
                <div className="col-span-10 lg:col-span-3">
                  <h3 className="editorial text-[clamp(1.4rem,2.4vw,2rem)] leading-tight tracking-[-0.025em] text-off-white group-hover:text-green transition-colors duration-500">
                    {n.name}
                  </h3>
                </div>
                <div className="col-span-12 lg:col-span-7 lg:col-start-5">
                  <p className="text-[14px] leading-relaxed text-off-white/70 max-w-2xl">
                    {n.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      <CTASection
        title="Tell us what you need."
        subtitle="We'll tell you how we'd handle it — honestly, even if we can't."
        primaryLabel="Tell us what you need"
        secondaryHref="/staffing"
        secondaryLabel="See our services"
        tone="light"
      />
    </>
  );
}
