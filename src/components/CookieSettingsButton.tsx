"use client";

import { openConsent } from "@/lib/consent";

/** Footer link that re-opens the cookie banner so visitors can change or withdraw consent. */
export function CookieSettingsButton({ className = "" }: { className?: string }) {
  return (
    <button type="button" onClick={openConsent} className={className}>
      Cookie settings
    </button>
  );
}
