"use client";

import Script from "next/script";
import { useEffect } from "react";

type Gtag = (...args: unknown[]) => void;

/**
 * Google Analytics 4 + lead events. Loads only when a measurement ID is set.
 * Events: contact_click (tel / mailto / WhatsApp links) and generate_lead (any form submit).
 */
export function Analytics({ gaId }: { gaId: string }) {
  useEffect(() => {
    if (!gaId) return;
    const send = (name: string, params: Record<string, string>) => {
      const g = (window as unknown as { gtag?: Gtag }).gtag;
      if (g) g("event", name, params);
    };
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest("a");
      const href = a?.getAttribute("href") ?? "";
      if (href.startsWith("tel:")) send("contact_click", { method: "phone" });
      else if (href.startsWith("mailto:")) send("contact_click", { method: "email" });
      else if (/wa\.me|whatsapp/i.test(href)) send("contact_click", { method: "whatsapp" });
    };
    const onSubmit = (e: SubmitEvent) => {
      const form = e.target as HTMLFormElement | null;
      if (!form || form.method.toLowerCase() === "get") return; // skip job-search forms
      send("generate_lead", { form: form.getAttribute("aria-label") ?? form.id ?? window.location.pathname, page: window.location.pathname });
    };
    document.addEventListener("click", onClick);
    document.addEventListener("submit", onSubmit, true);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("submit", onSubmit, true);
    };
  }, [gaId]);

  if (!gaId) return null;
  // "GTM-…" = Google tag container (GA4's 2026 install snippet); "G-…" = classic gtag.js measurement ID.
  const isContainer = gaId.startsWith("GTM-");
  const src = isContainer
    ? `https://www.googletagmanager.com/gtm.js?id=${gaId}`
    : `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
  const init = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());${isContainer ? "" : `gtag('config','${gaId}');`}`;
  return (
    <>
      <Script id="ga4-init" strategy="afterInteractive">
        {init}
      </Script>
      <Script src={src} strategy="afterInteractive" />
    </>
  );
}
