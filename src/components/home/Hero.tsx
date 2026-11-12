"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { getImageProps } from "next/image";
import { useLoaderReady } from "@/lib/loader-state";
import { JNIcon, type IconName } from "../icons/JNIcon";

const INDUSTRIES = [
  "OFFICE",
  "WAREHOUSE",
  "RETAIL",
  "HEALTHCARE",
  "MANUFACTURING",
  "LOGISTICS",
  "HOSPITALITY",
  "TECHNOLOGY",
  "CONSTRUCTION",
  "FINANCE",
  "PHARMA",
  "BFSI",
  "EDUCATION",
  "TELECOM",
];

const EASE = [0.65, 0, 0.35, 1] as const;

/** Team photo: separate crops for phone and desktop (transparent WebP cut-outs in /public). */
function HeroPhoto() {
  const alt = "Job Nexus HR team — a confident recruiter with her colleagues in a bright office";
  const desktop = getImageProps({ src: "/hero-desktop.webp", width: 890, height: 712, alt, priority: true });
  const mobile = getImageProps({ src: "/hero-mobile.webp", width: 1024, height: 690, alt, priority: true });
  const { srcSet: mobileSrcSet, ...img } = mobile.props;
  return (
    <picture>
      <source media="(min-width: 1024px)" srcSet={desktop.props.srcSet} sizes="50vw" />
      <source srcSet={mobileSrcSet} sizes="100vw" />
      <img {...img} alt={alt} className="block h-auto w-full select-none" draggable={false} />
    </picture>
  );
}

