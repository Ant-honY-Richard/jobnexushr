// Single source for the public site URL. Set NEXT_PUBLIC_SITE_URL in production
// (e.g. https://www.yourdomain.com); the placeholder is used until then.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://jobnexus.example"
).replace(/\/$/, "");

/** Public contact details — change them here and every page follows. */
export const CONTACT = {
  email: "info@jobnexushr.com",
  phone: "+91 96061 97196",
  tel: "+919606197196",
  city: "Bangalore, India",
};
