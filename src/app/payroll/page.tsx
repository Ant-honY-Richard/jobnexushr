import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";

export const metadata = {
  title: "Payroll Outsourcing & PF/ESI Management in India | Job Nexus HR",
  description:
    "Put your workforce on Job Nexus HR payroll: monthly salaries, PF and ESI filings, attendance input and exits handled end to end, with full visibility for you.",
  alternates: { canonical: "/payroll" },
};

const SCOPE = [
  { code: "01", name: "Payroll", body: "Monthly salary processing and reconciliation." },
  { code: "02", name: "PF", body: "Provident Fund contribution, filing and employee records." },
  { code: "03", name: "ESI", body: "ESI contribution, employee registration and ongoing compliance." },
  { code: "04", name: "Attendance", body: "Daily attendance collected and fed into payroll." },
  { code: "05", name: "Exits", body: "Resignations, full-and-final settlements and documentation." },
  { code: "06", name: "Workforce admin", body: "Everyday administration, from onboarding to exit." },
];

const CYCLE = [
  { name: "Attendance in", body: "Daily attendance and shift data collected for payroll." },
  { name: "Payroll run", body: "Salaries processed for every worker on our payroll." },
  { name: "Statutory", body: "PF and ESI contributions and filings, with employee records kept current." },
  { name: "Reconcile & report", body: "Monthly reconciliation and reporting back to your team." },
];

export default function PayrollPage() {
  return (
    <>
      <PageHero
        index="/ Payroll"
        label="Managed payroll"
        title={
          <>
            Payroll handled.
            <br />
            <span className="text-green">Every month.</span>
          </>
        }
        description="Your workers can be employed on the Job Nexus HR payroll. We handle salaries, statutory contributions, attendance input and exits — you keep full visibility."
        visual={{ asset: "page-payroll", icon: "payroll", label: "Payroll" }}
      />

      {/* Monthly cycle — the order the work actually happens in */}
      <section className="bg-ink py-14 text-off-white lg:py-24">
        <div className="mx-auto px-6 lg:px-10" style={{ maxWidth: "1480px" }}>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-off-white/50">/ Every month</p>
          <h2 className="editorial mt-4 max-w-3xl text-[clamp(2rem,4.2vw,3.75rem)] leading-[1] tracking-[-0.035em] text-off-white">
            One cycle,
            <br />
            <span className="text-green">every month.</span>
          </h2>
          <ol className="mt-10 grid grid-cols-1 border-t border-off-white/20 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
            {CYCLE.map((c, i) => (
              <li
                key={c.name}
                className={`relative border-b border-off-white/15 py-8 sm:pr-8 lg:border-b-0 lg:py-10 ${i > 0 ? "lg:border-l lg:pl-8" : ""}`}
              >
                <span className="font-mono text-[11px] tracking-[0.18em] text-green">Step 0{i + 1}</span>
                <h3 className="editorial mt-4 text-[1.7rem] leading-tight tracking-[-0.03em] text-off-white">{c.name}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-off-white/70">{c.body}</p>
                {i < CYCLE.length - 1 && (
                  <span aria-hidden className="absolute right-0 top-10 hidden font-mono text-green lg:block">→</span>
                )}
              </li>
            ))}
          </ol>
          <p className="mt-8 max-w-xl text-[13px] leading-relaxed text-off-white/60">
            Exits and full-and-final settlements are handled alongside the cycle whenever someone leaves — documented, not
            improvised.
          </p>
        </div>
      </section>

      <section className="bg-off-white py-14 lg:py-24 border-t border-rule">
        <div className="mx-auto px-6 lg:px-10" style={{ maxWidth: "1480px" }}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-10 gap-x-8">
            <div className="lg:col-span-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted mb-4">
                / What&apos;s included
              </p>
              <h2 className="editorial text-[clamp(2rem,4.5vw,4rem)] leading-[1] tracking-[-0.035em] text-ink">
                Your people.
                <br />
                <span className="text-green">Our payroll.</span>
              </h2>
              <p className="mt-6 text-[15px] leading-relaxed text-muted max-w-md">
                Your workers are paid and covered through us. You get clear
                monthly reporting — without running payroll, filings and exits
                in-house.
              </p>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <div className="border border-ink/15 bg-ink/[0.02]">
                <div className="flex items-center justify-between border-b border-ink/15 px-5 py-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                    Six areas we manage
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-green">
                    Included
                  </span>
                </div>
                <ul className="divide-y divide-rule">
                  {SCOPE.map((s) => (
                    <li
                      key={s.code}
                      className="grid grid-cols-12 gap-4 px-5 py-4"
                    >
                      <span className="col-span-2 font-mono text-[11px] uppercase tracking-[0.18em] text-green">
                        {s.code}
                      </span>
                      <span className="col-span-10 sm:col-span-3 editorial text-lg text-ink">
                        {s.name}
                      </span>
                      <span className="col-span-12 sm:col-span-7 text-[13px] text-muted">
                        {s.body}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Move your workforce payroll to us."
        subtitle="Steady pay for your workers, less admin for your team — with one account manager responsible."
        primaryLabel="Talk to us about payroll"
      />
    </>
  );
}
