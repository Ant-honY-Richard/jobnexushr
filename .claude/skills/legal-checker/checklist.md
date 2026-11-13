# Website legal checklist

Status key: ✅ done · ⚠️ partial · ❌ missing · ➖ not applicable. "Owner" = needs facts only the business has.

## A. Cookies & tracking
| # | Item | Why / law | How to check |
|---|---|---|---|
| A1 | **Cookie consent banner** on first visit, *Accept* and *Reject* equally easy (same size/level), no pre-ticked boxes | DPDP (consent), GDPR/ePrivacy | Fresh private window at 375 px + desktop |
| A2 | **Non-essential tags blocked until Accept** (analytics, ads pixels, heatmaps, chat widgets that track) | DPDP, GDPR | Reject → no `google-analytics`/`googletagmanager`/pixel requests |
| A3 | Choice remembered; **"Cookie settings" link** (footer) lets users change/withdraw at any time | DPDP s.6(4) withdraw as easily as given | Click link → banner reopens |
| A4 | **Cookie Policy page**: each cookie/storage key, provider, purpose, duration, essential or not | DPDP notice, GDPR | Compare page with code inventory |
| A5 | Google Consent Mode v2 (if using Google tags and EU traffic) | Google EU user consent policy | Inspect `gtag('consent', …)` calls |

## B. Privacy policy (one page, plain language, "Last updated" date)
| # | Item | Why / law |
|---|---|---|
| B1 | Who we are: legal entity name, address, contact | DPDP notice, SPDI r.4 |
| B2 | What personal data we collect, per source (each form, uploads, analytics, calls/WhatsApp) | DPDP s.5, SPDI r.4 |
| B3 | Purpose for each type and that we use it only for that | DPDP s.5–6 |
| B4 | Legal basis: consent (and "legitimate uses" where applicable) | DPDP s.4, 7 |
| B5 | Who we share with: clients/employers (with consent), processors (hosting, email, analytics), authorities | DPDP, SPDI r.6 |
| B6 | Cross-border transfer disclosure (e.g. US-hosted processors) | DPDP s.16, GDPR ch.V |
| B7 | **Retention period** and deletion | DPDP s.8(7) — Owner to confirm the period |
| B8 | Security safeguards summary + breach notification promise | DPDP s.8(5)–(6), SPDI r.8 |
| B9 | **User rights**: access, correction, completion, erasure, withdraw consent, nominate, grievance | DPDP s.11–14 |
| B10 | **Grievance Officer** — name, email, phone, response time (≤ 30 days recommended) | SPDI r.5(9), DPDP s.8(10) — Owner: name |
| B11 | Right to complain to the **Data Protection Board of India** | DPDP s.13(3) |
| B12 | Children: not for under-18s / parental consent | DPDP s.9 |
| B13 | Notice available in English and, on request, an Indian language | DPDP s.5(3) |
| B14 | How changes to the policy are announced | Good practice |

## C. Forms & data collection
| # | Item | Why / law |
|---|---|---|
| C1 | **Short notice at the form** (what, why, link to Privacy Policy) | DPDP s.5 |
| C2 | **Unticked consent checkbox, required**, separate from T&Cs, specific purpose | DPDP s.6 |
| C3 | Consent recorded with the submission (yes, timestamp, policy version) | DPDP s.6(10) burden of proof |
| C4 | Optional marketing (newsletter/WhatsApp promos) has its own separate opt-in | DPDP s.6 |
| C5 | Only necessary fields required (data minimisation) | DPDP s.6(1) |
| C6 | Uploaded files/CVs stored securely, not publicly reachable URLs | DPDP s.8(5) |
| C7 | Spam/bot protection that doesn't add hidden tracking (honeypot ok) | — |

## D. Terms of use
| # | Item |
|---|---|
| D1 | Who operates the site, acceptance of terms |
| D2 | Acceptable use, prohibited conduct |
| D3 | Intellectual property (content, logos, client logos used with permission) |
| D4 | Disclaimer of warranties / no guarantee of outcome (e.g. no guarantee of employment) |
| D5 | Limitation of liability |
| D6 | Third-party links |
| D7 | **Governing law (India) and jurisdiction (city courts)** |
| D8 | Changes to terms, contact |

## E. Business & sector disclosures
| # | Item | Why / law |
|---|---|---|
| E1 | Legal entity name + registered office + **CIN / LLPIN** (if company/LLP) | Companies Act s.12(3)(c), r.26 — Owner |
| E2 | GSTIN (if registered; required on invoices, good practice on site) | GST — Owner |
| E3 | Sector licences shown where relevant: recruitment — **CLRA contractor licence** (contract staffing), state Shops & Establishments registration; **overseas placement needs MEA Recruiting Agent (RA) licence** under Emigration Act 1983 | Owner |
| E4 | **Anti-fraud notice**: "we never charge fees / never ask for money"; how to report impersonation | Consumer protection, good practice for recruiters |
| E5 | Equal-opportunity / non-discrimination statement in job ads | Equal Remuneration (Code on Wages), RPwD Act, Transgender Persons Act |
| E6 | Job ads: real employer/role, no misleading salary claims | Consumer Protection Act 2019 (misleading ads) |
| E7 | Refund / cancellation / shipping policy | ➖ unless selling online (E-Commerce Rules 2020) |
| E8 | Testimonials/client logos/claims are real and permitted | Consumer Protection Act, ASCI code |

## F. Footer & general
| # | Item |
|---|---|
| F1 | Footer links: Privacy · Terms · Cookies · Cookie settings |
| F2 | © year + legal name |
| F3 | Real contact: email, phone, address/city |
| F4 | HTTPS everywhere, no mixed content, security headers |
| F5 | Accessibility: alt text, labels, contrast, keyboard use (WCAG 2.1 AA) |
| F6 | `robots`/`sitemap` don't expose private/admin URLs |

## G. International add-ons (only if targeting those visitors)
| # | Item |
|---|---|
| G1 | GDPR: lawful basis per purpose, DPO/EU representative if required, SCCs for transfers |
| G2 | CCPA/CPRA: "Do Not Sell or Share My Personal Information" link, notice at collection |
