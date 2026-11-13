---
name: legal-checker
description: Audit a website for legally required and expected items (cookie consent banner, privacy / cookie / terms pages, form consent, grievance officer, company disclosures, licences, anti-fraud notices, accessibility) with a focus on India (DPDP Act 2023 + DPDP Rules 2025, IT Act 2000 / SPDI Rules 2011, Companies Act) plus GDPR/CCPA add-ons for foreign visitors, then fix what can be fixed in code and list what needs the owner's facts. Use when the user asks for a legal check, compliance check, cookie banner, privacy policy review, "is my website legal", or "what legal pages do I need".
---

# Legal checker

Goal: every website we ship has the legally required pages, notices and consent flows — and the owner
knows exactly which facts only they can supply. **This is a practical compliance checklist, not legal
advice** — always say so in the report and recommend a lawyer reviews the final policy text.

## How to run it

1. **Identify the site's profile** (ask only if it can't be read from the code/spec):
   - Where the business is registered and who it serves (India only? EU/UK/US visitors targeted?).
   - What personal data it collects: forms, CV/resume uploads, accounts, payments, chat, analytics,
     ad pixels, embedded maps/videos, newsletter.
   - Business type: company / LLP / proprietorship; regulated sector (recruitment, finance, health, e-commerce).
2. **Inventory the code** (adapt the paths to the framework):
   - Legal routes: `grep -rli "privacy\|terms\|cookie\|refund\|disclaimer" src/app` (or `pages/`).
   - Every form and what it collects: `grep -rn "<form" src`, then read the fields.
   - Every third-party script / SDK / pixel / embed: `grep -rn "googletagmanager\|gtag\|fbq\|pixel\|<Script\|<iframe\|emailjs\|hotjar\|clarity" src`.
   - Cookies / storage set by our own code: `grep -rn "document.cookie\|localStorage\|sessionStorage\|cookies()" src`.
   - Footer links and contact details (`Footer.tsx`, `site.ts` or similar).
3. **Walk [checklist.md](checklist.md) item by item.** For each item record: ✅ done / ⚠️ partial /
   ❌ missing / ➖ not applicable, plus the file that implements it.
4. **Fix everything that can be fixed in code** without inventing facts:
   - Cookie banner with *Accept* and *Reject* equally prominent; non-essential tags (analytics, ads,
     heatmaps) load **only after Accept**; a "Cookie settings" link in the footer re-opens it.
   - Required, unticked consent checkbox on every form that collects personal data, linking to the
     Privacy Policy, and the consent (yes + timestamp + policy version) stored/sent with the submission.
   - Privacy / Cookie / Terms pages rewritten to cover every checklist point, with a "Last updated" date.
   - Put owner-specific facts (legal entity name, registered address, CIN/GSTIN, grievance officer name,
     retention period, licence numbers) in **one config object** so the owner edits one place; render a
     line only when its value is set — never show placeholders like "[NAME]" on the live site.
5. **Never invent** licence numbers, registration numbers, addresses, officer names, founding years,
   certifications or retention promises. If a policy choice is needed (e.g. retention period), pick a
   sensible default, mark it clearly in the report as "owner to confirm".
6. **Write the report** to `LEGAL-CHECK.md` in the repo root (overwrite on re-runs): date, site profile,
   the checklist table with status + file, what was changed, and a short "Owner must supply / decide"
   list. Follow the project's own after-change rules (change log, pricing, lint/type-check/build).
7. **Verify**: banner appears on first visit (375 px and desktop), Reject leaves no analytics requests
   (`read_network_requests` filtered on `google`), Accept loads them, choice persists after reload,
   footer link re-opens the banner, forms can't submit without the consent box.

## Key law references (India first)

- **DPDP Act 2023** + **DPDP Rules 2025** (notified 14 Nov 2025; most duties apply ~18 months later —
  check current status): notice before/at collection in clear language (English or any 8th-Schedule
  language on request), free/specific/informed consent with an equally easy way to withdraw, purpose
  limitation, erase when purpose is served, security safeguards, breach notice to the Board and users,
  verifiable parental consent for under-18s, published contact for a person who answers data questions,
  grievance redressal (respond within the period stated; Rules cap it at 90 days), right to complain
  to the Data Protection Board of India.
- **IT Act 2000 s.43A + SPDI Rules 2011** (in force until DPDP fully applies): privacy policy published
  on the website; consent in writing (incl. electronic) for sensitive data (passwords, financial,
  health, biometrics); **Grievance Officer name and contact** published, grievances resolved within one month.
- **Companies Act 2013 s.12(3)(c) + Companies (Incorporation) Rules r.26**: a company with a website must show
  its name, registered office address, CIN, phone and email on it (LLPs: name, LLPIN, registered office).
- **Consumer Protection (E-Commerce) Rules 2020**: only if selling goods/services online (seller details,
  grievance officer, refund/cancellation policy, pricing incl. taxes).
- **GDPR / UK GDPR** (if targeting EU/UK visitors) and **ePrivacy**: prior opt-in for non-essential cookies,
  lawful basis per purpose, data-transfer disclosure, DPO/representative where required.
- **CCPA/CPRA** (if California thresholds are met): "Do Not Sell or Share" link, notice at collection.
- **Accessibility**: RPwD Act 2016 / GIGW (mandatory for government; best practice for others) — WCAG 2.1 AA.
