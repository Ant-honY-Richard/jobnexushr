"use client";

import { useEffect, useState, useRef } from "react";

export function CustomCursor() {
  const [hover, setHover] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let dotX = 0;
    let dotY = 0;
    let ringX = 0;
    let ringY = 0;
    let raf = 0;

    let seen = false;
    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!seen) {
        // Snap to the pointer and reveal on first move (avoids a dot stuck at 0,0).
        seen = true;
        dotX = ringX = mouseX;
        dotY = ringY = mouseY;
        if (dotRef.current) dotRef.current.style.opacity = "1";
        if (ringRef.current) ringRef.current.style.opacity = "1";
      }
    };

    const tick = () => {
      dotX += (mouseX - dotX) * 0.35;
      dotY += (mouseY - dotY) * 0.35;
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };

    const handleOver = (e: Event) => {
      const target = e.target as HTMLElement;
      if (!target || !target.closest) return;
      const el = target.closest<HTMLElement>(
        "[data-cursor], a, button, [role='button']"
      );
      if (el) {
        const cursorType = el.getAttribute("data-cursor");
        const lab = el.getAttribute("data-cursor-label");
        if (cursorType === "cta" || cursorType === "label" || lab) {
          setHover(true);
          setLabel(lab);
        } else {
          setHover(true);
          setLabel(null);
        }
      }
    };

    const handleOut = (e: Event) => {
      const target = e.target as HTMLElement;
      if (!target || !target.closest) return;
      const el = target.closest<HTMLElement>(
        "[data-cursor], a, button, [role='button']"
      );
      if (el) {
        const related = (e as MouseEvent).relatedTarget as HTMLElement | null;
        if (!related || !related.closest?.(el.tagName.toLowerCase())) {
          setHover(false);
          setLabel(null);
        }
      }
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{ opacity: 0 }}
        className={`cursor-ring ${hover ? "is-hover" : ""} ${label ? "is-label" : ""}`}
      >
        {label && <span className="cursor-label">{label}</span>}
      </div>
      <div ref={dotRef} aria-hidden="true" style={{ opacity: 0 }} className="cursor-dot" />
    </>
  );
}
