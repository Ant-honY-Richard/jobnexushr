// Single source for the public site URL. NEXT_PUBLIC_SITE_URL overrides it (e.g. for a staging domain).
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.jobnexushr.com"
).replace(/\/$/, "");

/** Public contact details — change them here and every page follows. */
export const CONTACT = {
  email: "info@jobnexushr.com",
  phone: "+91 96061 97196",
  tel: "+919606197196",
  city: "Bangalore, India",
  /** WhatsApp number in international format, digits only (used for wa.me links). Assumed to be the
   *  same business number — change here if WhatsApp runs on a different number. */
  whatsapp: "919606197196",
};

/** Candidate safety line — shown near candidate CTAs and in the footer. */
export const NO_FEE = "We never charge candidates any fee.";

/** wa.me link with a prefilled message. */
export const whatsappLink = (text: string) =>
  `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`;

/** Official profiles — used in Organization structured data (sameAs) so search and AI tools link them. */
export const SOCIAL = {
  linkedin: "https://www.linkedin.com/company/jobnexushr/",
  instagram: "https://www.instagram.com/jobnexushr/",
};

/** Google Analytics 4 tag ID (property "Job Nexus HR Website", stream 16333979074). Env var overrides; set it to "" to turn analytics off. */
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "GTM-WWJ87LXS";

/** Google Search Console HTML-tag verification token. Env var overrides; empty = no tag. */
export const GSC_VERIFICATION = process.env.NEXT_PUBLIC_GSC_VERIFICATION ?? "";

/**
 * Legal / compliance facts. Only the owner can supply most of these — anything left "" is simply not
 * shown on the site (never a placeholder). See LEGAL-CHECK.md for what is still missing.
 */
export const LEGAL = {
  /** Registered legal name (e.g. "Job Nexus HR Private Limited"). Falls back to the brand name. */
  entityName: "Job Nexus HR Private Limited",
  /** Registered office address, one line. */
  registeredAddress:
    "#686, Ground Floor, 22nd Cross, L R Nagar, Viveknagar, Bengaluru South, Bengaluru – 560047, Karnataka",
  /** CIN (company) or LLPIN (LLP), if registered. */
  cin: "U78300KA2026PTC227835",
  /** GSTIN, if registered. */
  gstin: "",
  /** Contract Labour (R&A) Act licence / other licence lines to display, e.g. "CLRA licence no. …". */
  licences: [] as string[],
  /** Person who handles privacy questions and complaints (IT Rules 2011 r.5(9), DPDP Act s.8(10)). */
  grievanceOfficer: { name: "R Aglin Arul Maria", email: "info@jobnexushr.com", phone: "+91 96061 97196" },
  /** How many days we take to resolve a privacy grievance. */
  grievanceDays: 30,
  /** How long candidate details are kept after last contact (owner to confirm). */
  candidateRetentionMonths: 24,
  /** Shown as "Last updated" on the legal pages and stored with every form consent. */
  policyDate: "13 November 2026",
  policyVersion: "2026-11-13",
};

/** Brand or registered legal name, for legal text. */
export const LEGAL_NAME = LEGAL.entityName || "Job Nexus HR";
