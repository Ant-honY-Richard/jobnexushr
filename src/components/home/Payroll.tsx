"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { SectionHeader } from "../SectionHeader";

const MODULES = ["Payroll", "PF / ESI", "Attendance", "Exits", "Compliance", "Workforce admin"];

const TILES = [
  { label: "Workforce on payroll", value: "Managed" },
  { label: "Statutory cycle", value: "PF · ESI" },
  { label: "Attendance input", value: "Daily" },
  { label: "Exit handling", value: "Coordinated" },
];

const STEPS = [
  { id: "01", scope: "Attendance collected", status: "Input" },
  { id: "02", scope: "Salaries processed", status: "Payroll" },
  { id: "03", scope: "PF and ESI filed", status: "Statutory" },
  { id: "04", scope: "Reconciliation shared with you", status: "Report" },
];

export function Payroll() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0, margin: "0px 0px 30% 0px" });

  return (
    <section
      ref={ref}
      className="relative bg-off-white py-14 lg:py-24 border-t border-rule overflow-hidden"
    >
      <div className="mx-auto px-6 lg:px-10" style={{ maxWidth: "1480px" }}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-10 gap-x-8">
          <div className="lg:col-span-6">
            <SectionHeader
              index="/ 07"
              label="Payroll"
              title={
                <>
                  Your people.
                  <br />
                  <span className="text-green">Our payroll.</span>
                </>
              }
              description="Workers can be employed on the Job Nexus HR payroll — salaries, statutory contributions and admin handled by our team."
            />
          </div>

          <div className="lg:col-span-5 lg:col-start-8 lg:pt-16">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.65, 0, 0.35, 1] }}
              className="text-[15px] leading-relaxed text-muted max-w-md"
            >
              You keep full visibility of your workforce — without running the
              payroll, filings and paperwork yourself.
            </motion.p>
          </div>
        </div>

        {/* Mock payroll UI */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.5, ease: [0.65, 0, 0.35, 1] }}
          className="mt-10 lg:mt-14"
        >
          <div className="overflow-hidden rounded-2xl border border-ink/15 bg-white/60 lg:rounded-none lg:bg-ink/[0.02]">
            {/* Header */}
            <div className="flex items-center justify-between gap-3 border-b border-ink/15 px-4 py-3 sm:px-5">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex shrink-0 gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-ink/15" />
                  <span className="h-2 w-2 rounded-full bg-ink/15" />
                  <span className="h-2 w-2 rounded-full bg-green" />
                </div>
                <span className="truncate font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                  Payroll · Monthly view
                </span>
              </div>
              <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-green">Illustrative</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Modules — scrolling chips on phones, a list on desktop */}
              <div className="border-b border-ink/10 py-4 lg:col-span-3 lg:border-b-0 lg:border-r lg:p-5">
                <p className="mb-3 px-4 font-mono text-[10px] uppercase tracking-[0.18em] text-muted sm:px-5 lg:mb-4 lg:px-0">Modules</p>
                <ul className="no-scrollbar flex gap-2 overflow-x-auto px-4 text-[13px] sm:px-5 lg:flex-col lg:gap-0 lg:space-y-3 lg:overflow-visible lg:px-0">
                  {MODULES.map((m, i) => (
                    <li
                      key={m}
                      className={`flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 lg:rounded-none lg:border-0 lg:p-0 ${
                        i === 0 ? "border-green bg-green/10 text-green" : "border-ink/10 text-ink/70"
                      }`}
                    >
                      <span className={`hidden h-1 w-1 rounded-full lg:block ${i === 0 ? "bg-green" : "bg-ink/30"}`} />
                      {m}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Panel */}
              <div className="p-4 sm:p-6 lg:col-span-9 lg:p-10">
                <div className="mb-5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 lg:mb-8">
                  <h3 className="editorial text-[1.6rem] tracking-[-0.025em] text-ink lg:text-3xl">Payroll operations</h3>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted lg:text-[11px]">Run by Job Nexus HR</span>
                </div>

                <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4 lg:mb-8 lg:gap-4">
                  {TILES.map((c) => (
                    <div key={c.label} className="rounded-xl border border-ink/10 bg-off-white p-3 sm:p-4 lg:rounded-none lg:bg-transparent">
                      <p className="mb-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-muted sm:text-[10px] lg:mb-2">{c.label}</p>
                      <p className="editorial text-[1.2rem] leading-tight text-ink sm:text-2xl">{c.value}</p>
                    </div>
                  ))}
                </div>

                {/* Monthly steps */}
                <div className="rounded-xl border border-ink/10 lg:rounded-none">
                  <div className="flex items-center justify-between border-b border-ink/10 px-4 py-3 sm:px-5">
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">Each month, in order</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-green">4 steps</span>
                  </div>
                  <ol>
                    {STEPS.map((r) => (
                      <li
                        key={r.id}
                        className="flex items-center gap-3 border-b border-ink/10 px-4 py-3.5 text-[14px] last:border-b-0 sm:grid sm:grid-cols-12 sm:gap-4 sm:px-5 sm:py-4 sm:text-[13px]"
                      >
                        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-green/10 font-mono text-[10px] text-dark-green sm:col-span-1 sm:h-auto sm:w-auto sm:place-items-start sm:bg-transparent sm:text-[11px] sm:text-muted">
                          {r.id}
                        </span>
                        <span className="min-w-0 flex-1 text-ink sm:col-span-8">{r.scope}</span>
                        <span className="shrink-0 rounded-full bg-green/10 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-dark-green sm:col-span-3 sm:bg-transparent sm:p-0 sm:text-right sm:text-[11px] sm:tracking-[0.18em]">
                          {r.status}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>

                <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                  Illustrative view · No real pay data is shown
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
