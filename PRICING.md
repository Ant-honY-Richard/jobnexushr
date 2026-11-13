# Job Nexus HR — Website Cost Tracker

> Purpose: know what the **complete website costs** — everything built, everything it runs on,
> and everything added later. **Every time a feature, page, asset or service is added, add a row
> here** (and to the Change Log in [`spec.md`](spec.md)).

Last updated: 2026-11-07 (contact page redesign) · Currency: **INR (₹)**

## ⚠️ Read this first — these are ESTIMATES

Nothing in the project records what was actually paid, so the figures below are **my estimates**,
not invoices. They exist so you have a working total and a structure to correct.

- **Build cost** = estimated hours × an assumed rate of **₹1,000 / hour**. Change the rate and the
  hours to match your real arrangement, then recompute (`hours × rate`).
- **Running costs** are typical market prices at time of writing. Vendors change plans and prices —
  **verify on the vendor's site before budgeting**. USD prices assumed at ≈ ₹85 / $.
- Fill the **Actual (₹)** column as real numbers become known; it overrides the estimate.

Status key: **Built** = exists in the code · **Launch** = needed to go live, not in the code ·
**Pending** = optional / open item from `spec.md §8`, **not** included in the totals.

---

## 1. Summary

| Bucket | Estimate | Actual |
|---|---:|---:|
| One-time build (336 h × ₹1,000) — §2 | **₹3,36,000** | |
| Running cost to launch, per year — §3 | **₹21,600 / yr** | |
| **Year-1 total (build + running)** | **₹3,57,600** | |
| *Pending one-time add-ons (not included above) — §4* | *₹90,000* | |
| *Pending recurring add-ons (not included above) — §4* | *₹4,800 / yr* | |
| *Year-1 total if every pending item is added* | *₹4,52,400* | |

---

## 2. One-time build (what exists today)

Rate assumption: **₹1,000/h**. `Est. ₹ = Hours × 1,000`.

### 2.1 Design system & shared UI — 36 h
| Item | Status | Hours | Est. ₹ | Actual ₹ | Notes |
|---|---|---:|---:|---:|---|
| Design tokens, typography, buttons, global CSS | Built | 10 | 10,000 | | `globals.css` |
| Navbar + full-screen mobile menu | Built | 8 | 8,000 | | |
| Footer | Built | 4 | 4,000 | | |
| Custom cursor (original loading screen + page wipe were replaced by the logo loader, see §2.4) | Built | 8 | 8,000 | | |
| PageHero, SectionHeader, CTASection, SignatureLine, RevealText, Button | Built | 6 | 6,000 | | 2 of these are unused |

### 2.2 Pages — 105 h
| Item | Status | Hours | Est. ₹ | Actual ₹ | Notes |
|---|---|---:|---:|---:|---|
| Home (12 animated sections) | Built | 40 | 40,000 | | Largest single item |
| About | Built | 5 | 5,000 | | |
| Staffing index + 4 service detail pages | Built | 10 | 10,000 | | |
| Industries (24 sectors) | Built | 4 | 4,000 | | |
| Workforce Management | Built | 6 | 6,000 | | |
| Payroll | Built | 4 | 4,000 | | |
| Employers | Built | 5 | 5,000 | | |
| Candidates | Built | 5 | 5,000 | | |
| Jobs list with working filters | Built | 8 | 8,000 | | |
| Job detail + application form | Built | 8 | 8,000 | | |
| Contact page + form | Built | 6 | 6,000 | | |
| Privacy, Terms, Cookies | Built | 3 | 3,000 | | Generic text; no legal review (see §4) |
| 404 page | Built | 1 | 1,000 | | |

### 2.3 Backend — 12 h
| Item | Status | Hours | Est. ₹ | Actual ₹ | Notes |
|---|---|---:|---:|---:|---|
| PostgreSQL schema + Drizzle setup (lazy connection) | Built | 6 | 6,000 | | 3 tables |
| Server actions with validation (contact, apply) | Built | 4 | 4,000 | | |
| `/api/health` endpoint | Built | 1 | 1,000 | | |
| Job seed script | Built | 1 | 1,000 | | |

