/**
 * Photo slots used by <BrandVisual>. Every slot already renders designed fallback art
 * (brand frame + custom icon), so the site looks finished without photos.
 *
 * To add a photo: save it as `public/visuals/<key>.webp` (sizes and prompts in ASSET-BRIEF.md)
 * and change that entry's `src` from `null` to `"/visuals/<key>.webp"`. The frame, green
 * shape and outline are drawn in code — supply a plain rectangular photo, nothing baked in.
 */
export type Visual = {
  src: string | null;
  alt: string;
  /** CSS object-position — the photo's focal point (also the zoom origin). Default "50% 50%". */
  focus?: string;
  /** Scale inside the frame, to crop empty background. Default 1. */
  zoom?: number;
  /** Pre-composed artwork (frame, green shapes and cards already in the image, background blended
   *  to the page colour). Shown as-is at its own aspect ratio — no frame drawn in code. */
  composed?: { width: number; height: number };
};

export const VISUALS = {
  // Home
  // ("Start here" photos are cut from the mockup and live in home/Audience.tsx, not here.)
  // Full poster incl. its own headline — shown uncropped (<BrandVisual frame="full">). 1280×1600.
  idea: {
    src: "/visuals/idea-poster.webp",
    alt: "Fill the requirement. Build the workforce. — A Job Nexus HR account lead reviews a plan on a tablet with a candidate while a client looks on",
  },
  cta: {
    src: "/visuals/cta-planning.webp",
    alt: "A Job Nexus HR account lead planning a hiring requirement with two client managers over a laptop",
    focus: "80% 50%",
  },
  // Home — team roles
  "team-account-lead": { src: null, alt: "Account lead" },
  "team-hiring": { src: null, alt: "Hiring coordinator" },
  "team-operations": { src: null, alt: "Operations coordinator" },
  "team-payroll": { src: null, alt: "Payroll and compliance lead" },
  "team-verification": { src: null, alt: "Verification coordinator" },
  // Inner page heroes
  // Composed heroes cut from the supplied page mockups (scratch compose.py; bg blended to #FAF9F7).
  "page-about": {
    src: "/visuals/page-about-hero.webp",
    alt: "A Job Nexus HR account lead holding a tablet, her team standing behind her",
    composed: { width: 642, height: 748 },
  },
  "page-staffing": {
    src: "/visuals/page-staffing-hero.webp",
    alt: "A recruiter reaching out to shake hands, ringed by hiring icons — right talent, right fit",
    composed: { width: 854, height: 765 },
  },
  "page-permanent-recruitment": {
    src: "/visuals/page-permanent-recruitment-hero.webp",
    alt: "A candidate shaking hands with a hiring manager after accepting an offer",
    composed: { width: 850, height: 782 },
  },
  "page-volume-staffing": {
    src: "/visuals/page-volume-staffing-hero.webp",
    alt: "A new team member shaking hands with a manager, a line of colleagues ready for their shift behind her",
    composed: { width: 855, height: 763 },
  },
  "page-compliance": {
    src: "/visuals/page-compliance-hero.webp",
    alt: "A compliance specialist reviewing statutory paperwork at her laptop",
    composed: { width: 908, height: 680 },
  },
  "page-bgv": {
    src: "/visuals/page-bgv-hero.webp",
    alt: "A verification specialist reviewing a candidate's documents, with verified checks beside her",
    composed: { width: 809, height: 734 },
  },
  "page-industries": {
    src: "/visuals/page-industries-hero.webp",
    alt: "Workers from manufacturing, IT, healthcare, logistics and food service, with industry icons",
    composed: { width: 814, height: 770 },
  },
  "page-workforce": {
    src: "/visuals/page-workforce-hero.webp",
    alt: "A manager with his team, surrounded by attendance, payroll, compliance and performance modules",
    composed: { width: 795, height: 756 },
  },
  "page-payroll": {
    src: "/visuals/page-payroll-hero.webp",
    alt: "A payroll specialist at her laptop with payroll summary, checklist and payslip cards",
    composed: { width: 1091, height: 877 },
  },
  "page-employers": {
    src: "/visuals/page-employers-hero.webp",
    alt: "A Job Nexus HR account lead shaking hands with a client across the desk",
    composed: { width: 919, height: 977 },
  },
  "page-candidates": {
    src: "/visuals/page-candidates-hero.webp",
    alt: "A candidate smiling at his laptop after applying successfully for a role",
    composed: { width: 1050, height: 875 },
  },
  "page-jobs": {
    src: "/visuals/page-jobs-hero-v2.webp",
    alt: "A recruiter and a colleague reviewing an application on a laptop, with a matched-candidate icon",
    composed: { width: 990, height: 548 },
  },
  "page-contact": { src: null, alt: "A Job Nexus HR account lead taking a call" },
} satisfies Record<string, Visual>;

export type VisualKey = keyof typeof VISUALS;
