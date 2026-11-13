"use client";

import Link from "next/link";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { BrandVisual } from "../visual/BrandVisual";

export function CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0, margin: "0px 0px 30% 0px" });

  return (
    <section
      ref={ref}
      className="on-dark relative text-off-white py-20 lg:py-28 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0c1d19 0%, #081815 100%)" }}
    >
      {/* Animated linework */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-50"
        preserveAspectRatio="none"
        viewBox="0 0 1440 600"
      >
        <motion.path
          d="M0 300 Q 360 200, 720 300 T 1440 300"
          stroke="#0E956A"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 2, ease: [0.65, 0, 0.35, 1] }}
        />
        <motion.path
          d="M0 250 Q 360 350, 720 250 T 1440 250"
          stroke="rgba(14,149,106,0.4)"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 2.5, delay: 0.2, ease: [0.65, 0, 0.35, 1] }}
        />
      </svg>

      <div className="mx-auto px-6 lg:px-10 relative" style={{ maxWidth: "1480px" }}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 gap-x-8">
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
              className="mb-8"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-green">
                / Next step
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.1, delay: 0.1, ease: [0.65, 0, 0.35, 1] }}
              className="editorial text-[clamp(2.5rem,6.2vw,6.25rem)] leading-[0.95] tracking-[-0.04em] text-off-white"
            >
              Tell us what you need.
              <br />
              We&apos;ll tell you how <span className="text-green">we&apos;d handle it.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.65, 0, 0.35, 1] }}
              className="mt-8 max-w-xl text-[16px] leading-relaxed text-off-white/70"
            >
              One conversation is enough to start. Share the roles, numbers and
              deadline — we&apos;ll come back with a clear plan and the person who
              will run it.
            </motion.p>
          </div>
          <div className="lg:col-span-4 lg:self-center">
            <BrandVisual
              asset="cta"
              icon="nexus"
              label="Next / Your team"
              tone="dark"
              shape="right"
              className="mx-3 sm:mx-auto sm:max-w-sm lg:max-w-none"
            />
          </div>
        </div>

        <div className="mt-10 lg:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-y-10 gap-x-8 items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.6, ease: [0.65, 0, 0.35, 1] }}
            className="lg:col-span-4"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-off-white/50 mb-3">
              For employers
            </p>
            <Link
              href="/contact"
              data-cursor="cta"
              data-cursor-label="Talk to us"
              className="group inline-flex items-center gap-4 border border-off-white/30 px-6 py-4 font-mono text-[11px] uppercase tracking-[0.18em] hover:bg-green hover:border-green hover:text-ink transition-all duration-500"
            >
              Tell us what you need <span className="btn-arrow">→</span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.75, ease: [0.65, 0, 0.35, 1] }}
            className="lg:col-span-4"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-off-white/50 mb-3">
              For candidates
            </p>
            <Link
              href="/register"
              data-cursor="cta"
              data-cursor-label="Register"
              className="group inline-flex items-center gap-4 border border-off-white/15 px-6 py-4 font-mono text-[11px] uppercase tracking-[0.18em] hover:border-green hover:text-green transition-all duration-500"
            >
              Register for jobs <span className="btn-arrow">→</span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 1 }}
            className="lg:col-span-4 lg:text-right"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-off-white/50 mb-3">
              What happens next
            </p>
            <p className="editorial text-2xl text-off-white">
              A real person replies. <span className="text-green">Not a ticket.</span>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