/** One headline line, revealed from below. Padding keeps descenders (q, p) from being clipped. */
function Line({ children, delay }: { children: React.ReactNode; delay: number }) {
  const ready = useLoaderReady();
  return (
    <span className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
      <motion.span
        initial={{ y: "110%" }}
        animate={{ y: ready ? "0%" : "110%" }}
        transition={{ duration: 0.9, ease: EASE, delay }}
        className="block"
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Hero() {
  // Entrance animations start once the logo loader lifts (delays are relative to that moment).
  const ready = useLoaderReady();

  return (
    <>
      <section className="relative overflow-hidden bg-off-white pt-20 lg:pt-24">
        <div className="lg:grid lg:min-h-[calc(100svh-6rem)] lg:grid-cols-[1.02fr_1fr] lg:items-center">
          {/* Photo — full-bleed to the left edge */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: ready ? 1 : 0, x: ready ? 0 : -40 }}
            transition={{ duration: 1, ease: EASE, delay: 0.05 }}
            className="relative"
          >
            <HeroPhoto />
          </motion.div>

          {/* Copy */}
          <div className="relative px-6 pb-20 pt-8 lg:px-10 lg:pb-24 lg:pl-6 lg:pt-0 xl:pl-10">
            <div className="lg:max-w-[46rem]">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: ready ? 1 : 0 }}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.18em] text-muted"
              >
                <span className="text-ink/80">
                  Better Talent <span className="text-green">·</span> Brighter Futures
                </span>
                <span className="hidden h-px w-16 bg-rule-strong sm:block lg:w-24" />
              </motion.div>

              <h1 className="editorial mt-6 text-[clamp(2.4rem,9.6vw,4.5rem)] leading-[0.95] tracking-[-0.04em] text-ink lg:mt-8 lg:text-[clamp(3rem,5.2vw,6rem)]">
                <Line delay={0.1}>The right people,</Line>
                <Line delay={0.2}>in the right roles.</Line>
                <span className="text-muted">
                  <Line delay={0.3}>Supported long</Line>
                  <Line delay={0.4}>
                    after <span className="text-green">day one</span>.
                  </Line>
                </span>
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 20 }}
                transition={{ duration: 0.8, delay: 0.55 }}
                className="mt-7 max-w-lg text-[15px] leading-relaxed text-muted lg:mt-9 lg:text-[16px]"
              >
                Tell us what you need once. We find, check and place the right people —{" "}
                <span className="text-ink">and the same team stays with you after they join.</span>
              </motion.p>

              <div className="mt-9 flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between sm:gap-6 lg:mt-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 20 }}
                  transition={{ duration: 0.8, delay: 0.65 }}
                >
                  <Link
                    href="/contact"
                    data-cursor="cta"
                    className="learn-more group relative inline-block h-14 w-[17.5rem] outline-none lg:h-16 lg:w-[19.5rem]"
                  >
                    {/* Circle grows into a full pill on hover/focus; the arrow slides; the label turns white */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-y-0 left-0 block w-14 rounded-full bg-forest shadow-[0_14px_30px_-14px_rgba(4,46,39,0.7)] transition-[width,background-color] duration-[450ms] ease-[cubic-bezier(0.65,0,0.076,1)] group-hover:w-full group-hover:bg-green group-focus-visible:w-full group-focus-visible:bg-green lg:w-16"
                    >
                      <span className="absolute inset-y-0 left-[1.05rem] my-auto block h-[2px] w-[1.15rem] rounded bg-transparent transition-all duration-[450ms] ease-[cubic-bezier(0.65,0,0.076,1)] group-hover:translate-x-4 group-hover:bg-white group-focus-visible:translate-x-4 group-focus-visible:bg-white lg:left-[1.3rem]">
                        <span className="absolute -top-[0.27rem] right-[1px] block h-[0.65rem] w-[0.65rem] rotate-45 border-r-2 border-t-2 border-white" />
                      </span>
                    </span>
                    <span className="absolute inset-0 ml-14 flex items-center justify-center text-[13px] font-semibold uppercase tracking-[0.14em] text-ink transition-colors duration-[450ms] ease-[cubic-bezier(0.65,0,0.076,1)] group-hover:text-white group-focus-visible:text-white lg:ml-16 lg:text-[14px]">
                      Tell us what you need
                    </span>
                  </Link>
                  <Link
                    href="/jobs"
                    className="group mt-5 flex items-center gap-2 text-[13px] text-muted transition-colors hover:text-green"
                  >
                    Looking for work? <span className="text-ink group-hover:text-green">Browse open roles</span>
                    <span className="btn-arrow">→</span>
                  </Link>
                </motion.div>

                {/* People · Process · Progress tag */}
                <motion.ul
                  initial={{ opacity: 0 }}
                  animate={{ opacity: ready ? 1 : 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="flex gap-x-5 border-l-2 border-green py-1 pl-4 font-mono text-[10px] uppercase leading-relaxed tracking-[0.18em] text-muted sm:block sm:space-y-1 sm:text-[11px] lg:absolute lg:bottom-10 lg:right-10 2xl:right-[max(2.5rem,calc((100vw-1480px)/2+2.5rem))]"
                >
                  <li>People</li>
                  <li>Process</li>
                  <li>Progress</li>
                </motion.ul>
              </div>
            </div>
          </div>
        </div>

        {/* Phone-only corner accent */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 right-0 h-14 w-40 bg-green lg:hidden"
          style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0)" }}
        />
      </section>

      <IndustryStrip />
      <SystemFlow />
    </>
  );
}

/** Scrolling industries band (kept from the previous hero). */
function IndustryStrip() {
  const ready = useLoaderReady();
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: ready ? 1 : 0 }}
      transition={{ duration: 1, delay: 0.9 }}
      className="bg-off-white px-6 pb-14 pt-4 lg:px-10"
    >
      <div className="mx-auto" style={{ maxWidth: "1480px" }}>
        <div className="mb-3 flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            Industries we hire for
          </span>
          <Link
            href="/industries"
            className="hidden py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted transition-colors hover:text-green md:block"
          >
            All industries →
          </Link>
        </div>

        <div className="overflow-hidden border-y border-rule">
          <div className="workforce-strip py-8 lg:py-10">
            {[...INDUSTRIES, ...INDUSTRIES, ...INDUSTRIES].map((ind, i) => (
              <div key={`${ind}-${i}`} className="flex shrink-0 items-center gap-8 px-8">
                <span className="editorial whitespace-nowrap text-[clamp(2rem,5vw,5rem)] leading-none tracking-[-0.03em] text-ink/85">
                  {ind}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-green">●</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </motion.section>
  );
}

const FLOW: [string, IconName][] = [
  ["You brief us", "employer"],
  ["We understand the role", "requirement"],
  ["We find the people", "volume"],
  ["They start work", "deploy"],
  ["We stay with you", "continuity"],
];

/** How it works: brief → understand → find → start → stay (five steps, kept from the previous hero). */
function SystemFlow() {
  const ready = useLoaderReady();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: ready ? 1 : 0 }}
      transition={{ duration: 1, delay: 1 }}
      className="mx-auto bg-off-white px-6 pb-20 lg:px-10"
      style={{ maxWidth: "1480px" }}
    >
      <div className="border border-rule">
        <div className="flex items-center justify-between border-b border-rule px-4 py-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            How it works
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-green">
            One team, start to finish
          </span>
        </div>
        <div className="relative grid grid-cols-2 md:grid-cols-5">
          {FLOW.map(([step, icon], i, arr) => (
            <div
              key={step}
              className="relative border-b border-r border-rule px-4 py-6 last:border-r-0 md:border-b-0"
            >
              <JNIcon name={icon} className="mb-4 h-7 w-7 text-ink/75 lg:h-8 lg:w-8" />
              <span className="mb-1 block font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                0{i + 1}
              </span>
              <span className="editorial block text-[17px] leading-tight text-ink lg:text-xl xl:text-2xl">{step}</span>
              {i < arr.length - 1 && (
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: ready ? 1 : 0 }}
                  transition={{ duration: 1.2, delay: 1.4 + i * 0.25, ease: EASE }}
                  className="absolute right-0 top-1/2 hidden h-px w-3 origin-left -translate-y-1/2 bg-green md:block"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