### 2.4 Branding, SEO, quality — 60 h
| Item | Status | Hours | Est. ₹ | Actual ₹ | Notes |
|---|---|---:|---:|---:|---|
| Logo integration (transparent PNG + light variant) | Built | 2 | 2,000 | | Logo artwork itself was supplied by you — **design cost not included** |
| Favicon set | Built | 1 | 1,000 | | Favicon artwork supplied by you |
| Logo vectorization: trace ribbon + JN, replace banner text with clean font outlines, inline SVG component, SVG/PNG exports | Built | 2 | 2,000 | | Font: Geist (OFL, free) |
| Loading animation moved to the clean vector paths, brand colours, J/N seam fix | Built | 1 | 1,000 | | |
| Metadata, Open Graph, robots.txt, sitemap.xml | Built | 3 | 3,000 | | |
| Responsive / mobile optimisation pass (2026-09-21) | Built | 12 | 12,000 | | |
| Full audit + bug fixes (2026-09-21) | Built | 10 | 10,000 | | See `spec.md §7` |
| Documentation (`spec.md`, `PRICING.md`, `CLAUDE.md`) | Built | 3 | 3,000 | | |
| Homepage desktop fixes: overlapped Services rows, lines through text, frozen marquees, invisible heading, 1024px collisions; full-page walkthrough at 3 widths | Built | 4 | 4,000 | | Bug-fix work |
| Homepage hero redesign (desktop + mobile from mockups): layout, photo cut-outs, header wordmark/CTA, responsive + testing | Built | 10 | 10,000 | | Mockup/artwork was supplied by you — **design cost not included** |
| Logo loading animation: port of supplied animation to React/SVG, click + first-load triggers, page-ready sync, hero sync, testing | Built | 12 | 12,000 | | Animation design/concept itself was supplied by you (zip) — **not included** |

### 2.5 Brand visuals & content (2026-09-29 → 11-05) — 55 h
| Item | Status | Hours | Est. ₹ | Actual ₹ | Notes |
|---|---|---:|---:|---:|---|
| Custom Job Nexus HR icon set (35 SVG icons) + chamfer `IconBadge` + CSS states | Built | 10 | 10,000 | | Original design, drawn in code — no licence cost |
| `BrandVisual` framed-visual system (hero-style mask, shape, outline) + designed fallback art + photo-slot manifest | Built | 5 | 5,000 | | 22 slots |
| New home section "Start here" (employer / candidate doors) + section renumbering | Built | 4 | 4,000 | | |
| Icons + visuals applied to 10 home sections and 13 inner-page heroes | Built | 8 | 8,000 | | |
| Tagline change + conversion-focused copy rewrite (home, footer, metadata) | Built | 6 | 6,000 | | Owner to confirm service promises (spec §8 S) |
| `ASSET-BRIEF.md` — per-slot sizes and image prompts | Built | 3 | 3,000 | | |
| QA: desktop + 375 px screenshots, fixes, build | Built | 2 | 2,000 | | |
| Homepage photos wired in (4 slots) + per-photo focus/zoom cropping, then idea photo replaced (text-free crop) | Built | 2 | 2,000 | | Photos supplied by you — **image cost not included**; replacement absorbed in the same 2 h |
| Idea section redesign: full-poster layout, `frame="full"` visual option, 3-step chain, responsive QA | Built | 2 | 2,000 | | |
| "Start here" section rebuilt to supplied mockup (full-bleed halves, journey, promises, framed photos, floating notes), photo re-assignment, QA | Built | 3 | 3,000 | | Mockup supplied by you — design cost not included |
| "Start here" photo cut-outs from mockup (desktop + mobile crops), seamless backgrounds, typography match, mobile live cards, QA | Built | 2 | 2,000 | | |
| "Start here" phone layout to mobile reference + closing blocks with buttons (desktop + mobile), QA | Built | 2 | 2,000 | | Mobile reference supplied by you |
| Site-wide spacing pass (26 files), inner-page hero redesign for mobile + tighter desktop, lifecycle stagger, QA on 23 views | Built | 3 | 3,000 | | |
| Hero compositions for 7 inner pages: cut-outs, background colour-matching + feathering, `composed` slot type, wider desktop / edge-to-edge mobile layout, QA on 14 views | Built | 3 | 3,000 | | Artwork supplied by you |

