import type { ReactNode } from "react";

/**
 * Job Nexus HR custom icon set.
 *
 * Drawing rules (keep new icons consistent):
 * - 32×32 grid, content inside 2–30, 1.5 stroke, round caps/joins, no fills except accents.
 * - Line work uses `currentColor` (ink on light, off-white on dark).
 * - Every icon has ONE accent element (class `jn-accent`) in brand green — the "spark" of the
 *   idea (the check on a hire, the pin on a deployment…). It is recoloured by `.jn-badge` states.
 * - Animation: every icon renders `data-icon={name}`; `globals.css` ("Animated icons") gives each one
 *   a small loop (accent draws itself, lens searches, briefcase swings…). Stroke accents carry
 *   `pathLength={1}` so the draw effect works without measuring paths — keep that on new accents.
 */

/** Accent stroke element. */
function A({ d }: { d: string }) {
  return <path className="jn-accent" d={d} pathLength={1} />;
}
/** Accent filled element. */
function AF({ d }: { d: string }) {
  return <path className="jn-accent-fill" d={d} />;
}

const ICONS = {
  /* ── Services ─────────────────────────────── */
  recruit: (
    <>
      <circle cx="13" cy="11" r="4.5" />
      <path d="M4.5 27c0-4.7 3.8-8.5 8.5-8.5s8.5 3.8 8.5 8.5" />
      <A d="M20 14.5l3 3 5.5-6.5" />
    </>
  ),
  volume: (
    <>
      <circle cx="16" cy="10" r="3.8" />
      <path d="M9.5 24.5c0-3.6 2.9-6.5 6.5-6.5s6.5 2.9 6.5 6.5" />
      <circle cx="7" cy="13" r="2.6" />
      <circle cx="25" cy="13" r="2.6" />
      <path d="M2.5 24c0-2.9 2-5.2 4.5-5.2M29.5 24c0-2.9-2-5.2-4.5-5.2" />
      <A d="M4 28.5h24" />
    </>
  ),
  payroll: (
    <>
      <rect x="7" y="3.5" width="18" height="25" rx="1.5" />
      <path d="M11 9h10M11 12.5h6" />
      <A d="M12.5 17.5h7M12.5 20.5h7M15 17.5c2.8 0 2.8 5 0 5h-2l5 3.5" />
    </>
  ),
  compliance: (
    <>
      <path d="M16 3.5l10.5 4v7.5c0 6.6-4.4 11.3-10.5 13.5C9.9 26.3 5.5 21.6 5.5 15V7.5z" />
      <A d="M11.5 16l3.2 3.2 6-6.7" />
    </>
  ),
  verify: (
    <>
      <rect x="2.5" y="6.5" width="20" height="15" rx="1.5" />
      <circle cx="8.5" cy="12.5" r="2.2" />
      <path d="M5 18.5c.6-1.8 2-2.8 3.5-2.8s2.9 1 3.5 2.8M15 11.5h4.5M15 15h3" />
      <circle className="jn-accent" cx="22.5" cy="20.5" r="4.5" pathLength={1} />
      <A d="M25.8 23.8L29.5 27.5" />
    </>
  ),
  workforce: (
    <>
      <rect x="3.5" y="5.5" width="25" height="18" rx="1.5" />
      <path d="M3.5 10.5h25M12 28.5h8M16 23.5v5M8.5 19.5v-3M12.5 19.5v-5" />
      <A d="M16.5 19.5l3-3 3 2 3.5-4.5" />
    </>
  ),
  /* ── Brand / principles ───────────────────── */
  continuity: (
    <>
      <path d="M10 11.5c-2.5 0-4.5 2-4.5 4.5s2 4.5 4.5 4.5c4.5 0 7.5-9 12-9 2.5 0 4.5 2 4.5 4.5s-2 4.5-4.5 4.5c-4.5 0-7.5-9-12-9z" />
      <AF d="M16 13.8l2.2 2.2-2.2 2.2-2.2-2.2z" />
    </>
  ),
  nexus: (
    <>
      <circle cx="7" cy="8" r="3" />
      <circle cx="25" cy="8" r="3" />
      <circle cx="16" cy="25" r="3" />
      <path d="M9.5 9.7l4.3 3.1M22.5 9.7l-4.3 3.1M16 19.5V22" />
      <AF d="M16 12.5l3.5 3.5-3.5 3.5-3.5-3.5z" />
    </>
  ),
  talent: (
    <>
      <circle cx="15" cy="11" r="4.5" />
      <path d="M6.5 28c0-4.7 3.8-8.5 8.5-8.5s8.5 3.8 8.5 8.5" />
      <AF d="M25.5 2.5l1.3 3 3 1.3-3 1.3-1.3 3-1.3-3-3-1.3 3-1.3z" />
    </>
  ),
  growth: (
    <>
      <path d="M4.5 4.5v23h23" />
      <A d="M8.5 21.5l6-6 4 4 8.5-8.5M21 11h6v6" />
    </>
  ),
  /* ── Process ──────────────────────────────── */
  requirement: (
    <>
      <rect x="6.5" y="5.5" width="19" height="23" rx="1.5" />
      <path d="M11 14h10M11 18h10M11 22h6" />
      <rect className="jn-accent" x="12" y="3.5" width="8" height="4" rx="1" pathLength={1} />
    </>
  ),
  understand: (
    <>
      <path d="M3 16s4.5-8 13-8 13 8 13 8-4.5 8-13 8S3 16 3 16z" />
      <circle className="jn-accent" cx="16" cy="16" r="3.8" pathLength={1} />
    </>
  ),
  match: (
    <>
      <circle cx="12" cy="16" r="7.5" />
      <circle cx="20" cy="16" r="7.5" />
      <AF d="M16 9.7a7.5 7.5 0 0 1 0 12.6 7.5 7.5 0 0 1 0-12.6z" />
    </>
  ),
  deploy: (
    <>
      <path d="M16 28.5s-8.5-7.8-8.5-14.5a8.5 8.5 0 0 1 17 0c0 6.7-8.5 14.5-8.5 14.5z" />
      <circle className="jn-accent" cx="16" cy="14" r="3.2" pathLength={1} />
    </>
  ),
  attendance: (
    <>
      <rect x="4.5" y="6.5" width="23" height="21" rx="1.5" />
      <path d="M4.5 12h23M10.5 3.5v5M21.5 3.5v5" />
      <A d="M11.5 19.5l3 3 6-6" />
    </>
  ),
  support: (
    <>
      <path d="M6.5 18v-3a9.5 9.5 0 0 1 19 0v3" />
      <rect x="4.5" y="17" width="4.5" height="7.5" rx="1.5" />
      <rect x="23" y="17" width="4.5" height="7.5" rx="1.5" />
      <A d="M25.5 24.5c0 2.5-2.5 4-6 4h-2" />
    </>
  ),
  /* ── Audiences / contact ──────────────────── */
  employer: (
    <>
      <rect x="3.5" y="9.5" width="25" height="17" rx="1.5" />
      <path d="M12 9.5v-3h8v3M3.5 17h25" />
      <rect className="jn-accent-fill" x="14" y="15" width="4" height="4" rx=".5" />
    </>
  ),
  candidate: (
    <>
      <circle cx="14" cy="14" r="9" />
      <path d="M20.5 20.5l7 7" />
      <circle className="jn-accent" cx="14" cy="11.5" r="2.5" pathLength={1} />
      <A d="M9.8 18.5c.9-1.9 2.4-3 4.2-3s3.3 1.1 4.2 3" />
    </>
  ),
  message: (
    <>
      <path d="M4.5 6.5h23v15H14l-6 5v-5H4.5z" />
      <AF d="M10.5 12.8h2.4v2.4h-2.4zM14.8 12.8h2.4v2.4h-2.4zM19.1 12.8h2.4v2.4h-2.4z" />
    </>
  ),
  mail: (
    <>
      <rect x="3.5" y="6.5" width="25" height="19" rx="1.5" />
      <A d="M4 8l12 9.5L28 8" />
    </>
  ),
  story: (
    <>
      <path d="M3.5 7c4.2-1.6 8.3-1 12.5 1v19c-4.2-2-8.3-2.6-12.5-1zM28.5 7c-4.2-1.6-8.3-1-12.5 1v19c4.2-2 8.3-2.6 12.5-1z" />
      <A d="M21.5 6.5v7l2-1.5 2 1.5V6" />
    </>
  ),
  check: <A d="M7 16.5l6 6L25.5 10" />,
  cross: <path d="M9 9l14 14M23 9L9 23" />,
  /* ── Industries ───────────────────────────── */
  tech: (
    <>
      <rect x="3.5" y="5.5" width="25" height="17" rx="1.5" />
      <path d="M11.5 27.5h9M16 22.5v5" />
      <A d="M13 10.5l-3.5 3.5 3.5 3.5M19 10.5l3.5 3.5-3.5 3.5" />
    </>
  ),
  bfsi: (
    <>
      <path d="M4 11L16 4.5 28 11M8 14.5v9M13 14.5v9M19 14.5v9M24 14.5v9M3.5 27h25" />
      <A d="M5 11.5h22" />
    </>
  ),
  healthcare: (
    <>
      <circle cx="16" cy="16" r="12.5" />
      <A d="M13 8.5h6v4.5h4.5v6H19v4.5h-6V19H8.5v-6H13z" />
    </>
  ),
  pharma: (
    <g transform="rotate(-40 16 16)">
      <rect x="4" y="11.5" width="24" height="9" rx="4.5" />
      <path d="M16 11.5v9" />
      <AF d="M16 11.5H8.5a4.5 4.5 0 0 0 0 9H16z" />
    </g>
  ),
  manufacturing: (
    <>
      <path d="M3.5 27.5V15l6.5 4v-4l6.5 4v-4l6.5 4V5h5v22.5z" />
      <A d="M8.5 23.5h2.5M14.5 23.5h2.5M20.5 23.5h2.5" />
    </>
  ),
  retail: (
    <>
      <path d="M6.5 11h19l-1.5 16.5H8z" />
      <path d="M12 11V9a4 4 0 0 1 8 0v2" />
      <A d="M12.5 17a3.5 3.5 0 0 0 7 0" />
    </>
  ),
  ecommerce: (
    <>
      <path d="M2.5 4.5h4l3 14.5h15.5l3-10H8.5" />
      <circle cx="12" cy="25" r="2" />
      <circle cx="23" cy="25" r="2" />
      <A d="M13 13.5h10" />
    </>
  ),
  logistics: (
    <>
      <rect x="2.5" y="8.5" width="16.5" height="13.5" rx="1" />
      <path d="M19 12.5h5l4.5 5v4.5H19" />
      <circle cx="8" cy="24" r="2.5" />
      <circle cx="23.5" cy="24" r="2.5" />
      <A d="M6 13.5h8.5M6 17h5" />
    </>
  ),
  hospitality: (
    <>
      <path d="M5.5 21.5a10.5 10.5 0 0 1 21 0M16 11V8.5M13.5 8h5" />
      <A d="M3 21.5h26" />
      <path d="M6 25.5h20" />
    </>
  ),
  telecom: (
    <>
      <circle cx="16" cy="10" r="2" />
      <path d="M16 12l-6 16M16 12l6 16M12 22.5h8" />
      <A d="M11.3 5.5a6.5 6.5 0 0 0 0 9M20.7 5.5a6.5 6.5 0 0 1 0 9" />
    </>
  ),
  construction: (
    <>
      <path d="M5.5 21.5a10.5 10.5 0 0 1 21 0" />
      <path d="M3 21.5h26v3.5H3z" />
      <A d="M16 11v10.5M12 12.5v5M20 12.5v5" />
    </>
  ),
  bpo: (
    <>
      <path d="M6.5 18v-3a9.5 9.5 0 0 1 19 0v3" />
      <rect x="4.5" y="17" width="4.5" height="7.5" rx="1.5" />
      <rect x="23" y="17" width="4.5" height="7.5" rx="1.5" />
      <A d="M13 13.5h6M14.5 10h3" />
    </>
  ),
} satisfies Record<string, ReactNode>;

