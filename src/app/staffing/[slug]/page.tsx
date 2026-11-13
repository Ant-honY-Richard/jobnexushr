import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";
import { SignatureLine } from "@/components/SignatureLine";
import { JNIcon } from "@/components/icons/JNIcon";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { VisualKey } from "@/lib/visuals";
import { SERVICES as ALL_SERVICES, serviceBySlug } from "@/lib/services";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, serviceSchema } from "@/lib/seo";

/**
 * Service detail pages. They share the hero, breadcrumbs, related links and CTA, but each one explains
 * its scope with its own layout (process / phases / ledger / cycle) so the four pages don't read as copies.
 */
type Layout = "process" | "phases" | "ledger" | "cycle";

const SERVICES: Record<
  string,
  { asset: VisualKey; layout: Layout; title: React.ReactNode; body: string; detail: string[] }
> = {
  "permanent-recruitment": {
    asset: "page-permanent-recruitment",
    layout: "process",
    title: (
      <>
        Permanent recruitment,
        <br />
        with one <span className="text-green">dedicated contact.</span>
      </>
    ),
    body: "Specialist and mid-level hiring, handled end to end by one account manager — from the first brief through offer and onboarding.",
    detail: [
      "Brief and calibration with the hiring manager",
      "Search through our network and the open market",
      "Screening calls and a shortlist with clear reasons",
      "Interview scheduling and feedback",
      "Offer, negotiation and onboarding support",
      "One account manager from start to confirmation",
    ],
  },
  "volume-staffing": {
    asset: "page-volume-staffing",
    layout: "phases",
    title: (
      <>
        Volume staffing,
        <br />
        <span className="text-green">without losing clarity.</span>
      </>
    ),
    body: "High-volume hiring for sites, shifts and peak periods — quick to start, with attendance and accountability kept in one team.",
    detail: [
      "Clear intake and a readiness checklist",
      "Sourcing and screening at scale, with agreed cut-off times",
      "Start dates coordinated in waves or batches",
      "Daily attendance and regular reporting",
      "The same account manager across every wave",
    ],
  },
  compliance: {
    asset: "page-compliance",
    layout: "ledger",
    title: (
      <>
        Statutory compliance,
        <br />
        as part of the <span className="text-green">engagement.</span>
      </>
    ),
    body: "PF, ESI, professional tax and labour law paperwork handled as part of your engagement — kept audit-ready and managed by your account manager.",
    detail: [
      "PF and ESI contributions and filings",
      "Labour law documentation and contracts",
      "Audit-ready records",
      "Liaison with statutory authorities when needed",
    ],
  },
  bgv: {
    asset: "page-bgv",
    layout: "cycle",
    title: (
      <>
        Background verification,
        <br />
        with a <span className="text-green">defined cycle.</span>
      </>
    ),
    body: "Education, employment, address and reference checks, run through a clear process — with progress tracked and reported to you.",
    detail: [
      "Education checked with institutions",
      "Employment checked with previous employers",
      "Address verification",
      "Reference checks",
      "Status tracking and final report",
    ],
  },
};

