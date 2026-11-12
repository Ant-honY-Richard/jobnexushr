import type { IconName } from "@/components/icons/JNIcon";

/** Single source for the six services: used by /staffing, the service finder, related-service links. */
export type Service = {
  code: string;
  slug: string;
  href: string;
  name: string;
  icon: IconName;
  head: string;
  body: string;
  /** Plain-language situation used by the service finder ("If you need …"). */
  need: string;
  /** Few-word subtitle for menus. */
  short: string;
  detail: string[];
};

export const SERVICES: Service[] = [
  {
    code: "01",
    slug: "permanent-recruitment",
    short: "Specialist and mid-level hiring",
    href: "/staffing/permanent-recruitment",
    name: "Permanent Recruitment",
    icon: "recruit",
    head: "Hiring that doesn't start over every time.",
    body: "Specialist and mid-level hiring, managed from brief to onboarding by one account manager.",
    need: "A few specialist or mid-level hires, done properly",
    detail: [
      "One account manager",
      "Brief and role calibration",
      "Search through our network and the open market",
      "Screening and a shortlist with reasons",
      "Offer and onboarding support",
    ],
  },
  {
    code: "02",
    slug: "volume-staffing",
    short: "Many people, quickly",
    href: "/staffing/volume-staffing",
    name: "Volume Staffing",
    icon: "volume",
    head: "Scale up without losing control.",
    body: "High-volume hiring that moves fast without losing track of who is where.",
    need: "Many people, quickly — across shifts, sites or waves",
    detail: [
      "Clear intake for volume roles",
      "Sourcing and screening at scale",
      "Start dates coordinated in batches",
      "Daily attendance and reporting",
      "The same account manager throughout",
    ],
  },
  {
    code: "03",
    slug: "payroll",
    short: "Your people, our payroll",
    href: "/payroll",
    name: "Managed Payroll",
    icon: "payroll",
    head: "Your people. Our payroll.",
    body: "Your workforce on our payroll — salaries, statutory contributions, attendance and exits handled every month.",
    need: "Workers employed on a partner's payroll, not yours",
    detail: [
      "Worker payroll administration",
      "PF, ESI, professional tax",
      "Attendance and shift input handling",
      "Exit and full-and-final settlements",
      "Monthly reconciliation and reporting",
    ],
  },
  {
    code: "04",
    slug: "compliance",
    short: "PF, ESI and labour paperwork",
    href: "/staffing/compliance",
    name: "Statutory Compliance",
    icon: "compliance",
    head: "Compliance that runs in the background.",
    body: "PF, ESI, professional tax and labour paperwork handled as part of your engagement.",
    need: "PF, ESI and labour documentation kept audit-ready",
    detail: [
      "PF and ESI filings",
      "Labour law documentation",
      "Contract and policy support",
      "Audit-ready records",
      "Liaison with statutory authorities",
    ],
  },
  {
    code: "05",
    slug: "bgv",
    short: "Know who you're hiring",
    href: "/staffing/bgv",
    name: "Background Verification",
    icon: "verify",
    head: "Know who you're hiring.",
    body: "Education, employment, address and reference checks, run through a clear process and reported back to you.",
    need: "People checked before they join",
    detail: [
      "Education verification",
      "Employment verification",
      "Address verification",
      "Reference checks",
      "Status tracking and reporting",
    ],
  },
  {
    code: "06",
    slug: "workforce-management",
    short: "Support after day one",
    href: "/workforce-management",
    name: "Workforce Management",
    icon: "workforce",
    head: "The real work starts after day one.",
    body: "Day-to-day support after people start — attendance, replacements, grievances and regular reviews.",
    need: "Attendance, replacements and escalations handled day to day",
    detail: [
      "Daily attendance coordination",
      "Shift and replacement handling",
      "Attrition tracking and replacement",
      "Grievance escalation handling",
      "Recurring review and reporting",
    ],
  },
];

export const serviceBySlug = (slug: string) => SERVICES.find((s) => s.slug === slug);
