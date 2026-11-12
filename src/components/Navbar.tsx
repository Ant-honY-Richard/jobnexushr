"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/cn";
import { JNIcon } from "./icons/JNIcon";
import { SERVICES } from "@/lib/services";
import { CONTACT } from "@/lib/site";

/** `short` is the label used between 1280 and 1535px, where the full bar needs the room. */
const NAV: { label: string; short?: string; href: string; mega?: boolean }[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/staffing", mega: true },
  { label: "Industries", href: "/industries" },
  { label: "Employers", href: "/employers" },
  { label: "Candidates", href: "/candidates" },
];

// Mobile / tablet menu also surfaces the job board.
const MOBILE_NAV = [...NAV, { label: "Jobs", href: "/jobs" }];

const EASE = [0.65, 0, 0.35, 1] as const;

const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
const servicesActive = (pathname: string) => SERVICES.some((s) => isActive(pathname, s.href)) || pathname === "/staffing";

/** Desktop mega panel for Services: photo + intro card · six services in two columns · partner card. */
function ServicesPanel({ onNavigate }: { onNavigate: () => void }) {
  const cols = [SERVICES.slice(0, 3), SERVICES.slice(3)];
  return (
    <div className="grid grid-cols-[280px_minmax(0,1fr)_250px] gap-3 rounded-[22px] border border-rule bg-white p-3 shadow-[0_30px_70px_-30px_rgba(4,46,39,0.35)] 2xl:grid-cols-[minmax(0,1.05fr)_minmax(0,1.1fr)_minmax(0,0.62fr)]">
      {/* Intro card with photo */}
      <div className="relative flex min-h-[300px] overflow-hidden rounded-2xl bg-green/[0.07]">
        {/* Wide screens: the supplied artwork fills the card (photo + curve on the left, mint on the right) */}
        <Image
          src="/visuals/menu-services-team.webp"
          alt="Job Nexus HR team members smiling together around a laptop"
          fill
          sizes="560px"
          className="hidden object-cover object-right 2xl:block"
        />
        <div className="relative flex flex-1 flex-col justify-center px-7 py-8 2xl:ml-auto 2xl:w-[43%] 2xl:flex-none 2xl:pl-0 2xl:pr-5">
          <p className="flex items-center gap-3 text-[13px] font-medium text-ink/75">
            <span className="h-px w-6 bg-green" aria-hidden />
            Our services
          </p>
          <p className="editorial mt-4 text-[1.5rem] leading-[1.12] tracking-[-0.025em] text-ink 2xl:text-[clamp(1.35rem,1.35vw,1.7rem)]">
            Building a
            <br />
            stronger workforce
            <br />
            <span className="text-green">together.</span>
          </p>
          <Link
            href="/staffing"
            onClick={onNavigate}
            className="group mt-7 inline-flex w-fit items-center gap-2 rounded-full border border-ink/70 px-5 py-2.5 text-[14px] font-medium text-ink transition-colors hover:border-green hover:bg-green hover:text-white"
          >
            Explore all services <span className="btn-arrow">→</span>
          </Link>
        </div>
      </div>

      {/* Services — two columns with a divider */}
      <div className="grid grid-cols-2 items-center py-4">
        {cols.map((col, ci) => (
          <ul key={ci} className={cn("space-y-1 px-3", ci === 1 && "border-l border-rule")}>
            {col.map((s) => (
              <li key={s.slug}>
                <Link
                  href={s.href}
                  onClick={onNavigate}
                  className="group flex items-center gap-4 rounded-xl px-3 py-3.5 transition-colors hover:bg-green/[0.06]"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-green/10 text-ink transition-colors group-hover:bg-green group-hover:text-white">
                    <JNIcon name={s.icon} className="h-6 w-6 group-hover:[&_.jn-accent]:stroke-white group-hover:[&_.jn-accent-fill]:fill-white" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[15px] font-semibold leading-snug text-ink transition-colors group-hover:text-green">
                      {s.name}
                    </span>
                    <span className="mt-0.5 block text-[13px] leading-snug text-muted">{s.short}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ))}
      </div>

      {/* Partner card */}
      <div className="relative flex flex-col justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-green/[0.12] via-green/[0.05] to-white px-7 py-8">
        {/* decorative linework + green sweep on the right edge */}
        <svg aria-hidden viewBox="0 0 200 300" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full">
          <path d="M120 0 L200 70" stroke="rgba(14,149,106,0.25)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          <path d="M200 160 L130 300" stroke="rgba(14,149,106,0.25)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          <path d="M200 40 C 175 90, 170 150, 200 210 Z" fill="#0E956A" />
        </svg>
        <span className="relative text-green">
          <svg viewBox="0 0 40 40" className="h-11 w-11" aria-hidden>
            <rect x="5" y="24" width="6" height="11" rx="1.2" fill="currentColor" />
            <rect x="15" y="18" width="6" height="17" rx="1.2" fill="currentColor" />
            <rect x="25" y="11" width="6" height="24" rx="1.2" fill="currentColor" />
            <path d="M5 17 L15 10 L22 13 L33 5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M28 5 H33 V10" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <p className="editorial relative mt-5 pr-6 text-[1.45rem] leading-[1.12] tracking-[-0.025em] text-ink 2xl:text-[1.6rem]">
          Your partner
          <br />
          in people success
        </p>
        <p className="relative mt-3 pr-6 text-[14px] leading-relaxed text-ink/70">
          Hire, pay and support your workforce — with one account manager.
        </p>
        <Link
          href="/contact"
          onClick={onNavigate}
          className="group relative mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-forest px-5 py-2.5 text-[14px] font-medium text-off-white transition-colors hover:bg-green"
        >
          Talk to us <span className="btn-arrow">→</span>
        </Link>
      </div>
    </div>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false); // mobile menu
  const [mega, setMega] = useState(false); // desktop services panel
  const [mobileServices, setMobileServices] = useState(false);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const barRef = useRef<HTMLDivElement>(null);

  // Close menus whenever the route changes (state adjusted during render).
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setOpen(false);
    setMega(false);
  }

  const openMega = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMega(true);
  }, []);
  const closeMegaSoon = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMega(false), 160);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Desktop panel: Esc and outside click close it.
  useEffect(() => {
    if (!mega) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMega(false);
    const onDown = (e: PointerEvent) => {
      if (barRef.current && !barRef.current.contains(e.target as Node)) setMega(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [mega]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 lg:px-6 lg:pt-4"
      >
        <div ref={barRef} className="relative mx-auto" style={{ maxWidth: "1480px" }} onPointerLeave={(e) => e.pointerType === "mouse" && closeMegaSoon()}>
          {/* The bar */}
          <div
            className={cn(
              "flex h-16 items-center justify-between gap-4 rounded-2xl border px-3 transition-all duration-500 sm:px-4 lg:h-[72px] lg:px-5",
              scrolled || mega || open
                ? "border-rule bg-white/95 shadow-[0_18px_40px_-26px_rgba(4,46,39,0.45)] backdrop-blur-md"
                : "border-white/60 bg-white/70 shadow-[0_10px_30px_-24px_rgba(4,46,39,0.4)] backdrop-blur-md"
            )}
          >
            <Link href="/" aria-label="Job Nexus HR Home" className="group flex shrink-0 items-center" data-cursor="link">
              <div className="h-11 lg:h-12">
                <Logo priority />
              </div>
              {/* Wordmark beside the logo */}
              <span className="ml-3 text-[18px] font-medium leading-none tracking-[-0.02em] text-ink sm:text-[19px] 2xl:text-[21px]">
                Job Nexus HR
              </span>
            </Link>

            <nav className="hidden h-full items-stretch gap-1 xl:flex" aria-label="Main">
              {NAV.map((item) => {
                const active = item.mega ? servicesActive(pathname) : isActive(pathname, item.href);
                const base = cn(
                  "relative flex items-center gap-1.5 rounded-lg px-3 text-[15px] font-medium transition-colors duration-300 hover:text-green",
                  active || (item.mega && mega) ? "text-green" : "text-ink/80"
                );
                const underline = active && (
                  <span className="absolute inset-x-3 bottom-0 h-[3px] rounded-t-full bg-green" aria-hidden />
                );
                const label = item.short ? (
                  <>
                    <span className="2xl:hidden">{item.short}</span>
                    <span className="hidden 2xl:inline">{item.label}</span>
                  </>
                ) : (
                  item.label
                );
                if (item.mega) {
                  return (
                    <button
                      key={item.href}
                      type="button"
                      aria-expanded={mega}
                      aria-controls="services-panel"
                      onClick={() => setMega((m) => !m)}
                      onPointerEnter={(e) => e.pointerType === "mouse" && openMega()}
                      className={base}
                      data-cursor="link"
                    >
                      {label}
                      <svg viewBox="0 0 12 12" className={cn("h-3 w-3 transition-transform duration-300", mega && "rotate-180")} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                        <path d="M2.5 4.5 6 8l3.5-3.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {underline}
                    </button>
                  );
                }
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onPointerEnter={(e) => e.pointerType === "mouse" && mega && closeMegaSoon()}
                    data-cursor="link"
                    className={base}
                  >
                    {label}
                    {underline}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              <a
                href={`tel:${CONTACT.tel}`}
                className="group mr-1 hidden items-center gap-2.5 rounded-xl px-2 py-2 text-[15px] font-medium text-ink transition-colors hover:text-green lg:inline-flex"
                aria-label={`Call us on ${CONTACT.phone}`}
              >
                <span className="grid h-9 w-9 place-items-center rounded-full bg-green/10 text-[#0E956A] transition-colors group-hover:bg-green group-hover:text-white">
                  <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M6.6 3.5h2.6l1.3 3.6-1.8 1.2a11 11 0 0 0 5 5l1.2-1.8 3.6 1.3v2.6a2 2 0 0 1-2.2 2A15.5 15.5 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2Z" />
                  </svg>
                </span>
                <span className="whitespace-nowrap">{CONTACT.phone}</span>
              </a>
              <Link
                href="/contact"
                className="group hidden items-center gap-2.5 rounded-xl bg-forest px-5 py-3 text-[15px] font-medium text-off-white transition-colors duration-500 hover:bg-green md:inline-flex"
                data-cursor="cta"
              >
                Tell us what you need
                <span className="btn-arrow inline-block">→</span>
              </Link>

              <button
                onClick={() => setOpen(!open)}
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                className="relative grid h-11 w-11 place-items-center rounded-xl transition-colors hover:bg-green/10 xl:hidden"
                data-cursor="link"
              >
                <span className={cn("absolute h-[1.5px] w-5 rounded bg-ink transition-transform duration-500", open ? "rotate-45" : "-translate-y-1.5")} />
                <span className={cn("absolute h-[1.5px] w-5 rounded bg-ink transition-opacity duration-300", open ? "opacity-0" : "opacity-100")} />
                <span className={cn("absolute h-[1.5px] w-5 rounded bg-ink transition-transform duration-500", open ? "-rotate-45" : "translate-y-1.5")} />
              </button>
            </div>
          </div>

          {/* Desktop mega panel */}
          <AnimatePresence>
            {mega && (
              <motion.div
                id="services-panel"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: EASE }}
                onPointerEnter={(e) => e.pointerType === "mouse" && openMega()}
                className="absolute inset-x-0 top-full hidden pt-2 xl:block"
              >
                <ServicesPanel onNavigate={() => setMega(false)} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* Mobile / tablet menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 overflow-y-auto bg-off-white"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
          >
            <div className="flex min-h-full flex-col px-6 pb-10 pt-28">
              <nav className="space-y-0" aria-label="Mobile">
                {MOBILE_NAV.map((item, i) => {
                  const active = "mega" in item && item.mega ? servicesActive(pathname) : isActive(pathname, item.href);
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ x: -16, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.05 + i * 0.04, duration: 0.45, ease: EASE }}
                      className="border-b border-rule"
                    >
                      {"mega" in item && item.mega ? (
                        <>
                          <button
                            type="button"
                            aria-expanded={mobileServices}
                            aria-controls="mobile-services"
                            onClick={() => setMobileServices((v) => !v)}
                            className="flex w-full items-center justify-between py-4 text-left"
                          >
                            <span className={cn("text-[26px] font-medium tracking-[-0.02em]", active ? "text-green" : "text-ink")}>
                              {item.label}
                            </span>
                            <span className={cn("grid h-9 w-9 place-items-center rounded-full bg-green/10 text-green transition-transform duration-300", mobileServices && "rotate-180")}>
                              <svg viewBox="0 0 12 12" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                                <path d="M2.5 4.5 6 8l3.5-3.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </span>
                          </button>
                          <AnimatePresence initial={false}>
                            {mobileServices && (
                              <motion.ul
                                id="mobile-services"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: EASE }}
                                className="overflow-hidden"
                              >
                                {SERVICES.map((s) => (
                                  <li key={s.slug}>
                                    <Link
                                      href={s.href}
                                      onClick={() => setOpen(false)}
                                      className="flex items-center gap-3 rounded-xl px-1 py-2.5"
                                    >
                                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-green/10">
                                        <JNIcon name={s.icon} className="h-5 w-5" />
                                      </span>
                                      <span>
                                        <span className="block text-[15px] font-medium text-ink">{s.name}</span>
                                        <span className="block text-[13px] text-muted">{s.short}</span>
                                      </span>
                                    </Link>
                                  </li>
                                ))}
                                <li className="pb-4 pt-2">
                                  <Link
                                    href="/staffing"
                                    onClick={() => setOpen(false)}
                                    className="inline-flex items-center gap-2 rounded-full bg-green px-4 py-2.5 text-[13px] font-medium text-white"
                                  >
                                    Explore all services →
                                  </Link>
                                </li>
                              </motion.ul>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <Link
                          href={item.href}
                          aria-current={active ? "page" : undefined}
                          onClick={() => setOpen(false)}
                          className="flex items-center justify-between py-4"
                        >
                          <span className={cn("text-[26px] font-medium tracking-[-0.02em] transition-colors hover:text-green", active ? "text-green" : "text-ink")}>
                            {item.label}
                          </span>
                          <span aria-hidden className="text-[18px] text-ink/30">→</span>
                        </Link>
                      )}
                    </motion.div>
                  );
                })}
              </nav>
              <div className="mt-auto flex flex-col gap-3 pt-10">
                <a
                  href={`tel:${CONTACT.tel}`}
                  className="flex items-center justify-center gap-2 rounded-xl border border-green/40 bg-white px-5 py-4 text-[15px] font-medium text-ink"
                >
                  <span className="text-green">Call</span> {CONTACT.phone}
                </a>
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-xl bg-forest px-5 py-4 text-[15px] font-medium text-off-white"
                >
                  Tell us what you need →
                </Link>
                <p className="text-center font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                  Better Talent · Brighter Futures
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
