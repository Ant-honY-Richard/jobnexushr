import Link from "next/link";
import Image from "next/image";
import { Logo } from "./Logo";
import { CONTACT, LEGAL as LEGAL_INFO, LEGAL_NAME, NO_FEE } from "@/lib/site";
import { CookieSettingsButton } from "./CookieSettingsButton";

const QUICK = [
  { label: "Home", href: "/" },
  { label: "About us", href: "/about" },
  { label: "Services", href: "/staffing" },
  { label: "Industries", href: "/industries" },
  { label: "Employers", href: "/employers" },
  { label: "Candidates", href: "/candidates" },
  { label: "Open roles", href: "/jobs" },
  { label: "Register for jobs", href: "/register" },
  { label: "Contact", href: "/contact" },
];

const SERVICES = [
  { label: "Permanent Recruitment", href: "/staffing/permanent-recruitment" },
  { label: "Volume Staffing", href: "/staffing/volume-staffing" },
  { label: "Managed Payroll", href: "/payroll" },
  { label: "Statutory Compliance", href: "/staffing/compliance" },
  { label: "Background Verification", href: "/staffing/bgv" },
  { label: "Workforce Management", href: "/workforce-management" },
];

const LEGAL = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Cookies", href: "/cookies" },
];

const ICON = {
  mail: "M4 6h16v12H4zM4 7l8 6 8-6",
  phone:
    "M6.6 3.5h2.6l1.3 3.6-1.8 1.2a11 11 0 0 0 5 5l1.2-1.8 3.6 1.3v2.6a2 2 0 0 1-2.2 2A15.5 15.5 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2Z",
  pin: "M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Zm0-8.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
};

const Line = ({ d }: { d: string }) => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d={d} />
  </svg>
);

