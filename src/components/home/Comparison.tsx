"use client";

import { motion, useInView, AnimatePresence } from "motion/react";
import { useRef, useState } from "react";
import { SectionHeader } from "../SectionHeader";
import { SignatureLine } from "../SignatureLine";
import { JNIcon } from "../icons/JNIcon";

const TRADITIONAL = [
  "A new account manager every few months",
  "Re-explaining the same requirement — again",
  "CVs forwarded, then silence",
  "Nobody answers when a shift goes empty",
  "The vendor vanishes after the invoice",
];

const JOB_NEXUS = [
  "One account manager, from the first brief onwards",
  "Your requirement understood once — and remembered",
  "People matched to the work, not keywords on a CV",
  "A real person answers when something goes wrong",
  "A relationship that's still there next year",
];

export function Comparison() {
  const [view, setView] = useState<"traditional" | "us">("us");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      className="relative bg-ink text-off-white py-14 lg:py-24 border-t border-rule overflow-hidden"
    >
      {/* Subtle background signature line */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-off-white/10" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-off-white/10" />
      </div>

      <div className="mx-auto px-6 lg:px-10" style={{ maxWidth: "1480px" }}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 gap-x-8">
          <div className="lg:col-span-7">
            <SectionHeader
              dark
              index="/ 04"
              label="Why Job Nexus HR"
              title={
                <>
                  Anyone can send CVs.
                  <br />
                  <span className="text-green">We stay for what comes after.</span>
                </>
              }
            />
          </div>
          <div className="lg:col-span-4 lg:col-start-9 lg:pt-16">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.65, 0, 0.35, 1] }}
              className="text-[16px] leading-relaxed text-off-white/70 max-w-md"
            >
              Placing someone is the easy part. The real test is whether your
              partner is still accountable six months later. That&apos;s the partner we chose to be.
            </motion.p>
            <SignatureLine className="mt-10" />
          </div>
        </div>

        {/* Toggle */}
        <div className="mt-10 lg:mt-14 flex items-center justify-center">
          <div className="inline-flex items-center border border-off-white/20 p-1 relative">
            <motion.div
              layout
              transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
              className="absolute top-1 bottom-1 w-1/2 bg-green"
              style={{
                left: view === "traditional" ? "0.25rem" : "50%",
                right: view === "traditional" ? "50%" : "0.25rem",
              }}
            />
            <button
              onClick={() => setView("traditional")}
              className={`relative z-10 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors duration-300 ${view === "traditional" ? "text-ink" : "text-off-white/65"}`}
              data-cursor="cta"
            >
              Typical agency
            </button>
            <button
              onClick={() => setView("us")}
              className={`relative z-10 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors duration-300 ${view === "us" ? "text-ink" : "text-off-white/65"}`}
              data-cursor="cta"
            >
              Job Nexus HR
            </button>
          </div>
        </div>

        {/* Comparison content */}
        <div className="mt-14 relative min-h-[420px]">
          <AnimatePresence mode="wait">
            {view === "us" ? (
              <motion.div
                key="us"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16"
              >
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-green mb-6">
                    Job Nexus HR
                  </p>
                  <ul className="space-y-5">
                    {JOB_NEXUS.map((line, i) => (
                      <motion.li
                        key={line}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: 0.2 + i * 0.08,
                          ease: [0.65, 0, 0.35, 1],
                        }}
                        className="flex items-start gap-4 border-b border-off-white/10 pb-5"
                      >
                        <span className="flex shrink-0 items-center gap-3 pt-1">
                          <JNIcon name="check" className="h-5 w-5 [stroke-width:2]" />
                          <span className="font-mono text-[11px] text-green">0{i + 1}</span>
                        </span>
                        <span className="editorial text-[clamp(1.1rem,2.2vw,1.6rem)] leading-[1.3] text-off-white">
                          {line}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                <div className="relative">
                  <div className="sticky top-32">
                    <div className="relative border border-green p-8 lg:p-12 bg-green/5">
                      <span
                        aria-hidden="true"
                        className="absolute -left-px -top-px h-12 w-12 bg-green"
                        style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
                      />
                      <JNIcon name="continuity" className="mb-8 ml-auto block h-10 w-10 text-off-white" />
                      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-green mb-4">
                        Our promise
                      </p>
                      <p className="editorial text-[clamp(1.5rem,3vw,2.4rem)] leading-[1.1] tracking-[-0.03em] text-off-white">
                        We measure success by how long the relationship lasts —
                        not by how many CVs we send.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="trad"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16"
              >
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-off-white/50 mb-6">
                    The typical experience
                  </p>
                  <ul className="space-y-5">
                    {TRADITIONAL.map((line, i) => (
                      <motion.li
                        key={line}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: 0.2 + i * 0.08,
                          ease: [0.65, 0, 0.35, 1],
                        }}
                        className="flex items-start gap-4 border-b border-off-white/10 pb-5"
                      >
                        <span className="flex shrink-0 items-center gap-3 pt-1 text-off-white/35">
                          <JNIcon name="cross" className="h-5 w-5" />
                          <span className="font-mono text-[11px]">0{i + 1}</span>
                        </span>
                        <span className="editorial text-[clamp(1.1rem,2.2vw,1.6rem)] leading-[1.3] text-off-white/55">
                          {line}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                <div className="relative">
                  <div className="sticky top-32">
                    <div className="border border-off-white/20 p-8 lg:p-12">
                      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-off-white/40 mb-4">
                        The common pattern
                      </p>
                      <p className="editorial text-[clamp(1.5rem,3vw,2.4rem)] leading-[1.1] tracking-[-0.03em] text-off-white/65">
                        Many agencies are built around the placement — not what
                        happens after it.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
