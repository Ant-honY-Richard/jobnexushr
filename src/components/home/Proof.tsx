"use client";

import Image from "next/image";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { JNIcon, type IconName } from "../icons/JNIcon";

const EASE = [0.65, 0, 0.35, 1] as const;

/**
 * Direct clients. Logos live in /public/clients/ (official files supplied by the owner):
 * Elastic Run = official SVG; Pronto = official square tile, shown as a rounded tile.
 */
const CLIENTS: {
  name: string;
  logo: { src: string; width: number; height: number; className: string };
  note: string;
}[] = [
  {
    name: "Pronto",
    logo: { src: "/clients/pronto-tile.webp", width: 800, height: 800, className: "h-14 w-14 rounded-[14px] lg:h-[72px] lg:w-[72px]" },
    note: "Active relationship",
  },
  {
    name: "Elastic Run",
    logo: { src: "/clients/elasticrun.svg", width: 169, height: 37, className: "h-9 w-auto sm:h-10 lg:h-12" },
    note: "Active relationship",
  },
];

const TRUST: { icon: IconName; head: string; body: string }[] = [
  { icon: "talent", head: "Named people", body: "Every account is handled by a real person on our team — not a shared inbox." },
  { icon: "message", head: "Direct contact", body: "You speak to the person handling your account — and the replies come from them." },
  { icon: "check", head: "Honest scope", body: "We tell you what we can fill — and what we can't — before you commit." },
];

export function Proof() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="relative overflow-hidden border-t border-rule bg-off-white py-14 lg:py-24">
      {/* soft green wash behind the showcase */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[38%] h-[420px] w-[min(1200px,120%)] -translate-x-1/2 rounded-[50%] bg-green/[0.06] blur-3xl"
      />

      <div className="relative mx-auto px-6 lg:px-10" style={{ maxWidth: "1480px" }}>
        {/* Heading — centred, like the reference */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-green/25 bg-white px-3 py-1.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-dark-green">
            <span className="h-1.5 w-1.5 rounded-full bg-green" aria-hidden />
            Our clients
          </p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE }}
            className="editorial mt-5 text-[clamp(2rem,4.4vw,3.6rem)] leading-[1.04] tracking-[-0.035em] text-ink"
          >
            We are fortunate to work
            <br className="hidden sm:block" /> with <span className="text-green">exceptional brands.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-muted"
          >
            Direct clients, named openly — no inflated numbers or anonymous quotes.
          </motion.p>
        </div>

        {/* Logo row — muted until hovered; the others soften (see .client-logos in globals.css) */}
        <motion.ul
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          className="client-logos mx-auto mt-10 grid max-w-3xl grid-cols-2 items-center justify-items-center gap-x-10 gap-y-10 lg:mt-14 lg:gap-x-24"
          aria-label="Direct clients"
        >
          {CLIENTS.map((c) => (
            <li key={c.name} className="flex flex-col items-center gap-4">
              <Image
                src={c.logo.src}
                alt={`${c.name} logo`}
                width={c.logo.width}
                height={c.logo.height}
                className={`${c.logo.className} object-contain`}
              />
              <span className="client-caption text-[12px] font-medium uppercase tracking-[0.14em] text-muted">
                {c.name} · direct client
              </span>
            </li>
          ))}
        </motion.ul>
        <div aria-hidden className="mx-auto mt-12 h-px max-w-3xl bg-gradient-to-r from-transparent via-ink/15 to-transparent lg:mt-16" />

        {/* Why the relationships last — same card language */}
        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3 lg:mt-16">
          {TRUST.map((p, i) => (
            <motion.div
              key={p.head}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 + i * 0.08, ease: EASE }}
              className="group flex gap-4 rounded-2xl border border-ink/[0.08] bg-white p-5 transition-colors duration-300 hover:border-green/40 lg:p-6"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-green/10 text-ink">
                <JNIcon name={p.icon} className="h-6 w-6" />
              </span>
              <div>
                <h3 className="text-[17px] font-semibold text-ink">{p.head}</h3>
                <p className="mt-1.5 text-[14px] leading-relaxed text-muted">{p.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