export type IconName = keyof typeof ICONS;

export function JNIcon({
  name,
  className = "h-6 w-6",
  title,
}: {
  name: IconName;
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`jn-icon ${className}`}
      data-icon={name}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title && <title>{title}</title>}
      {ICONS[name]}
    </svg>
  );
}

/** The chamfer used across the brand (top-left + bottom-right corners cut, like the hero shape). */
export const CHAMFER = "polygon(24% 0, 100% 0, 100% 76%, 76% 100%, 0 100%, 0 24%)";

/**
 * Icon inside the brand chamfer tile. Turns green when an ancestor `.group` is hovered or when
 * `active` is set (use `active` for tap/selected states so touch devices get the same reveal).
 */
export function IconBadge({
  name,
  size = "md",
  tone = "light",
  active = false,
  className = "",
}: {
  name: IconName;
  size?: "sm" | "md" | "lg";
  tone?: "light" | "dark";
  active?: boolean;
  className?: string;
}) {
  const box = size === "sm" ? "h-10 w-10" : size === "lg" ? "h-20 w-20" : "h-14 w-14";
  const icon = size === "sm" ? "h-5 w-5" : size === "lg" ? "h-10 w-10" : "h-7 w-7";
  return (
    <span
      className={`jn-badge relative grid shrink-0 place-items-center ${box} ${className}`}
      data-tone={tone}
      data-active={active || undefined}
      aria-hidden="true"
    >
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <polygon
          className="jn-badge-shape"
          points="24,0.75 99.25,0.75 99.25,76 76,99.25 0.75,99.25 0.75,24"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <JNIcon name={name} className={`relative ${icon}`} />
    </span>
  );
}
