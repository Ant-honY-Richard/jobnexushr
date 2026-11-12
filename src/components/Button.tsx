"use client";

import { cn } from "@/lib/cn";
import Link from "next/link";
import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "ghost" | "outline";
  href?: string;
  className?: string;
  showArrow?: boolean;
  size?: "md" | "lg";
};

export function Button({
  children,
  variant = "primary",
  href,
  className = "",
  showArrow = true,
  size = "md",
}: ButtonProps) {
  const base =
    "group inline-flex items-center justify-center gap-3 font-mono uppercase tracking-[0.18em] transition-all duration-500 will-change-transform";
  const sizes = {
    md: "px-5 py-3 text-[11px]",
    lg: "px-7 py-4 text-[12px]",
  };
  const variants = {
    primary:
      "bg-ink text-off-white border border-ink hover:bg-green hover:text-ink hover:border-green",
    ghost:
      "bg-transparent text-ink border border-ink/15 hover:border-green hover:text-green",
    outline:
      "bg-transparent text-off-white border border-off-white/30 hover:bg-green hover:border-green hover:text-ink",
  };

  const cls = cn(base, sizes[size], variants[variant], className);

  const inner = (
    <>
      <span>{children}</span>
      {showArrow && <span className="btn-arrow">→</span>}
    </>
  );

  if (href) {
    return (
      <Link href={href} data-cursor="cta" className={cls}>
        {inner}
      </Link>
    );
  }

  return (
    <button data-cursor="cta" className={cls}>
      {inner}
    </button>
  );
}
