"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { SectionHeader } from "../SectionHeader";
import { SignatureLine } from "../SignatureLine";
import { IconBadge, type IconName } from "../icons/JNIcon";

const STEPS: { code: string; icon: IconName; name: string; body: string }[] = [
  { code: "01", icon: "requirement", name: "Brief", body: "You tell us once — roles, numbers, locations, deadlines." },
  { code: "02", icon: "understand", name: "Understand", body: "We learn how your work actually runs, not just the job title." },
  { code: "03", icon: "match", name: "Match", body: "Screened and shortlisted, with a reason for every name." },
  { code: "04", icon: "deploy", name: "Start", body: "Offers, documents and checks completed before day one." },
  { code: "05", icon: "support", name: "Support", body: "Attendance, payroll and grievances handled by our team." },
  { code: "06", icon: "continuity", name: "Continue", body: "Regular reviews, with the same people looking after you." },
];

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section ref={ref} className="relative bg-off-white py-14 lg:py-24 border-t border-rule">
      <div className="mx-auto px-6 lg:px-10" style={{ maxWidth: "1480px" }}>
        <SectionHeader
          index="/ 09"
          label="Process"
          title={
            <>
              The work
              <br />
              <span className="text-green">behind the placement.</span>
            </>
          }
          description="Six steps, one account manager. You always know where things stand — and who is handling them."
        />

        <div className="mt-10 lg:mt-14 relative">
          {/* Connecting line */}
          <div className="absolute left-0 right-0 top-5 h-px bg-rule hidden lg:block" />
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 2, ease: [0.65, 0, 0.35, 1] }}
            style={{ transformOrigin: "left" }}
            className="absolute left-0 right-0 top-5 h-px bg-green hidden lg:block"
          />

          <div className="grid grid-cols-2 lg:grid-cols-6 gap-y-12 gap-x-6 lg:gap-x-4 relative">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.code}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 * i, ease: [0.65, 0, 0.35, 1] }}
                className="group relative"
              >
                <div className="flex items-center gap-3 mb-5">
                  <IconBadge name={s.icon} size="sm" className="relative z-10" />
                  <span className="relative z-10 bg-off-white pr-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                    {s.code}
                  </span>
                </div>
                <h3 className="editorial text-2xl lg:text-xl xl:text-3xl text-ink leading-[1.05] tracking-[-0.03em] mb-3">
                  {s.name}
                </h3>
                <p className="text-[13px] leading-relaxed text-muted">{s.body}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <SignatureLine />
        </div>
      </div>
    </section>
  );
}
