"use client";

import Image from "next/image";
import { motion, useInView } from "motion/react";
import { useId, useRef } from "react";
import { CHAMFER, JNIcon, type IconName } from "../icons/JNIcon";
import { VISUALS, type Visual, type VisualKey } from "@/lib/visuals";

const EASE = [0.65, 0, 0.35, 1] as const;

type BrandVisualProps = {
  /** Photo slot (see src/lib/visuals.ts). Without a photo the designed fallback art is shown. */
  asset: VisualKey;
  /** Custom icon for the fallback art. */
  icon: IconName;
  /** Mono label on the fallback art, e.g. "Staffing / 01". */
  label?: string;
  /** Aspect ratio classes, e.g. "aspect-[4/5]" or "aspect-[4/3] lg:aspect-[4/5]". */
  aspect?: string;
  tone?: "light" | "dark";
  /** Which side the green backing shape sits on. */
  shape?: "left" | "right";
  /** "chamfer" (default) masks the photo like the hero; "full" shows the whole image (rounded
   *  rectangle) — use it for posters with text or anything that must not lose its corners. */
  frame?: "chamfer" | "full";
  /** Override the in-view trigger (hero visuals wait for the logo loader instead). */
  play?: boolean;
  sizes?: string;
  priority?: boolean;
  className?: string;
  /** Composed artwork only: classes for the <img> (e.g. a max height). */
  imgClassName?: string;
};

/**
 * The hero's visual language, reusable: a photo in the rounded-chamfer mask, a green chamfer shape
 * behind it and thin green outline strokes that draw in.
 */
export function BrandVisual({
  asset,
  icon,
  label,
  aspect = "aspect-[4/5]",
  tone = "light",
  shape = "left",
  frame = "chamfer",
  play,
  sizes = "(min-width: 1024px) 40vw, 100vw",
  priority = false,
  className = "",
  imgClassName = "block h-auto w-full",
}: BrandVisualProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const on = play ?? inView;
  const clipId = `jn-frame-${useId().replace(/:/g, "")}`;
  const visual: Visual = VISUALS[asset];

  // Pre-composed artwork: the frame and shapes are in the image — just reveal it.
  if (visual.src && visual.composed) {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 24 }}
        animate={on ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.1, ease: EASE }}
        className={className}
      >
        <Image
          src={visual.src}
          alt={visual.alt}
          width={visual.composed.width}
          height={visual.composed.height}
          sizes={sizes}
          priority={priority}
          className={`select-none ${imgClassName}`}
          draggable={false}
        />
      </motion.div>
    );
  }
  const left = shape === "left";
  const full = frame === "full";

  return (
    <div ref={ref} className={`relative ${aspect} ${className}`}>
      {/* Frame mask (objectBoundingBox so it scales with any aspect) */}
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <clipPath id={clipId} clipPathUnits="objectBoundingBox">
            {left ? (
              <path d="M0.17,0 H0.95 Q1,0 1,0.05 V0.83 L0.83,1 H0.05 Q0,1 0,0.95 V0.17 Z" />
            ) : (
              <path d="M0.05,0 H0.83 L1,0.17 V0.95 Q1,1 0.95,1 H0.17 L0,0.83 V0.05 Q0,0 0.05,0 Z" />
            )}
          </clipPath>
        </defs>
      </svg>

      {/* Green chamfer shape behind the frame */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, x: left ? -24 : 24, y: -16 }}
        animate={on ? { opacity: 1, x: 0, y: 0 } : {}}
        transition={{ duration: 1, ease: EASE, delay: 0.15 }}
        className={`absolute -top-3 h-[58%] w-[46%] bg-green sm:-top-5 ${left ? "-left-3 sm:-left-5" : "-right-3 sm:-right-5"}`}
        style={{ clipPath: CHAMFER }}
      />

      {/* Thin outline strokes, like the hero */}
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="pointer-events-none absolute -inset-2 z-10 h-[calc(100%+1rem)] w-[calc(100%+1rem)] overflow-visible sm:-inset-3 sm:h-[calc(100%+1.5rem)] sm:w-[calc(100%+1.5rem)]"
      >
        {(full
          ? left
            ? ["M1 46 V4 Q1 1 4 1 H46", "M99 56 V96 Q99 99 96 99 H58"]
            : ["M54 1 H96 Q99 1 99 4 V46", "M42 99 H4 Q1 99 1 96 V56"]
          : left
            ? ["M1 46 V16 L16 1 H46", "M99 56 V84 L84 99 H58"]
            : ["M54 1 H84 L99 16 V46", "M42 99 H16 L1 84 V56"]
        ).map((d, i) => (
          <motion.path
            key={d}
            d={d}
            fill="none"
            stroke="#0E956A"
            strokeWidth="1.5"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={on ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 1.4, ease: EASE, delay: 0.35 + i * 0.2 }}
          />
        ))}
      </svg>

      {/* The framed picture */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={on ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1, ease: EASE }}
        className={`relative h-full w-full overflow-hidden ${full ? "rounded-[18px] shadow-[0_40px_80px_-40px_rgba(4,46,39,0.45)]" : ""}`}
        style={full ? undefined : { clipPath: `url(#${clipId})` }}
      >
        {visual.src ? (
          <Image
            src={visual.src}
            alt={visual.alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover"
            style={{
              objectPosition: visual.focus,
              transform: visual.zoom ? `scale(${visual.zoom})` : undefined,
              transformOrigin: visual.focus,
            }}
          />
        ) : (
          <BrandArt icon={icon} label={label} tone={tone} on={on} cut={full ? "none" : shape} />
        )}
      </motion.div>
    </div>
  );
}

