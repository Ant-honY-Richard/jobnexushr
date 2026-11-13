"use client";

import Link from "next/link";
import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import Image from "next/image";
import { SectionHeader } from "../SectionHeader";
import { BrandArt } from "../visual/BrandVisual";
import type { IconName } from "../icons/JNIcon";
import { VISUALS, type Visual, type VisualKey } from "@/lib/visuals";

const TEAM: { name: string; role: string; intro: string; icon: IconName; asset: VisualKey }[] = [
  {
    name: "Account Manager",
    icon: "employer",
    asset: "team-account-lead",
    role: "Your main contact",
    intro: "Your single point of contact — responsible for the relationship from start to finish.",
  },
  {
    name: "Hiring Coordinator",
    icon: "match",
    asset: "team-hiring",
    role: "Sourcing & matching",
    intro: "Finds, screens and shortlists candidates for your roles.",
  },
  {
    name: "Operations Coordinator",
    icon: "deploy",
    asset: "team-operations",
    role: "Start dates & attendance",
    intro: "Coordinates start dates, attendance and on-site support.",
  },
  {
    name: "Payroll & Compliance Lead",
    icon: "payroll",
    asset: "team-payroll",
    role: "Payroll & compliance",
    intro: "Runs payroll, statutory filings and workforce admin.",
  },
  {
    name: "Verification Coordinator",
    icon: "verify",
    asset: "team-verification",
    role: "Background checks",
    intro: "Runs education, employment and address checks.",
  },
];

function RolePortrait({ asset, icon, label, on }: { asset: VisualKey; icon: IconName; label: string; on: boolean }) {
  const v: Visual = VISUALS[asset];
  if (v.src) {
    return <Image src={v.src} alt={v.alt} fill sizes="360px" className="object-cover" />;
  }
  return <BrandArt icon={icon} label={label} tone="light" on={on} />;
}

export function Team() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0, margin: "0px 0px 30% 0px" });
  // Tap-to-reveal for touch devices (mouse users get the hover overlay)
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      ref={ref}
      className="relative bg-off-white py-14 lg:py-24 border-t border-rule overflow-hidden"
    >
      <div className="mx-auto px-6 lg:px-10" style={{ maxWidth: "1480px" }}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-10 gap-x-8">
          <div className="lg:col-span-7">
            <SectionHeader
              index="/ 10"
              label="The Team"
              title={
                <>
                  People behind
                  <br />
                  the <span className="text-green">people.</span>
                </>
              }
              description="No call centres, no ticket numbers. These are the roles you'll actually deal with — people who own their part of your account, from the first brief onwards."
            />
          </div>
        </div>

        {/* Team gallery */}
        <div className="mt-10 lg:mt-14 flex gap-6 overflow-x-auto no-scrollbar pb-6 -mx-6 lg:mx-0 px-6 lg:px-0">
          {TEAM.map((m, i) => (
            <motion.article
              key={m.role}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.08, ease: [0.65, 0, 0.35, 1] }}
              onClick={() => setOpen(open === i ? null : i)}
              className="group shrink-0 w-[280px] sm:w-[320px] lg:w-[360px] border border-rule bg-off-white hover:border-green transition-all duration-500"
              data-cursor="label"
              data-cursor-label="View"
            >
              {/* Portrait: photo when supplied (src/lib/visuals.ts), otherwise the role's brand art */}
              <div className="relative aspect-[4/5] overflow-hidden bg-ink/[0.04]">
                <RolePortrait asset={m.asset} icon={m.icon} label={`0${i + 1} · ${m.role}`} on={inView} />

                {/* Hover overlay */}
                <div className={`absolute inset-0 bg-green ${open === i ? "translate-y-0" : "translate-y-full"} group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] p-6 flex flex-col justify-end`}>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/60 mb-3">
                    {m.role}
                  </p>
                  <p className="editorial text-2xl text-ink leading-[1.05] tracking-[-0.025em]">
                    {m.name}
                  </p>
                  <p className="mt-2 text-[12px] text-ink/75 leading-relaxed">
                    {m.intro}
                  </p>
                </div>
              </div>

              <div className="p-5 border-t border-rule">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted mb-1">
                  {m.role}
                </p>
                <p className="editorial text-lg text-ink leading-tight tracking-[-0.02em]">
                  {m.name}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-10 flex items-center gap-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            Swipe or hover to meet each role
          </span>
          <span className="h-px flex-1 bg-rule" />
          <Link
            href="/about"
            data-cursor="cta"
            className="group inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-green link-underline"
          >
            About us <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
