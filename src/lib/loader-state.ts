"use client";

import { useSyncExternalStore } from "react";

/**
 * Tiny shared flag so page content can hold its entrance animation until the logo loader
 * has started to lift ("ready"), instead of animating invisibly behind the overlay.
 * - false while the loader is covering the page (initial load, or after a link click)
 * - true  once the loader is leaving, and whenever no loader is running (e.g. browser back)
 */
let ready = false;
const listeners = new Set<() => void>();

export function setLoaderReady(next: boolean) {
  if (ready === next) return;
  ready = next;
  listeners.forEach((l) => l());
}

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
};

/** Server + first client render are always `false`, so hydration matches. */
export function useLoaderReady() {
  return useSyncExternalStore(subscribe, () => ready, () => false);
}
