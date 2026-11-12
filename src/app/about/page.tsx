import { PageHero } from "@/components/PageHero";
import Link from "next/link";

export const metadata = {
  title: "About — Job Nexus HR",
  description:
    "Job Nexus HR is a recruitment and staffing company built around continuity, accountability and people. Better Talent. Brighter Futures.",
};

const TIMELINE = [
  {
    code: "01",
    label: "Why we started",
    title: "Staffing shouldn't feel disposable.",
    body: "Recruitment too often feels disposable — new faces on every brief, vendors who disappear after placement, candidates treated as numbers. We started Job Nexus HR to do it differently.",
  },
  {
    code: "02",
    label: "What we learned",
    title: "Continuity is the principle.",
    body: "Good outcomes come from clear, personal ownership. When the same people stay on an account, clients stop repeating themselves and new starters always have someone to turn to.",
  },
  {
    code: "03",
    label: "How we work",
    title: "One account. One contact. Same person tomorrow.",
    body: "Every account is looked after by a real, named person — who briefs the search, coordinates start dates, oversees payroll and answers when something needs escalating.",
  },
  {
    code: "04",
    label: "Where we are going",
    title: "Beyond the hire.",
    body: "We're extending that continuity across payroll, compliance, attendance and verification — building the kind of staffing partner we'd want to hire ourselves.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        index="/ About"
        label="Job Nexus HR"
        title={
          <>
            Nobody here
            <br />
            is <span className="text-green">disposable.</span>
          </>
        }
        description={
          <>
            We built Job Nexus HR to be a staffing partner worth staying with —
            for the people we place, the clients we serve and the people who
            work here.
          </>
        }
        visual={{ asset: "page-about", icon: "nexus", label: "About Us" }}
      />

      <section className="bg-off-white py-14 lg:py-24 border-t border-rule">
        <div className="mx-auto px-6 lg:px-10" style={{ maxWidth: "1480px" }}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-16">
            <div className="lg:col-span-3">
              <div className="lg:sticky lg:top-32">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted mb-4">
                  The story
                </p>
                <p className="editorial text-[clamp(1.5rem,2.5vw,2rem)] tracking-[-0.03em] text-ink leading-tight">
                  We sell continuity. People are how we deliver it.
                </p>
              </div>
            </div>

            <div className="lg:col-span-8 lg:col-start-5 space-y-14 lg:space-y-16">
              {TIMELINE.map((t) => (
                <article key={t.code} className="border-t border-rule pt-10">
                  <div className="flex items-baseline justify-between mb-6">
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-green">
                      {t.code} / {t.label}
                    </span>
                    <span className="editorial text-[2.5rem] leading-none tracking-[-0.04em] text-ink/10">
                      {t.code}
                    </span>
                  </div>
                  <h3 className="editorial text-[clamp(1.8rem,3.6vw,3.2rem)] leading-[1.05] tracking-[-0.035em] text-ink mb-6">
                    {t.title}
                  </h3>
                  <p className="text-[16px] leading-[1.7] text-ink/80 max-w-2xl">
                    {t.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-ink text-off-white py-14 lg:py-24 border-t border-rule">
        <div className="mx-auto px-6 lg:px-10" style={{ maxWidth: "1480px" }}>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-off-white/50 mb-4">
            / Principles
          </p>
          <h2 className="editorial text-[clamp(2rem,5vw,4.5rem)] leading-[0.98] tracking-[-0.035em] text-off-white max-w-4xl mb-10">
            What we hold ourselves to,
            <br />
            <span className="text-green">every day.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-off-white/15">
            {[
              {
                code: "01",
                name: "Continuity before transaction",
                body: "We care about what the relationship looks like in month six — not just on placement day.",
              },
              {
                code: "02",
                name: "Personal ownership",
                body: "The person who takes your brief is the person on the call six weeks later.",
              },
              {
                code: "03",
                name: "People before process",
                body: "We have systems — but the systems exist to serve the people, not the other way around.",
              },
              {
                code: "04",
                name: "Honest scope",
                body: "We tell you what we can fill — and what we can't. Honesty comes first.",
              },
            ].map((p) => (
              <div key={p.code} className="bg-ink p-8 lg:p-12">
                <div className="flex items-baseline justify-between mb-6">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-green">
                    {p.code}
                  </span>
                  </div>
                <h3 className="editorial text-[clamp(1.4rem,2.4vw,2rem)] leading-[1.1] tracking-[-0.025em] text-off-white mb-4">
                  {p.name}
                </h3>
                <p className="text-[14px] leading-relaxed text-off-white/70">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="bg-off-white py-14 lg:py-20 border-t border-rule">
        <div className="mx-auto px-6 lg:px-10" style={{ maxWidth: "1480px" }}>
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10">
            <div className="max-w-3xl">
              <h3 className="editorial text-[clamp(2rem,4.5vw,4rem)] leading-[1] tracking-[-0.035em] text-ink">
                Ready to meet
                <br />
                <span className="text-green">your account manager?</span>
              </h3>
              <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-muted">
                Tell us about the roles you need to fill. One person will take it from there — and stay with
                you after your new team starts.
              </p>
            </div>
            <Link
              href="/contact"
              data-cursor="cta"
              className="group inline-flex items-center gap-4 bg-ink text-off-white border border-ink hover:bg-green hover:text-ink hover:border-green px-6 py-4 font-mono text-[11px] uppercase tracking-[0.18em] transition-all duration-500"
            >
              Tell us what you need <span className="btn-arrow">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
