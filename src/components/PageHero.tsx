"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useLoaderReady } from "@/lib/loader-state";
import { BrandVisual } from "./visual/BrandVisual";
import type { IconName } from "./icons/JNIcon";
import { VISUALS, type Visual, type VisualKey } from "@/lib/visuals";

const EASE = [0.65, 0, 0.35, 1] as const;

const words = (s: string) => s.toLowerCase().replace(/[^a-z ]/g, " ").split(/\s+/).filter(Boolean).join(" ");
const sameWords = (a: string, b: string) => words(a) === words(b) || words(a).endsWith(words(b));

type PageHeroProps = {
  index: string;
  label: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Optional hero-style framed visual on the right (photo slot + custom icon fallback). */
  visual?: { asset: VisualKey; icon: IconName; label?: string };
  /** Breadcrumb trail for detail pages; the last item (no href) is the current page. */
  crumbs?: { label: string; href?: string }[];
  /** Soft green swoosh in the bottom-right corner (from the Jobs mockup). */
  swoosh?: boolean;
};

/**
 * Inner-page hero.
 * Desktop (lg+): text left (7/12), visual right. Phones/tablets: visual FIRST, edge to edge under the
 * navbar, then a compact pill label, headline and description (like the home hero, image leads).
 */
export function PageHero({ index, label, title, description, visual, crumbs, swoosh }: PageHeroProps) {
  // Wait for the logo loader to lift so the title animation is actually seen.
  const ready = useLoaderReady();
  const composed = visual ? Boolean((VISUALS[visual.asset] as Visual).composed) : false;

  return (
    <section
      className={`relative overflow-hidden bg-off-white pb-10 lg:pb-16 lg:pt-32 ${
        swoosh ? "" : "border-b border-rule"
      } ${visual ? "pt-24" : "pt-28"}`}
    >
      {swoosh && (
        <svg
          aria-hidden
          viewBox="0 0 600 400"
          preserveAspectRatio="none"
          className="pointer-events-none absolute bottom-0 right-0 h-[46%] w-[85%] max-w-[760px] lg:h-[55%] lg:w-[48%]"
          style={{
            WebkitMaskImage: "linear-gradient(to bottom, #000 35%, transparent 100%), linear-gradient(to right, transparent 0%, #000 30%)",
            WebkitMaskComposite: "source-in",
            maskImage: "linear-gradient(to bottom, #000 35%, transparent 100%), linear-gradient(to right, transparent 0%, #000 30%)",
            maskComposite: "intersect",
          }}
        >
          <defs>
            <linearGradient id="ph-swoosh" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0" stopColor="#0E956A" stopOpacity="0" />
              <stop offset="1" stopColor="#0E956A" stopOpacity="0.22" />
            </linearGradient>
          </defs>
          <path d="M0 400C140 300 300 250 600 230V400z" fill="url(#ph-swoosh)" />
          <path d="M150 400C300 300 430 200 600 110V400z" fill="url(#ph-swoosh)" opacity="0.7" />
        </svg>
      )}
      <div
        className={`relative mx-auto px-6 lg:px-10 ${visual ? "flex flex-col lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-8" : ""}`}
        style={{ maxWidth: "1480px" }}
      >
        {/* Visual — first on phones, right column on desktop */}
        {visual && (
          <div
            className={`order-first lg:order-none lg:row-start-1 ${
              composed
                ? "-mx-6 sm:mx-auto sm:w-full sm:max-w-xl lg:col-span-5 lg:col-start-8 lg:-mr-6 lg:max-w-none xl:-mr-10"
                : "mt-4 sm:mx-auto sm:w-full sm:max-w-md lg:col-span-4 lg:col-start-9 lg:mx-0 lg:mt-0 lg:max-w-none"
            }`}
          >
            <BrandVisual
              asset={visual.asset}
              icon={visual.icon}
              label={visual.label ?? label}
              aspect="aspect-[16/10] lg:aspect-square"
              shape="right"
              play={ready}
              priority
              sizes={composed ? "(min-width: 1024px) 42vw, 100vw" : "(min-width: 1024px) 30vw, 100vw"}
              className={composed ? "" : "mx-3 sm:mx-5 lg:mx-0"}
              imgClassName="mx-auto block h-auto w-auto max-w-full max-h-[440px] sm:max-h-[520px] lg:max-h-[600px]"
            />
          </div>
        )}

        {/* Copy */}
        <div className={visual ? `lg:col-span-7 lg:col-start-1 lg:row-start-1 ${composed ? "mt-4 lg:pr-4" : "mt-10"} lg:mt-0` : ""}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: ready ? 1 : 0 }}
            transition={{ duration: 0.7 }}
          >
            {crumbs ? (
              /* Breadcrumb trail (detail pages) — replaces the label on every size */
              <nav aria-label="Breadcrumb">
                <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                  {crumbs.map((c, i) => (
                    <li key={c.label} className="flex items-center gap-2">
                      {i > 0 && <span aria-hidden className="text-ink/30">/</span>}
                      {c.href ? (
                        <Link href={c.href} className="py-1 transition-colors hover:text-green">
                          {c.label}
                        </Link>
                      ) : (
                        <span aria-current="page" className="text-dark-green">
                          {c.label}
                        </span>
                      )}
                    </li>
                  ))}
                </ol>
              </nav>
            ) : (
              <>
                {/* Phones: compact pill */}
                <span className="inline-flex items-center gap-2 rounded-full bg-green/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-dark-green lg:hidden">
                  <span className="h-1.5 w-1.5 rounded-full bg-green" />
                  {label}
                </span>
                {/* Desktop: index · rule · label */}
                <span className="hidden items-center gap-3 lg:flex">
                  <span className="font-mono text-[11px] tracking-[0.18em] text-muted">{index}</span>
                  {/* Only show the label when it adds something the index doesn't already say */}
                  {!sameWords(index, label) && (
                    <>
                      <span className="h-px w-12 bg-rule" />
                      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">{label}</span>
                    </>
                  )}
                </span>
              </>
            )}
          </motion.div>

          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: ready ? 0 : 30, opacity: ready ? 1 : 0 }}
            transition={{ duration: 0.9, ease: EASE }}
            className={`editorial mt-4 max-w-5xl leading-[0.98] tracking-[-0.04em] text-ink lg:mt-7 lg:leading-[0.95] ${
              visual
                ? "text-[clamp(2.1rem,8.6vw,3.25rem)] lg:text-[clamp(3rem,5.4vw,5.5rem)]"
                : "text-[clamp(2.1rem,8.6vw,3.5rem)] lg:text-[clamp(3.5rem,6.4vw,6.5rem)]"
            }`}
          >
            {title}
          </motion.h1>

          {description && (
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: ready ? 0 : 30, opacity: ready ? 1 : 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
              className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted lg:mt-7 lg:text-[16px]"
            >
              {description}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
