import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";
import { IconBadge } from "@/components/icons/JNIcon";
import { SERVICES } from "@/lib/services";
import Link from "next/link";

export const metadata = {
  title: "Staffing Services — Job Nexus HR",
  description: "Permanent recruitment, volume staffing, payroll, compliance, BGV and workforce management.",
};

export default function StaffingPage() {
  return (
    <>
      <PageHero
        index="/ Services"
        label="Our services"
        title={
          <>
            Six services.
            <br />
            <span className="text-green">One account manager.</span>
          </>
        }
        description="Hire one specialist or staff a whole site. Every service is run by the same account manager, so nothing gets lost between teams."
        visual={{ asset: "page-staffing", icon: "recruit", label: "Staffing" }}
      />

      {/* Service index — one full-width row per service; the whole row is the link */}
      <section className="bg-off-white py-14 lg:py-24">
        <div className="mx-auto px-6 lg:px-10" style={{ maxWidth: "1480px" }}>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">/ Six services</p>
            <nav aria-label="Jump to service" className="no-scrollbar -mx-6 flex gap-2 overflow-x-auto px-6 lg:mx-0 lg:px-0">
              {SERVICES.map((s) => (
                <a
                  key={s.slug}
                  href={`#${s.slug}`}
                  className="shrink-0 border border-rule px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ink/70 transition-colors hover:border-green hover:text-green"
                >
                  {s.code} {s.name}
                </a>
              ))}
            </nav>
          </div>

          <ol className="mt-8 border-t border-ink">
            {SERVICES.map((s) => (
              <li key={s.slug} id={s.slug} className="scroll-mt-24 border-b border-rule">
                <Link
                  href={s.href}
                  data-cursor="cta"
                  className="group grid grid-cols-1 gap-y-5 py-8 transition-colors duration-500 hover:bg-ink/[0.02] lg:grid-cols-12 lg:gap-x-8 lg:py-12"
                >
                  <div className="flex items-start gap-4 lg:col-span-5">
                    <IconBadge name={s.icon} size="md" className="shrink-0" />
                    <div>
                      <span className="font-mono text-[11px] tracking-[0.18em] text-muted">{s.code}</span>
                      <h2 className="editorial mt-1 text-[clamp(1.7rem,3.2vw,2.8rem)] leading-[1.02] tracking-[-0.035em] text-ink transition-colors duration-500 group-hover:text-green">
                        {s.name}
                      </h2>
                      <p className="mt-3 text-[15px] leading-snug text-ink/80">{s.head}</p>
                    </div>
                  </div>
                  <p className="text-[14px] leading-relaxed text-muted lg:col-span-3 lg:pt-7">{s.body}</p>
                  <ul className="flex flex-wrap gap-2 lg:col-span-3 lg:flex-col lg:gap-0 lg:pt-6">
                    {s.detail.map((d) => (
                      <li
                        key={d}
                        className="border border-rule px-2.5 py-1.5 text-[12px] text-ink/75 lg:border-0 lg:border-b lg:px-0 lg:py-2 lg:text-[13px]"
                      >
                        {d}
                      </li>
                    ))}
                  </ul>
                  <span className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-dark-green lg:col-span-1 lg:items-start lg:justify-end lg:pt-7">
                    <span className="lg:sr-only">View service</span>
                    <span aria-hidden className="btn-arrow text-[18px]">→</span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Statement band — deliberately simple */}
      <section className="border-t border-rule bg-off-white py-14 lg:py-24">
        <div className="mx-auto grid grid-cols-1 gap-y-8 px-6 lg:grid-cols-12 lg:gap-x-8 lg:px-10" style={{ maxWidth: "1480px" }}>
          <h2 className="editorial text-[clamp(2.2rem,6vw,5.5rem)] leading-[0.95] tracking-[-0.045em] text-ink lg:col-span-8">
            Combine what you need.
            <br />
            <span className="text-green">Keep one contact.</span>
          </h2>
          <div className="lg:col-span-4 lg:self-end">
            <p className="text-[15px] leading-relaxed text-muted">
              Recruitment with payroll, volume staffing with workforce management — services work together.
              As your needs grow, your account manager stays the same.
            </p>
            <Link
              href="/employers"
              className="group mt-6 inline-flex items-center gap-3 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-dark-green link-underline"
            >
              How we work with employers <span className="btn-arrow">→</span>
            </Link>
          </div>
        </div>
      </section>

      <CTASection
        title="Not sure which service fits?"
        subtitle="Describe what you need in your own words. We'll recommend the right mix — and tell you honestly if something isn't a fit."
        primaryLabel="Tell us what you need"
      />
    </>
  );
}