### 2.6 Premium design audit & refinement (2026-11-06) — 16 h
| Item | Status | Hours | Est. ₹ | Actual ₹ | Notes |
|---|---|---:|---:|---:|---|
| Audit of all routes + shared components (contrast, filler labels, repetition, IA, forms) | Built | 2 | 2,000 | | Findings in spec #79 |
| Accessibility foundation: AA contrast for small green text, reduced-motion support (CSS + MotionConfig), skip link, `aria-current`, menu dialog semantics | Built | 2 | 2,000 | | Resolves spec §8 R |
| Shared data + components: `lib/services.ts`, `lib/job-filters.ts`, `ServiceFinder`, `LegalPage`, PageHero breadcrumbs, CTASection light tone | Built | 3 | 3,000 | | |
| Staffing index + 4 service pages with distinct layouts (process / phases / ledger / cycle), related services, per-page metadata | Built | 3 | 3,000 | | |
| Industries grouped layout; Workforce lifecycle track; Payroll monthly cycle; Employers service finder + fixes; Candidates "after you apply"; About cleanup | Built | 3 | 3,000 | | |
| Jobs toolbar/listing/empty states, job detail facts + breadcrumbs, Contact next-steps, form required markers + error/success states, legal page layout | Built | 2 | 2,000 | | |
| QA: desktop + 375 px captures, overflow checks, keyboard check, production build | Built | 1 | 1,000 | | |

### 2.7 Site-wide copy rewrite (2026-11-06) — 6 h
| Item | Status | Hours | Est. ₹ | Actual ₹ | Notes |
|---|---|---:|---:|---:|---|
| Copy audit + voice/terminology rules (spec §4.2) | Built | 1 | 1,000 | | |
| Home: hero, 12 sections, nav, footer, metadata rewritten; unverifiable claims removed | Built | 3 | 3,000 | | |
| Inner pages, service data, forms, 404 rewritten; hero label de-duplication; QA + build | Built | 2 | 2,000 | | Legal text not changed |

### 2.8 Mega-menu navbar (2026-11-06) — 5 h
| Item | Status | Hours | Est. ₹ | Actual ₹ | Notes |
|---|---|---:|---:|---:|---|
| Floating bar, Services mega panel (hover/click/keyboard), photo note, responsive labels | Built | 3 | 3,000 | | Reference design supplied by you |
| Mobile menu with expandable Services, hero spacing, QA at 1600/1280/375, build | Built | 1 | 1,000 | | |
| Mega panel restyled to second reference (photo card, 2-column services, partner card), QA | Built | 1 | 1,000 | | |

### 2.9 Home refinements & contact details (2026-11-07) — 4 h
| Item | Status | Hours | Est. ₹ | Actual ₹ | Notes |
|---|---|---:|---:|---:|---|
| Real email + phone via `CONTACT` constant (4 places) | Built | 0.5 | 500 | | |
| Animations restored (reduce-motion revert) + diagnosis/verification | Built | 1 | 1,000 | | |
| Menu photo cleaned (line inpainted) | Built | 0.5 | 500 | | |
| Audience labels + uniform closing icons; payroll example for phones; Team section removed; QA + build | Built | 2 | 2,000 | | |

### 2.10 Contact page redesign (2026-11-07) — 8 h
| Item | Status | Hours | Est. ₹ | Actual ₹ | Notes |
|---|---|---:|---:|---:|---|
| New contact hero (info cards, script line, office image cut-out + mask, form card, trust strip) | Built | 2.5 | 2,500 | | Mockup supplied by you |
| Contact form restyle (icon fields, button, success state), QA at 3 sizes, build | Built | 1.5 | 1,500 | | |
| Interactive form: progress, choice cards, floating labels, prompt chips, QA | Built | 2 | 2,000 | | |
| Rest of contact page matched to the form (cards, photo card, next-steps track), QA | Built | 2 | 2,000 | | |

