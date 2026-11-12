# Job Nexus HR — Image Asset Brief

> **What this is:** every photo slot on the site, where it appears, and a ready-to-use prompt for
> each one (for an AI image tool such as Midjourney / Firefly / DALL·E, or as a shot list for a
> photographer). Written 2026-09-29.
>
> **You don't have to supply these for the site to look finished.** Every slot already shows
> designed brand art (custom JN icon in the green chamfer frame). A photo simply replaces that art.
>
> **Icons are done** — the custom JN icon set is drawn in code (`src/components/icons/JNIcon.tsx`),
> so no icon files are needed from you.

---

## 1. How to deliver a photo

1. Export as **WebP** (or high-quality JPG), sRGB, **no text, no logos, no watermarks**.
2. Name it exactly as the **File** column below and put it in `public/visuals/`.
3. In `src/lib/visuals.ts`, change that entry's `src: null` to `src: "/visuals/<file>"`
   (or just send the files to Claude and ask to wire them in).

**Important — supply plain rectangular photos.** The rounded-chamfer mask, the green shape behind
and the thin green outline lines are all drawn by the code (like the homepage hero). Do **not** bake
shapes, cut-outs or green blocks into the image.

*Update 2026-09-30:* the delivered homepage photos have empty space on the left and a thin green
wave line baked in. That works — the code crops in with a per-photo focus/zoom — so the same style
is fine for the remaining images. Just keep the people clear of the frame edges.

Keep the main subject **centred with breathing room on every side** — the mask trims about 15 % off
two opposite corners, and the same file is cropped to different ratios on phone and desktop.

---

## 2. Shared style guide (paste in front of every prompt)

Use this block so all images feel like one shoot and match the existing hero photo:

