import { PageHero } from "@/components/PageHero";
import { SignatureLine } from "@/components/SignatureLine";
import { CTASection } from "@/components/CTASection";

export const metadata = {
  title: "Workforce Management — Job Nexus HR",
  description: "Operational workforce management — deployment, attendance, payroll and ongoing workforce coordination.",
};

const STAGES = [
  { code: "01", name: "Requirement", body: "Role, volume and constraints captured by your account manager — not lost in an inbox." },
  { code: "02", name: "People", body: "Sourcing and screening against the same brief, even at high volume." },
  { code: "03", name: "Start", body: "Onboarding and documents completed, ready for day one." },
  { code: "04", name: "Attendance", body: "Daily attendance, shift cover and reconciliation." },
  { code: "05", name: "Support", body: "Grievances, everyday questions and payroll coordination." },
  { code: "06", name: "Continuity", body: "Regular reviews and a focus on keeping good people." },
];

const MODULES = [
  { name: "Shifts & rosters", body: "Plan, rotate and adjust shift patterns as your needs change." },
  { name: "Attendance", body: "Daily attendance from biometrics, an app or supervisor input." },
  { name: "Replacements", body: "Cover arranged when people leave or are unexpectedly absent." },
  { name: "Payroll link", body: "Attendance flows straight into payroll — no manual re-entry." },
  { name: "Grievances", body: "A clear route for workforce concerns, with escalation when needed." },
  { name: "Regular reviews", body: "Scheduled check-ins between your managers and our account team." },
];

export default function WorkforceManagementPage() {
  return (
    <>
      <PageHero
        index="/ Workforce Management"
        label="Workforce management"
        title={
          <>
            Support that starts
            <br />
            <span className="text-green">on day one.</span>
          </>
        }
        description="Attendance, shift cover, payroll questions and grievances — handled every day by our team, so your managers can focus on the work."
        visual={{ asset: "page-workforce", icon: "workforce", label: "Workforce" }}
      />

      {/* Lifecycle — one connected track; the last stage loops back to the first */}
      <section className="bg-off-white py-14 lg:py-24">
        <div className="mx-auto px-6 lg:px-10" style={{ maxWidth: "1480px" }}>
          <div className="grid grid-cols-1 gap-y-6 lg:grid-cols-12 lg:gap-x-8">
            <div className="lg:col-span-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">/ Operations lifecycle</p>
              <h2 className="editorial mt-4 text-[clamp(2rem,4.2vw,3.75rem)] leading-[1] tracking-[-0.035em] text-ink">
                From the first brief
                <br />
                <span className="text-green">to a lasting team.</span>
              </h2>
            </div>
            <p className="max-w-md text-[15px] leading-relaxed text-muted lg:col-span-4 lg:col-start-9 lg:self-end">
              Six stages, one account team. What we learn along the way shapes your next requirement — so you
              never start from zero.
            </p>
          </div>

          <ol className="relative mt-10 grid grid-cols-1 lg:mt-16 lg:grid-cols-6 lg:gap-x-6">
            <span aria-hidden className="absolute left-0 right-0 top-[15px] hidden h-px bg-green/40 lg:block" />
            <span aria-hidden className="absolute bottom-4 left-[15px] top-4 w-px bg-green/40 lg:hidden" />
            {STAGES.map((s, i) => (
              <li key={s.code} className="relative flex gap-5 pb-8 last:pb-0 lg:block lg:pb-0">
                <span
                  className={`relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full border font-mono text-[10px] ${
                    i === STAGES.length - 1
                      ? "border-green bg-green text-off-white"
                      : "border-green bg-off-white text-dark-green"
                  }`}
                >
                  {s.code}
                </span>
                <div className="lg:mt-6 lg:pr-2">
                  <h3 className="editorial text-[1.5rem] leading-tight tracking-[-0.025em] text-ink">{s.name}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-8 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-dark-green lg:justify-end">
            <span aria-hidden className="text-[16px]">↺</span> What we learn shapes the next requirement
          </p>
        </div>
      </section>

      {/* Modules */}
      <section className="bg-ink text-off-white py-14 lg:py-24 border-t border-rule">
        <div className="mx-auto px-6 lg:px-10" style={{ maxWidth: "1480px" }}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-10 gap-x-8 mb-10">
            <div className="lg:col-span-7">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-off-white/50 mb-4">
                / Day-to-day
              </p>
              <h2 className="editorial text-[clamp(2rem,5vw,4.5rem)] leading-[0.98] tracking-[-0.035em] text-off-white">
                Daily control,
                <br />
                <span className="text-green">without the admin.</span>
              </h2>
            </div>
            <div className="lg:col-span-4 lg:col-start-9 lg:pt-12">
              <p className="text-[15px] leading-relaxed text-off-white/70 max-w-sm">
                The everyday tools that keep your workforce steady — run by
                your account team, reported to you.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-off-white/15">
            {MODULES.map((m) => (
              <article key={m.name} className="bg-ink p-8 hover:bg-off-white/[0.03] transition-colors duration-500">
                <h3 className="editorial text-2xl text-off-white leading-tight tracking-[-0.025em] mb-3">
                  {m.name}
                </h3>
                <p className="text-[13px] leading-relaxed text-off-white/65">
                  {m.body}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-14">
            <SignatureLine className="opacity-30" />
          </div>
        </div>
      </section>

      <CTASection
        title="Hand over the day-to-day."
        tone="light"
        subtitle="Attendance, replacements and regular reviews — managed by one account team and reported back to you."
        primaryLabel="Tell us what you need"
      />
    </>
  );
}
