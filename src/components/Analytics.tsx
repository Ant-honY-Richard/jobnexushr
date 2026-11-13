"use client";

import Script from "next/script";
import { useEffect, useSyncExternalStore } from "react";
import { onConsentChange, readConsent } from "@/lib/consent";

type Gtag = (...args: unknown[]) => void;

/**
 * Google Analytics 4 + lead events. Loads only when a measurement ID is set AND the visitor pressed
 * "Accept" in the cookie banner (DPDP Act / GDPR prior consent). Ads storage is always denied.
 * Events: contact_click (tel / mailto / WhatsApp links) and generate_lead (any form submit).
 */
const subscribe = (cb: () => void) => onConsentChange(() => cb());
const getServer = () => null;

export function Analytics({ gaId }: { gaId: string }) {
  const consent = useSyncExternalStore(subscribe, readConsent, getServer);
  const enabled = Boolean(gaId) && consent === "granted";

  // Consent withdrawn after the tag loaded: clear Google cookies and reload so nothing keeps running.
  useEffect(() => {
    return onConsentChange((c) => {
      if (c !== "denied" || !(window as unknown as { gtag?: Gtag }).gtag) return;
      const host = window.location.hostname.replace(/^www\./, "");
      document.cookie.split(";").forEach((kv) => {
        const name = kv.split("=")[0].trim();
        if (!name.startsWith("_ga") && !name.startsWith("_gid")) return;
        for (const domain of ["", `; domain=.${host}`, `; domain=${window.location.hostname}`]) {
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain}`;
        }
      });
      window.location.reload();
    });
  }, []);

  useEffect(() => {
    if (!enabled) return;
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
  }, [enabled]);

  if (!enabled) return null;
  // "GTM-…" = Google tag container (GA4's 2026 install snippet); "G-…" = classic gtag.js measurement ID.
  const isContainer = gaId.startsWith("GTM-");
  const src = isContainer
    ? `https://www.googletagmanager.com/gtm.js?id=${gaId}`
    : `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
  const init = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});gtag('js',new Date());${isContainer ? "dataLayer.push({'gtm.start':new Date().getTime(),event:'gtm.js'});" : `gtag('config','${gaId}');`}`;
  return (
    <>
      <Script id="ga4-init" strategy="afterInteractive">
        {init}
      </Script>
      <Script src={src} strategy="afterInteractive" />
    </>
  );
}