> **STYLE:** editorial corporate photography, India, natural daylight, bright modern workplace,
> soft shallow depth of field (f/2.8), warm-neutral colour grade, clean off-white and pale grey
> surroundings, wardrobe in black, charcoal, white and muted neutrals with at most one small
> emerald-green (#0E956A) accent (a lanyard, plant, folder or notebook), genuine relaxed
> expressions, people looking slightly off-camera, confident and warm rather than posed,
> authentic Indian professionals of varied ages and genders, photorealistic, 35 mm lens look,
> high detail, no text.
>
> **AVOID (negative prompt):** stock-photo grins, thumbs-up, pointing at camera, handshake close-ups
> with no faces, blue corporate tint, heavy vignette, lens flare, HDR look, cluttered backgrounds,
> visible brand logos, text, watermarks, distorted hands, extra fingers, plastic skin,
> Western-only casting, cartoon or 3D render style.

Brand colours for reference: green `#0E956A`, ink `#15160E`, forest `#042E27`, off-white `#FAF9F7`.

---

## 3. Priority order

| Priority | Slots | Why |
|---|---|---|
| **1 — Do first** | `audience-employers`, `audience-candidates`, `idea`, `cta` | Homepage, seen by every visitor |
| **2** | `page-employers`, `page-candidates`, `page-staffing`, `page-about`, `page-contact`, `page-jobs` | Highest-traffic inner pages |
| **3** | `team-*` (5) | Real team photos build the most trust — use your **actual staff** if possible |
| **4** | remaining `page-*` (7) | Service and sector pages |
| **Replace** | Homepage hero (`hero-desktop.webp`, `hero-mobile.webp`) | Current photo is cut from the mockup (spec open item P) |

---

## 4. Homepage

| Slot / File | Where | Ratio & min size | Frame |
|---|---|---|---|
| `audience-employers.webp` | "Start here" section, left card (I'm hiring) | **16:10**, 1600×1000 | light, green shape top-left |
| `audience-candidates.webp` | "Start here" section, right card (I'm looking for work) — sits on a **dark** card | **16:10**, 1600×1000 | dark, green shape top-right |
| `idea.webp` | "Better talent. Brighter futures." section, right side | **4:5**, 1200×1500 | light, green shape top-right |
| `cta.webp` | Closing dark "Tell us what you need" section, right side | **4:5**, 1200×1500 | dark, green shape top-right |

### `audience-employers` — "Stop re-briefing. Start deploying."
*Psychology: relief — the employer sees someone else carrying the load.*
> [STYLE] A calm Indian operations manager in her 40s, charcoal blazer, standing in a bright
> warehouse office mezzanine, reviewing a tablet with a younger male account lead in a black shirt
> who is pointing to the screen; behind them through the glass, a softly blurred organised
> warehouse floor with workers in neutral uniforms. She looks reassured, slight smile. Horizontal
> 16:10, subjects in the centre third, generous space around. [AVOID]

### `audience-candidates` — "Be known by name. Not by a number."
*Psychology: belonging and hope — "this could be me on my first day".*
> [STYLE] A young Indian woman in her mid-20s on her first day at work, white shirt, an emerald-green
> lanyard with a blank ID card, laughing softly while a friendly female recruiter in a black blazer
> welcomes her at the office entrance; soft morning light, blurred modern reception behind.
> Slightly darker, moody background so it sits well on a near-black card. Horizontal 16:10,
> subjects centred. [AVOID]

### `idea` — continuity / "the same people stay on it"
*Psychology: trust through a long relationship.*
> [STYLE] Two Indian professionals who clearly know each other well — a male client in his 50s
> (grey hair, open-collar white shirt) and a female account lead in her 30s (black blazer) — sharing
> a relaxed laugh over coffee at a light wooden table in a bright office, notebook and tablet on the
> table, one small green plant. Warm, candid, mid-conversation. Vertical 4:5, both faces in the
> middle band of the frame. [AVOID]

### `cta` — "Tell us what you need"
*Psychology: momentum — the result after the conversation.*
> [STYLE] A confident Indian team lead in a dark polo greeting a newly deployed team member with a
> nod and a hand on the shoulder at the start of a shift, a small organised team softly blurred
> behind in a clean, well-lit logistics or retail back-office; dusk-toned light, deep shadows so the
> image works on a near-black section. Vertical 4:5, subjects centred. [AVOID]

---

### `audience-candidates` — optional high-res original
*Update:* both "Start here" images are now cut straight from your mockup (spec #68). Only supply this
if you want a sharper version (≥1800 px wide, plain photo — frames and cards will be rebuilt in code). The mockup shows:
> [STYLE] A young Indian woman in her mid-20s in a dark-green knit top, sitting at a desk with a
> laptop, chin resting on her hand, smiling warmly and looking off to the right with hope; soft
> blurred modern office with plants behind; subject in the centre-left of the frame, space at the
> top right (a white note card sits there). Horizontal 3:2, min 1536×1024. [AVOID]

Save as `public/visuals/audience-candidate-<new-name>.webp` (use a **new** file name).

## 5. Homepage — Team cards ("People behind the people")

Shown on a light card, **4:5**, min 900×1125, **no** chamfer mask (square card), a green panel
slides over on hover. **Best option: real photos of your actual staff** in these roles (same
background, same light, waist-up, looking slightly off-camera). If using AI images, keep one
consistent studio set-up for all five:

> [STYLE] Waist-up environmental portrait of an Indian professional, plain off-white wall with a
> soft green shadow, soft window light from the left, subject turned three-quarters, calm confident
> half-smile. Vertical 4:5, head in the upper third. [AVOID]

| File | Role | Add to the prompt |
|---|---|---|
| `team-account-lead.webp` | Account Lead — client ownership | woman, late 30s, black blazer, holding a leather notebook |
| `team-hiring.webp` | Hiring Coordinator — sourcing & matching | man, late 20s, charcoal shirt, holding a tablet |
| `team-operations.webp` | Operations Coordinator — deployment | man, 30s, dark polo, clipboard, lanyard |
| `team-payroll.webp` | Payroll & Compliance Lead | woman, 40s, white shirt, glasses, laptop under arm |
| `team-verification.webp` | Verification Coordinator | woman, late 20s, grey cardigan, holding a document folder |

---

## 6. Inner page heroes

All sit on the right of the page title on desktop (**4:5**) and under the title on phones
(**4:3**) — so compose for **both**: keep the subject in a centred square. Min **1200×1500**.
Light frame, green shape top-right.

| File | Page | Prompt (add after [STYLE]; end with [AVOID]) |
|---|---|---|
| `page-about.webp` | `/about` — "Nobody here is disposable." | The Job Nexus HR team of six Indian professionals of mixed ages standing together informally in their bright office, candid, one person mid-laugh; cohesive neutral wardrobe; feels like a close team, not a line-up |
| `page-staffing.webp` | `/staffing` | A female recruiter at a clean desk reviewing printed CVs laid in neat rows, one highlighted with an emerald-green marker, laptop open, focused expression, overhead three-quarter angle |
| `page-permanent-recruitment.webp` | `/staffing/permanent-recruitment` | A newly hired Indian professional (man, 30s, blazer) and a hiring manager shaking hands across a meeting table, both smiling, faces visible, glass meeting room |
| `page-volume-staffing.webp` | `/staffing/volume-staffing` | A large organised team of 20+ warehouse or retail workers in neutral uniforms at a shift briefing, a supervisor with a tablet in front, shot from a slightly raised angle, sense of order and scale |
| `page-compliance.webp` | `/staffing/compliance` | A compliance specialist (woman, 40s, glasses) reviewing neatly organised files and a laptop, a green folder on top, calm and meticulous, soft window light |
| `page-bgv.webp` | `/staffing/bgv` | Close-medium shot of a verification specialist comparing a blank ID card and a document on a desk with a magnifier and laptop; hands and face visible; no readable text on documents |
| `page-industries.webp` | `/industries` | One shot (not a collage) of a modern mixed-use business park walkway where an office professional, a warehouse supervisor in a hi-vis vest and a retail associate in a neutral uniform walk together and chat, suggesting many sectors working side by side |
| `page-workforce.webp` | `/workforce-management` | A shift supervisor (woman, 30s, dark polo) checking attendance on a tablet with three team members at a factory or warehouse entrance at dawn, soft golden light |
| `page-payroll.webp` | `/payroll` | A payroll specialist (man, 40s, white shirt) at a dual-screen desk with abstract charts (no readable numbers), relaxed and in control, coffee mug, green plant |
| `page-employers.webp` | `/employers` | A business owner (man, 50s) and a Job Nexus HR account lead (woman, 30s, black blazer) planning headcount at a whiteboard with blank sticky notes, one green; collaborative |
| `page-candidates.webp` | `/candidates` | A young job seeker (man, early 20s, clean white shirt) in a friendly one-to-one with a recruiter, leaning forward, hopeful and encouraged; bright informal meeting nook |
| `page-jobs.webp` | `/jobs` | A young woman on a bus or at a café window scrolling job listings on her phone (screen not readable), soft city background, optimistic expression |
| `page-contact.webp` | `/contact` | A Job Nexus HR account lead (woman, 30s, black blazer, headset or phone) taking a call at her desk, warm attentive expression, note pad with pen |

---

## 7. Homepage hero (replacement for the mockup-derived photo)

The current hero image is cut from the design mockup (spec open item P). This slot is different
from the others: the green shape and outline **are baked into the image**, so supply either:

- **(a) the raw photo** (preferred) — Claude can rebuild the mask and green shapes in code; or
- **(b) finished transparent WebPs** matching the current composition: desktop **1780×1424**
  (2× of 890×712), mobile **2048×1380**.

> [STYLE] A confident Indian woman in her early 30s in a black blazer, holding a silver tablet
> against her chest, looking up and to the right with a soft smile, standing in a bright glass
> office; behind her, softly blurred, three colleagues (two men, one woman) talking with tablets.
> Horizontal 5:4, subject slightly right of centre, head in the upper third, lots of clean
> background on the left for the green shape. [AVOID]

---

## 8. Checklist

- [x] Priority 1 (4 homepage images) — delivered and wired in 2026-09-30 (the `idea` slot now uses the "Fill the requirement" poster, shown whole with its text)
- [x] Priority 2 + 4 partly — composed heroes delivered 2026-11-05 for About, Staffing, Industries, Workforce, Employers, Candidates, Payroll. **Still open: Jobs, Contact, and the 4 service pages** (`/staffing/permanent-recruitment`, `volume-staffing`, `compliance`, `bgv`) — the same composed style works best (frame, green shape and cards in the image, plain light background around it)
- [ ] Priority 3 (5 team portraits — real staff preferred)
- [ ] Priority 4 (7 remaining inner pages)
- [ ] Hero replacement
- [ ] Licence confirmed for every image (AI tool terms or photographer release, plus model releases
      for real people)