const Chevron = () => (
  <svg viewBox="0 0 12 12" className="h-3 w-3 shrink-0 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
    <path d="M4.5 2.5 8 6l-3.5 3.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** Column heading: short green bar above, white title. */
const Heading = ({ children }: { children: React.ReactNode }) => (
  <div>
    <span className="block h-[3px] w-10 rounded-full bg-green" aria-hidden />
    <p className="mt-4 text-[18px] font-semibold text-white">{children}</p>
  </div>
);

export function Footer() {
  return (
    <footer
      className="on-dark relative overflow-hidden text-off-white"
      style={{ background: "linear-gradient(180deg, #081815 0%, #050f0d 60%, #040b0a 100%)" }}
    >
      {/* Start of the footer: soft green glow line instead of a hard cut */}
      <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-green/70 to-transparent" />
      <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-green/[0.10] to-transparent" />

      {/* Office photo, faded into the dark on the right (wide screens) */}
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 hidden w-[34%] max-w-[560px] lg:block">
        <Image src="/visuals/footer-building.webp" alt="" fill sizes="34vw" className="object-cover object-left opacity-80" />
        <span className="absolute inset-0 bg-gradient-to-r from-[#071613] via-[#071613]/70 to-transparent" />
        <span className="absolute inset-0 bg-gradient-to-t from-[#050f0d] via-transparent to-[#071613]" />
      </div>

      {/* Green swooshes */}
      <svg
        aria-hidden
        viewBox="0 0 1440 600"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px] w-full"
        style={{
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, #000 22%)",
          maskImage: "linear-gradient(to bottom, transparent 0%, #000 22%)",
        }}
      >
        <defs>
          <linearGradient id="ft-sweep" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#0E956A" stopOpacity="0.55" />
            <stop offset="1" stopColor="#0E956A" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0 0h420C300 40 170 90 0 190z" fill="url(#ft-sweep)" />
        <path d="M0 175C150 85 290 40 430 0" fill="none" stroke="#19C48A" strokeOpacity="0.55" strokeWidth="1.5" />
        <path d="M0 470c260 70 520 120 900 112" fill="none" stroke="#19C48A" strokeOpacity="0.35" strokeWidth="1.5" />
      </svg>

      {/* ── Main ─────────────────────────────────── */}
      <div className="relative mx-auto px-6 pb-12 pt-16 lg:px-10 lg:pb-16 lg:pt-24" style={{ maxWidth: "1480px" }}>
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.7fr)_minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-x-0">
          {/* Brand */}
          <div className="md:col-span-2 lg:col-span-1 lg:pr-12">
            <div className="flex items-center gap-5">
              <div className="h-20 shrink-0 lg:h-24">
                <Logo color="light" />
              </div>
              <span className="h-16 w-px bg-white/25" aria-hidden />
              <p className="editorial whitespace-nowrap text-[clamp(1.6rem,6.4vw,2.4rem)] leading-[1.02] tracking-[-0.03em] text-white lg:text-[clamp(1.6rem,2.1vw,2.4rem)]" style={{ fontWeight: 600 }}>
                Better Talent.
                <br />
                <span className="text-green">Brighter Futures.</span>
              </p>
            </div>
            <p className="mt-7 max-w-md text-[15px] leading-relaxed text-white/70">
              The right person in the right role changes more than a headcount — it steadies a team and starts a
              career. We find, check, place and support that person, and the same team stays on your account.
            </p>
            <Link
              href="/contact"
              data-cursor="cta"
              className="group mt-8 inline-flex items-center gap-3 rounded-full border border-green px-6 py-3 text-[15px] font-medium text-white transition-colors duration-300 hover:bg-green"
            >
              Tell us what you need <span className="btn-arrow">→</span>
            </Link>
            <p className="mt-5 flex items-center gap-2 text-[14px] text-white/75">
              <span className="h-1.5 w-1.5 rounded-full bg-green" aria-hidden />
              Job seekers: {NO_FEE.charAt(0).toLowerCase() + NO_FEE.slice(1)}
            </p>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer" className="lg:border-l lg:border-white/10 lg:px-8 xl:px-10">
            <Heading>Quick links</Heading>
            <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 md:grid-cols-1">
              {QUICK.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="group inline-flex items-center gap-2 py-0.5 text-[15px] text-white/80 transition-colors hover:text-green">
                    {l.label}
                    <Chevron />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <div className="lg:border-l lg:border-white/10 lg:px-8 xl:px-10">
            <Heading>Our services</Heading>
            <ul className="mt-6 space-y-3">
              {SERVICES.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="group inline-flex items-center gap-2 py-0.5 text-[15px] text-white/80 transition-colors hover:text-green">
                    {l.label}
                    <Chevron />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-2 lg:col-span-1 lg:border-l lg:border-white/10 lg:pl-8 xl:pl-10">
            <Heading>Get in touch</Heading>
            <ul className="mt-6 space-y-4">
              {[
                { icon: ICON.mail, label: CONTACT.email, href: `mailto:${CONTACT.email}` },
                { icon: ICON.phone, label: CONTACT.phone, href: `tel:${CONTACT.tel}` },
                { icon: ICON.pin, label: CONTACT.city },
              ].map((c) => {
                const inner = (
                  <>
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-green/50 bg-green/10 text-[#0E956A] transition-colors group-hover:bg-green group-hover:text-white">
                      <Line d={c.icon} />
                    </span>
                    <span className="text-[15px] text-white">{c.label}</span>
                  </>
                );
                return (
                  <li key={c.label}>
                    {c.href ? (
                      <a href={c.href} className="group inline-flex items-center gap-4 transition-colors hover:text-green">
                        {inner}
                      </a>
                    ) : (
                      <span className="group inline-flex items-center gap-4">{inner}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Brand bar ────────────────────────────── */}
      <div className="relative border-t border-white/10 bg-black/20">
        <div className="mx-auto flex flex-col gap-6 px-6 py-7 md:flex-row md:items-center md:justify-between lg:px-10" style={{ maxWidth: "1480px" }}>
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="h-12 shrink-0 sm:h-14">
              <Logo color="light" />
            </div>
            <span className="h-10 w-px bg-white/20" aria-hidden />
            <p className="whitespace-nowrap text-[15px] font-medium text-white sm:text-[17px]">
              Better Talent. <span className="text-green">Brighter Futures.</span>
            </p>
          </div>
          {/* Phones: four pills in a 2×2 grid. From sm: inline links with thin dividers. */}
          <ul className="grid grid-cols-2 gap-2 whitespace-nowrap text-[12px] text-white/80 sm:flex sm:flex-wrap sm:items-center sm:gap-x-4 sm:gap-y-2 sm:text-[14px]">
            {LEGAL.map((l, i) => (
              <li key={l.href} className="flex items-center sm:gap-4">
                {i > 0 && <span className="hidden h-4 w-px bg-white/25 sm:block" aria-hidden />}
                <Link
                  href={l.href}
                  className="block w-full rounded-full border border-white/15 px-2 py-2 text-center transition-colors hover:border-green hover:text-green sm:w-auto sm:rounded-none sm:border-0 sm:px-0 sm:py-1 sm:text-left"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="flex items-center sm:gap-4">
              <span className="hidden h-4 w-px bg-white/25 sm:block" aria-hidden />
              <CookieSettingsButton className="block w-full rounded-full border border-white/15 px-2 py-2 text-center transition-colors hover:border-green hover:text-green sm:w-auto sm:rounded-none sm:border-0 sm:px-0 sm:py-1 sm:text-left" />
            </li>
          </ul>
        </div>
      </div>

      {/* ── Copyright ────────────────────────────── */}
      <div className="relative overflow-hidden border-t border-white/10">
        <span
          aria-hidden
          className="absolute -bottom-px right-0 hidden h-full w-56 bg-gradient-to-l from-green/70 to-green/0 sm:block"
          style={{ clipPath: "polygon(45% 0, 100% 0, 100% 100%, 0 100%)" }}
        />
        <div className="relative mx-auto flex items-center gap-6 px-6 py-6 lg:px-10" style={{ maxWidth: "1480px" }}>
          <div className="text-[13px] text-white/60">
            <p>© {new Date().getFullYear()} {LEGAL_NAME}. All rights reserved.</p>
            {(LEGAL_INFO.cin || LEGAL_INFO.gstin || LEGAL_INFO.registeredAddress || LEGAL_INFO.licences.length > 0) && (
              <p className="mt-1 text-[12px] text-white/50">
                {[
                  LEGAL_INFO.registeredAddress && `Registered office: ${LEGAL_INFO.registeredAddress}`,
                  LEGAL_INFO.cin && `CIN: ${LEGAL_INFO.cin}`,
                  LEGAL_INFO.gstin && `GSTIN: ${LEGAL_INFO.gstin}`,
                  ...LEGAL_INFO.licences,
                ]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            )}
          </div>
          <span className="hidden flex-1 items-center sm:flex" aria-hidden>
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-green/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-green shadow-[0_0_12px_rgba(25,196,138,0.8)]" />
          </span>
        </div>
      </div>
    </footer>
  );
}
