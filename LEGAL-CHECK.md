# Legal check — Job Nexus HR website

**Date:** 13 November 2026 · **Checklist:** `.claude/skills/legal-checker/checklist.md` · Re-run with the `legal-checker` skill.

> Practical compliance checklist, **not legal advice**. Have a lawyer read the final Privacy Policy and Terms
> once the owner details below are filled in.

**Site profile:** Indian recruitment & staffing business (Bengaluru). Serves India; no EU/US targeting →
GDPR/CCPA items not applicable (G1–G2 ➖). Collects personal data through 3 forms (contact, job
registration, job application), WhatsApp/phone, and Google Analytics (GTM-WWJ87LXS). Doesn't sell online.

Status: ✅ done · ⚠️ partial · ❌ missing · ➖ not applicable · 👤 owner must supply

## Result

| # | Item | Status | Where |
|---|---|---|---|
| A1 | Cookie banner, Accept/Reject equal | ✅ (new) | `CookieBanner.tsx`, `layout.tsx` |
| A2 | Analytics blocked until Accept | ✅ (new) — tested: no Google requests before Accept / after Reject | `Analytics.tsx`, `lib/consent.ts` |
| A3 | Choice remembered + "Cookie settings" link | ✅ (new) — footer + Cookie Policy page; withdrawing clears `_ga` cookies | `Footer.tsx`, `CookieSettingsButton.tsx` |
| A4 | Cookie Policy with per-cookie table | ✅ (rewritten) | `app/cookies/page.tsx` |
| A5 | Google Consent Mode | ✅ ads storage always denied; analytics granted only after Accept | `Analytics.tsx` |
| B1 | Who we are | ✅ Job Nexus HR Private Limited, registered office, CIN (from Certificate of Incorporation) | `LEGAL` in `lib/site.ts` |
| B2–B6 | What, why, consent basis, sharing (named processors), transfers abroad | ✅ (rewritten) | `app/privacy/page.tsx` |
| B7 | Retention | ⚠️ 24 months for candidates — 👤 confirm | `LEGAL.candidateRetentionMonths` |
| B8 | Security + breach notice | ✅ | privacy |
| B9 | Rights (access, correct, erase, withdraw, nominate, grievance) | ✅ | privacy |
| B10 | Grievance Officer | ✅ R Aglin Arul Maria + email + phone, 30-day resolution; 👤 confirm "acknowledge within 72 h" | `LEGAL.grievanceOfficer` |
| B11 | Complaint to Data Protection Board | ✅ | privacy |
| B12 | Children (18+) | ✅ | privacy, terms |
| B13 | Indian-language copy on request | ✅ promise (Hindi/Kannada) — 👤 be ready to supply | privacy |
| B14 | Changes + "Last updated" date | ✅ | `LegalPage.tsx` |
| C1–C3 | Notice + required unticked consent box + consent recorded (timestamp + policy version in the email) | ✅ (new) on contact, register, job application | `ConsentCheckbox.tsx` + 3 forms |
| C4 | Separate marketing opt-in | ➖ no marketing messages sent today — add a separate box before starting any |
| C5 | Data minimisation | ✅ only name/phone/city/job type required on register |
| C6 | CV storage | ✅ link only (no uploads stored) |
| C7 | Bot protection without tracking | ✅ honeypot |
| D1–D8 | Terms: operator, fee-free promise, no job guarantee, equal opportunity, acceptable use, IP, links, liability, **Indian law / Bengaluru courts** | ✅ (rewritten) | `app/terms/page.tsx` |
| E1 | Legal name + registered office + CIN | ✅ footer + Privacy Policy (Companies (Incorporation) Rules r.26) — CIN U78300KA2026PTC227835 | `LEGAL`, `Footer.tsx` |
| E2 | GSTIN | ➖ registered (29AAHCJ6094R1ZH) but not required on the website — left off; must be on invoices | `LEGAL.gstin` |
| E3 | Licences: CLRA contractor licence (contract staffing), Shops & Establishments; RA licence only if placing abroad | ❌ 👤 | `LEGAL.licences` |
| E4 | Anti-fraud / no-fee notice | ✅ register, footer, terms |
| E5 | Equal-opportunity statement | ✅ (new) terms |
| E6 | Job ads accurate | ➖ no live job posts yet (DB pending) |
| E7 | Refund / cancellation | ➖ not selling online |
| E8 | Real testimonials / logos with permission | ✅ only Pronto & Elastic Run logos (👤 keep written permission on file); no invented stats |
| F1 | Footer: Privacy · Terms · Cookies · Cookie settings | ✅ |
| F2 | © + legal name | ✅ (uses legal name once set) |
| F3 | Real contact | ✅ email, phone, city |
| F4 | HTTPS | ✅ Vercel |
| F5 | Accessibility | ⚠️ labels, alt text, contrast handled; no formal WCAG audit |
| F6 | No private URLs in robots/sitemap | ✅ |
| — | `foundingDate: "2026"` in structured data | ✅ incorporated 14 Sep 2026 | `lib/seo.ts` |

## Owner must supply / decide (edit `LEGAL` in `src/lib/site.ts` — one place)
1. ~~Grievance Officer name~~ — R Aglin Arul Maria (added 13 Nov 2026).
2. ~~Legal name, registered office, CIN~~ — added 13 Nov 2026 from the incorporation certificate. Note: the GST certificate gives PIN **560030** (Nilsandra) for the same address, the MCA record says **560047** — the site uses the MCA registered-office version; correct whichever is wrong.
3. ~~GSTIN~~ — not required on the website.
4. **Licences**: CLRA contractor licence number(s) for contract staffing; Shops & Establishments registration.
5. Confirm **24-month** candidate data retention and the **72-hour acknowledgement / 30-day resolution** promise.
6. Keep written permission for client logos.
7. A lawyer's review of Privacy Policy + Terms.

Note: the DPDP Rules 2025 (notified 14 Nov 2025) phase in most duties ~18 months later (≈ May 2027) —
the site already follows them; re-run this check when they take effect.