### 2.11 SEO, structured data & analytics (2026-11-13) — 6 h
| Item | Status | Hours | Est. ₹ | Actual ₹ | Notes |
|---|---|---:|---:|---:|---|
| Placeholder-domain fix, keyword titles/descriptions, canonicals on all pages | Built | 1.5 | 1,500 | | |
| JSON-LD: Organization/EmploymentAgency, WebSite, Service, Breadcrumb, JobPosting | Built | 2 | 2,000 | | |
| OG share image, llms.txt, AI-crawler robots rules, sitemap lastModified | Built | 1 | 1,000 | | |
| GA4 tag + lead events, Search Console verification file, cookies text, QA build | Built | 1.5 | 1,500 | | GA4 + Search Console are free |

### 2.12 Legal compliance (2026-11-13) — 5 h
| Item | Status | Hours | Est. ₹ | Actual ₹ | Notes |
|---|---|---:|---:|---:|---|
| `legal-checker` skill: checklist + audit procedure, LEGAL-CHECK.md report | Built | 1.5 | 1,500 | | Reusable on other sites |
| Cookie banner, consent-gated analytics, cookie settings link | Built | 1.5 | 1,500 | | |
| Form consent boxes (3 forms) + consent record in emails | Built | 0.5 | 500 | | |
| Privacy / Terms / Cookies rewrite, LEGAL config, footer disclosures, QA | Built | 1.5 | 1,500 | | Lawyer review not included |

**One-time build total: 36 + 105 + 12 + 60 + 55 + 16 + 6 + 5 + 4 + 8 + 2 + 1 + 1.5 + 2 + 2 + 1.5 + 1 + 1 + 6 + 6 + 5 = 336 h → ₹3,36,000**

---

## 3. Running costs required to launch (per year)

| Item | Status | Est. ₹/yr | Actual ₹/yr | Basis / notes |
|---|---|---:|---:|---|
| Domain name (.com or .in) | Launch | 1,200 | | Typical ₹800–1,500/yr; renewals can cost more |
| Web hosting for Next.js | Launch | 20,400 | | ≈ $20/mo (₹1,700 × 12), Vercel-Pro-class. Free "hobby" tiers usually **forbid commercial use** — check terms |
| PostgreSQL database | Launch | 0 | | Free tiers exist (e.g. Neon/Supabase) — fine for low volume; paid ≈ ₹1,700–2,100/mo if you outgrow it |
| SSL certificate | Launch | 0 | | Included with the host |
| Google Fonts (IBM Plex) | Built | 0 | | Free |
| Open-source packages (Next.js, React, Tailwind, Drizzle, motion, …) | Built | 0 | | MIT/permissive licences |
| Logo/image hosting | Built | 0 | | Logo is now stored in `/public`; no Cloudinary dependency |

**Running cost to launch: ₹1,200 + ₹20,400 = ₹21,600 / yr**

---

## 4. Pending / optional add-ons (NOT in the totals)

These come from the open items in `spec.md §8`. Move a row into §2 or §3 once it is actually added.

| Item | Ref | One-time est. ₹ | Recurring est. ₹/yr | Notes |
|---|---|---:|---:|---|
| Business email on your domain (2 mailboxes) | A | — | 4,800 | ≈ ₹200/user/mo (Google Workspace / Zoho class). Replaces the placeholder `hello@jobnexus.example` |
| Email notification for form submissions | B | — | 0 | **Built 2026-11-11 with EmailJS** (free plan ≈ 200 emails/month; paid plans if volume grows — verify on emailjs.com) |
| Admin panel: manage jobs, read submissions | C | 30,000 | — | ≈ 30 h |
| Analytics | D | — | 0 | Google Analytics is free; privacy-first tools (e.g. Plausible) ≈ ₹800/mo |
| Spam protection on forms | H | (small) | 0 | e.g. Cloudflare Turnstile is free |
| Licensed / original hero photograph (replaces the mockup-derived image) | P | 15,000 | — | Stock licence or a small shoot; very wide range (₹0 if you own the photo) |
| Legal review of Privacy / Terms / Cookies | F | 20,000 | — | Lawyer-dependent; wide range |
| Images for the remaining 11 brand-visual slots (`ASSET-BRIEF.md`; home + 7 inner pages supplied) | T | 25,000 | — | Half-day shoot of your real team/office, or AI image tool subscription (≈ ₹1,700–5,000/mo for 1–2 months) + editing; ₹0 if you generate them yourself |
| **Pending totals** | | **90,000** | **4,800** | Matches the summary in §1 |

