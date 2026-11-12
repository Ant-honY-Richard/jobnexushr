"use client";

import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { SectionHeader } from "../SectionHeader";
import { BrandVisual } from "../visual/BrandVisual";
import { IconBadge, type IconName } from "../icons/JNIcon";

const EASE = [0.65, 0, 0.35, 1] as const;

const CHAIN: { icon: IconName; tag: string; title: string; body: string }[] = [
  {
    icon: "requirement",
    tag: "The brief",
    title: "Fill the requirement.",
    body: "The right people, screened and verified, in the role when you need them.",
  },
  {
    icon: "volume",
    tag: "The team",
    title: "Build the workforce.",
    body: "A steady team that shows up — with attendance, payroll and grievances supported after day one.",
  },
  {
    icon: "growth",
    tag: "The result",
    title: "Grow together.",
    body: "Businesses that grow and careers that move forward — with the same people beside you.",
  },
];

const STATEMENTS: { code: string; icon: IconName; quote: string; body: string }[] = [
  {
    code: "For employers",
    icon: "employer",
    quote: "We already know what you need.",
    body: "Your account never gets passed around. The person who takes your first brief stays your contact — so you never have to explain it twice.",
  },
  {
    code: "For candidates",
    icon: "candidate",
    quote: "Someone here knows your name.",
    body: "Whether it's a contract or a career, you're a person with a story — not a CV in a pile. We tell you the truth about the role, and we stay in touch after you join.",
  },
  {
    code: "Our team",
    icon: "nexus",
    quote: "People get chances before they get replaced.",
    body: "We give our own people the same patience and support we ask clients to trust us with. A steady team serves you better.",
  },
];

export function TheIdea() {
  const [active, setActive] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      className="relative bg-off-white py-14 lg:py-24 border-t border-rule"
    >
      <div className="mx-auto px-6 lg:px-10" style={{ maxWidth: "1480px" }}>
        <div className="grid grid-cols-1 items-center gap-y-16 gap-x-8 lg:grid-cols-12">
          {/* Story column */}
          <div className="lg:col-span-5">
            <SectionHeader
              index="/ 03"
              label="The Idea"
              title={
                <>
                  Better talent.
                  <br />
                  <span className="text-green">Brighter futures.</span>
                </>
              }
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
              className="mt-8 max-w-md text-[18px] leading-[1.6] text-ink/80"
            >
              One right hire is a chain reaction — it steadies a shift, lifts the team
              around it and changes the direction of someone&apos;s career.
            </motion.p>

            {/* The chain: steps 01–02 are the words on the poster, 03 is where they lead */}
            <ol className="relative mt-12 max-w-md">
              <span aria-hidden="true" className="absolute bottom-7 left-5 top-5 w-px bg-rule" />
              <motion.span
                aria-hidden="true"
                initial={{ scaleY: 0 }}
                animate={inView ? { scaleY: 1 } : {}}
                transition={{ duration: 1.6, ease: EASE, delay: 0.5 }}
                style={{ transformOrigin: "top" }}
                className="absolute bottom-7 left-5 top-5 w-px bg-green"
              />
              {CHAIN.map((c, i) => (
                <motion.li
                  key={c.title}
                  initial={{ opacity: 0, x: -16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.7, ease: EASE, delay: 0.55 + i * 0.2 }}
                  className="group relative flex gap-6 pb-8 last:pb-0"
                >
                  <IconBadge name={c.icon} size="sm" active={i === CHAIN.length - 1} className="relative z-10" />
                  <div className="pt-1">
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                      0{i + 1} · {c.tag}
                    </span>
                    <h3 className={`editorial mt-2 text-[clamp(1.4rem,2.2vw,1.9rem)] leading-[1.05] tracking-[-0.03em] ${i === CHAIN.length - 1 ? "text-green" : "text-ink"}`}>
                      {c.title}
                    </h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-muted">{c.body}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>

          {/* The poster — shown whole, text included */}
          <div className="relative lg:col-span-6 lg:col-start-7">
            <BrandVisual
              asset="idea"
              icon="continuity"
              label="The Idea / Continuity"
              shape="right"
              frame="full"
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="mx-3 sm:mx-auto sm:max-w-lg lg:max-w-none"
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 1 }}
              className="mt-8 flex items-center gap-3 px-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted sm:justify-center lg:justify-end lg:px-0"
            >
              <span className="h-px w-10 bg-green" />
              One right hire can change a team — and a career
            </motion.p>
          </div>
        </div>

        {/* Three interactive statements */}
        <div className="mt-12 lg:mt-16 relative">
          {/* Connecting line behind */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-rule hidden lg:block" />
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 2, ease: [0.65, 0, 0.35, 1], delay: 0.6 }}
            style={{ transformOrigin: "left" }}
            className="absolute top-1/2 left-0 right-0 h-px bg-green hidden lg:block"
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-0 relative">
            {STATEMENTS.map((s, i) => (
              <motion.div
                key={s.code}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.7,
                  delay: 0.6 + i * 0.15,
                  ease: [0.65, 0, 0.35, 1],
                }}
                onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
                onPointerLeave={(e) => e.pointerType === "mouse" && setActive(null)}
                onClick={() => setActive(i)}
                className="group relative cursor-pointer border border-rule bg-off-white p-8 lg:p-10 transition-all duration-700 lg:mx-0 lg:translate-y-0 hover:-translate-y-2 hover:border-green"
                data-cursor="label"
                data-cursor-label={s.code}
              >
                <div className="flex items-start justify-between mb-10">
                  <div>
                    <IconBadge name={s.icon} active={active === i} />
                    <span className="mt-5 block font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                      {s.code} / 0{i + 1}
                    </span>
                  </div>
                </div>
                <p className="editorial text-[clamp(1.6rem,3vw,2.5rem)] leading-[1.05] tracking-[-0.03em] text-ink">
                  {s.quote}
                </p>
                <motion.p
                  initial={false}
                  animate={{
                    opacity: active === i ? 1 : 0,
                    height: active === i ? "auto" : 0,
                  }}
                  transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
                  className="overflow-hidden mt-6 text-[14px] leading-relaxed text-muted"
                >
                  {s.body}
                </motion.p>
                <div className="mt-10 flex items-center gap-3">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted group-hover:text-green transition-colors">
                    Read more
                  </span>
                  <span className="btn-arrow text-muted group-hover:text-green">→</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
