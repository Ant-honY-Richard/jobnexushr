"use client";

import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { IconBadge, type IconName } from "../icons/JNIcon";

const STAGES: { code: string; icon: IconName; name: string; body: string; detail: string }[] = [
  {
    code: "01",
    icon: "requirement",
    name: "Requirement",
    body: "Role, volume, location and timeline — captured by your account manager.",
    detail: "We question assumptions early, so the shortlist fits the first time.",
  },
  {
    code: "02",
    icon: "volume",
    name: "People",
    body: "Sourcing, screening and matching against what you actually need.",
    detail: "Two hires or two hundred — the same standard applies.",
  },
  {
    code: "03",
    icon: "deploy",
    name: "Deployment",
    body: "Offers, onboarding and documents completed before people start.",
    detail: "A clear checklist for every start, whether it's one hire or a full shift.",
  },
  {
    code: "04",
    icon: "attendance",
    name: "Attendance",
    body: "Daily attendance, shift cover and escalations — tracked and reported.",
    detail: "You see what's happening every day, without chasing anyone.",
  },
  {
    code: "05",
    icon: "support",
    name: "Support",
    body: "Grievances, payroll questions and day-to-day issues handled by our team.",
    detail: "When your workforce needs help, they call us — not you.",
  },
  {
    code: "06",
    icon: "continuity",
    name: "Continuity",
    body: "Regular reviews and a focus on keeping good people.",
    detail: "The goal is a stable team and a long relationship.",
  },
];

export function WorkforceLifecycle() {
  const [active, setActive] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section
      ref={ref}
      className="relative bg-ink text-off-white py-14 lg:py-24 border-t border-rule overflow-hidden"
    >
      <div className="mx-auto px-6 lg:px-10" style={{ maxWidth: "1480px" }}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-10 gap-x-8">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3 mb-5">
              <span className="font-mono text-[11px] tracking-[0.18em] text-muted">
                / 07
              </span>
              <span className="h-px w-8 bg-off-white/20" />
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                Workforce Management
              </span>
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
              className="editorial text-[clamp(2rem,5vw,4.5rem)] leading-[0.98] tracking-[-0.035em] text-off-white max-w-4xl"
            >
              Your workforce doesn&apos;t stop
              <br />
              at <span className="text-green">onboarding.</span>
            </motion.h2>
          </div>

          <div className="lg:col-span-4 lg:pt-16">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.65, 0, 0.35, 1] }}
              className="text-[15px] leading-relaxed text-off-white/70 max-w-sm"
            >
              Many agencies step away after the joining date. That&apos;s where
              the real work starts — attendance, shift gaps, grievances, payroll
              questions. Each stage below has a person on our team responsible
              for it, so none of it lands back on yours.
            </motion.p>
          </div>
        </div>

        {/* Stages — alternating layout desktop, stacked mobile */}
        <div className="mt-10 lg:mt-14 space-y-12 lg:space-y-0 relative">
          {/* Center vertical line connecting the stages (desktop only) */}
          <div className="hidden lg:block absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-off-white/10" />
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 2.5, ease: [0.65, 0, 0.35, 1] }}
            style={{ transformOrigin: "top" }}
            className="hidden lg:block absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-green"
          />
          {STAGES.map((s, i) => {
            const isLeft = i % 2 === 0;
            const isActive = active === i;
            return (
              <motion.div
                key={s.code}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 + i * 0.12, ease: [0.65, 0, 0.35, 1] }}
                onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
                onPointerLeave={(e) => e.pointerType === "mouse" && setActive(null)}
                onClick={() => setActive(i)}
                className={`lg:grid lg:grid-cols-12 lg:gap-8 relative ${i > 0 ? "lg:-mt-14" : ""} ${isActive ? "z-10" : ""}`}
              >
                {/* Dot in center on desktop */}
                <div className="hidden lg:flex lg:col-span-12 justify-center absolute top-0 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
                  <motion.span
                    animate={{
                      scale: isActive ? 1.4 : 1,
                      backgroundColor: isActive ? "#0E956A" : "#15160E",
                    }}
                    transition={{ duration: 0.4 }}
                    className="block w-3 h-3 rounded-full border border-green bg-ink"
                  />
                </div>

                <div
                  className={`group lg:col-span-5 ${isLeft ? "lg:col-start-1" : "lg:col-start-8 lg:row-start-1"}`}
                >
                  <div
                    data-cursor="label"
                    data-cursor-label="View"
                    className="border border-off-white/15 p-6 lg:p-8 bg-ink transition-all duration-700 hover:border-green cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <IconBadge name={s.icon} size="sm" tone="dark" active={isActive} />
                        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                          {s.code}
                        </span>
                      </div>
                      <motion.span
                        animate={{ opacity: isActive ? 1 : 0.3 }}
                        className="font-mono text-[11px] uppercase tracking-[0.18em] text-green"
                      >
                        ●
                      </motion.span>
                    </div>
                    <h3
                      className={`editorial text-[clamp(1.6rem,2.6vw,2.2rem)] leading-[1.05] tracking-[-0.03em] transition-colors duration-500 ${isActive ? "text-green" : "text-off-white"}`}
                    >
                      {s.name}
                    </h3>
                    <p className="mt-3 text-[14px] leading-relaxed text-off-white/60">{s.body}</p>
                    <motion.p
                      initial={false}
                      animate={{
                        height: isActive ? "auto" : 0,
                        opacity: isActive ? 1 : 0,
                      }}
                      transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
                      className="overflow-hidden text-[14px] leading-relaxed text-off-white/70 mt-4"
                    >
                      {s.detail}
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