export async function generateStaticParams() {
  return Object.keys(SERVICES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = serviceBySlug(slug);
  return s
    ? {
        title: `${s.name} Services in Bangalore & India | Job Nexus HR`,
        description: SERVICES[slug]?.body,
        alternates: { canonical: `/staffing/${slug}` },
      }
    : {};
}

const Eyebrow = ({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) => (
  <p className={`font-mono text-[11px] uppercase tracking-[0.18em] ${dark ? "text-off-white/50" : "text-muted"}`}>
    {children}
  </p>
);

/** Permanent recruitment: a left-to-right hiring process. */
function Process({ detail }: { detail: string[] }) {
  return (
    <section className="bg-off-white py-14 lg:py-24">
      <div className="mx-auto px-6 lg:px-10" style={{ maxWidth: "1480px" }}>
        <Eyebrow>/ How a hire runs</Eyebrow>
        <h2 className="editorial mt-4 max-w-3xl text-[clamp(2rem,4.2vw,3.75rem)] leading-[1] tracking-[-0.035em] text-ink">
          From brief to confirmation,
          <br />
          <span className="text-green">one person throughout.</span>
        </h2>
        <ol className="relative mt-10 grid grid-cols-1 gap-y-0 lg:mt-14 lg:grid-cols-6 lg:gap-x-6">
          <span aria-hidden className="absolute left-0 right-0 top-[11px] hidden h-px bg-rule lg:block" />
          <span aria-hidden className="absolute bottom-3 left-[11px] top-3 w-px bg-rule lg:hidden" />
          {detail.map((d, i) => (
            <li key={d} className="relative flex gap-5 pb-8 lg:block lg:pb-0">
              <span
                className={`relative z-10 mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border ${
                  i === detail.length - 1 ? "border-green bg-green" : "border-green bg-off-white"
                }`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${i === detail.length - 1 ? "bg-off-white" : "bg-green"}`} />
              </span>
              <div className="lg:mt-6">
                <span className="font-mono text-[11px] tracking-[0.18em] text-dark-green">0{i + 1}</span>
                <p className="mt-2 text-[16px] leading-snug tracking-[-0.01em] text-ink lg:text-[15px]">{d}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Volume staffing: three phases instead of a flat list. */
function Phases({ detail }: { detail: string[] }) {
  const phases = [
    { name: "Intake", note: "Before the first person is sourced", items: [detail[0]] },
    { name: "Scale", note: "Filling and deploying the numbers", items: [detail[1], detail[2]] },
    { name: "Sustain", note: "Keeping the floor staffed", items: [detail[3], detail[4]] },
  ];
  return (
    <section className="bg-off-white py-14 lg:py-24">
      <div className="mx-auto px-6 lg:px-10" style={{ maxWidth: "1480px" }}>
        <div className="grid grid-cols-1 gap-y-6 lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-6">
            <Eyebrow>/ How it runs</Eyebrow>
            <h2 className="editorial mt-4 text-[clamp(2rem,4.2vw,3.75rem)] leading-[1] tracking-[-0.035em] text-ink">
              Built in three phases,
              <br />
              <span className="text-green">run by one team.</span>
            </h2>
          </div>
        </div>
        <div className="mt-10 grid grid-cols-1 border-t border-ink md:grid-cols-3 lg:mt-14">
          {phases.map((p, i) => (
            <div
              key={p.name}
              className={`border-b border-rule py-8 md:border-b-0 md:py-10 ${i > 0 ? "md:border-l md:pl-8" : ""} ${i < 2 ? "md:pr-8" : ""}`}
            >
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-[11px] tracking-[0.18em] text-dark-green">Phase 0{i + 1}</span>
                {/* scale bar grows phase by phase */}
                <span aria-hidden className="flex items-end gap-1">
                  {Array.from({ length: 6 }).map((_, b) => (
                    <span
                      key={b}
                      className={`w-1.5 ${b < (i + 1) * 2 ? "bg-green" : "bg-rule"}`}
                      style={{ height: `${8 + b * 3}px` }}
                    />
                  ))}
                </span>
              </div>
              <h3 className="editorial mt-5 text-[clamp(1.8rem,3vw,2.6rem)] leading-none tracking-[-0.035em] text-ink">{p.name}</h3>
              <p className="mt-2 text-[13px] text-muted">{p.note}</p>
              <ul className="mt-6 space-y-3">
                {p.items.map((it) => (
                  <li key={it} className="flex gap-3 text-[15px] leading-snug text-ink/85">
                    <span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-green" />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Statutory compliance: a ledger on ink — obligations and how they are handled. */
function Ledger({ detail }: { detail: string[] }) {
  return (
    <section className="bg-ink py-14 text-off-white lg:py-24">
      <div className="mx-auto px-6 lg:px-10" style={{ maxWidth: "1480px" }}>
        <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-4">
            <Eyebrow dark>/ Compliance ledger</Eyebrow>
            <h2 className="editorial mt-4 text-[clamp(2rem,4vw,3.5rem)] leading-[1] tracking-[-0.035em] text-off-white">
              Handled inside
              <br />
              <span className="text-green">the engagement.</span>
            </h2>
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-off-white/70">
              Not a separate vendor or an afterthought — the same team that manages your workforce manages its
              compliance.
            </p>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <div className="hidden grid-cols-12 gap-4 border-b border-off-white/25 pb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-off-white/50 sm:grid">
              <span className="col-span-1">#</span>
              <span className="col-span-8">Obligation</span>
              <span className="col-span-3 text-right">Coverage</span>
            </div>
            <ul>
              {detail.map((d, i) => (
                <li key={d} className="grid grid-cols-12 items-center gap-4 border-b border-off-white/15 py-5">
                  <span className="col-span-2 font-mono text-[11px] tracking-[0.18em] text-green sm:col-span-1">0{i + 1}</span>
                  <span className="col-span-10 text-[17px] leading-snug tracking-[-0.01em] text-off-white sm:col-span-8">{d}</span>
                  <span className="col-span-10 col-start-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-green sm:col-span-3 sm:col-start-auto sm:justify-end">
                    <JNIcon name="check" className="h-4 w-4" /> Included
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Background verification: four checks feeding one report. */
function Cycle({ detail }: { detail: string[] }) {
  const checks = detail.slice(0, -1);
  const report = detail[detail.length - 1];
  return (
    <section className="bg-off-white py-14 lg:py-24">
      <div className="mx-auto px-6 lg:px-10" style={{ maxWidth: "1480px" }}>
        <Eyebrow>/ Verification cycle</Eyebrow>
        <h2 className="editorial mt-4 max-w-3xl text-[clamp(2rem,4.2vw,3.75rem)] leading-[1] tracking-[-0.035em] text-ink">
          Four checks.
          <br />
          <span className="text-green">One clear report.</span>
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-y-6 lg:mt-14 lg:grid-cols-12 lg:items-stretch lg:gap-x-8">
          <ol className="grid grid-cols-1 gap-px border border-rule bg-rule sm:grid-cols-2 lg:col-span-8">
            {checks.map((c, i) => (
              <li key={c} className="flex items-start gap-4 bg-off-white p-6 lg:p-8">
                <span className="font-mono text-[11px] tracking-[0.18em] text-dark-green">0{i + 1}</span>
                <p className="text-[16px] leading-snug text-ink">{c}</p>
              </li>
            ))}
          </ol>
          <div className="relative flex flex-col justify-between bg-forest p-6 text-off-white lg:col-span-4 lg:p-8">
            <span aria-hidden className="absolute -left-8 top-1/2 hidden h-px w-8 bg-green lg:block" />
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-green">Output</span>
            <p className="editorial mt-6 text-[clamp(1.5rem,2.4vw,2.1rem)] leading-[1.05] tracking-[-0.03em]">{report}</p>
            <p className="mt-6 text-[13px] leading-relaxed text-off-white/70">
              Progress on each check is tracked and reported back to you, so you know where every candidate stands.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = SERVICES[slug];
  const service = serviceBySlug(slug);
  if (!page || !service) notFound();

  const others = ALL_SERVICES.filter((s) => s.slug !== slug);
  const Scope = { process: Process, phases: Phases, ledger: Ledger, cycle: Cycle }[page.layout];

  return (
    <>
      <JsonLd
        data={[
          serviceSchema(service.name, page.body, `/staffing/${slug}`),
          breadcrumbSchema([
            { name: "Home", path: "" },
            { name: "Services", path: "/staffing" },
            { name: service.name, path: `/staffing/${slug}` },
          ]),
        ]}
      />
      <PageHero
        index={`/ Services / ${service.code}`}
        label={service.head}
        crumbs={[{ label: "Services", href: "/staffing" }, { label: service.name }]}
        title={page.title}
        description={page.body}
        visual={{ asset: page.asset, icon: service.icon, label: `Services / ${service.code}` }}
      />

      {/* The promise, as a pull quote */}
      <section className="bg-off-white pt-14 lg:pt-20">
        <div className="mx-auto px-6 lg:px-10" style={{ maxWidth: "1480px" }}>
          <p className="editorial max-w-4xl text-[clamp(1.6rem,3.4vw,2.9rem)] leading-[1.08] tracking-[-0.03em] text-ink">
            <span className="text-green">“</span>
            {service.head}
            <span className="text-green">”</span>
          </p>
          <SignatureLine className="mt-8 max-w-md" />
        </div>
      </section>

      <Scope detail={page.detail} />

      {/* Other services — internal linking */}
      <section className="border-t border-rule bg-off-white py-12 lg:py-16">
        <div className="mx-auto px-6 lg:px-10" style={{ maxWidth: "1480px" }}>
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <Eyebrow>/ Other services</Eyebrow>
            <Link href="/staffing" className="group inline-flex items-center gap-2 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-dark-green link-underline">
              All services <span className="btn-arrow">→</span>
            </Link>
          </div>
          <ul className="mt-6 grid grid-cols-1 border-t border-rule sm:grid-cols-2 lg:grid-cols-5">
            {others.map((o) => (
              <li key={o.slug} className="border-b border-rule lg:border-b-0 lg:border-r lg:last:border-r-0">
                <Link href={o.href} className="group flex items-center justify-between gap-4 py-4 transition-colors hover:text-green lg:flex-col lg:items-start lg:px-5 lg:py-6">
                  <span className="text-[15px] leading-snug text-ink transition-colors group-hover:text-green">{o.name}</span>
                  <span aria-hidden className="btn-arrow font-mono text-[12px] text-green">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTASection
        title={`Let's talk about ${service.name.toLowerCase()}.`}
        subtitle="Share the roles, numbers and timeline. A real person will reply within one business day."
        primaryLabel="Tell us what you need"
        secondaryHref="/staffing"
        secondaryLabel="All services"
      />
    </>
  );
}
