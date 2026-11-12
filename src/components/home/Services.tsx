"use client";

import Link from "next/link";
import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { SectionHeader } from "../SectionHeader";
import { SignatureLine } from "../SignatureLine";
import { IconBadge, type IconName } from "../icons/JNIcon";

const SERVICES: { code: string; icon: IconName; href: string; name: string; body: string; detail: string }[] = [
  {
    code: "01",
    icon: "recruit",
    href: "/staffing/permanent-recruitment",
    name: "Permanent Recruitment",
    body: "Specialist and mid-level hiring, managed by one account manager who understands the role.",
    detail:
      "We handle the search, screening and offer — and stay with you through onboarding.",
  },
  {
    code: "02",
    icon: "volume",
    href: "/staffing/volume-staffing",
    name: "Volume Staffing",
    body: "Many people, quickly — without losing track of who is where.",
    detail:
      "Sourcing, screening and start dates at scale, with attendance tracked and reported.",
  },
  {
    code: "03",
    icon: "payroll",
    href: "/payroll",
    name: "Managed Payroll",
    body: "Your workforce on our payroll, with the admin handled for you.",
    detail:
      "Salaries, PF and ESI, attendance input and exits — managed every month by our team.",
  },
  {
    code: "04",
    icon: "compliance",
    href: "/staffing/compliance",
    name: "Statutory Compliance",
    body: "PF, ESI and labour paperwork kept up to date and audit-ready.",
    detail:
      "Statutory obligations handled as part of your engagement — not as a separate project.",
  },
  {
    code: "05",
    icon: "verify",
    href: "/staffing/bgv",
    name: "Background Verification",
    body: "Education, employment, address and reference checks before people join.",
    detail:
      "Each check is tracked and reported back to you, so you know where every candidate stands.",
  },
  {
    code: "06",
    icon: "workforce",
    href: "/workforce-management",
    name: "Workforce Management",
    body: "Day-to-day support after people start work.",
    detail:
      "Attendance, shift gaps, replacements and grievances — handled by our team, not yours.",
  },
];

export function Services() {
  const [active, setActive] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      className="relative bg-off-white py-14 lg:py-24 border-t border-rule"
    >
      <div className="mx-auto px-6 lg:px-10" style={{ maxWidth: "1480px" }}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-10 gap-x-8">
          <div className="lg:col-span-7">
            <SectionHeader
              index="/ 06"
              label="Services"
              title={
                <>
                  People for the work.
                  <br />
                  <span className="text-green">Support for what comes next.</span>
                </>
              }
              description="Use one service or combine several. Either way, one account manager handles it all — no hand-offs, no repeating yourself."
            />
          </div>
        </div>

        <div className="mt-10 lg:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-y-6 lg:gap-x-0 border-t border-rule">
          {SERVICES.map((s, i) => {
            const isActive = active === i;
            return (
              <motion.div
                key={s.code}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: [0.65, 0, 0.35, 1] }}
                onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
                onPointerLeave={(e) => e.pointerType === "mouse" && setActive(null)}
                onClick={() => setActive(i)}
                className={`group relative border-b border-rule grid grid-cols-12 lg:col-span-12 gap-4 py-8 lg:py-10 cursor-pointer transition-colors duration-700 ${isActive ? "bg-off-white" : ""}`}
                data-cursor="label"
                data-cursor-label="Explore"
              >
                <div className="col-span-3 sm:col-span-2 lg:col-span-1 flex flex-col items-start gap-3">
                  <IconBadge name={s.icon} size="sm" active={isActive} />
                  <span className="font-mono text-[12px] tracking-[0.18em] text-muted">
                    {s.code}
                  </span>
                </div>

                <div className="col-span-9 sm:col-span-10 lg:col-span-5 lg:pl-4 self-center">
                  <h3
                    className={`editorial text-[clamp(1.6rem,3.2vw,2.6rem)] leading-[1.05] tracking-[-0.03em] transition-all duration-700 ${isActive ? "text-green -translate-x-2" : "text-ink"}`}
                  >
                    {s.name}
                  </h3>
                </div>

                <div className="col-span-12 lg:col-span-4 lg:col-start-7 flex items-start">
                  <p className="text-[15px] leading-relaxed text-muted max-w-md">
                    {s.body}
                  </p>
                </div>

                <div className="col-span-2 col-start-11 lg:col-span-1 lg:col-start-12 flex items-start justify-end gap-3">
                  <motion.span
                    animate={{
                      rotate: isActive ? 45 : 0,
                      opacity: isActive ? 1 : 0.4,
                    }}
                    transition={{ duration: 0.4 }}
                    className="font-mono text-base text-ink"
                  >
                    +
                  </motion.span>
                </div>

                {/* Expanded detail */}
                <motion.div
                  initial={false}
                  animate={{
                    height: isActive ? "auto" : 0,
                    opacity: isActive ? 1 : 0,
                  }}
                  transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
                  className="col-span-12 overflow-hidden"
                >
                  <div className="pt-6 pb-2 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    <div className="lg:col-span-7 lg:col-start-7">
                      <SignatureLine className="mb-4" />
                      <p className="text-[14px] leading-relaxed text-ink/80 max-w-md">
                        {s.detail}
                      </p>
                    </div>
                    <div className="lg:col-span-3 lg:col-start-10 flex lg:justify-end">
                      <Link
                        href={s.href}
                        data-cursor="cta"
                        onFocus={() => setActive(i)}
                        className="font-mono text-[11px] uppercase tracking-[0.18em] text-green inline-flex items-center gap-3 py-2 link-underline"
                      >
                        View service <span>→</span>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
