import { CONTACT, SITE_URL, SOCIAL } from "@/lib/site";
import { SERVICES } from "@/lib/services";

const ORG_ID = `${SITE_URL}/#organization`;

/** Company-level structured data: who we are, what we do, where, and how to reach us. */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "EmploymentAgency"],
    "@id": ORG_ID,
    name: "Job Nexus HR",
    legalName: "Job Nexus HR Private Limited",
    alternateName: ["JobNexusHR", "Job Nexus HR Pvt Ltd"],
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    image: `${SITE_URL}/og.png`,
    slogan: "Better Talent. Brighter Futures.",
    description:
      "Job Nexus HR is a Bengaluru-based recruitment and staffing company offering permanent recruitment, volume staffing, managed payroll, PF/ESI statutory compliance, background verification and workforce management across India, with one account manager per client.",
    foundingDate: "2026",
    email: CONTACT.email,
    telephone: CONTACT.tel,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bengaluru",
      addressRegion: "Karnataka",
      addressCountry: "IN",
    },
    areaServed: [
      { "@type": "City", name: "Bengaluru" },
      { "@type": "State", name: "Karnataka" },
      { "@type": "Country", name: "India" },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: CONTACT.tel,
        email: CONTACT.email,
        areaServed: "IN",
        availableLanguage: ["English"],
      },
    ],
    sameAs: [SOCIAL.linkedin, SOCIAL.instagram],
    knowsAbout: [
      "Recruitment",
      "Staffing",
      "Volume hiring",
      "Contract staffing",
      "Payroll outsourcing",
      "PF and ESI compliance",
      "Background verification",
      "Workforce management",
      "Blue-collar hiring",
      "Warehouse and logistics staffing",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Recruitment and staffing services",
      itemListElement: SERVICES.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.name, description: s.body, url: `${SITE_URL}${s.href}` },
      })),
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "Job Nexus HR",
    inLanguage: "en-IN",
    publisher: { "@id": ORG_ID },
  };
}

export function serviceSchema(name: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    serviceType: name,
    description,
    url: `${SITE_URL}${path}`,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "India" },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path}`,
    })),
  };
}

const EMPLOYMENT_TYPE: Record<string, string> = {
  permanent: "FULL_TIME",
  "full-time": "FULL_TIME",
  "full time": "FULL_TIME",
  contract: "CONTRACTOR",
  temporary: "TEMPORARY",
  volume: "FULL_TIME",
  "part-time": "PART_TIME",
  internship: "INTERN",
};

/** Google for Jobs markup for one open role. */
export function jobPostingSchema(job: {
  id: number;
  title: string;
  company: string;
  location: string;
  industry: string;
  employmentType: string;
  description: string;
  responsibilities: string | null;
  requirements: string | null;
  createdAt: Date;
}) {
  const parts = [job.description, job.responsibilities, job.requirements].filter(Boolean).join("\n\n");
  const posted = new Date(job.createdAt);
  const validThrough = new Date(posted.getTime() + 60 * 24 * 60 * 60 * 1000);
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: parts.replace(/\n/g, "<br>"),
    datePosted: posted.toISOString().slice(0, 10),
    validThrough: validThrough.toISOString(),
    employmentType: EMPLOYMENT_TYPE[job.employmentType.toLowerCase()] ?? "FULL_TIME",
    industry: job.industry,
    identifier: { "@type": "PropertyValue", name: "Job Nexus HR", value: String(job.id) },
    url: `${SITE_URL}/jobs/${job.id}`,
    hiringOrganization: {
      "@type": "Organization",
      name: job.company,
      sameAs: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
    },
    jobLocation: {
      "@type": "Place",
      address: { "@type": "PostalAddress", addressLocality: job.location, addressCountry: "IN" },
    },
    directApply: true,
  };
}
