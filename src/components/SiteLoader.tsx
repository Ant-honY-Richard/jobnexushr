"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { LogoAnimation, RegistrationMarks, LOGO_ANIM_END } from "./LogoAnimation";
import { setLoaderReady } from "@/lib/loader-state";
import { cn } from "@/lib/cn";

/* ── Timing — tweak here ────────────────────────────────────────────────────
   The logo animation is authored at ~5.25 s. We play the WHOLE thing, just faster:
   the clock runs at (LOGO_ANIM_END / duration) x speed. */
const INTRO_MS = 1800; // first page load: full animation in 1.8 s
const NAV_MS = 1100; // clicking a nav link: full animation in 1.1 s
const EXIT_MS = 400; // overlay lifts away
const READY_CAP_MS = 2500; // never wait longer than this for the page after the animation ends
const EASE_EXIT = "cubic-bezier(0.76, 0, 0.24, 1)";

type Mode = "intro" | "nav";
type Phase = "playing" | "leaving" | "hidden";

/** Sitewide logo loader: plays on first load and when an internal link is clicked. */
export function SiteLoader() {
  const pathname = usePathname();
  const [mode, setMode] = useState<Mode>("intro");
  const [phase, setPhase] = useState<Phase>("playing");
  const [T, setT] = useState(0);
  const [run, setRun] = useState(0);

  // Live values read from the animation loop / click handler without re-subscribing.
  const modeRef = useRef<Mode>("intro");
  const phaseRef = useRef<Phase>("playing");
  const readyRef = useRef(false); // "the page behind the overlay is ready"
  const pathRef = useRef(pathname);

  const changePhase = useCallback((p: Phase) => {
    phaseRef.current = p;
    setPhase(p);
  }, []);

  const start = useCallback(
    (m: Mode) => {
      modeRef.current = m;
      readyRef.current = false;
      setLoaderReady(false);
      setMode(m);
      setT(0);
      changePhase("playing");
      setRun((r) => r + 1);
    },
    [changePhase]
  );

  /* Page-ready signals */
  useEffect(() => {
    // Client navigation finished → the new route has rendered behind the overlay.
    if (pathRef.current !== pathname) {
      pathRef.current = pathname;
      if (modeRef.current === "nav" && phaseRef.current === "playing") readyRef.current = true;
    }
  }, [pathname]);

  useEffect(() => {
    // First load: ready when the browser has finished loading the page.
    if (document.readyState === "complete") {
      if (modeRef.current === "intro") readyRef.current = true;
      return;
    }
    const onLoad = () => {
      if (modeRef.current === "intro") readyRef.current = true;
    };
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  /* Start the loader when an internal link is clicked (capture phase: runs before Next's Link
     handler calls preventDefault). */
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (phaseRef.current !== "hidden") return;
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || (a.target && a.target !== "_self") || a.hasAttribute("download")) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname) return; // same page / #hash / ?query only
      start("nav");
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [start]);

  /* The animation clock */
  useEffect(() => {
    // Plays regardless of the OS "reduce motion" flag: it is short, has no parallax or large
    // sweeps, and the previous loader behaved the same way.
    const duration = mode === "intro" ? INTRO_MS : NAV_MS;
    const t0 = performance.now();
    let doneAt = 0;
    let raf = 0;
    let exitTimer = 0;

    const leave = () => {
      setLoaderReady(true);
      changePhase("leaving");
      exitTimer = window.setTimeout(() => changePhase("hidden"), EXIT_MS);
    };

    const tick = () => {
      const now = performance.now();
      const p = Math.min(1, (now - t0) / duration);
      setT(p * LOGO_ANIM_END);
      if (p >= 1) {
        // Animation has fully played. Leave as soon as the page is ready (or after the cap).
        doneAt ||= now;
        if (readyRef.current || now - doneAt > READY_CAP_MS) {
          leave();
          return;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(exitTimer);
    };
  }, [run, mode, changePhase]);

  if (phase === "hidden") return null;

  const pct = Math.min(100, Math.floor((T / LOGO_ANIM_END) * 100));

  return (
    <div
      role="status"
      aria-label="Loading Job Nexus HR"
      className={cn(
        "fixed inset-0 z-[9999] overflow-hidden border-b border-green bg-off-white text-ink",
        mode === "nav" && "jn-loader-fade"
      )}
      style={{
        transform: phase === "leaving" ? "translateY(-100%)" : "translateY(0)",
        transition: `transform ${EXIT_MS}ms ${EASE_EXIT}`,
      }}
    >
      <RegistrationMarks T={T} />

      {mode === "intro" && (
        <div className="absolute inset-x-0 top-0 flex items-center justify-between px-6 pt-6 lg:px-12 lg:pt-10">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            Job Nexus HR — Est. Operations
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            Loading
          </span>
        </div>
      )}

      <div className="absolute inset-0 grid place-items-center">
        <LogoAnimation T={T} className="w-[min(72vw,340px)] sm:w-[min(52vw,380px)]" />
      </div>

      <div className="absolute inset-x-0 bottom-0 px-6 pb-8 lg:px-12 lg:pb-12">
        {mode === "intro" && (
          <div className="mb-3 flex items-baseline justify-between">
            <span className="hidden font-mono text-[11px] uppercase tracking-[0.18em] text-muted sm:block">
              Continuity / Responsibility / People
            </span>
            <span className="ml-auto font-mono text-[28px] font-medium tracking-tight text-ink">
              {String(pct).padStart(3, "0")}
            </span>
          </div>
        )}
        <div className="relative h-px w-full overflow-hidden bg-ink/15">
          <div className="absolute inset-y-0 left-0 bg-green" style={{ width: `${pct}%` }} />
        </div>
      </div>
    </div>
  );
}