/** Designed placeholder: tinted field, dot grid, orbit rings and the custom icon at poster scale. */
export function BrandArt({
  icon,
  label,
  tone,
  on,
  cut = "none",
}: {
  icon: IconName;
  label?: string;
  tone: "light" | "dark";
  on: boolean;
  /** Which frame corners are cut, so labels stay clear of them. */
  cut?: "left" | "right" | "none";
}) {
  const dark = tone === "dark";
  const muted = dark ? "text-off-white/60" : "text-muted";
  return (
    <div
      role="presentation"
      className={`absolute inset-0 ${dark ? "text-off-white" : "text-ink"}`}
      style={{
        backgroundColor: dark ? "#0b1f19" : "#eef4f0",
        backgroundImage: dark
          ? "radial-gradient(rgba(250,249,247,0.08) 1px, transparent 1.2px), radial-gradient(120% 90% at 80% 10%, rgba(14,149,106,0.35), transparent 60%)"
          : "radial-gradient(rgba(21,22,14,0.09) 1px, transparent 1.2px), radial-gradient(120% 90% at 85% 10%, rgba(14,149,106,0.16), transparent 60%)",
        backgroundSize: "18px 18px, 100% 100%",
      }}
    >
      {/* Orbit rings */}
      <svg viewBox="0 0 400 400" className="orbit-rotate absolute left-1/2 top-1/2 h-[92%] w-auto -translate-x-1/2 -translate-y-1/2" aria-hidden="true">
        <circle cx="200" cy="200" r="190" fill="none" stroke="currentColor" strokeOpacity="0.1" />
        <circle cx="200" cy="200" r="135" fill="none" stroke="currentColor" strokeOpacity="0.12" strokeDasharray="2 6" />
        <circle cx="200" cy="10" r="4" fill="#0E956A" />
        <circle cx="335" cy="200" r="3" fill="currentColor" fillOpacity="0.35" />
      </svg>

      {/* Icon on a chamfer tile */}
      <div className="absolute inset-0 grid place-items-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={on ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: EASE, delay: 0.4 }}
          className="relative grid aspect-square w-[42%] max-w-[220px] place-items-center"
        >
          <div
            className={`absolute inset-0 ${dark ? "bg-off-white/[0.06]" : "bg-off-white"}`}
            style={{ clipPath: CHAMFER, boxShadow: "0 30px 60px -30px rgba(4,46,39,0.35)" }}
          />
          <JNIcon name={icon} className="relative h-[58%] w-[58%] [stroke-width:1.1]" />
        </motion.div>
      </div>

      {/* Labels */}
      {label && (
        <span className={`absolute top-5 font-mono text-[10px] uppercase tracking-[0.2em] ${muted} ${cut === "left" ? "left-[20%]" : "left-5"}`}>
          {label}
        </span>
      )}
      <span className={`absolute bottom-5 font-mono text-[10px] uppercase tracking-[0.2em] ${muted} ${cut === "right" ? "right-5 left-[20%] text-right" : "left-5 right-[20%]"}`}>
        Better Talent · <span className="text-green">Brighter Futures</span>
      </span>
    </div>
  );
}
