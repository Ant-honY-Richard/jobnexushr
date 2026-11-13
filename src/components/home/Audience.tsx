"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { SectionHeader } from "../SectionHeader";
import { JNIcon, type IconName } from "../icons/JNIcon";
import { NO_FEE } from "@/lib/site";

const EASE = [0.65, 0, 0.35, 1] as const;

/** Employer journey (left half) — icon bubbles joined by arrows. */
const HIRING_STEPS: [IconName, string, string][] = [
  ["requirement", "Share the", "role"],
  ["talent", "One account", "manager"],
  ["volume", "Shortlist &", "interview"],
  ["attendance", "Ready to", "start"],
];

/** Candidate promises (right half) — solid green icon circles, divided columns. */
const CANDIDATE_POINTS: [IconName, string, string][] = [
  ["candidate", "Real people", "not bots"],
  ["employer", "Genuine roles", "not fake listings"],
  ["support", "A recruiter", "who calls you back"],
  ["compliance", "Support", "after you join"],
];

/** Pads each half so its content lines up with the site's 1480px column on wide screens. */
const PAD_LEFT = "pl-6 pr-6 lg:pl-10 lg:pr-12 2xl:pl-[max(2.5rem,calc((100vw-1480px)/2+2.5rem))]";
const PAD_RIGHT = "pl-6 pr-6 lg:pl-12 lg:pr-10 2xl:pr-[max(2.5rem,calc((100vw-1480px)/2+2.5rem))]";

/** White note card (icon + two lines + green underline), as in the mockups. */
function NoteCard({ icon, title, sub }: { icon: IconName; title: string; sub: string }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl bg-white px-5 py-4 shadow-[0_20px_44px_-20px_rgba(4,46,39,0.5)]">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-green text-off-white">
        <JNIcon name={icon} className="jn-icon-on-green h-6 w-6 [stroke-width:2]" />
      </span>
      <span className="block">
        <span className="block text-[16px] font-semibold leading-snug text-ink">{title}</span>
        <span className="block text-[15px] leading-snug text-ink/80">{sub}</span>
        <span className="mt-2 block h-[2px] w-10 rounded bg-green" />
      </span>
    </div>
  );
}

/** Tablet/desktop: photo composition cut from the desktop mockup (frame, shapes, card baked in). */
function Cutout({ src, width, height, alt }: { src: string; width: number; height: number; alt: string }) {
  return (
    <Image
      src={src}
      width={width}
      height={height}
      alt={alt}
      sizes="(min-width: 1024px) 46vw, 100vw"
      className="block h-auto w-full select-none"
      draggable={false}
    />
  );
}

/** Audience label — the first thing each half says, so it is sized and coloured to be found at a glance. */
function Pill({ n, label, icon, dark }: { n: string; label: string; icon: IconName; dark?: boolean }) {
  return (
    <div
      className={`inline-flex items-center gap-3 rounded-full py-1.5 pl-1.5 pr-5 sm:gap-4 sm:pr-6 ${
        dark
          ? "border border-green/60 bg-green/15 shadow-[0_10px_30px_-14px_rgba(14,149,106,0.9)]"
          : "border border-green/30 bg-white shadow-[0_10px_30px_-16px_rgba(4,46,39,0.45)]"
      }`}
    >
      <span className="relative grid h-10 w-10 place-items-center rounded-full bg-green text-off-white sm:h-11 sm:w-11">
        <JNIcon name={icon} className="jn-icon-on-green relative h-5 w-5 [stroke-width:2] sm:h-6 sm:w-6" />
      </span>
      <span
        className={`text-[15px] font-semibold uppercase tracking-[0.1em] sm:text-[17px] ${dark ? "text-off-white" : "text-ink"}`}
      >
        {label}
      </span>
      <span className={`font-mono text-[11px] tracking-[0.14em] ${dark ? "text-green" : "text-dark-green"}`}>{n}</span>
    </div>
  );
}

