"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { onConsentOpen, readConsent, writeConsent } from "@/lib/consent";

/**
 * Cookie consent (DPDP Act 2023 / GDPR style): shown until the visitor chooses. "Accept" and "Reject"
 * are equal buttons; analytics loads only after Accept. The footer "Cookie settings" link re-opens it.
 */
export function CookieBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Read after mount (localStorage is browser-only); a short delay keeps it out of the loader.
    const t = window.setTimeout(() => {
      if (readConsent() === null) setOpen(true);
    }, 1200);
    const off = onConsentOpen(() => setOpen(true));
    return () => {
      window.clearTimeout(t);
      off();
    };
  }, []);

  const choose = (granted: boolean) => {
    writeConsent(granted ? "granted" : "denied");
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookie-title"
          aria-describedby="cookie-desc"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-3 bottom-3 z-50 rounded-3xl border border-rule bg-white p-5 shadow-[0_30px_80px_-30px_rgba(4,46,39,0.5)] sm:inset-x-auto sm:left-5 sm:bottom-5 sm:max-w-[430px] sm:p-6"
        >
          <div className="flex items-start gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-green/12 text-dark-green" aria-hidden>
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3a9 9 0 1 0 9 9 4 4 0 0 1-4-4 4 4 0 0 1-4-4 1 1 0 0 0-1-1Z" />
                <circle cx="8.5" cy="11" r="1" fill="currentColor" />
                <circle cx="12" cy="16" r="1" fill="currentColor" />
                <circle cx="15.5" cy="13" r="0.8" fill="currentColor" />
              </svg>
            </span>
            <div>
              <p id="cookie-title" className="text-[16px] font-semibold text-ink">Cookies on this site</p>
              <p id="cookie-desc" className="mt-1 text-[14px] leading-relaxed text-ink/75">
                We&apos;d like to use Google Analytics cookies to see how the site is used. They&apos;re off unless you
                accept. Essential storage (your choice here) is always on.{" "}
                <Link href="/cookies" className="font-medium text-dark-green underline underline-offset-2">
                  Cookie policy
                </Link>
              </p>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => choose(false)}
              className="rounded-xl border-2 border-forest px-4 py-3 text-[15px] font-semibold text-forest transition-colors hover:bg-forest hover:text-white"
            >
              Reject
            </button>
            <button
              type="button"
              onClick={() => choose(true)}
              className="rounded-xl border-2 border-forest bg-forest px-4 py-3 text-[15px] font-semibold text-white transition-colors hover:border-green hover:bg-green"
            >
              Accept
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
