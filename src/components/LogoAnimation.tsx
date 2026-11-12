import { JN_LOGO as L } from "@/lib/jn-logo-paths";

/**
 * "The Nexus Connection" — Job Nexus HR logo build animation.
 * Ported from the supplied animation project (jn-scene.jsx). It is a pure function of `T`,
 * the AUTHORED time in seconds (0 → LOGO_ANIM_END). Whoever drives it decides how fast
 * the clock runs, so it can be played at any speed and always reaches the finished logo.
 *
 * Scenes (authored seconds): Paths 0 · JForms 0.9 · NLocks 1.85 · Ribbon 2.8 · Wordmark 3.6 · Lockup 4.4
 */

export const CUES = {
  Paths: 0,
  JForms: 0.9,
  NLocks: 1.85,
  Ribbon: 2.8,
  Wordmark: 3.6,
  Lockup: 4.4,
} as const;

/** Authored time at which the very last motion (the final settle) ends. */
export const LOGO_ANIM_END = CUES.Lockup + 0.85;

const INK = "#15160E";
const GREEN = "#0E956A";
const ID = "jnl-";

/* ── easing (the source uses only these three) ─────────────────────────── */
const enter = (t: number) => 1 - Math.pow(1 - t, 4); // easeOutQuart
const draw = (t: number) =>
  t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1; // easeInOutCubic
const pop = (t: number) => 1 - Math.pow(1 - t, 3); // easeOutCubic

/** Tween that holds `from` before `start` and `to` after `end`. */
function tween(
  T: number,
  from: number,
  to: number,
  start: number,
  end: number,
  ease: (t: number) => number
) {
  if (T <= start) return from;
  if (T >= end) return to;
  return from + (to - from) * ease((T - start) / (end - start));
}

/** Half-plane polygon: the region where nx*x + ny*y <= S. */
function halfPlane(nx: number, ny: number, S: number) {
  const B = 4000;
  const px = nx * S;
  const py = ny * S;
  const dx = -ny;
  const dy = nx;
  const pts = [
    [px + dx * B, py + dy * B],
    [px - dx * B, py - dy * B],
    [px - dx * B - nx * B, py - dy * B - ny * B],
    [px + dx * B - nx * B, py + dy * B - ny * B],
  ];
  return pts.map((p) => p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" ");
}

/** J owns everything left of x=196 plus the bowl below y=410; N owns the rest.
 *  The regions overlap by 0.8 units so anti-aliasing leaves no hairline seam where they meet. */
const J_REGION = "-60,-60 196.8,-60 196.8,409.2 620,409.2 620,620 -60,620";
const N_REGION = "195.2,-60 620,-60 620,410.8 195.2,410.8";

type Props = {
  /** authored time, 0 → LOGO_ANIM_END */
  T: number;
  /** colour of the J and N letterforms (ink on light backgrounds) */
  ink?: string;
  className?: string;
};

