"use client";

import { motion, useInView } from "motion/react";
import { useRef, ReactNode } from "react";

type SectionHeaderProps = {
  index?: string;
  label?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  /** for use on dark (ink) backgrounds */
  dark?: boolean;
};

export function SectionHeader({
  index,
  label,
  title,
  description,
  align = "left",
  className = "",
  dark = false,
}: SectionHeaderProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div ref={ref} className={`${align === "center" ? "text-center" : ""} ${className}`}>
      <motion.div
        initial={{ y: 12, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
        className={`flex items-center gap-3 ${align === "center" ? "justify-center" : ""}`}
      >
        {index && (
          <span className={`font-mono text-[11px] tracking-[0.18em] ${dark ? "text-off-white/50" : "text-muted"}`}>
            {index}
          </span>
        )}
        {index && <span className={`h-px w-8 ${dark ? "bg-off-white/20" : "bg-rule"}`} />}
        {label && (
          <span className={`font-mono text-[11px] uppercase tracking-[0.18em] ${dark ? "text-off-white/50" : "text-muted"}`}>
            {label}
          </span>
        )}
      </motion.div>

      <motion.h2
        initial={{ y: 24, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1], delay: 0.1 }}
        className={`editorial mt-5 text-[clamp(2rem,5vw,4.5rem)] leading-[0.98] tracking-[-0.035em] max-w-5xl ${dark ? "text-off-white" : "text-ink"}`}
      >
        {title}
      </motion.h2>

      {description && (
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1], delay: 0.2 }}
          className={`mt-6 max-w-2xl text-[15px] leading-relaxed ${dark ? "text-off-white/70" : "text-muted"}`}
        >
          {description}
        </motion.div>
      )}
    </div>
  );
}
