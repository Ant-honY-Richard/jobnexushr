"use client";

import Link from "next/link";
import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { SectionHeader } from "../SectionHeader";
import { SignatureLine } from "../SignatureLine";
import { CHAMFER, IconBadge, JNIcon, type IconName } from "../icons/JNIcon";

const INDUSTRIES: { name: string; icon: IconName; roles: string[] }[] = [
  {
    name: "IT & Technology",
    icon: "tech",
    roles: ["Developers", "QA Engineers", "Support", "Analysts", "Infrastructure", "Operations"],
  },
  {
    name: "BFSI",
    icon: "bfsi",
    roles: ["Branch Operations", "Sales", "Compliance", "Customer Service", "Back Office", "Analysts"],
  },
  {
    name: "Healthcare",
    icon: "healthcare",
    roles: ["Clinical Support", "Administration", "Operations", "Healthcare Staff", "Front Office", "Technicians"],
  },
  {
    name: "Pharma",
    icon: "pharma",
    roles: ["Production", "Quality", "Sales", "Regulatory Support", "Distribution", "Research"],
  },
  {
    name: "Manufacturing",
    icon: "manufacturing",
    roles: ["Production Staff", "Quality", "Engineering", "Maintenance", "Operations", "Supervisors"],
  },
  {
    name: "Retail",
    icon: "retail",
    roles: ["Store Operations", "Sales", "Customer Support", "Supervisors", "Warehouse", "Visual Merchandising"],
  },
  {
    name: "E-commerce",
    icon: "ecommerce",
    roles: ["Fulfilment", "Last-Mile", "Sorting", "Returns", "Customer Support", "Operations"],
  },
  {
    name: "Logistics",
    icon: "logistics",
    roles: ["Drivers", "Sorting", "Warehouse", "Last-Mile", "Inventory", "Dispatch"],
  },
  {
    name: "Hospitality",
    icon: "hospitality",
    roles: ["Service Staff", "Front Office", "Housekeeping", "Kitchen", "Supervisors", "Management"],
  },
  {
    name: "Telecom",
    icon: "telecom",
    roles: ["Field Operations", "Sales", "Network", "Customer Service", "Installation", "Support"],
  },
  {
    name: "Construction",
    icon: "construction",
    roles: ["Skilled Labour", "Supervisors", "Site Engineers", "Safety", "Project Support", "Operators"],
  },
  {
    name: "BPO / KPO",
    icon: "bpo",
    roles: ["Customer Support", "Voice", "Back Office", "Operations", "Quality", "Team Leads"],
  },
];

export function Industries() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0, margin: "0px 0px 30% 0px" });
  const current = INDUSTRIES[active];

  return (
    <section
      ref={ref}
      className="relative bg-off-white py-14 lg:py-24 border-t border-rule overflow-hidden"
    >
      <div className="mx-auto px-6 lg:px-10" style={{ maxWidth: "1480px" }}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-10 gap-x-8">
          <div className="lg:col-span-7">
            <SectionHeader
              index="/ 05"
              label="Industries"
              title={
                <>
                  One workforce partner.
                  <br />
                  <span className="text-green">Every industry.</span>
                </>
              }
              description={
                <>
                  Two specialists or two hundred shift workers — every role gets the
                  same care, the same checks and the same account manager. Choose a
                  sector to see the roles we fill.
                </>
              }
            />
          </div>
        </div>

        {/* Industry explorer */}
        <div className="mt-10 lg:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Center mark */}
          <div className="hidden lg:flex lg:col-span-4 items-center justify-center relative">
            <div className="relative w-72 h-72 xl:w-96 xl:h-96">
              <svg
                viewBox="0 0 400 400"
                className="absolute inset-0 w-full h-full orbit-rotate"
              >
                <circle
                  cx="200"
                  cy="200"
                  r="180"
                  fill="none"
                  stroke="rgba(21,22,14,0.06)"
                  strokeWidth="1"
                />
                <circle
                  cx="200"
                  cy="200"
                  r="130"
                  fill="none"
                  stroke="rgba(21,22,14,0.06)"
                  strokeWidth="1"
                />
              </svg>

              <div className="absolute inset-0 grid place-items-center">
                <motion.div
                  key={current.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center gap-5"
                >
                  <span
                    className="grid h-28 w-28 place-items-center bg-green text-ink xl:h-36 xl:w-36"
                    style={{ clipPath: CHAMFER }}
                  >
                    <JNIcon name={current.icon} className="jn-icon-on-green h-14 w-14 xl:h-16 xl:w-16" />
                  </span>
                  <span className="border border-ink/15 bg-off-white px-5 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ink">
                    {current.name}
                  </span>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Industry list */}
          <div className="lg:col-span-4 max-h-[560px] overflow-y-auto no-scrollbar">
            <div className="flex items-center justify-between border-b border-rule pb-3 mb-4 sticky top-0 bg-off-white">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                All Industries
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-green">
                {INDUSTRIES.length} Sectors
              </span>
            </div>
            <ul className="divide-y divide-rule">
              {INDUSTRIES.map((ind, i) => {
                const isActive = i === active;
                return (
                  <li key={ind.name}>
                    <button
                      onMouseEnter={() => setActive(i)}
                      onClick={() => setActive(i)}
                      data-cursor="label"
                      data-cursor-label="View"
                      className={`group w-full text-left flex items-center justify-between gap-4 py-4 transition-colors duration-500 ${isActive ? "text-green" : "text-ink hover:text-ink"}`}
                    >
                      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted w-8">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <JNIcon name={ind.icon} className={`h-6 w-6 shrink-0 transition-colors ${isActive ? "text-green" : "text-ink/60"}`} />
                      <span className={`editorial text-[clamp(1.1rem,1.8vw,1.5rem)] leading-tight flex-1 text-left tracking-[-0.02em] transition-all ${isActive ? "translate-x-2" : ""}`}>
                        {ind.name}
                      </span>
                      <span className={`font-mono text-[11px] uppercase tracking-[0.18em] transition-opacity duration-300 ${isActive ? "text-green opacity-100" : "text-muted opacity-0 group-hover:opacity-60"}`}>
                        ●
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right panel — roles */}
          <div className="lg:col-span-4">
            <div className="border border-rule p-6 lg:p-8 min-h-[560px] flex flex-col">
              <div className="mb-6 flex items-center justify-between">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                  Roles · {current.name}
                </p>
                <IconBadge name={current.icon} size="sm" active />
              </div>
              <motion.div
                key={current.name}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h3 className="editorial text-3xl lg:text-4xl leading-[1.05] tracking-[-0.03em] text-ink mb-8">
                  {current.name}
                </h3>
                <ul className="space-y-3">
                  {current.roles.map((r, i) => (
                    <li
                      key={r}
                      className="flex items-center gap-3 border-b border-rule pb-3"
                    >
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[15px] text-ink">{r}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <div className="mt-auto pt-8 border-t border-rule mt-10">
                <SignatureLine className="mb-6" />
                <p className="text-[13px] leading-relaxed text-muted">
                  Don&apos;t see your role? Tell us about it — we&apos;ll say honestly
                  whether we can fill it.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Capabilities link */}
        <div className="mt-14 flex justify-center">
          <Link
            href="/industries"
            data-cursor="cta"
            className="group inline-flex items-center gap-4 border border-ink/15 px-6 py-4 font-mono text-[11px] uppercase tracking-[0.18em] hover:border-green hover:text-green transition-colors duration-500"
          >
            See all industries
            <span className="btn-arrow">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
