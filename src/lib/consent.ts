// Cookie-consent state shared by the banner, the analytics loader and the footer "Cookie settings" link.
// Stored in localStorage (no cookie needed); every read/write is guarded so private mode never breaks the site.

export type ConsentChoice = "granted" | "denied";
const KEY = "jn-cookie-consent";
const EVENT = "jn-consent-change";
const OPEN_EVENT = "jn-consent-open";

export function readConsent(): ConsentChoice | null {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const v = JSON.parse(raw) as { choice?: string };
    return v.choice === "granted" || v.choice === "denied" ? v.choice : null;
  } catch {
    return null;
  }
}

export function writeConsent(choice: ConsentChoice) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify({ choice, at: new Date().toISOString() }));
  } catch {
    /* storage blocked — the choice still applies for this page view */
  }
  window.dispatchEvent(new CustomEvent<ConsentChoice>(EVENT, { detail: choice }));
}

export function onConsentChange(cb: (c: ConsentChoice) => void) {
  const h = (e: Event) => cb((e as CustomEvent<ConsentChoice>).detail);
  window.addEventListener(EVENT, h);
  return () => window.removeEventListener(EVENT, h);
}

/** Re-open the banner (footer "Cookie settings"). */
export function openConsent() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function onConsentOpen(cb: () => void) {
  window.addEventListener(OPEN_EVENT, cb);
  return () => window.removeEventListener(OPEN_EVENT, cb);
}
