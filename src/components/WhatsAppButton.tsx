"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { whatsappLink } from "@/lib/site";

/** WhatsApp glyph (speech bubble with handset), drawn for this site. */
function WaIcon({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden>
      <path
        d="M16 3.5A12.5 12.5 0 0 0 5.2 22.3L3.5 28.5l6.4-1.7A12.5 12.5 0 1 0 16 3.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M11.6 9.8c.3-.6.7-.6 1-.6h.8c.3 0 .6 0 .8.6l1.1 2.6c.1.3.1.6-.1.9l-.7.9c-.2.2-.2.5 0 .8a9.6 9.6 0 0 0 4.5 4.1c.3.1.6.1.8-.1l1-1.2c.2-.3.5-.3.8-.2l2.6 1.2c.3.2.5.3.5.6 0 .9-.4 2.1-1.5 2.6-1 .5-2.3.6-4.6-.4-3.4-1.4-5.7-4.8-5.9-5.1-.2-.3-1.4-1.9-1.4-3.6 0-1.4.7-2.4 1.1-3Z"
        fill="currentColor"
      />
    </svg>
  );
}

const OPTIONS = [
  { label: "I'm hiring", sub: "Tell us about the roles", text: "Hi Job Nexus HR, I'm hiring and would like to discuss a requirement." },
  { label: "I'm looking for work", sub: "Find a job — no fee, ever", text: "Hi Job Nexus HR, I'm looking for a job. My name is " },
];

/**
 * Floating WhatsApp button (bottom-right on every page). Opens a small chooser so employers and
 * candidates start the chat with the right first message.
 */
export function WhatsAppButton() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onDown = (e: PointerEvent) => ref.current && !ref.current.contains(e.target as Node) && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  return (
    <div ref={ref} className="fixed bottom-4 right-4 z-30 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {open && (
          <motion.div
            id="wa-menu"
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-[4.5rem] right-0 w-[min(18rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-[0_24px_60px_-24px_rgba(4,46,39,0.55)]"
          >
            <p className="bg-[#0b5c43] px-4 py-3 text-[14px] font-semibold text-white">Chat with us on WhatsApp</p>
            <ul className="p-2">
              {OPTIONS.map((o) => (
                <li key={o.label}>
                  <a
                    href={whatsappLink(o.text)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-green/[0.08]"
                  >
                    <span>
                      <span className="block text-[15px] font-medium text-ink">{o.label}</span>
                      <span className="block text-[12px] text-muted">{o.sub}</span>
                    </span>
                    <span aria-hidden className="text-green">→</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        aria-label={open ? "Close WhatsApp options" : "Chat with us on WhatsApp"}
        aria-expanded={open}
        aria-controls="wa-menu"
        onClick={() => setOpen((v) => !v)}
        className="grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_14px_34px_-10px_rgba(18,140,70,0.7)] transition-transform duration-300 hover:scale-105"
      >
        <WaIcon />
      </button>
    </div>
  );
}
