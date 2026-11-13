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
