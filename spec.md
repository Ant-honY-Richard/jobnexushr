# Job Nexus HR — Website Spec & Change Log

> **Read this file first** when asked to change anything. It maps every page, component,
> token and behaviour, so you don't need to open every source file.
> **After every change:** add a row to the [Change Log](#7-change-log), update the relevant
> section, and add/adjust the matching row in [`PRICING.md`](PRICING.md).

Last updated: 2026-11-13 (SEO, structured data, GA4 + Search Console; contact page redesign before it)

---

## 1. Overview

Marketing + lead-capture site for **Job Nexus HR** (recruitment & staffing, India).
Tagline: *"Better Talent. Brighter Futures."* (written `Better Talent · Brighter Futures` in mono
labels; replaced *"The same people, every time."* on 2026-09-29 — continuity is still the core promise
in the body copy). Editorial, monochrome-plus-green look; mono labels, large tight headlines, thin
rules, animated reveals, custom JN line icons and hero-style chamfer-framed visuals.

| | |
|---|---|
| Framework | Next.js 16.2.6 (App Router, Turbopack), React 19.2, TypeScript 5.9 |
| Styling | Tailwind CSS 4.1 (`@theme inline` in `globals.css`) + a few custom classes |
| Animation | `motion` 13 (`motion/react`) |
| Database | PostgreSQL via Drizzle ORM (`drizzle-orm`, `pg`) — contact + jobs only |
| Fonts | IBM Plex Sans + IBM Plex Mono (Google Fonts `<link>` in `layout.tsx`) |
| Package manager | pnpm (lockfile present) — `npm`/`npx` also work |

### Commands
```bash
pnpm dev          # dev server
pnpm build        # production build (works WITHOUT a database now)
pnpm start        # serve the build
pnpm lint         # eslint (currently 0 errors, 0 warnings)
pnpm typecheck    # tsc --noEmit (currently clean)
npx drizzle-kit push        # create tables from src/db/schema.ts
npx tsx scripts/seed.ts     # insert 4 sample jobs (needs DATABASE_URL)
```

### Environment variables (see `.env.example`)
| Var | Needed for | Notes |
|---|---|---|
| `DATABASE_URL` | `/contact`, `/jobs`, `/jobs/[id]`, `/api/health`, seed | Not needed to build or to view static pages |
| `NEXT_PUBLIC_SITE_URL` | canonical/OG URLs, `sitemap.xml`, `robots.txt`, JSON-LD | Defaults to `https://www.jobnexushr.com` (was the placeholder `jobnexus.example` until #130) |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 tag | Defaults to `GTM-WWJ87LXS` (GA4 property "Job Nexus HR Website", stream 16333979074, owner anthonyrichard@jobnexushr.com). Set to empty to turn analytics off |
| `NEXT_PUBLIC_GSC_VERIFICATION` | Optional Search Console meta-tag token | Not needed — Search Console is verified by the file `public/google57be15b428bba9bc.html` (**never delete it**) |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`, `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | Emailing form submissions to anthonyrichard@jobnexushr.com | Public by design; lock the domain in EmailJS. Without them forms only save to the DB. See `EMAILJS-SETUP.md` |

> `drizzle.config.json` has a hard-coded local DB URL (`postgres:postgres@127.0.0.1/app_db`) — for
> dev only. Change it (or make it env-driven) before pushing schema to a real database.

---

## 2. Routes

| Route | File | Type | Notes |
|---|---|---|---|
| `/` | `src/app/page.tsx` | static | Composes 13 home sections (see §4.2) |
| `/about` | `src/app/about/page.tsx` | static | 4-step story timeline + 4 principles |
| `/staffing` | `src/app/staffing/page.tsx` | static | Editorial index of the 6 services (data from `lib/services.ts`); each row links to its page |
| `/staffing/[slug]` | `src/app/staffing/[slug]/page.tsx` | SSG | slugs: `permanent-recruitment`, `volume-staffing`, `compliance`, `bgv`. Page copy + `layout` (process/phases/ledger/cycle) in the `SERVICES` object in that file; name/icon/promise from `lib/services.ts` |
| `/industries` | `src/app/industries/page.tsx` | static | 24 industries, `INDUSTRIES` array (3-column card grid) |
| `/workforce-management` | `src/app/workforce-management/page.tsx` | static | 6 lifecycle stages + 6 modules |
| `/payroll` | `src/app/payroll/page.tsx` | static | 4-step monthly `CYCLE` + 6-item scope table |
| `/employers` | `src/app/employers/page.tsx` | static | 5-step journey + `ServiceFinder` + 5 commitments |
| `/register` | `src/app/register/page.tsx` | static | Candidate registration (30s form via EmailJS, no-fee promise, WhatsApp alternative) |
| `/candidates` | `src/app/candidates/page.tsx` | static | Job-search form (GET → `/jobs`, filters from `lib/job-filters.ts`) + "After you apply" + 6 candidate services |
| `/jobs` | `src/app/jobs/page.tsx` | dynamic | Reads `jobs` table; **filters work** via `?q=&location=&industry=&type=` |
| `/jobs/[id]` | `src/app/jobs/[id]/page.tsx` | dynamic | Job detail + application form (server action) |
| `/contact` | `src/app/contact/page.tsx` | dynamic | Custom hero (no PageHero): sticky left column (contact cards + office photo card), form card (server action), "What happens next" progress track |
| `/privacy`, `/terms`, `/cookies` | `src/app/{privacy,terms,cookies}/page.tsx` | static | Full legal pages (DPDP-style privacy notice with Grievance Officer, terms under Indian law, cookie table) through `LegalPage`; owner facts come from `LEGAL` in `lib/site.ts` |
| `/api/health` | `src/app/api/health/route.ts` | dynamic | `{ok:true}` / 500 if DB unreachable |
| `/robots.txt`, `/sitemap.xml` | `src/app/robots.ts`, `sitemap.ts` | generated | Uses `SITE_URL`; robots explicitly allows AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended…) |
| `/llms.txt` | `public/llms.txt` | static | Plain-text company summary for AI search tools — keep services/contact in sync with the site |
| `/google57be15b428bba9bc.html` | `public/` | static | Google Search Console ownership file — do not remove |
| 404 | `src/app/not-found.tsx` | — | Custom |

**Adding a static route to the sitemap:** append it to `ROUTES` in `src/app/sitemap.ts`.

---

## 3. Design tokens & global CSS (`src/app/globals.css`)

| Token | Value | Tailwind |
|---|---|---|
| Green (brand) | `#0E956A` | `text-green`, `bg-green`, `border-green` |
| Ink (near-black) | `#15160E` | `text-ink`, `bg-ink` |
| Dark green | `#0A6E4F` | `text-dark-green` |
| Forest (header CTA) | `#042E27` | `bg-forest`, `border-forest` |
| Off-white (page bg) | `#FAF9F7` | `bg-off-white`, `text-off-white` |
| Muted text | `#5B5D54` | `text-muted` |
| Rules | `rgba(21,22,14,.12)` / `.24` | `border-rule`, `border-rule-strong` |

**Layout convention:** every section is `mx-auto px-6 lg:px-10` with `style={{maxWidth:"1480px"}}`;
vertical padding **`py-14 lg:py-24`** (tightened 2026-11-05 from `py-24 lg:py-40`); heading → content gap
`mt-10 lg:mt-14`; side paragraphs next to a heading `lg:pt-16`. Don't reintroduce the old large values.

**Custom classes:** `.editorial` (headline style), `.font-mono` (label style, used with
`text-[10–12px] uppercase tracking-[0.18em]`), `.field-input` (underline form field; 16px font on
<768px to stop iOS zoom), `.link-underline`, `.btn-arrow`, `.no-scrollbar`, `.marquee-track`,
`.workforce-strip`, `.orbit-rotate`, `.cursor-dot/.cursor-ring` (hidden on touch and <1024px).

**Animated icons (2026-11-07):** keyframes `jn-draw / jn-swing / jn-glint / jn-search / jn-drop / jn-pulse / jn-twinkle / jn-spin / jn-ride / jn-breathe / jn-heartbeat / jn-bob / jn-scan / jn-ring / jn-speed / jn-stretch`, selected per icon via `[data-icon="…"]`. New icons: add `pathLength={1}` to the accent and pick a loop.

**Brand icon/visual classes (2026-09-29):** `.jn-icon .jn-accent` / `.jn-accent-fill` (green accent
inside every custom icon), `.jn-icon-on-green` (accent turns off-white on a solid green shape),
`.jn-badge` / `.jn-badge-shape` (chamfer icon tile; turns green on `.group:hover` or `data-active`,
dark variant via `data-tone="dark"`).

**Brand chamfer:** top-left + bottom-right corners cut — `CHAMFER` in `icons/JNIcon.tsx`
(`polygon(24% 0,100% 0,100% 76%,76% 100%,0 100%,0 24%)`). Reuse it for any green accent shape.

**Global:** `html { overflow-x: clip }` (guards against horizontal scroll), `:focus-visible` green outline,
`.skip-link`, `.prose-jn` (legal long-form).

**Accessibility rules (2026-11-06):** small text in green must be `text-dark-green` (or `font-mono text-green`,
which the CSS maps to dark green on light surfaces); `#0E956A` is for headlines/large text on light backgrounds
and anything on dark. Reduced motion is honoured: loops stop in CSS and motion entrances are skipped by
`MotionProvider`. Don't put a `data-cursor-label` on something that isn't a link or button.

**Button patterns (copy these, don't invent new ones):**
- Primary: `bg-ink text-off-white border border-ink hover:bg-green hover:text-ink hover:border-green px-6 py-4 font-mono text-[11px] uppercase tracking-[0.18em]`
- Ghost: `border border-ink/15 hover:border-green hover:text-green`
- On dark: `border border-off-white/30 hover:bg-green hover:border-green hover:text-ink`
- Arrow: `<span className="btn-arrow">→</span>` inside a `group` link.

---

## 4. Components

### 4.1 Shared (`src/components/`)
| File | Purpose / key facts |
|---|---|
| `Logo.tsx` | **Inline SVG** from `src/lib/jn-logo-vector.ts` (ribbon `#0E956A`, white Geist SemiBold banner text, JN ink or off-white with `color="light"`). Size via the parent's height: `<div className="h-14"><Logo/></div>`. Regenerate the vector with the scratch script described in change #71 if the artwork changes |
| `Navbar.tsx` | Floating rounded bar (fixed, inset 12–16px). Logo `h-11/12` + "Job Nexus HR" wordmark (hidden 1280–1535px). **Full nav from `xl` (≥1280px)**: Home · About · Services · Industries · Employers · Candidates, phone link + CTA, with a **Services mega panel** (photo + intro card, six services in two columns from `lib/services.ts`, partner card → /contact; photo on ≥1536px); below `xl` a burger opens a full-screen menu with an expandable Services list and Jobs. CTA "Tell us what you need" from `md`. Esc/outside click/navigation close menus |
| `Footer.tsx` | Dark green footer (2026-11-09 redesign): brand block + CTA, Quick links, Our services, Get in touch (from `CONTACT`), faded office photo on desktop, brand bar with legal links, copyright row. Year is computed at build time |
| `SiteLoader.tsx` | **Logo loading animation** (replaces the old `LoadingScreen` + `PageTransition`). Plays on every hard page load (**1.8 s**) and whenever an internal link is clicked (**1.1 s**), then lifts away (**0.4 s**). Finishes only when the animation has fully played AND the page is ready (window `load` on first load / new route rendered on navigation), capped at +2.5 s. Timing constants are at the top of the file |
| `LogoAnimation.tsx` | The animation itself: pure function of authored time `T` (0 → `LOGO_ANIM_END` 5.25 s), ported from the supplied "Job Nexus HR Logo Animation" project. Scenes: Paths → JForms → NLocks → Ribbon → Wordmark → Lockup. Also exports `RegistrationMarks` (corner crosses) |
| `CustomCursor.tsx` | Desktop mouse-only dot/ring; hidden on touch (`hover:none`/`pointer:coarse`) and <1024px; appears on first mouse move |
| `PageHero.tsx` | Inner-page hero (`index`, `label`, `title`, `description`, optional `visual={{asset, icon, label}}`). With `visual`, desktop becomes 7/12 text + 4/12 framed `BrandVisual` on the right (4:5); phones show it under the text (4:3). Used on every inner page; `crumbs` renders a breadcrumb trail instead of the label (service + job detail pages). Its entrance waits for the loader to lift (`useLoaderReady`) |
| `icons/JNIcon.tsx` | **Custom Job Nexus HR icon set** (35 icons, 32×32 grid, 1.5 stroke, one green accent each): services (`recruit volume payroll compliance verify workforce`), brand (`continuity nexus talent growth`), process (`requirement understand match deploy attendance support`), audiences (`employer candidate message mail story check cross`), industries (`tech bfsi healthcare pharma manufacturing retail ecommerce logistics hospitality telecom construction bpo`). Exports `JNIcon`, `IconBadge` (icon in the chamfer tile; `size sm/md/lg`, `tone light/dark`, `active`), `CHAMFER`, `IconName`. Drawing rules are in the file header — follow them for new icons |
| `visual/BrandVisual.tsx` | The hero's visual language, reusable: photo in a rounded-chamfer SVG mask + green chamfer shape behind + thin green outline strokes that draw in. Props: `asset` (slot in `src/lib/visuals.ts`), `icon` (fallback art), `label`, `aspect`, `tone`, `shape left/right`, `frame chamfer/full` (`full` = whole image, rounded, for posters with text), `play` (override in-view trigger). Without a photo it renders `BrandArt` (tinted dot-grid field, rotating orbit rings, the icon on a chamfer tile, tagline label) — also exported and used by `Team` |
| `ServiceFinder.tsx` | "Start from your situation" list: plain-language need → service (from `lib/services.ts`); whole row links. Optional `exclude` slug |
| `LegalPage.tsx` | Long-form layout for legal pages: "Last updated" date, contents list, numbered sections (01, 02…), `.prose-jn`, note callout, sibling links |
| `CookieBanner.tsx` | Cookie consent card (Accept / Reject equal), shown until a choice; re-opened by `openConsent()` |
| `CookieSettingsButton.tsx` | "Cookie settings" button (footer, Cookie Policy) that re-opens the banner |
| `ConsentCheckbox.tsx` | Required unticked consent box for forms + `consentRecord()` (timestamp + policy version sent with the submission) |
| `MotionProvider.tsx` | `<MotionConfig reducedMotion="user">` around the app (in `layout.tsx`) |
| `SectionHeader.tsx` | Reveal-on-scroll section title (`index`, `label`, `title`, `description`) |
| `CTASection.tsx` | Closing CTA (`title`, `subtitle`, `primaryHref/Label`, optional secondary, `tone` dark/light — use light when the section before it is dark) |
| `SignatureLine.tsx` | Animated thin green line |
| `RevealText.tsx`, `Button.tsx` | Helpers — **currently unused** by any page (kept for reuse) |
| `ContactForm.tsx` | Client form → server action; progress bar, inquiry choice cards (radios), floating-label icon fields, type-aware prompt chips, success/error states |
| `JobApplicationForm.tsx` | Client form → server action; success/error states |

### 4.2 Home sections (`src/components/home/`), in page order
`Hero` (see below) → `Audience` (/02: intro header, then two full-bleed halves — light "I'm hiring" with a 4-step journey
and dark-forest "I'm looking for work" with 4 promises; large photos with floating notes; photos link to
`/employers` / `/jobs`. Built to the 2026-09-30 mockup, see #66) → `TheIdea` (/03, tagline headline + 3-step chain
beside the full, uncropped poster in a `frame="full"` BrandVisual) → `Comparison` (/04, Traditional/JN toggle, check/cross icons) → `Marquee` → `Industries` (/05,
12 sectors explorer, industry icons) → `Services` (/06, 6 rows with icon badges → real service pages) →
`WorkforceLifecycle` (/07, icon badges, body always visible) → `Payroll` (/08, illustrative mock UI) →
`Process` (/09, icon badges on the line) → `Team` (/10, 5 role cards with photo slot / BrandArt) → `Proof`
(/11, 2 named clients) → `CTA` (with BrandVisual). Section numbers now follow page order (renumbered 2026-09-29).

**Hero (redesigned 2026-09-21, from the supplied mockups):** `home/Hero.tsx` exports one `Hero` that renders, in order: (1) the hero itself — left: full-bleed team photo (transparent WebP cut-out with rounded mask + green shape baked in; separate crops for phone/desktop via `<picture>` + `getImageProps`), right: label `001 / 026 · Better Talent · Brighter Futures`, 4-line headline (each line reveals upward; padding prevents clipped descenders), sub-copy *"Tell us the roles once. We find, verify, deploy and support the right people — and the same team stays with you after day one."*, circle-arrow CTA *"Let's work together"* → `/contact` plus a candidate link *"Looking for work? Browse open roles →"* → `/jobs`, and a vertical *People / Process / Progress* tag (bottom-right on desktop, beside the CTA on phones); phones also get a green corner triangle; (2) `IndustryStrip` (scrolling industries band, kept from the old hero); (3) `SystemFlow` (CLIENT → … → CONTINUITY grid, kept; each step now has its custom icon). Layout switches at `lg` (1024px): photo above text below that. Entrances wait for `useLoaderReady()`.

**Touch behaviour:** hover-reveal panels (`TheIdea`, `Services`, `WorkforceLifecycle`) use
`onPointerEnter/Leave` for mouse only + `onClick` for touch; their `IconBadge`s get `active` from the same
state so the green tile also appears on tap. `Team` cards toggle their overlay on tap.

**Copy approach (updated 2026-11-06):** plain, confident English a business owner or a candidate understands
on first read. One idea per headline (2 short lines, green on the key words only), 1–3 line descriptions,
eyebrow → headline → copy → CTA. Fixed terms: "account manager", "Services", "open roles"; CTAs "Tell us what you
need" (employers), "Browse open roles" / "Find your next role" (candidates); sentence case for labels and buttons.
Avoid jargon ("engagement model", "deployment", "operating model", "named ownership", "SLA"). Pain → relief for
employers, belonging/hope for candidates, no invented statistics, client results or guarantees — see open item S.

---

## 5. Data & server actions

Tables (`src/db/schema.ts`): `jobs`, `contact_submissions`, `job_applications`.

- `src/db/index.ts` — **lazy** Drizzle/pg pool (created on first query; throws `DATABASE_URL is required` only then).
- **Contact action** (`contact/page.tsx`): trims + length-caps every field, requires name/email/message and a valid email, else throws (form shows error).
- **Apply action** (`jobs/[id]/page.tsx`): same validation; also checks the job exists and `is_active`.
- **`/jobs`**: only `is_active = true`; case-insensitive contains-match on title/location/industry/type (LIKE wildcards escaped). DB failure → empty state.
- **`/jobs/[id]`**: id must be 1–9 digits; inactive/missing/DB-error → 404.
- Submissions are **stored only** — no email notification is sent (see Known Issues).

---

## 6. Assets

| File | Use |
|---|---|
| `public/logo.svg`, `public/logo-light.svg` | **Vector logo** (2026-10-27), 996×1000 viewBox — use these for print/partners |
| `public/logo.png` | Transparent PNG rendered from the vector (996×1000) — used for the Open Graph image. Original source was the user-supplied Cloudinary PNG |
| `public/hero-desktop.webp` (890×712), `public/hero-mobile.webp` (1024×690) | Hero team photo, cut out (background keyed to transparent) from the two design mockups — **placeholder-quality, see open item P** |
| `public/logo-light.png` | Same, with "JN" off-white for dark backgrounds |
| `src/app/icon.png` (512), `apple-icon.png` (180), `favicon.ico` (16–64) | Favicon set from the user's green "JN" tile; the corner sparkle watermark was painted out. Next.js wires these automatically |

**Photo slots (2026-09-29):** `src/lib/visuals.ts` lists 22 slots (4 home, 5 team, 13 inner-page
heroes). **Inner pages filled 2026-11-05** with composed artwork (About, Staffing, Industries, Workforce,
Employers, Candidates, Payroll → `page-*-hero.webp`, `composed` flag — the frame is baked in, unlike
the plain-photo slots). **Filled (2026-09-30): the 4 home slots** (`public/visuals/audience-employers.webp`,
`idea-poster.webp`; renamed 2026-09-30 → `audience-hiring-team.webp`, `audience-candidate-lead.webp`, `cta-planning.webp`; 1536×1024, idea 1280×1600 shown whole). The other 18 are
`src: null` → each renders designed `BrandArt`. Per slot, `focus` (object-position) and `zoom` tune the
crop inside the frame.
The supplied photos have a thin green wave line baked in; it sits well with the frame's own outline
strokes, so keep that style for the remaining photos. To add a photo, save
`public/visuals/<key>.webp` and set its `src`. Sizes, priorities and a detailed AI/photographer prompt
for every slot: **[`ASSET-BRIEF.md`](ASSET-BRIEF.md)**. Icons need no files (drawn in code).

To swap the logo: replace `public/logo.png` and regenerate `logo-light.png` (recolour dark pixels → `#FAF9F7`),
update `width/height` in `Logo.tsx` if the aspect ratio changes.


### Loader internals (read before changing it)
- **Speed model:** the animation is authored at 5.25 s. `SiteLoader` doesn't cut it, it plays the whole timeline by scaling the clock (`T = progress × LOGO_ANIM_END`). Change `INTRO_MS` / `NAV_MS` / `EXIT_MS` / `READY_CAP_MS` in `SiteLoader.tsx` to speed up or slow down.
- **Click detection:** one capture-phase `click` listener on `document` starts the loader for same-origin `<a>` links to a *different pathname* (ignores modified clicks, new-tab links, downloads, `#hash` and `?query`-only changes). Browser back/forward and form GETs don't trigger the nav loader.
- **Sync with the page:** `src/lib/loader-state.ts` holds a shared `ready` flag (`useLoaderReady()`). It is `false` while the loader covers the page and flips to `true` when the loader starts lifting. `Hero` and `PageHero` wait for it so their entrance animations are actually seen. Other sections animate on scroll and are unaffected.
- **Look:** light `off-white` overlay with the real brand colours (ink J/N, green ribbon), green bottom progress line, corner registration marks; the first-load version also shows the "Est. Operations / Loading" labels and a 000–100 counter.
- **Reduced motion:** the loader plays even when the OS "reduce motion" flag is on (the old loader did too; it is short and has no parallax). Change in `SiteLoader.tsx` if you want it skipped.
- **Path data:** `src/lib/jn-logo-paths.ts` — since 2026-10-27 generated from the clean vector logo (`jn-logo-vector.ts`, see change #73), don't hand-edit. If the logo artwork changes, regenerate both files.

---

## 7. Change Log

Newest first. One row per change; keep entries short and name the files.

### 2026-11-13 (later) — Legal compliance (legal-checker skill)
| # | Change | Files |
|---|---|---|
| 146 | **New project skill `legal-checker`** — reusable legal/compliance checklist (India DPDP Act 2023 + Rules 2025, IT Act/SPDI Rules, Companies Act disclosures, recruitment licences, cookies, forms, terms; GDPR/CCPA add-ons) and audit procedure. Report for this site in `LEGAL-CHECK.md` | `.claude/skills/legal-checker/{SKILL.md,checklist.md}`, `LEGAL-CHECK.md` |
| 147 | **Cookie consent**: banner with equal Accept/Reject; Google tag loads only after Accept (consent mode: ads always denied); choice in localStorage `jn-cookie-consent`; "Cookie settings" in the footer legal row (phones: 2×2 pills) re-opens it; withdrawing clears `_ga` cookies and reloads | `CookieBanner.tsx`, `CookieSettingsButton.tsx`, `lib/consent.ts`, `Analytics.tsx`, `layout.tsx`, `Footer.tsx` |
| 148 | **Form consent**: required unticked "I agree…" box with Privacy Policy link on contact, register and job-application forms; the email includes `Consent: Yes — <timestamp> — privacy policy <version>` | `ConsentCheckbox.tsx`, `ContactForm.tsx`, `RegisterForm.tsx`, `JobApplicationForm.tsx` |
| 149 | **Legal pages rewritten**: Privacy (who we are, data per audience, purposes, consent, named processors, transfers abroad, retention, security/breach, rights, Grievance Officer, children, changes), Terms (no-fee + anti-fraud, no job guarantee, employers, equal opportunity, acceptable use, IP, links, liability, Indian law / Bengaluru courts), Cookies (per-cookie table + settings button). "Last updated" date on all three | `app/privacy`, `app/terms`, `app/cookies`, `LegalPage.tsx` |
| 150 | **`LEGAL` config** in `lib/site.ts` (entity name, registered address, CIN, GSTIN, licences, Grievance Officer, retention, policy date/version) — empty values are hidden, never shown as placeholders; footer shows legal name + registration line once filled | `lib/site.ts`, `Footer.tsx` |
| 151 | **Company disclosures filled from the incorporation certificate**: legal name Job Nexus HR Private Limited, registered office (#686, 22nd Cross, L R Nagar, Bengaluru 560047) and CIN U78300KA2026PTC227835 — now in the footer and Privacy Policy (Companies (Incorporation) Rules r.26). GSTIN/PAN/TAN deliberately not published (not required) | `lib/site.ts`, `LEGAL-CHECK.md` |
| 152 | **Grievance Officer named**: R Aglin Arul Maria (Privacy Policy) | `lib/site.ts` |

Checked: `tsc` + `eslint` clean; production build OK; on the build at 375 px — banner shows on first visit, no Google script before Accept, loads after Accept, persists on reload, footer link re-opens, Reject removes the tag with no `_ga` cookies; forms refuse to submit without the consent box; no horizontal scroll on legal/contact pages.

### 2026-11-13 — SEO, structured data, GA4 + Search Console
| # | Change | Files |
|---|---|---|
| 138 | **Placeholder domain fixed**: `SITE_URL` now defaults to `https://www.jobnexushr.com` — sitemap, robots, canonical and OG URLs no longer point at `jobnexus.example` (production had no `NEXT_PUBLIC_SITE_URL`). Added `SOCIAL` (LinkedIn, Instagram), `GA_ID`, `GSC_VERIFICATION` | `lib/site.ts`, `.env.example` |
| 139 | **Metadata rewrite for search**: keyword-led titles ("Recruitment & Staffing Agency in Bangalore", "Hire Staff in Bangalore & India", "Payroll Outsourcing & PF/ESI…", service pages "… Services in Bangalore & India"), longer descriptions, a self-referencing `canonical` on every page (incl. service + job pages), robots max-snippet/large image preview, `en_IN` locale, Twitter card | `layout.tsx`, every `page.tsx`, `staffing/[slug]/page.tsx`, `jobs/[id]/page.tsx` |
| 140 | **Structured data (JSON-LD)**: site-wide `Organization` + `EmploymentAgency` (name, legal name, logo, slogan, founded 2026, phone, email, Bengaluru/Karnataka/India area served, sameAs LinkedIn/Instagram, offer catalog of the 6 services) and `WebSite`; `Service` + `BreadcrumbList` on each service page; `JobPosting` on job pages (Google for Jobs). New `JsonLd` component and `lib/seo.ts` builders | `components/JsonLd.tsx`, `lib/seo.ts`, `layout.tsx`, `staffing/[slug]/page.tsx`, `jobs/[id]/page.tsx` |
| 141 | **New share image** `public/og.png` (1200×630, logo + tagline + services) replaces the square logo for link previews | `public/og.png`, `layout.tsx` |
| 142 | **AI search readiness**: `public/llms.txt` company summary; robots.txt lists AI crawlers explicitly; sitemap gets `lastModified` | `public/llms.txt`, `robots.ts`, `sitemap.ts` |
| 143 | **Google Analytics 4** installed (`Analytics` client component, loads after hydration): page views plus `contact_click` (tel/mailto/WhatsApp links) and `generate_lead` (any POST form — contact, job application). Supports the 2026 `GTM-…` Google tag snippet and classic `G-…`. Cookies page now names Google Analytics 4 (resolves §8 D) | `components/Analytics.tsx`, `layout.tsx`, `cookies/page.tsx` |
| 144 | **Search Console** ownership file `public/google57be15b428bba9bc.html` (URL-prefix property `https://www.jobnexushr.com/`, owner anthonyrichard@jobnexushr.com). Verify in Search Console after deploy, then submit `sitemap.xml` | `public/google57be15b428bba9bc.html` |
| 145 | **GTM start event**: with a `GTM-…` ID the init script now pushes `{'gtm.start', event:'gtm.js'}` (as in Google's standard snippet) so the container's All-Pages / page-view tags fire | `Analytics.tsx` |

Checked: `tsc` + `eslint` clean; `next build` OK; production server: canonical, title, `og.png`, two JSON-LD blocks (valid JSON), GA tag, robots/sitemap on jobnexushr.com, `/llms.txt` and the verification file return 200.

### 2026-11-12 — UI/UX & psychology audit fixes (non-database items)
Source: "Job Nexus HR – UI/UX & Psychology Audit" (12 Nov 2026). Job posting/DB items deferred by the owner.

| # | Change | Files |
|---|---|---|
| 130 | **Candidate path no longer ends at "0 roles"**: every "Browse open roles" / "Find your next role" CTA now says **Register for jobs** → new **`/register`** page (30-second form: name, phone, city, job type, experience, optional email / CV link / note) emailed via EmailJS as "candidate registration"; fallback message offers WhatsApp/phone if sending fails. On `/jobs`, the filters are hidden while no roles exist (shown again when roles exist or a search is active); the empty state offers Register + WhatsApp + "How we help candidates" | `app/register/page.tsx` (new), `RegisterForm.tsx` (new), `jobs/page.tsx`, `home/Hero.tsx`, `home/Audience.tsx`, `home/CTA.tsx`, `candidates/page.tsx`, `sitemap.ts` |
| 131 | **Candidate safety line** "We never charge candidates any fee." (`NO_FEE` in `lib/site.ts`) near candidate CTAs (home hero, Start-here candidate half, jobs, candidates, register — with an anti-fraud note) and in the footer | `lib/site.ts`, several pages |
| 132 | **Floating WhatsApp button** on every page with a chooser ("I'm hiring" / "I'm looking for work") and prefilled messages; `CONTACT.whatsapp` = 919606197196 (assumed same as the business number) | `WhatsAppButton.tsx` (new), `layout.tsx`, `lib/site.ts` |
| 133 | **Home hero**: candidate CTA is now a full outlined button equal to the employer one (both full-width on phones); no-fee microcopy under them; tablet photo capped at 38vh so the headline and CTAs appear sooner; tag changed from "People / Process / Progress" to concrete "Find / Verify / Support" (shown from 1280px) | `home/Hero.tsx` |
| 134 | **Shorter home page** (~16% shorter): removed the repeated value marquee and the two extra process explanations (Workforce lifecycle stages, 6-step Process) — "How it works" in the hero remains; full detail lives on Workforce/Services/Employers pages. Payroll renumbered /07. Components kept for reuse | `app/page.tsx`, `home/Payroll.tsx` |
| 135 | **No blank screens while scrolling**: every scroll reveal now triggers 30% before the section enters the screen (`useInView … margin: "0px 0px 30% 0px"`) | all components using `useInView` |
| 136 | **Consistency**: hero ticker, home Industries explorer and job filters use the same 12 sectors (IT & Technology, BFSI, Healthcare, Pharma, Manufacturing, Retail, E-commerce, Logistics, Hospitality, Telecom, Construction, BPO/KPO); loader no longer says "Est." without a year | `home/Hero.tsx`, `lib/job-filters.ts`, `SiteLoader.tsx` |
| 137 | **Navbar**: "Services" is a real link to /staffing (the chevron/hover opens the menu); full nav now from 1024px (burger below); phone number from 1280px; Services panel drops the partner card at 1024–1279px | `Navbar.tsx` |

**Not done — needs facts only the owner has** (listed in §8 V): testimonials, a case study with numbers, licences/registrations (CLRA, GST, PF/ESI), founding year, turnaround promises (shortlist/deploy times), real site/team photos, Hindi/regional pages, analytics funnel. Reduced-motion was left as the owner decided (§8 R).

Checked: `tsc` + `eslint` clean; production build OK (23 routes incl. /register); home at 375/800/1024/1440, jobs and register at 375/1440 — no horizontal scroll at phone/tablet widths; register form fallback tested.

### 2026-11-07 (later) — Contact page redesign
| # | Change | Files |
|---|---|---|
| 106 | **/contact rebuilt to the supplied mockup** (no `PageHero`): mint-white gradient section with a soft diagonal panel; left — "— Contact us", bold "How can / we help?", short copy, three white info cards (Our headquarters · Reach us: email + phone, stacked on phones · Our location: Bangalore, India) and the handwritten line "Let's build a stronger workforce together." with a green swoosh (Caveat, `.font-script`); middle (≥1280px) — the office-building image cut from the mockup (`public/visuals/contact-office.webp`, edges faded with a CSS mask) tucked under the form; right — white rounded form card with a green corner accent, mail icon circle, "Send us a message". Bottom pill "Trusted by businesses across India · People. Process. Progress." with a line + dot; "What happens next" kept below as three cards | `contact/page.tsx`, `public/visuals/contact-office.webp` |
| 107 | **Contact form restyled**: labels above rounded bordered fields with line icons (person, mail, phone, building, question, chat), green focus ring, custom select chevron, full-width forest "Send message" button with send icon, "Your information is safe with us · Privacy" line; success state is a centred card with a check. Field names/ids and the server action are unchanged | `ContactForm.tsx` |
| 108 | `CONTACT.city` = "Bangalore, India" (from the mockup) — also shown in the footer headquarters block. Caveat added to the Google Fonts link | `lib/site.ts`, `Footer.tsx`, `layout.tsx`, `globals.css` |
| 109 | **Contact form made interactive**: a progress bar (inquiry type, name, valid email, message → "Ready to send"); three numbered steps — **01** "I'm getting in touch because…" as four icon choice cards (radio group `name="subject"`, selected card turns green with a check), **02** "How do we reach you?" floating-label fields with icons (company label adapts: Company / Current company / Organisation), **03** "What do you need?" message box whose placeholder and **quick-prompt chips** ("+ Roles", "+ Number of people"… or "+ Role I want", "+ Experience"…) follow the chosen type — a chip adds a labelled line and focuses the box; character counter /5000; send button with a paper-plane nudge on hover. Same field names → server action unchanged | `ContactForm.tsx` |
| 110 | **Rest of /contact matched to the form's style**: two-column layout (left column sticky on desktop while the taller form scrolls); "Contact us" pill with a live dot; contact details as white rounded **cards with icon circles** like the form's choice cards — Email us (mailto) and Call us (tel) are whole-card links with an arrow and hover lift, Our location (Bangalore, India), plus a green-tint "Reply within one business day" card; the office photo now sits in a rounded card beside them with a green corner and a "Bangalore, India" chip (hidden on phones); "What happens next" rebuilt as numbered badges on a green progress track (01 We read it · 02 We reply · 03 We talk it through) with white cards, and the trust line moved there as two small pills | `contact/page.tsx` |
| 111 | Contact photo card now shows the supplied **pencil sketch of the office building** (`public/visuals/contact-office-sketch.webp`, 1500×2000) instead of the mockup cut-out; dark bottom gradient removed so the line drawing stays clean. `contact-office.webp` is no longer used | `contact/page.tsx`, `public/visuals/contact-office-sketch.webp` |
| 112 | Services menu: the intro card now uses the supplied artwork (`public/visuals/menu-services-team.webp`, 1774×887 — photo with its own curve on the left, mint on the right) as the full card background on ≥1536px, anchored right so the photo always ends before the text; text sits in the right 43%. Replaces `menu-team-clean.webp` (now unused) | `Navbar.tsx`, `public/visuals/menu-services-team.webp` |
| 113 | **Animated icon set** (inspired by the supplied animated weather icons): every `JNIcon` now renders `data-icon`, stroke accents carry `pathLength={1}`, and `globals.css` "Animated icons" gives each icon a small loop that fits its meaning — briefcase swings from its handle with a glinting clasp (I'm hiring); magnifier searches while the person draws in (I'm looking for work, BGV); checks, charts, code, mail flap, headset, payroll lines draw themselves; location pin drops and its dot pulses; sparkle twinkles; nexus diamond turns; continuity diamond rides the loop; message dots / match overlap breathe; healthcare cross heartbeats; hotel bell rings; truck bobs with speed lines; volume underline stretches. Applies everywhere the icons are used (pills, badges, menus, cards). The **ping "pop" ring on the two audience pills was removed** | `icons/JNIcon.tsx`, `globals.css`, `home/Audience.tsx` |
| 114 | **Home hero CTA "Tell us what you need"** restyled after the supplied "learn more" button: a forest-green circle with a white chevron; on hover/keyboard focus the circle grows into a full pill (turns brand green), the arrow's line appears and slides right, and the label turns white (0.45s, `cubic-bezier(0.65,0,0.076,1)`). Label is semibold sans uppercase. 280px wide on phones, 312px on desktop | `home/Hero.tsx` |
| 115 | **Hero images for three service pages**, cut from the supplied mockups like the other inner-page heroes (scratch `compose2.py`: crop clear of the headline, background matched to #FAF9F7, edges feathered; headline fragments inside the crop painted out): Permanent Recruitment (850×782 — handshake, "Top Talent Access" + checklist card), Volume Staffing (855×763 — handshake with a line of new starters, "Hire at Scale / Fast Turnaround / Quality Talent"), Statutory Compliance (908×680 — specialist reviewing paperwork, "Labour Law / PF & ESI / Tax Compliance" cards, "100% Compliant · Hassle-Free" chip). Added as `composed` slots, so desktop and the phone layout work as on the other pages. The mockups' extra buttons ("Explore …", "Watch how it works") were not added — there is no video | `lib/visuals.ts`, `public/visuals/page-{permanent-recruitment,volume-staffing,compliance}-hero.webp` |
| 116 | **Background Verification hero image** cut from the supplied mockup (809×734 — specialist reviewing documents, "Verified & Trusted" badge, checklist card, ID card with tick) as a `composed` slot. Note: its checklist shows "No Criminal Record", but the BGV scope on the site does not list criminal-record checks — confirm or supply a version without it | `lib/visuals.ts`, `public/visuals/page-bgv-hero.webp` |
| 117 | **Home hero on phones**: the CTA row now stacks (button, candidate link, then the tag); "People · Process · Progress" shows as one horizontal row with the green rule, instead of being pushed off-screen by the wider CTA | `home/Hero.tsx` |
| 118 | **Navbar**: items are now Home · About · Services (mega menu) · Industries · Employers · Candidates — Workforce Management and Payroll removed from the bar (both stay in the Services menu and footer); Home is active only on `/`. Phone number `+91 96061 97196` (tel link, green phone icon) sits beside "Tell us what you need" from 1024px; the phone menu gets a "Call +91 96061 97196" button. With the shorter list the "Job Nexus HR" wordmark now shows at every width | `Navbar.tsx` |
| 119 | **About page closing strip** no longer repeats the footer tagline: "Ready to meet your account manager?" + one line of copy, same "Tell us what you need" button | `about/page.tsx` |
| 120 | **Footer redesigned to the supplied mockups**: deep green-black gradient with green swoosh lines; brand block (light logo · divider · "Better Talent. / Brighter Futures." — the mockup showed only "Brighter Futures.", corrected to the full tagline), short paragraph and outlined pill "Tell us what you need"; columns **Quick links** (Home, About us, Services, Industries, Employers, Candidates, Open roles, Contact), **Our services** (all six) with chevrons, **Get in touch** (email, phone, Bangalore with green icon circles; email/phone are links); the office building from the mockup fades in on the right on ≥1024px (`public/visuals/footer-building.webp`); brand bar with small logo + tagline and Privacy Policy · Terms & Conditions · Cookies; copyright row with a glowing line + dot and a green corner. Social icons from the mockup were **not** added — no profile links exist yet (add URLs and they can be switched on). Phones: quick links in two columns, everything stacked | `Footer.tsx`, `public/visuals/footer-building.webp` |
| 121 | Fix: phone icon in the navbar (and the footer contact icons) vanished on hover — the circle turned green but the glyph stayed green, because the global unlayered `.text-green` rule beats Tailwind's `group-hover:text-white`. Those icons now use `text-[#0E956A]` (a layered utility) so the hover colour wins. **Rule:** don't combine `text-green` with a `hover:`/`group-hover:` text colour — use `text-[#0E956A]` instead | `Navbar.tsx`, `Footer.tsx` |
| 122 | **EmailJS: every form submission is emailed to anthonyrichard@jobnexushr.com** — Contact form (inquiry type, name, email, phone, company, message) and job application (role, name, email, phone, experience, note). `src/lib/emailjs.ts` calls the EmailJS REST endpoint (no new package), sets Reply-To to the visitor, and sends a ready-made `{{details}}` block plus each field as its own variable. `deliver()` emails and saves to the database side by side — the visitor sees success if **either** works, so a missing DB or a temporary EmailJS error does not lose an enquiry. Hidden honeypot field drops simple bots. Keys come from `NEXT_PUBLIC_EMAILJS_SERVICE_ID / _TEMPLATE_ID / _PUBLIC_KEY`; template setup in **`EMAILJS-SETUP.md`**. Verified with dummy keys and an intercepted request (nothing sent): payload addressed correctly, success state shown | `lib/emailjs.ts` (new), `ContactForm.tsx`, `JobApplicationForm.tsx`, `jobs/[id]/page.tsx`, `.env.example`, `EMAILJS-SETUP.md` (new) |
| 123 | Footer on phones: Privacy Policy · Terms & Conditions · Cookies wrapped onto two lines with a stray divider at the start of the second; below 640px they are now three equal outlined pills on one row (dividers only from 640px up). Also added `emailjs-template.html` (branded EmailJS email template) and linked it from `EMAILJS-SETUP.md` | `Footer.tsx`, `emailjs-template.html`, `EMAILJS-SETUP.md` |
| 124 | **Jobs page redesigned to the supplied mockup**: hero image card cut from the mockup (`public/visuals/page-jobs-hero.webp`, 990×548 — "Open roles" label, matched-candidate icon, recruiter + colleague at a laptop) as a `composed` slot (image first on phones, right on desktop); new `swoosh` prop on `PageHero` adds the soft green corner wave (used on Jobs). Below: search filters in a white rounded card with icon-led rounded fields (search, pin, building, clock) and a forest "Search" button — same style as the contact form; empty state is a rounded card with an icon circle and rounded buttons. Filters/GET behaviour unchanged | `jobs/page.tsx`, `PageHero.tsx`, `lib/visuals.ts`, `public/visuals/page-jobs-hero.webp` |
| 125 | **Smoother section transitions**: (a) Footer starts with a soft green glow hairline and a faint green wash; its curve lines fade in from the top (CSS mask) and the office photo fades into the dark at the top, so nothing is cut off by the edge. (b) Dark closing bands (`CTASection` dark tone, home `CTA`) now use the footer's green-black gradient instead of grey-black `bg-ink`, so CTA + footer read as one surface (no two-darks seam); they carry `.on-dark` so small green labels stay bright. (c) Jobs hero: the image's blended margin is now transparent (`page-jobs-hero-v2.webp`) so no pale box sits over the green wave; with `swoosh` the hero drops its bottom rule and the wave dissolves to the bottom/left. (d) Contact hero gradient ends on the page colour so "What happens next" continues seamlessly | `Footer.tsx`, `CTASection.tsx`, `home/CTA.tsx`, `PageHero.tsx`, `contact/page.tsx`, `lib/visuals.ts`, `public/visuals/page-jobs-hero-v2.webp` |
| 126 | **Clients changed**: Swiggy and Blinkit removed; **Pronto** and **Elastic Run** shown as *Direct client* cards (white rounded cards, green corner, "Direct client" pill, hover lift). Each card has a logo slot — `CLIENTS` in `home/Proof.tsx` takes `logo: { src: "/clients/<file>", width, height }`; until a file is supplied the company name shows as a wordmark. `public/clients/` created for the files | `home/Proof.tsx`, `public/clients/` |
| 127 | **Client logos added**: cut from the supplied image with transparent backgrounds — `public/clients/elastic-run.webp` (1140×300) and `public/clients/pronto.webp` (684×252, rounded-rectangle mask) — and wired into the `CLIENTS` list; shown up to 72px tall in the cards | `home/Proof.tsx`, `public/clients/*` |
| 128 | **Official logos + clients section redesign**: Elastic Run now uses the supplied official SVG (`public/clients/elasticrun.svg`); Pronto uses the supplied official square tile, shown as a rounded tile (`public/clients/pronto-tile.webp`). Earlier screenshot cut-outs removed. Section rebuilt as one connected showcase: soft green wash behind, a white rounded panel with a live "Direct clients" label, two large logo tiles (gradient, green corner, hover lift/scale) with a footer row "Name · ✓ Active relationship", then the three trust points as matching rounded cards with icon circles. Copy tightened ("No inflated numbers, no anonymous five-star quotes…") | `home/Proof.tsx`, `public/clients/*` |
| 129 | **Clients shown as a logo row (supplied "exceptional brands" reference)**: centred "Our clients" pill + heading "We are fortunate to work with **exceptional brands.**" + one line of copy; the two logos sit in a centred row with small captions ("Pronto · direct client"). On hover-capable screens logos are grey/semi-transparent, the hovered one turns full colour and lifts 0.3rem while the others blur 2px (`.client-logos` in `globals.css`); touch screens show full colour. Trust cards follow below a fading divider. `SectionHeader` no longer used here | `home/Proof.tsx`, `globals.css` |

Checked: `tsc` + `eslint` clean; production build OK; /contact at 1672, 1280 and 375 — no horizontal scroll. The building image comes from the mockup (~420px wide source, shown up to ~400px), so it is slightly soft; supply the original for a sharper version.

### 2026-11-07 — Contact details, animations restored, home refinements
| # | Change | Files |
|---|---|---|
| 100 | **Real contact details**: `info@jobnexushr.com` and `+91 96061 97196` (tel link) via one constant `CONTACT` in `lib/site.ts` — Contact page ("Reach us"), footer, form error message, Privacy page. Placeholder `hello@jobnexus.example` removed everywhere | `lib/site.ts`, `contact/page.tsx`, `Footer.tsx`, `ContactForm.tsx`, `privacy/page.tsx` |
| 101 | **Animations restored on desktop**: #79 made the site honour the OS "reduce motion" flag; Windows PCs with *Animation effects* off report that flag, so marquees/strips/orbits and motion entrances froze on desktop while phones kept animating. Back to the owner's earlier decision (§8 R): animations always play; only smooth scrolling is turned off for that flag. `MotionProvider` now uses `reducedMotion="never"`. Verified on a fresh build with the flag on. **Note:** the running `pnpm dev` server kept serving the old CSS — restart it (stop, delete `.next`, `pnpm dev`) to see the change locally | `globals.css`, `MotionProvider.tsx` |
| 102 | **Services menu photo**: the green wave line baked into the photo was removed (inpainted copy `public/visuals/menu-team-clean.webp`, right 56px cropped) and the extra green arc overlay deleted. The original `cta-planning.webp` (used by the home CTA) is unchanged | `Navbar.tsx`, `public/visuals/menu-team-clean.webp` |
| 103 | **"I'm hiring" / "I'm looking for work" labels** are now prominent pills: green icon circle with a soft pulse ring, 15–17px semibold label, number; white with shadow on the light half, green-tinted glow on the dark half. Both closing blocks now open with the same icon circle + line (the candidate side had only a line) | `home/Audience.tsx` |
| 104 | **Home payroll example rebuilt for phones**: modules become a scrolling chip row, the four tiles a 2×2 grid, the monthly steps stacked rows with a number badge and a status chip; rounded cards on phones, unchanged layout on desktop | `home/Payroll.tsx` |
| 105 | **Team section removed from the home page** (Proof renumbered /10). `home/Team.tsx` is kept but unused | `app/page.tsx`, `home/Proof.tsx` |

Checked: `tsc` + `eslint` clean; production build OK; phone (375) and desktop (1440) checked for the audience labels and payroll example; loops confirmed running with reduce-motion on.

### 2026-11-06 (latest) — Mega-menu navbar
| # | Change | Files |
|---|---|---|
| 97 | **Navbar redesigned to the supplied reference**: floating rounded white bar (inset 12–16px, blur, soft shadow), sentence-case 15px nav with a green bar under the active item, rounded forest CTA "Tell us what you need →". **Services** is now a dropdown (hover with 160ms close delay, click/tap, Esc, outside click, closes on navigation; `aria-expanded`/`aria-controls`) opening a **mega panel**: intro ("Six services. One account manager." + "Explore all services"), the six services with icon circles and subtitles, and on ≥1536px the `cta-planning` photo with a "One contact for every service" note. "HR Consulting" from the reference was **not** added — it isn't an offered service. "Workforce Management" shows in full from 1536px ("Workforce" 1280–1535px) | `Navbar.tsx`, `lib/services.ts` (`short` subtitles) |
| 98 | **Mobile/tablet menu**: same floating bar; full-screen list with an **expandable Services** section (icons + subtitles + "Explore all services"), current page in green, rounded CTA. Inner-page heroes start 16px lower on phones (`pt-24`) to clear the floating bar | `Navbar.tsx`, `PageHero.tsx` |
| 99 | **Services mega panel restyled to the second reference**: three cards — left: team photo with a curved right edge + green arc, "— Our services / Building a stronger workforce together." and an outlined "Explore all services" pill; middle: the six services in two columns of three with a divider, 48px icon circles, bold names + subtitles; right: light-green partner card with growth-chart icon, "Your partner in people success", "Hire, pay and support your workforce — with one account manager." and a dark "Talk to us →" pill (→ /contact), diagonal linework and a green edge sweep. Photo hidden 1280–1535px (text-only card). "HR Consulting" again not added | `Navbar.tsx` |

Checked: `tsc` + `eslint` clean; production build OK; panel verified at 1600 (with photo) and 1280 (without), phone menu + Services accordion at 375.

### 2026-11-06 (later) — Site-wide copy rewrite
Voice rules now in §4.2 "Copy approach". Terminology fixed: **"account manager"** (not named owner / account
owner / engagement owner), **"Services"** in nav for `/staffing`, CTA labels **"Tell us what you need"** (employers)
and **"Browse open roles" / "Find your next role"** (candidates), sentence case everywhere. No new claims,
numbers or capabilities were added; several unverifiable ones were removed.

| # | Change | Files |
|---|---|---|
| 92 | **Home hero**: headline "The right people, in the right roles. Supported long after day one."; sub-copy in plain English; CTA "Tell us what you need"; meaningless "001 / 026" counter removed; strip label "Industries we hire for" + "All industries →" link (was a non-working "Scroll · Explore"); fake "Operations System · Live / JN Connected" panel becomes "How it works": You brief us → We understand the role → We find the people → They start work → We stay with you | `home/Hero.tsx` |
| 93 | **Home sections rewritten** — Start here ("Explain it once. We handle the rest.", "Build a team that stays.", candidate button now "Find your next role" → /jobs, was "Tell us what you need"); The Idea (removed invented "still here in year three" claim, plain codes "For employers / For candidates / Our team", removed "Active" hover tag); Why us ("Anyone can send CVs. We stay for what comes after.", "Typical agency" toggle); marquee; Industries; Services (removed "criminal record checks", which no page offers); Workforce lifecycle; Payroll ("Your people. Our payroll.", fake `PR-2025-09` rows replaced by the 4 monthly steps — resolves §8 I); Process (Brief / Understand / Match / Start / Support / Continue); Team (role titles in plain English); Proof (removed the "Service stories" card — no stories exist — replaced by "Honest scope"); closing CTA | `home/*.tsx` |
| 94 | **Navigation + footer**: nav "Services" and "Workforce" (shorter, plainer), footer labels match the nav, "Open roles"; CTA casing unified; meta description rewritten | `Navbar.tsx`, `Footer.tsx`, `CTASection.tsx`, `layout.tsx` |
| 95 | **Inner pages rewritten**: Services ("Six services. One account manager."), service pages (plain scope lists, e.g. "agreed cut-off times" instead of "cut-off SLAs"), Industries ("Roles we fill", "A note on experience"), Workforce ("Support that starts on day one."), Payroll ("Payroll handled. Every month."), Employers ("Hiring made simple. Support that stays.", "What you can expect from us"), Candidates ("Your next job, with someone on your side."), Jobs ("Open roles, real recruiters."), Contact ("How can we help?", inquiry types "I'm hiring / I'm looking for work / Partnership / Something else", "Send message"), About (story and principles in plain English), 404 page. Legal text untouched | `app/**/page.tsx`, `lib/services.ts`, `ContactForm.tsx`, `not-found.tsx` |
| 96 | `PageHero` hides the desktop label when it repeats the index (was "/ For Employers — FOR EMPLOYERS"); `/staffing` index + breadcrumbs say "Services" to match the nav | `PageHero.tsx`, `staffing/page.tsx`, `staffing/[slug]/page.tsx` |

Checked: `tsc` + `eslint` clean; production build OK; home + 4 inner pages captured at 1440 and 375 — headlines
wrap cleanly, no horizontal scroll.

### 2026-11-06 — Premium design audit & refinement
Audit findings (before): 10–11px green labels at 3.6:1 contrast (fails AA); OS reduced-motion ignored (§8 R);
no skip link; filler labels with no meaning ("Recorded", "Stage", "Principle", "JN Operated", "Capabilities");
non-link cards showing an "Open"/"Read" cursor label; four service pages that were the same template; 24
identical industry cards; a mislabeled button on Employers ("Talk to Our Team" → /staffing) and a heading
duplicated in its label; job filters without visible labels and different industry lists on /jobs and
/candidates; no breadcrumbs on detail pages; legal pages without structure; two dark bands stacked before
the dark footer. Home was **not** restyled — it is built to the supplied mockups.

| # | Change | Files |
|---|---|---|
| 79 | **Accessibility foundation**: small green mono text uses `--dark-green` on light surfaces (AA), green kept on dark (`.bg-ink`, `.bg-forest`, `footer`, `.on-dark`); **reduced motion honoured** — marquees/strips/orbits stop, transitions ~0, motion entrances skipped via `<MotionConfig reducedMotion="user">`; skip link + focusable `<main id="main">` | `globals.css`, `MotionProvider.tsx` (new), `layout.tsx` |
| 80 | Navbar: active state also for nested routes (`/staffing/bgv` → Staffing), `aria-current="page"`, mobile menu is a labelled modal dialog and highlights the current page | `Navbar.tsx` |
| 81 | **Single service source** `lib/services.ts` (code, slug, href, name, icon, head, body, plain-language `need`, scope) and `lib/job-filters.ts` (industries/types shared by /jobs and /candidates) | `lib/services.ts`, `lib/job-filters.ts` (new) |
| 82 | `PageHero` gets `crumbs` (breadcrumb trail replaces the label on detail pages); `CTASection` gets `tone="light"` for pages whose last section is already dark | `PageHero.tsx`, `CTASection.tsx` |
| 83 | New `ServiceFinder` ("Start from your situation"): six plain-language needs → the matching service, whole row is the link. Used on Employers | `ServiceFinder.tsx` (new), `employers/page.tsx` |
| 84 | **/staffing** rebuilt as an editorial index: jump chips, one full-width linked row per service (icon, name, promise, summary, scope), "Six services. One named owner." statement band, CTA "Not sure which service fits?" | `staffing/page.tsx` |
| 85 | **Service pages no longer share one template**: breadcrumbs, pull-quote promise, then a layout per service — Permanent = 6-step process track, Volume = Intake/Scale/Sustain phases with scale bars, Compliance = obligations ledger on ink, BGV = four checks feeding a "final report" panel; "Other services" links; per-page `<title>`; CTA "Let's talk about …" (replaces the awkward "Tell us about hiring that doesn't…") | `staffing/[slug]/page.tsx` |
| 86 | **/industries**: 24 sectors grouped into 5 operating groups (Technology & services, Health & life sciences, Industrial & engineering, Consumer/retail/distribution, Hospitality & travel) with jump nav, sticky group header + icon, rows with role lists; fake "Open" cursor removed | `industries/page.tsx` |
| 87 | **/workforce-management** lifecycle is one connected 6-node track (vertical on phones) with "continuity feeds the next requirement"; light CTA after the dark modules. **/payroll** adds a dark "every month" 4-step cycle (attendance → payroll run → statutory → reconcile) above the scope table | `workforce-management/page.tsx`, `payroll/page.tsx` |
| 88 | **/employers**: service finder added; duplicated label fixed ("/ Our commitments"); redundant buttons incl. mislabeled "Talk to Our Team → /staffing" removed; light CTA. **/candidates**: "Find a role." search panel (shared filters, full-width button on phones), new "After you apply" 3 steps. **/about**: filler labels removed, large ghost step numbers, tighter story spacing | `employers`, `candidates`, `about` pages |
| 89 | **/jobs**: visible filter labels, `role="search"`, result count (`aria-live`), "Clear filters", job rows with title/company + location/industry/experience + type tag + "View & apply"; empty state no longer claims "new roles weekly". **/jobs/[id]**: breadcrumbs, facts as a definition list. **/contact**: "What happens next" steps; forms show required markers, a clearer error (with the email fallback) and `role="status"` success | `jobs/page.tsx`, `jobs/[id]/page.tsx`, `contact/page.tsx`, `ContactForm.tsx`, `JobApplicationForm.tsx` |
| 90 | **Legal pages** use a shared `LegalPage` layout: contents list (sticky on desktop), numbered sections at a 68ch measure, `.prose-jn` typography, note callout, links to the sibling policies. **Text unchanged** | `LegalPage.tsx` (new), `privacy`, `terms`, `cookies` pages, `globals.css` |
| 91 | **/industries reverted to the previous 3-column card grid** at your request (grouped layout from #86 removed). The darker small-label green from #79 still applies to its "Capabilities" labels | `industries/page.tsx` |

Checked: `tsc` + `eslint` clean; production build OK (all 22 routes); 14 changed pages captured at 1440×900 and
375×812; no horizontal scroll at 375; skip link + keyboard focus checked; no console errors; `/jobs` filters,
"Clear filters" and `/staffing/<unknown>` 404 verified.

### 2026-11-05 (later) — Less empty space; mobile hero redesign
| # | Change | Files |
|---|---|---|
| 76 | **Spacing tightened site-wide** (54 class changes in 26 files): sections `py-24 lg:py-40`→`py-14 lg:py-24`, `py-24 lg:py-32`→`py-14 lg:py-20`, home CTA `py-32 lg:py-48`→`py-20 lg:py-28`, heading→content gaps `mt-20 lg:mt-28`→`mt-10 lg:mt-14` (and the other `mt-16/24` pairs), side-paragraph offset `lg:pt-24`→`lg:pt-16`, marquee and footer padding. Home page height 18,066 → ~16,100 px at 1440 wide. Home hero itself unchanged | all section components + inner pages |
| 77 | **Inner-page hero (`PageHero`) redesigned** — phones/tablets (<1024px): the visual comes **first**, directly under the navbar (composed art edge to edge, code-drawn art as a 16:10 card), then a compact **green pill label** (replaces the wrapping index/label row), smaller headline (`clamp(2.1rem,8.6vw,3.25rem)`) and description. Desktop: same two-column layout with less padding (`lg:pt-32 lg:pb-16`, was `lg:pt-44 lg:pb-20`), tall artwork capped at 600px, code-drawn art square instead of 4:5. Grid rows are pinned (`row-start-1`) because the visual is first in the DOM | `PageHero.tsx`, `visual/BrandVisual.tsx` (`imgClassName` prop) |
| 78 | Home *Workforce lifecycle*: alternating cards now overlap vertically on desktop (`lg:-mt-14`), removing the empty half beside each card; same-side cards keep clearance even when expanded | `home/WorkforceLifecycle.tsx` |

Checked: `tsc` + `eslint` clean; 11 inner pages at 1440×900 and 375×812, home at 1440 — no horizontal scroll.

### 2026-11-05 — Inner-page hero compositions
| # | Change | Files |
|---|---|---|
| 74 | **Designed hero visuals on 7 inner pages**, cut from the supplied mockups (frame, green shapes, outlines, icon badges and cards are part of the artwork): About (lead + team), Staffing (handshake, icon ring, *Right Talent. Right Fit.*), Industries (5 sector workers + industry icons), Workforce Management (5 module cards), Employers (handshake, HR office), Candidates (*Applied Successfully!*, profile card), Payroll (payroll summary, checklist, payslip). Each crop's background is colour-remapped to exactly `#FAF9F7` and its outer 5% feathered into it, so it sits on the page with no visible rectangle | `public/visuals/page-{about,staffing,industries,workforce,employers,candidates,payroll}-hero.webp` (new), `src/lib/visuals.ts` |
| 75 | New `composed` option on photo slots: `BrandVisual` shows composed artwork as-is (fade + rise entrance, no code-drawn frame); `PageHero` gives it a wider column (5/12, bleeding into the right margin) on desktop and runs it **edge to edge on phones** so the cards stay legible. Slots without a composed image (Jobs, Contact, the 4 service pages) keep the code-drawn frame + icon art | `visual/BrandVisual.tsx`, `PageHero.tsx`, `src/lib/visuals.ts` |

Checked: `tsc` + `eslint` clean; all 7 pages at 1440×900 and 375×812 — no horizontal scroll.

### 2026-10-27 — Vector logo
| # | Change | Files |
|---|---|---|
| 71 | **Logo vectorized** (the banner text "Job Nexus HR" was pixelated). Ribbon and "JN" traced from `logo.png` at 4× sub-pixel accuracy (OpenCV); the raster banner text replaced by **real glyph outlines in Geist SemiBold** (wght 680, OFL licence; IBM Plex could not be downloaded — no network in the build sandbox), same angle (−14.6°) and centre, ~6% larger for small-size legibility. `Logo` now renders an **inline SVG** (no image request, sharp at every size and on retina); `color="light"` swaps JN to off-white. Static copies `public/logo.svg` / `logo-light.svg` (6 KB each) and the PNGs re-rendered from the vector (53 KB, was 340/280 KB; still used for the Open Graph image) | `src/components/Logo.tsx`, `src/lib/jn-logo-vector.ts` (new, generated), `public/logo.svg`, `public/logo-light.svg`, `public/logo.png`, `public/logo-light.png` |
| 72 | `.claude/launch.json` added (`dev` → `pnpm dev`, port 3000) for the preview pane | `.claude/launch.json` |
| 73 | **Loading animation fixed** (its pixel-stepped "Job Nexus HR" text was the one the user saw): `jn-logo-paths.ts` regenerated from the clean vector (same 480×479 space: ×0.4918, offset −5.75/−6.3, so every wipe/clip coordinate still lines up) — ribbon, JN and Geist SemiBold wordmark; `counters` now empty (glyph outlines carry their own holes). Animation colours set to the exact brand values (`#15160E`, `#0E956A`, were `#14140E`/`#0F9B6C`). J/N clip regions overlap by 0.8 units, removing a faint hairline seam where the J and N halves met | `src/lib/jn-logo-paths.ts`, `src/components/LogoAnimation.tsx` |

### 2026-09-30 — Homepage photos
| # | Change | Files |
|---|---|---|
| 62 | Supplied photos wired into the 4 homepage slots: `audience-employers` (3 people over a laptop + report), `audience-candidates` (welcoming team of 4), `idea` (portrait, account lead + client with tablet), `cta` (operations lead, warehouse team behind) | `public/visuals/*.webp` (new), `src/lib/visuals.ts` |
| 63 | Photo slots gain optional `focus` (object-position, also the zoom origin) and `zoom` — the supplied photos keep empty space on the left for text, so the frames crop in on the people | `src/lib/visuals.ts`, `visual/BrandVisual.tsx` |

| 64 | `idea` photo replaced with the supplied "Fill the requirement" poster, **cropped to 960×1200 (right/bottom 60 %) so the baked-in headline text is removed** (it would compete with the section headline and isn't readable by search/screen readers); zoom removed. New file name `idea-consultation.webp` because the dev image optimiser kept serving the cached old `idea.webp`. **Rule: when replacing a photo, use a new file name.** | `public/visuals/idea-consultation.webp` (old `idea.webp` removed), `src/lib/visuals.ts` |
| 65 | **Idea section redesigned** (per request: show the complete poster incl. its text). Left: headline, one lead line and a 3-step "chain" whose steps 01–02 are the poster's own words (*Fill the requirement.* → *Build the workforce.*) and 03 *Grow together.*, with icon badges and a green line that draws in. Right (6/12): the **whole poster uncropped** (`idea-poster.webp`, 1280×1600) in a new `frame="full"` BrandVisual (rounded, soft shadow, green shape + outline strokes around it, nothing clipped), caption *"Continuity isn't a slogan here — it's how the work is run"*. Replaces #64's text-free crop (`idea-consultation.webp` deleted) | `home/TheIdea.tsx`, `visual/BrandVisual.tsx`, `src/lib/visuals.ts`, `public/visuals/idea-poster.webp` |
| 66 | **"Start here" (`Audience`) rebuilt to the supplied mockup**: intro header kept; below it two **full-bleed halves** (no card borders) — left light gradient, right forest-green gradient; `01`/`02` pill + mono label; bolder headlines (weight 600); left: 4-step journey (*Share Requirements → One Named Owner → Shortlist & Interview → Shift Roster Ready*, icons in mint circles, green arrows); right: 4 promises (*Real People / Not Bots, Genuine Roles / Not Fake Listings, Dedicated Recruiter / Who Calls You Back, Ongoing Support / From Start to Finish*, icons in solid green circles, divided columns); large rounded photos (left with a mint shape, right with chamfered corners + green ribbon), floating white notes that drift (*Faster Hiring / Higher Productivity*, *Your Next / Opportunity Awaits*). Each photo is a link (`/employers`, `/jobs`) — the separate CTA buttons were removed to match the mockup | `home/Audience.tsx` |
| 67 | Photos re-assigned: hiring ← team-of-4 photo (`audience-hiring-team.webp`), candidates ← woman-with-tablet photo (`audience-candidate-lead.webp`, stand-in — the mockup's smiling-woman-at-laptop photo was not supplied), CTA ← planning photo (`cta-planning.webp`). Old files deleted; new names avoid the image cache | `public/visuals/*`, `src/lib/visuals.ts` |
| 68 | **"Start here" photos cut straight from the mockup** (photo + frame + mint shape / green ribbon + note card, exactly as drawn): desktop `audience-hiring-cutout.webp` 942×426, `audience-candidate-cutout.webp` 902×431; phones get tight crops without the card (`*-cutout-m.webp`) plus a live `FloatNote` (card text would be ~6px). Served with `<picture>` + `getImageProps`. Halves now use the mockup's flat colours (`#FDFCFA` / `#072522`) so the cut-outs sit seamlessly; labels switched to sans uppercase, headlines weight 700, body 21px to match. Removed the `audience-employers` / `audience-candidates` photo slots from `visuals.ts` and their files | `home/Audience.tsx`, `src/lib/visuals.ts`, `public/visuals/audience-*-cutout*.webp` |
| 69 | **"Start here" phone layout built to the supplied mobile reference** (<640px): 4 journey steps in one row with arrows; portrait team photo (`audience-hiring-portrait-m.webp`, 976×964, cropped from the original team photo) with a green corner triangle and the *Faster Hiring* card overlapping the bottom centre; 2×2 candidate promises with cross dividers; candidate photo with chamfered bottom-right, green ribbon and the *Your Next Opportunity Awaits* card overlapping bottom-left (live `NoteCard`s, readable). From 640px up the desktop cut-outs are unchanged | `home/Audience.tsx`, `public/visuals/audience-hiring-portrait-m.webp` (new; `audience-hiring-cutout-m.webp` removed) |
| 70 | **Buttons restored in both halves (all screen sizes)** as the reference's closing block: employers — icon + rule, *Build great teams, faster.*, *Put the right people in the right roles — without the back and forth.*, solid forest rounded button **Tell us what you need →** `/contact`; candidates — green rule, *Real opportunities. Real support.*, *Whether you're starting out or ready for what's next…*, outlined green rounded button **Tell us what you need →** `/candidates`. Buttons are full-width on phones, auto width from 640px. Note: these rounded sans buttons are specific to this section (reference design); the rest of the site keeps the square mono buttons in §3 | `home/Audience.tsx` |

Checked: `tsc` + `eslint` clean; home at 1440×900 and 375×812, no horizontal scroll.

### 2026-09-29 — New tagline, custom icons, brand visuals, copy rewrite
| # | Change | Files |
|---|---|---|
| 53 | Tagline changed to **"Better Talent. Brighter Futures."** everywhere the old one appeared: metadata/OG, hero label, TheIdea headline, marquee, footer headline, mobile menu, About CTA strip + description, Staffing CTA | `layout.tsx`, `home/Hero.tsx`, `home/TheIdea.tsx`, `home/Marquee.tsx`, `Footer.tsx`, `Navbar.tsx`, `about/page.tsx`, `staffing/page.tsx` |
| 54 | **Custom JN icon set** (35 line icons with one green accent) + `IconBadge` chamfer tile, CSS states for hover/active/dark | `src/components/icons/JNIcon.tsx` (new), `globals.css` |
| 55 | **`BrandVisual`** — hero-style framed visual (chamfer mask, green shape, drawn outline) with designed fallback art; photo-slot manifest | `src/components/visual/BrandVisual.tsx` (new), `src/lib/visuals.ts` (new) |
| 56 | New home section **`Audience`** ("Start here": employer / candidate doors with visuals, icon benefits, CTAs); home sections renumbered to page order (/02–/11) | `home/Audience.tsx` (new), `app/page.tsx`, all `home/*` index labels |
| 57 | Icons added to: hero system flow, TheIdea cards, Comparison (check/cross + principle card), Industries (list, orbit centre tile, roles panel), Services rows, Lifecycle stages, Process steps, Proof columns | `home/*.tsx` |
| 58 | Framed visuals added to TheIdea, CTA, Team cards (photo slot / BrandArt instead of numerals) and every main inner-page hero (`PageHero` `visual` prop: about, staffing, 4 service pages, industries, workforce, payroll, employers, candidates, jobs, contact) | `PageHero.tsx`, `home/TheIdea.tsx`, `home/CTA.tsx`, `home/Team.tsx`, 10 `app/*/page.tsx` |
| 59 | Copy rewrite (conversion/psychology): hero sub-copy + candidate link, TheIdea story, Comparison pain/relief lines, Industries, Services, Lifecycle, Process steps, Team, Proof, CTA reassurance + "A real person replies" line, Footer paragraph, metadata description | `home/*.tsx`, `Footer.tsx`, `layout.tsx` |
| 60 | Fix during build-out: inner-hero visual collapsed to 0 width on desktop (`sm:mx-auto` on a grid item) → `lg:mx-0` | `PageHero.tsx` |
| 61 | **`ASSET-BRIEF.md`** — every photo slot, ratio/size, priority, shared style guide and a detailed prompt per image (plus hero replacement) | `ASSET-BRIEF.md` (new) |

Checked: `tsc` + `eslint` clean, `next build` OK (run with `--webpack` in a copy of the project so the running dev server's `.next` was not touched); home at 1440×900 and 375×812, `/about`,
`/staffing/volume-staffing`, `/employers` — no horizontal scroll.

### 2026-09-21 (final) — Homepage desktop fixes
| # | Severity | Issue → fix | Files |
|---|---|---|---|
| 45 | **High** | Marquees, industries strip and orbit did not move on desktop: a blanket `prefers-reduced-motion` rule disabled every CSS animation/transition on PCs with Windows "reduce motion" on (phones don't have it on, hence "works on mobile"). Rule removed; only smooth-scroll is switched off for that setting | `globals.css` |
| 46 | **High** | Home *Services* list: the six rows had no full-width span at `lg`, so they sat side by side and overlapped; the "+" cell also spilled into an implicit 13th column → rows now `lg:col-span-12`, "+" fits column 12 | `home/Services.tsx` |
| 47 | Medium | *Workforce lifecycle*: the centre vertical line ran through the section heading and intro text → line now lives only inside the stages block | `home/WorkforceLifecycle.tsx` |
| 48 | Medium | *Process*: connecting line struck through the step titles and numbers → moved to the dot row; numbers masked | `home/Process.tsx` |
| 49 | Medium | *Comparison* heading's first line ("Staffing is easy to sell.") was invisible (dark text on dark) on every screen size → `SectionHeader` gets a `dark` prop | `SectionHeader.tsx`, `home/Comparison.tsx` |
| 50 | Low | Process (home) and journey (Employers) step titles collided at 1024px → smaller type between `lg` and `xl` | `home/Process.tsx`, `employers/page.tsx` |
| 52 | **High** | Strip/marquee still frozen on the user's laptop after #45: their running `pnpm dev` server was serving stale CSS (still contained the old reduced-motion rule) because a `next build` had run against the shared `.next` folder. Dev server restarted with a clean `.next`; verified `animation-name` is `slide-strip`/`marquee` and transforms change over time at 1366×768 with reduce-motion on. See CLAUDE.md "Dev-server gotcha" | (process, no code) |
| 51 | Low | Industries strip had doubled rules (header rule + border + signature line) → single bordered band | `home/Hero.tsx` |

### 2026-09-21 (later still) — Homepage hero redesign
| # | Change | Files |
|---|---|---|
| 40 | Hero rebuilt to match the supplied desktop + mobile mockups: full-bleed masked team photo, `001 / 026` label, new headline layout, new sub-copy, circle-arrow "Let's work together" CTA, vertical People/Process/Progress tag, phone corner triangle | `home/Hero.tsx` |
| 41 | Hero photo cut out of the mockups (background keyed to transparent) into `hero-desktop.webp` / `hero-mobile.webp`, served via `<picture>` + `getImageProps` | `public/*` |
| 42 | Header: wordmark "Job Nexus HR" next to the logo, forest-green CTA (`--forest #042E27`), header rule on lg+ | `Navbar.tsx`, `globals.css` |
| 43 | Removed from the hero (per mockup): the "JN / 2026 — Operations Brief" meta bar, old sub-headline and the "Explore Our Services" button. Kept and moved directly below the hero: the industries strip and the Operations System grid | `home/Hero.tsx` |
| 44 | Headline lines no longer clip descenders (q, p) | `home/Hero.tsx` |

### 2026-09-21 (later) — Logo loading animation
| # | Change | Files |
|---|---|---|
| 35 | Added the supplied "Nexus Connection" logo animation as the site loader: plays on first load (1.8 s) and on every internal link click (1.1 s), full animation always completed, exit wipe 0.4 s | `src/components/SiteLoader.tsx`, `LogoAnimation.tsx`, `src/lib/jn-logo-paths.ts` |
| 36 | Time sync: loader ends when animation is done AND page is ready (load event / new route rendered), max +2.5 s wait; never longer than necessary | `SiteLoader.tsx` |
| 37 | Shared loader flag so hero/title entrances start as the loader lifts (they previously animated invisibly behind the loading screen); hero delays shortened to be relative to that moment | `src/lib/loader-state.ts`, `home/Hero.tsx`, `PageHero.tsx` |
| 38 | Removed old `LoadingScreen` and `PageTransition` (replaced by `SiteLoader`); layout now renders `<SiteLoader />` | `layout.tsx` (files deleted) |
| 39 | `.jn-loader-fade` keyframes for the click-started loader | `globals.css` |

### 2026-09-21 — Logo/favicon swap, full audit, mobile pass

**Branding**
| # | Change | Files |
|---|---|---|
| 1 | Replaced hand-drawn SVG logo with the official transparent PNG; trimmed empty padding; added light variant for dark backgrounds | `public/logo.png`, `public/logo-light.png`, `src/components/Logo.tsx` |
| 2 | `Logo` API simplified: removed `variant` prop (`mark`/`horizontal`/`full` were all replaced by one image); callers updated | `Logo.tsx`, `Navbar.tsx`, `Footer.tsx`, `LoadingScreen.tsx` |
| 3 | Navbar logo enlarged (`h-9`→`h-14`, scrolled `h-7`→`h-12`; header `h-14`→`h-16` when scrolled) so the ribbon is legible; footer logo `h-10 w-32`→`h-24`; loading-screen logo now height-driven | `Navbar.tsx`, `Footer.tsx`, `LoadingScreen.tsx` |
| 4 | Added favicon set (was missing entirely): `icon.png`, `apple-icon.png`, `favicon.ico` | `src/app/*` |
| 5 | OG image now `/logo.png`; added `viewport` + `themeColor`; `metadataBase` reads `NEXT_PUBLIC_SITE_URL` | `layout.tsx`, `src/lib/site.ts` |

**Bugs fixed**
| # | Severity | Issue → fix | Files |
|---|---|---|---|
| 6 | **High** | `next build` crashed ("DATABASE_URL is required") because the DB module threw at import → pool now created lazily | `src/db/index.ts` |
| 7 | **High** | `/jobs` search form did nothing (params ignored) → real filtering + sticky values + "no matches" state; inactive jobs hidden | `jobs/page.tsx` |
| 8 | **High** | Candidates page "Search Jobs" was a `<Link>` inside the form, so filters were dropped → real submit button | `candidates/page.tsx` |
| 9 | **High** | Home "Explore Service" links pointed to non-existent `/services/01…06` (404) → real service URLs | `home/Services.tsx` |
| 10 | **High (mobile)** | Home service/idea/lifecycle panels were hover-only, so unreachable on phones → tap support | `home/Services.tsx`, `TheIdea.tsx`, `WorkforceLifecycle.tsx` |
| 11 | Medium | Server actions trusted raw `FormData` (`String(null)` → `"null"`, no limits) → trim, cap, validate | `contact/page.tsx`, `jobs/[id]/page.tsx` |
| 12 | Medium | Job application form swallowed errors silently → shows error message | `JobApplicationForm.tsx` |
| 13 | Medium | `/jobs/[id]` threw on non-numeric/huge ids or DB error, and showed inactive jobs → validated, 404s | `jobs/[id]/page.tsx` |
| 14 | Medium | Applications could be stored for non-existent/inactive jobs → checked in action | `jobs/[id]/page.tsx` |
| 15 | Medium | Form labels weren't linked to inputs (a11y) → `htmlFor`/`id` | `ContactForm.tsx`, `JobApplicationForm.tsx`, `candidates/page.tsx` |
| 16 | Low | Full-page reloads on internal links (`<a>`) → `next/link` | `home/Industries.tsx`, `home/Team.tsx`, `home/Services.tsx` |
| 17 | Low | Hero said "Drag · Scroll · Explore" but strip isn't draggable → "Scroll · Explore" | `home/Hero.tsx` |
| 18 | Low | Hero headline block lacked the 1480px max-width used by every other row | `home/Hero.tsx` |
| 19 | Low | `applyAction` was exported from a page file → now module-private | `jobs/[id]/page.tsx` |

**Lint / code health** (before: 5 errors, 2 warnings → now 0/0)
| # | Change | Files |
|---|---|---|
| 20 | Removed `setState`-in-effect patterns (cursor mount flag, menu close on route, page transition) | `CustomCursor.tsx`, `Navbar.tsx`, `PageTransition.tsx` |
| 21 | Escaped apostrophes (`react/no-unescaped-entities`) | `candidates`, `terms`, `TheIdea`, `Proof`, `jobs` |
| 22 | Font `<link>` rule justified with an eslint-disable comment (it's site-wide, not per-page) | `layout.tsx` |
| 23 | Removed unused `Link` import; typed `JobApplicationForm` action as `Promise<unknown>` (no `any`) | `candidates/page.tsx`, `JobApplicationForm.tsx` |

**Mobile optimisation** (checked at 375px: no horizontal scroll on any of 16 routes)
| # | Change | Files |
|---|---|---|
| 24 | Desktop nav moved from `lg` (1024) to `xl` (1280): it overflowed between 1024–1279px. Burger covers the range | `Navbar.tsx` |
| 25 | Mobile menu scrolls on short screens (`overflow-y-auto`, `my-auto`), text `3xl` on phones, Esc to close, `aria-expanded`, Jobs link added | `Navbar.tsx` |
| 26 | Form fields 16px on <768px (no iOS focus-zoom); `html overflow-x: clip`; `-webkit-text-size-adjust` | `globals.css` |
| 27 | Payroll scope rows stack on phones (name column was 59px wide) | `payroll/page.tsx` |
| 28 | Hero 5-step system grid: smaller step labels on phones so "REQUIREMENT" fits | `home/Hero.tsx` |
| 29 | `/staffing` card header wraps instead of overflowing | `staffing/page.tsx` |
| 30 | Bigger tap targets (footer links, "Explore Service" links, burger 44px) | `Footer.tsx`, `staffing/page.tsx`, `home/Services.tsx`, `Navbar.tsx` |
| 31 | Custom cursor hidden on any touch/`pointer:coarse` device (iPad landscape showed a stray dot); appears only after first mouse move | `CustomCursor.tsx`, `globals.css` |
| 32 | Team cards: tap to reveal overlay | `home/Team.tsx` |

**Added**
| # | What | Files |
|---|---|---|
| 33 | `robots.txt` + `sitemap.xml` (17 URLs) | `src/app/robots.ts`, `sitemap.ts` |
| 34 | `.env.example`, `spec.md`, `PRICING.md`, `CLAUDE.md` | root |

---

## 8. Known issues / open items (NOT fixed — need a decision or content)

| # | Item | Why it's open |
|---|---|---|
| A | ~~Placeholder contact email~~ | **Resolved 2026-11-07 (#100)** — `info@jobnexushr.com`, set in `lib/site.ts` |
| B | **Form emails are built (EmailJS, #122) but need your keys** — until the three `NEXT_PUBLIC_EMAILJS_*` values are set, submissions are not emailed | Follow `EMAILJS-SETUP.md` (≈10 min), then send a test from /contact |
| C | **No admin UI** to add/close jobs or read submissions; jobs come from `scripts/seed.ts` or SQL | Product decision |
| D | ~~Cookies page mentions analytics cookies but no analytics is installed~~ | **Resolved 2026-11-13 (#135)** — GA4 installed and named on the Cookies page |
| E | **Client names "Pronto" and "Elastic Run"** shown as direct clients (`home/Proof.tsx`, replaced Swiggy/Blinkit 2026-11-11). Official logos in place (Elastic Run SVG, Pronto tile) | Confirm you may display their names and logos |
| F | Legal pages are generic summaries (Privacy states "not legal advice") | Needs review by counsel |
| G | Headquarters shows "Bangalore, India" (#108); no street address yet | Needs the address |
| H | Basic spam protection only (hidden honeypot field, #122) — no rate limit or captcha | Add a captcha/rate limit if spam gets through |
| I | ~~Hero/payroll mock data shows "PR-2025-09" as static strings~~ | **Resolved 2026-11-06 (#93)** — the payroll mock now shows the monthly steps, no dates |
| J | The intro loader plays on **every hard load** (1.8 s + exit), including the Jobs/Candidates search forms, which are plain GET form submits (full reload). It also starts only once JS has loaded, so on a slow connection there is a blank moment before it begins | Option: play the intro once per session, or make the search forms client-side |
| K | `Footer` year is fixed at build time | Rebuild each January, or make dynamic |
| L | `drizzle.config.json` has a hard-coded local DB URL | Switch to env before using with a real DB |
| M | `RevealText.tsx` and `Button.tsx` are unused | Harmless; delete if you want a leaner repo |
| N2 | The loader's real-time behaviour was verified with headless Chrome (desktop 1280×720 and phone 390×844); not tested on real iOS/Android devices | Test on a phone; tune `INTRO_MS`/`NAV_MS` if it feels long or short |
| N | Not tested with a live database in this audit (none available) — validation/filters were verified by build, types and the empty/error paths only | Run `drizzle-kit push` + seed and test forms end-to-end |
| R | **Reduced motion is deliberately NOT honoured for the site's animations** (see #45). People who enable the OS "reduce motion" setting still get marquees/strips and hover transitions (the logo loader also plays). To respect the setting, re-add a `@media (prefers-reduced-motion: reduce)` block in `globals.css` that stops `.marquee-track`, `.workforce-strip`, `.orbit-*` and sets short transition durations | Was resolved in #79, **reverted 2026-11-07 (#101)** at the owner's request — honouring the flag froze desktop animations on Windows |
| P | **Hero photo is cut from the design mockups** (likely AI-generated, ~890 px wide, ragged near-white edges). Fine as a stand-in; for launch replace with a licensed/original photo. Provide a large transparent PNG/WebP of the same composition, or the raw photo and I'll rebuild the mask + green shapes in CSS/SVG | Needs your photo or a licence decision |
| Q | Hero copy changed to the mockup text ("001 / 026", new sub-copy). The homepage no longer has an "Explore Our Services" button in the hero (Services section is directly below) | Say if you want it back |
| S | **New copy makes service promises** — incl. the mockup's *Faster Hiring / Higher Productivity*, *Not Bots*, *Not Fake Listings*, and e.g. "background checks arranged before day one", "payroll, PF / ESI and compliance handled for you", "a real person replies — not a ticket", "one recruiter who stays your contact". They describe services already listed on the site, but the owner should confirm each is true in practice | Owner review |
| T | **6 photo slots still show designed fallback art**: 5 team cards (Team section is currently off the home page) and Contact (uses its own sketch instead) — none are visible on the site today. Images cut from mockups are sharp on standard screens, slightly soft on retina | Nothing visible needs an image now |
| U | **"Start here" images are cut from the mockup** (~900 px wide, likely AI-generated, note cards baked in so their text isn't live). Fine on screens up to ~1440 px at 1×; slightly soft on retina/very wide screens. For launch, supply the two original photos at ≥1800 px and the frames/cards can be rebuilt in code (the previous live-card version is in change #66) | Needs originals if you want sharper images |
| O | ~~Logo PNGs are ~340 KB / ~280 KB~~ — resolved 2026-10-27: logo is now an inline SVG; PNGs 53 KB | Done |
| V | **Audit items that need the owner's facts** (from the 12 Nov 2026 UI/UX audit): 2–3 named testimonials, one case study with real numbers, compliance strip (CLRA licence, GST, PF/ESI registration, ISO if any), real founding year, employer turnaround promises (shortlist / first deployment — only if true), real photos of sites/teams/recruiters, Hindi/regional candidate pages, analytics funnel. Also confirm: the WhatsApp number (assumed +91 96061 97196) and the "We never charge candidates any fee" policy | Send the facts/photos; each slot is a small addition |
| W | **Legal facts the owner must add** (see `LEGAL-CHECK.md`): CLRA / Shops & Establishments licence numbers; confirm 24-month retention, 72 h acknowledgement / 30-day resolution, founding year in JSON-LD; lawyer review of policy text | Fill `LEGAL` in `src/lib/site.ts` |
