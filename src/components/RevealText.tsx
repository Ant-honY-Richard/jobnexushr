"use client";

import { motion, useInView } from "motion/react";
import { useRef, ReactNode } from "react";

type RevealTextProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "div" | "span";
};

export function RevealText({
  children,
  delay = 0,
  className = "",
  as = "div",
}: RevealTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  const commonProps = {
    initial: { y: 40, opacity: 0 },
    animate: inView ? { y: 0, opacity: 1 } : {},
    transition: { duration: 0.9, ease: [0.65, 0, 0.35, 1] as const, delay },
    className,
    ref,
  };

  if (as === "h1") return <motion.h1 {...commonProps}>{children}</motion.h1>;
  if (as === "h2") return <motion.h2 {...commonProps}>{children}</motion.h2>;
  if (as === "h3") return <motion.h3 {...commonProps}>{children}</motion.h3>;
  if (as === "p") return <motion.p {...commonProps}>{children}</motion.p>;
  if (as === "span") return <motion.span {...commonProps}>{children}</motion.span>;
  return <motion.div {...commonProps}>{children}</motion.div>;
}