---

## 5. Price log — append a row for every future change

Newest first. Use the same date as the `spec.md` Change Log entry. Put the estimate immediately;
add the actual when known.

| Date | Item added / changed | Type (one-time / recurring / removal) | Est. ₹ | Actual ₹ | Change Log # in spec.md | Notes |
|---|---|---|---:|---:|---|---|
| 2026-11-13 | Company name, registered office and CIN added from incorporation docs | one-time | 0 | | 151 | Within §2.12 |
| 2026-11-13 | Legal compliance: legal-checker skill, cookie banner, form consent, legal pages rewrite | one-time | 5,000 | | 146–150 | See §2.12 |
| 2026-11-13 | GTM start-event fix in Analytics (part of §2.11) | one-time | 0 | | 145 | Covered by the SEO item |
| 2026-11-13 | SEO foundations: domain fix, metadata, JSON-LD, OG image, llms.txt, GA4, Search Console file | one-time | 6,000 | | 138–144 | See §2.11; GA4/Search Console have no running cost |
| 2026-11-12 | Audit fixes: /register + candidate CTAs, no-fee line, WhatsApp button, hero rework, shorter home, earlier reveals, consistent sectors, navbar | one-time | 6,000 | | 130–137 | DB/job posting deferred |
| 2026-11-11 | Client logo row in the reference style (grey → colour hover, blur siblings) | one-time | 0 | | 129 | Within the previous redesign estimate |
| 2026-11-11 | Official client logos + clients section redesign | one-time | 1,000 | | 128 | |
| 2026-11-11 | Client logos (Pronto, Elastic Run) cut and added | one-time | 0 | | 127 | Under 30 min |
| 2026-11-11 | Clients: Pronto + Elastic Run (logo slots) replace Swiggy/Blinkit | one-time | 0 | | 126 | Under 30 min |
| 2026-11-11 | Smoother section transitions (footer start, CTA→footer, Jobs hero wave, Contact gradient) | one-time | 1,000 | | 125 | |
| 2026-11-11 | Jobs page redesign (mockup hero, swoosh, rounded search card, empty state) | one-time | 1,500 | | 124 | Artwork supplied by you |
| 2026-11-11 | Footer legal links on phones + branded EmailJS template | fix | 0 | | 123 | Small fix |
| 2026-11-11 | EmailJS form notifications to anthonyrichard@jobnexushr.com (both forms, honeypot, setup guide) | one-time | 2,000 | | 122 | EmailJS free plan covers low volume; paid plan is a future recurring cost |
| 2026-11-10 | Fix: phone/contact icons invisible on hover | fix | 0 | | 121 | Bug fix |
| 2026-11-09 | Footer redesign to mockup (brand block, link columns, contact, office photo, brand bar) | one-time | 2,000 | | 120 | Social icons pending profile URLs |
| 2026-11-09 | BGV hero image, home hero phone fix, navbar (Home, phone number, fewer items), About closing strip | one-time | 1,500 | | 116–119 | |
| 2026-11-09 | Hero images for Permanent, Volume and Compliance service pages (cut from mockups) | one-time | 1,000 | | 115 | Artwork supplied by you |
| 2026-11-07 | Hero CTA expanding-circle button | one-time | 0 | | 114 | Under 30 min |
| 2026-11-07 | Animated icon set (per-icon CSS loops), pill ping removed | one-time | 2,000 | | 113 | Added to §2.5 total line as +2 h |
| 2026-11-07 | Services menu photo swapped to supplied artwork | one-time | 0 | | 112 | Under 15 min |
| 2026-11-07 | Contact photo swapped to supplied sketch | one-time | 0 | | 111 | Under 15 min, within §2.10 |
| 2026-11-07 | Contact page sections matched to the form style | one-time | 2,000 | | 110 | See §2.10 |
| 2026-11-07 | Interactive contact form (choice cards, floating labels, prompt chips, progress) | one-time | 2,000 | | 109 | See §2.10 |
| 2026-11-07 | Contact page redesigned to mockup + form restyle | one-time | 4,000 | | 106–108 | See §2.10 |
| 2026-11-07 | Contact details, animations restored, menu photo cleaned, audience labels, phone payroll example, Team removed | one-time | 4,000 | | 100–105 | See §2.9 |
| 2026-11-06 | Mega panel restyled (photo card, two-column services, partner card) | one-time | 1,000 | | 99 | See §2.8 |
| 2026-11-06 | Mega-menu navbar + mobile Services accordion | one-time | 4,000 | | 97–98 | See §2.8 |
| 2026-11-06 | Site-wide copy rewrite (headlines, CTAs, labels, nav, forms) | one-time | 6,000 | | 92–96 | See §2.7 |
| 2026-11-06 | Industries page reverted to previous card grid | one-time | 0 | | 91 | Revert, within §2.6 hours |
| 2026-11-06 | Premium design audit + refinement (accessibility, service-page layouts, IA, forms, legal layout) | one-time | 16,000 | | 79–90 | See §2.6 |
| 2026-11-05 | Spacing pass + mobile page-hero redesign + lifecycle stagger | one-time | 3,000 | | 76–78 | |
| 2026-11-05 | Inner-page hero compositions (7 pages) | one-time | 3,000 | | 74–75 | |
| 2026-10-27 | Loading animation on vector paths + seam fix | one-time | 1,000 | | 73 | |
| 2026-10-27 | Logo vectorized (crisp banner text, inline SVG) | one-time | 2,000 | | 71–72 | |
| 2026-09-30 | "Start here" phone layout + buttons restored | one-time | 2,000 | | 69–70 | |
| 2026-09-30 | "Start here" photos cut from mockup + exact styling | one-time | 2,000 | | 68 | |
| 2026-09-30 | "Start here" section rebuilt to mockup + photo re-assignment | one-time | 3,000 | | 66–67 | |
| 2026-09-30 | Idea section redesigned around the full poster | one-time | 2,000 | | 65 | |
| 2026-09-30 | Idea photo replaced (cropped poster) | one-time | 0 | | 64 | Within the 2 h above |
| 2026-09-30 | Homepage photos wired into 4 slots + focus/zoom cropping | one-time | 2,000 | | 62–63 | Images supplied by you |
| 2026-09-29 | Tagline, custom icon set, BrandVisual system, "Start here" section, copy rewrite, asset brief | one-time | 38,000 | | 53–61 | See §2.5 |
| 2026-09-29 | Photos for 22 visual slots (proposed, §4) | one-time (pending) | 25,000 | | 61 | Not in the built total |
| 2026-09-21 | Homepage desktop fixes (Services overlap, lines, animations, heading) | one-time | 4,000 | | 45–51 | Bug fixes |
| 2026-09-21 | Homepage hero redesign (photo cut-outs, new layout, header wordmark/CTA) | one-time | 10,000 | | 40–44 | Photo is placeholder-quality; licensed photo listed in §4 |
| 2026-09-21 | Logo loading animation (SiteLoader, LogoAnimation, page-ready sync) | one-time | 12,000 | | 35–39 | Replaces old LoadingScreen/PageTransition; no running cost |
| 2026-09-21 | Initial baseline of all existing items | one-time | 1,84,000 | | 1–34 | Includes today's logo swap, audit, mobile pass |
| 2026-09-21 | Domain + hosting + DB (launch requirements) | recurring | 21,600 / yr | | — | Not yet purchased as far as the repo shows |

### How to update
1. Add a row to §5 with date, item, type, estimate.
2. Add the item to the right table in §2 (built work) or §3 (running cost), or §4 if it's only proposed.
3. Recompute the section total and the §1 summary.
4. Removing something? Add a negative row in §5 and delete/strike it in §2–§4.
