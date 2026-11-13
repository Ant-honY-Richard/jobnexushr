"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

export function SignatureLine({
  className = "",
  vertical = false,
}: {
  className?: string;
  vertical?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0, margin: "0px 0px 30% 0px" });

  return (
    <div
      ref={ref}
      className={`relative ${vertical ? "w-px h-full" : "h-px w-full"} ${className}`}
      style={{
        background: vertical
          ? "rgba(21, 22, 14, 0.12)"
          : "rgba(21, 22, 14, 0.12)",
      }}
    >
      <motion.div
        initial={{ scale: vertical ? 1 : 0, scaleY: vertical ? 0 : 1 }}
        animate={
          inView
            ? vertical
              ? { scaleY: 1 }
              : { scaleX: 1 }
            : {}
        }
        transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
        style={{
          transformOrigin: vertical ? "top" : "left",
        }}
        className={`absolute ${vertical ? "left-0 top-0 w-full h-full" : "left-0 top-0 h-full w-full"} bg-green`}
      />
    </div>
  );
}