export function Audience() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0, margin: "0px 0px 30% 0px" });

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.8, ease: EASE, delay },
  });

  return (
    <section ref={ref} className="relative border-t border-rule bg-off-white pt-14 lg:pt-16">
      <div className="mx-auto px-6 lg:px-10" style={{ maxWidth: "1480px" }}>
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeader
              index="/ 02"
              label="Start Here"
              title={
                <>
                  Hiring, or hoping to be hired?
                  <br />
                  <span className="text-green">Either way, you&apos;re in the right place.</span>
                </>
              }
            />
          </div>
          <div className="lg:col-span-4 lg:col-start-9 lg:pt-16">
            <motion.p {...rise(0.3)} className="max-w-sm text-[15px] leading-relaxed text-muted">
              Every good hire has two sides. We look after both — because a role
              that fits the person is the one that lasts.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Two full-bleed halves */}
      <div className="mt-16 grid grid-cols-1 lg:mt-14 lg:grid-cols-2">
        {/* ── Left: employers ── */}
        <div className={`relative flex flex-col overflow-hidden py-12 lg:py-20 ${PAD_LEFT}`} style={{ background: "#FDFCFA" }}>
          <motion.div {...rise(0.1)}>
            <Pill n="01" label="I'm hiring" icon="employer" />
          </motion.div>
          <motion.h3
            {...rise(0.18)}
            className="editorial mt-5 text-[clamp(2.4rem,4.2vw,4rem)] leading-[1.02] tracking-[-0.035em] text-ink"
            style={{ fontWeight: 700 }}
          >
            Explain it once.
            <br />
            <span className="text-green">We handle the rest.</span>
          </motion.h3>
          <motion.p {...rise(0.26)} className="mt-5 max-w-[34rem] text-[18px] leading-snug text-ink/80 lg:text-[21px]">
            One account manager takes your role from shortlist to first shift — no repeating yourself.
          </motion.p>

          {/* Journey — one row of four on every screen */}
          <ol className="mt-9 grid grid-cols-4 lg:mt-10">
            {HIRING_STEPS.map(([icon, a, b], i) => (
              <motion.li
                key={a}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: EASE, delay: 0.35 + i * 0.12 }}
                className="relative flex flex-col items-center text-center"
              >
                <span className="grid h-12 w-12 place-items-center rounded-full bg-green/12 text-ink ring-1 ring-green/15 sm:h-14 sm:w-14 lg:h-16 lg:w-16">
                  <JNIcon name={icon} className="h-6 w-6 sm:h-7 sm:w-7" />
                </span>
                <span className="mt-3 text-[12px] font-medium leading-snug text-ink sm:text-[14px] lg:text-[15px]">
                  {a}
                  <br />
                  {b}
                </span>
                {i < HIRING_STEPS.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute right-0 top-3 translate-x-1/2 text-[14px] text-green sm:top-4 lg:top-5"
                  >
                    →
                  </span>
                )}
              </motion.li>
            ))}
          </ol>

          {/* Photo */}
          <Link href="/employers" aria-label="Hire with Job Nexus HR" className="relative mt-12 block sm:-ml-5 lg:-ml-8 lg:mt-10">
            <motion.div {...rise(0.45)}>
              {/* Phones: portrait crop, green corner, card overlapping the bottom */}
              <div className="relative pb-12 sm:hidden">
                <div className="relative aspect-[1/1.05] overflow-hidden rounded-[22px]">
                  <Image
                    src="/visuals/audience-hiring-portrait-m.webp"
                    alt="A Job Nexus HR account lead and three colleagues smiling together over a tablet and laptop"
                    fill
                    sizes="100vw"
                    className="object-cover object-top"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-0 h-[24%] w-[28%] bg-green"
                    style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
                  />
                </div>
                <div className="absolute bottom-0 left-1/2 w-[82%] -translate-x-1/2">
                  <NoteCard icon="check" title="Faster Hiring" sub="Higher Productivity" />
                </div>
              </div>
              {/* Tablet/desktop: composition cut from the desktop mockup */}
              <div className="hidden sm:block">
                <Cutout
                  src="/visuals/audience-hiring-cutout.webp"
                  width={942}
                  height={426}
                  alt="A Job Nexus HR account lead and three colleagues smiling together over a laptop"
                />
              </div>
            </motion.div>
          </Link>

          {/* Closing block + button */}
          <motion.div {...rise(0.55)} className="mt-14 lg:mt-12">
            <div className="flex items-center gap-5">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-green/12 text-ink ring-1 ring-green/15">
                <JNIcon name="volume" className="h-7 w-7" />
              </span>
              <span className="h-px w-24 bg-green/40" />
            </div>
            <h4 className="editorial mt-5 text-[clamp(2rem,3.2vw,2.75rem)] leading-[1.04] tracking-[-0.03em] text-ink" style={{ fontWeight: 700 }}>
              Build a team
              <br />
              <span className="text-green">that stays.</span>
            </h4>
            <p className="mt-4 max-w-md text-[17px] leading-relaxed text-ink/75">
              The right people in the right roles, and one person accountable for keeping it that way.
            </p>
            <Link
              href="/contact"
              data-cursor="cta"
              className="group mt-8 flex w-full items-center justify-center gap-3 rounded-xl bg-forest px-8 py-5 text-[13px] font-semibold uppercase tracking-[0.12em] text-off-white transition-colors duration-500 hover:bg-green hover:text-ink sm:inline-flex sm:w-auto"
            >
              Tell us what you need <span className="btn-arrow">→</span>
            </Link>
          </motion.div>
        </div>

        {/* ── Right: candidates ── */}
        <div
          className={`relative flex flex-col overflow-hidden py-12 text-off-white lg:py-20 ${PAD_RIGHT}`}
          style={{ background: "linear-gradient(180deg, #082824 0%, #072522 45%)" }}
        >
          <motion.div {...rise(0.15)}>
            <Pill n="02" label="I'm looking for work" icon="candidate" dark />
          </motion.div>
          <motion.h3
            {...rise(0.23)}
            className="editorial mt-5 text-[clamp(2.4rem,4.2vw,4rem)] leading-[1.02] tracking-[-0.035em] text-off-white"
            style={{ fontWeight: 700 }}
          >
            Be known by name.
            <br />
            <span className="text-green">Not by a number.</span>
          </motion.h3>
          <motion.p {...rise(0.31)} className="mt-5 max-w-[38rem] text-[18px] leading-snug text-off-white/90 lg:text-[21px]">
            Real roles with real employers, a recruiter who calls you back, and support after you join.
          </motion.p>

          {/* Promises — 2×2 with cross dividers on phones, one row from sm */}
          <ul className="mt-10 grid grid-cols-2 sm:grid-cols-4">
            {CANDIDATE_POINTS.map(([icon, a, b], i) => (
              <motion.li
                key={a}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: EASE, delay: 0.4 + i * 0.12 }}
                className={`flex flex-col items-center px-2 py-6 text-center sm:py-0 ${i % 2 === 1 ? "border-l border-off-white/15" : ""} ${i === 2 ? "sm:border-l sm:border-off-white/15" : ""} ${i < 2 ? "border-b border-off-white/15 sm:border-b-0" : ""}`}
              >
                <span className="grid h-14 w-14 place-items-center rounded-full bg-green text-off-white shadow-[0_10px_24px_-10px_rgba(14,149,106,0.8)] lg:h-16 lg:w-16">
                  <JNIcon name={icon} className="jn-icon-on-green h-7 w-7 [stroke-width:1.8]" />
                </span>
                <span className="mt-3 text-[15px] font-semibold leading-snug text-off-white">{a}</span>
                <span className="text-[14px] leading-snug text-off-white/75">{b}</span>
              </motion.li>
            ))}
          </ul>

          {/* Photo */}
          <Link href="/register" aria-label="Register for jobs" className="relative mt-10 block sm:mt-12 lg:mt-10">
            <motion.div {...rise(0.55)}>
              {/* Phones: rounded crop, green ribbon, card overlapping bottom-left */}
              <div className="relative pb-12 sm:hidden">
                <span
                  aria-hidden="true"
                  className="absolute -right-2 bottom-10 h-[45%] w-[40%]"
                  style={{
                    background: "linear-gradient(135deg, rgba(14,149,106,0) 35%, #0E956A 100%)",
                    clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
                  }}
                />
                <div
                  className="relative aspect-[1/0.88] overflow-hidden rounded-[22px]"
                  style={{ clipPath: "polygon(0 0, 100% 0, 100% 80%, 88% 100%, 0 100%)" }}
                >
                  <Image
                    src="/visuals/audience-candidate-cutout-m.webp"
                    alt="A smiling young professional at her laptop, looking ahead to her next opportunity"
                    fill
                    sizes="100vw"
                    className="object-cover object-[60%_30%]"
                  />
                </div>
                <div className="absolute bottom-0 left-4 w-[78%]">
                  <NoteCard icon="candidate" title="Your Next" sub="Opportunity Awaits" />
                </div>
              </div>
              {/* Tablet/desktop: composition cut from the desktop mockup */}
              <div className="hidden sm:block">
                <Cutout
                  src="/visuals/audience-candidate-cutout.webp"
                  width={902}
                  height={431}
                  alt="A smiling young professional at her laptop, looking ahead to her next opportunity"
                />
              </div>
            </motion.div>
          </Link>

          {/* Closing block + button */}
          <motion.div {...rise(0.65)} className="mt-14 lg:mt-12">
            <div className="flex items-center gap-5">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-green/15 text-off-white ring-1 ring-green/40">
                <JNIcon name="candidate" className="h-7 w-7" />
              </span>
              <span className="h-px w-24 bg-green/40" />
            </div>
            <h4 className="editorial mt-5 text-[clamp(2rem,3.2vw,2.75rem)] leading-[1.04] tracking-[-0.03em] text-off-white" style={{ fontWeight: 700 }}>
              Real opportunities.
              <br />
              <span className="text-green">Real support.</span>
            </h4>
            <p className="mt-4 max-w-md text-[17px] leading-relaxed text-off-white/80">
              Starting out or ready for your next step — we&apos;ll help you find work that fits.
            </p>
            <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-green/15 px-3 py-1.5 text-[13px] font-medium text-off-white ring-1 ring-green/40">
              <span className="h-1.5 w-1.5 rounded-full bg-green" aria-hidden />
              {NO_FEE}
            </p>
            <Link
              href="/register"
              data-cursor="cta"
              className="group mt-8 flex w-full items-center justify-center gap-3 rounded-2xl border-2 border-green px-8 py-5 text-[13px] font-semibold uppercase tracking-[0.12em] text-off-white transition-colors duration-500 hover:bg-green hover:text-ink sm:inline-flex sm:w-auto"
            >
              Register for jobs <span className="btn-arrow">→</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