export function LogoAnimation({ T, ink = INK, className }: Props) {
  /* 1 — two strokes travel in from opposite sides */
  const aX = tween(T, -900, 0, 0, CUES.JForms - 0.1, enter);
  const bX = tween(T, 900, 0, 0.12, CUES.JForms + 0.05, enter);
  const aFade = tween(T, 1, 0, CUES.JForms + 0.05, CUES.JForms + 0.35, draw);
  const bFade = tween(T, 1, 0, CUES.NLocks + 0.05, CUES.NLocks + 0.35, draw);
  const bRise = tween(T, 0, -12, CUES.NLocks - 0.15, CUES.NLocks + 0.3, draw);

  /* 2 — the J is wiped in along its writing direction (down and to the left) */
  const jS = tween(T, 100, 500, CUES.JForms, CUES.NLocks - 0.08, draw);

  /* 3 — the N rises from the bottom of its right stem up into the junction */
  const nS = tween(T, -420, -168, CUES.NLocks + 0.05, CUES.Ribbon - 0.22, draw);
  const lock = tween(T, 1.012, 1, CUES.Ribbon - 0.22, CUES.Ribbon + 0.05, pop);
  const tick = tween(T, 1, 0, CUES.Ribbon - 0.18, CUES.Ribbon + 0.22, draw);
  const tickLen = tween(T, 0, 54, CUES.Ribbon - 0.4, CUES.Ribbon - 0.18, enter);

  /* 4 — the ribbon: a thin line out of the top of the N, then expansion */
  const ribbonOn = T >= CUES.Ribbon ? 1 : 0;
  const rx0 = tween(T, 289, 90, CUES.Ribbon, CUES.Ribbon + 0.34, enter);
  const rx1 = tween(T, 289, 486, CUES.Ribbon, CUES.Ribbon + 0.34, enter);
  const ry0 = tween(T, 168, -12, CUES.Ribbon + 0.26, CUES.Wordmark - 0.02, draw);
  const ry1 = tween(T, 176, 300, CUES.Ribbon + 0.3, CUES.Wordmark + 0.06, draw);
  const rLift = tween(T, 7, 0, CUES.Ribbon + 0.3, CUES.Wordmark + 0.1, pop);

  /* 5 — the wordmark is wiped along the ribbon's own baseline angle */
  const tS = tween(T, 66, 402, CUES.Wordmark + 0.05, CUES.Lockup - 0.08, draw);

  /* 6 — one final settling move upward, then still */
  const settle = tween(T, 7, 0, CUES.Lockup + 0.1, CUES.Lockup + 0.85, pop);

  const guideFade =
    tween(T, 1, 0, CUES.Ribbon - 0.1, CUES.Ribbon + 0.5, draw) *
    tween(T, 0, 1, 0.05, 0.5, draw);

  return (
    <svg
      viewBox={`0 0 ${L.viewBox[2]} ${L.viewBox[3]}`}
      className={className}
      style={{ overflow: "visible", display: "block" }}
      aria-hidden="true"
      focusable="false"
    >
      <g transform={`translate(240 ${239.5 + settle}) scale(${lock}) translate(-240 -239.5)`}>
        <defs>
          <clipPath id={`${ID}jRegion`} clipPathUnits="userSpaceOnUse">
            <polygon points={J_REGION} />
          </clipPath>
          <clipPath id={`${ID}nRegion`} clipPathUnits="userSpaceOnUse">
            <polygon points={N_REGION} />
          </clipPath>
          <clipPath id={`${ID}jWipe`} clipPathUnits="userSpaceOnUse">
            <polygon points={halfPlane(-0.33, 0.944, jS)} />
          </clipPath>
          <clipPath id={`${ID}nWipe`} clipPathUnits="userSpaceOnUse">
            <polygon points={halfPlane(0, -1, nS)} />
          </clipPath>
          <clipPath id={`${ID}ribbonWipe`} clipPathUnits="userSpaceOnUse">
            <rect x={rx0} y={ry0} width={Math.max(0, rx1 - rx0)} height={Math.max(0, ry1 - ry0)} />
          </clipPath>
          <clipPath id={`${ID}textWipe`} clipPathUnits="userSpaceOnUse">
            <polygon points={halfPlane(0.9716, -0.2368, tS)} />
          </clipPath>
        </defs>

        {/* construction guides at the junction */}
        <g opacity={guideFade * 0.55} stroke="#C9C6BE" strokeWidth="1.2">
          <line x1="196" y1="-40" x2="196" y2="520" />
          <line x1="-60" y1="290" x2="560" y2="290" />
        </g>

        {/* the ribbon, under the letterforms */}
        <g
          transform={`translate(0 ${rLift})`}
          clipPath={`url(#${ID}ribbonWipe)`}
          opacity={ribbonOn}
        >
          <path d={L.green} fill={GREEN} />
          <g clipPath={`url(#${ID}textWipe)`}>
            {L.text.map((p, i) => (
              <path key={"t" + i} d={p} fill="#FFFFFF" />
            ))}
            {L.counters.map((p, i) => (
              <path key={"c" + i} d={p} fill={GREEN} />
            ))}
          </g>
        </g>

        {/* the two incoming strokes */}
        <g stroke={ink} strokeWidth="3.5" strokeLinecap="butt">
          <line x1="186" y1="214" x2="152" y2="410" opacity={aFade} transform={`translate(${aX} 0)`} />
          <line
            x1="307"
            y1="186"
            x2="301"
            y2="392"
            opacity={bFade}
            transform={`translate(${bX} ${bRise})`}
          />
        </g>

        {/* the J */}
        <g clipPath={`url(#${ID}jRegion)`}>
          <g clipPath={`url(#${ID}jWipe)`}>
            <path d={L.dark} fill={ink} />
          </g>
        </g>

        {/* the N */}
        <g clipPath={`url(#${ID}nRegion)`}>
          <g clipPath={`url(#${ID}nWipe)`}>
            <path d={L.dark} fill={ink} />
          </g>
        </g>

        {/* alignment ticks that meet at the junction, then vanish */}
        <g opacity={tick * 0.8} stroke={GREEN} strokeWidth="2">
          <line x1={196 - tickLen} y1="266" x2="196" y2="266" />
          <line x1="196" y1={266 - tickLen} x2="196" y2="266" />
        </g>
      </g>
    </svg>
  );
}

/** Four corner registration marks (from the source design); fades in, then out as the lockup lands. */
export function RegistrationMarks({ T }: { T: number }) {
  const o =
    tween(T, 0, 1, 0.1, 0.7, draw) *
    tween(T, 1, 0, CUES.Wordmark, CUES.Lockup + 0.4, draw);
  const corners = [
    "left-5 top-5 sm:left-8 sm:top-8",
    "right-5 top-5 sm:right-8 sm:top-8",
    "bottom-5 left-5 sm:bottom-8 sm:left-8",
    "bottom-5 right-5 sm:bottom-8 sm:right-8",
  ];
  return (
    <>
      {corners.map((pos) => (
        <svg
          key={pos}
          viewBox="-26 -26 52 52"
          className={`absolute h-9 w-9 sm:h-[52px] sm:w-[52px] ${pos}`}
          style={{ opacity: o * 0.5 }}
          aria-hidden="true"
        >
          <g stroke="#C9C6BE" strokeWidth="1.5" fill="none">
            <line x1="-26" y1="0" x2="26" y2="0" />
            <line x1="0" y1="-26" x2="0" y2="26" />
            <circle cx="0" cy="0" r="9" />
          </g>
        </svg>
      ))}
    </>
  );
}
