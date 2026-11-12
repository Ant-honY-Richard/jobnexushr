import { PageHero } from "@/components/PageHero";
import { JOB_INDUSTRIES, JOB_TYPES } from "@/lib/job-filters";
import { CTASection } from "@/components/CTASection";

export const metadata = {
  title: "For Candidates — Job Nexus HR",
  description: "Find your next role with a partner who treats candidates like people, not applications.",
};

const WHAT_WE_DO = [
  {
    code: "01",
    name: "Job discovery",
    body: "Roles matched to you — not just your CV forwarded.",
  },
  {
    code: "02",
    name: "Interview guidance",
    body: "Clear, practical help to prepare.",
  },
  {
    code: "03",
    name: "Honest expectations",
    body: "We tell you what the role is really like.",
  },
  {
    code: "04",
    name: "Application support",
    body: "We handle the back-and-forth for you.",
  },
  {
    code: "05",
    name: "Job portal help",
    body: "Help applying through the right channels.",
  },
  {
    code: "06",
    name: "Human support",
    body: "A real person to call when you need one.",
  },
];

const AFTER = [
  {
    name: "A person reads it",
    body: "Your application reaches someone at Job Nexus HR — not an auto-reply or a ticket queue.",
  },
  {
    name: "An honest conversation",
    body: "We tell you about the role as it actually is, and help you prepare for the interview.",
  },
  {
    name: "Someone to call",
    body: "The same person stays reachable while your application moves — and when you need help after.",
  },
];

export default function CandidatesPage() {
  return (
    <>
      <PageHero
        index="/ For Candidates"
        label="For candidates"
        title={
          <>
            Your next job,
            <br />
            with someone
            <br />
            <span className="text-green">on your side.</span>
          </>
        }
        description="Browse open roles, talk to a real recruiter and get honest advice on what fits you."
        visual={{ asset: "page-candidates", icon: "candidate", label: "For Candidates" }}
      />

      {/* Job search */}
      <section className="bg-off-white py-12 lg:py-20 border-t border-rule">
        <div className="mx-auto px-6 lg:px-10" style={{ maxWidth: "1480px" }}>
          <div className="border border-rule p-6 lg:p-10 bg-off-white">
            <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="editorial text-[clamp(1.7rem,3vw,2.5rem)] leading-[1.02] tracking-[-0.03em] text-ink">
                Find a role.
              </h2>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                Leave any field empty to see everything
              </p>
            </div>
            <form
              action="/jobs"
              method="get"
              className="grid grid-cols-1 md:grid-cols-4 gap-6"
            >
              <div>
                <label htmlFor="cand-q" className="block font-mono text-[10px] uppercase tracking-[0.18em] text-muted mb-2">
                  Job title
                </label>
                <input
                  type="text"
                  id="cand-q" name="q"
                  placeholder="e.g. Operations Manager"
                  className="field-input"
                />
              </div>
              <div>
                <label htmlFor="cand-location" className="block font-mono text-[10px] uppercase tracking-[0.18em] text-muted mb-2">
                  Location
                </label>
                <input
                  type="text"
                  id="cand-location" name="location"
                  placeholder="e.g. Bengaluru"
                  className="field-input"
                />
              </div>
              <div>
                <label htmlFor="cand-industry" className="block font-mono text-[10px] uppercase tracking-[0.18em] text-muted mb-2">
                  Industry
                </label>
                <select id="cand-industry" name="industry" className="field-input">
                  <option value="">All industries</option>
                  {JOB_INDUSTRIES.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="cand-type" className="block font-mono text-[10px] uppercase tracking-[0.18em] text-muted mb-2">
                  Type
                </label>
                <select id="cand-type" name="type" className="field-input">
                  <option value="">All types</option>
                  {JOB_TYPES.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-4 flex justify-end">
                <button
                  type="submit"
                  data-cursor="cta"
                  className="group inline-flex w-full items-center justify-center gap-4 sm:w-auto bg-ink text-off-white border border-ink hover:bg-green hover:text-ink hover:border-green px-6 py-4 font-mono text-[11px] uppercase tracking-[0.18em] transition-all duration-500"
                >
                  Search roles <span className="btn-arrow">→</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* After you apply */}
      <section className="bg-forest py-14 text-off-white lg:py-24">
        <div className="mx-auto px-6 lg:px-10" style={{ maxWidth: "1480px" }}>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-off-white/50">/ After you apply</p>
          <h2 className="editorial mt-4 max-w-3xl text-[clamp(2rem,4.2vw,3.75rem)] leading-[1] tracking-[-0.035em] text-off-white">
            What happens next —
            <br />
            <span className="text-green">no guessing.</span>
          </h2>
          <ol className="mt-10 grid grid-cols-1 gap-px bg-off-white/15 md:grid-cols-3 lg:mt-14">
            {AFTER.map((a, i) => (
              <li key={a.name} className="bg-forest p-6 lg:p-8">
                <span className="grid h-9 w-9 place-items-center rounded-full border border-green font-mono text-[11px] text-green">
                  {i + 1}
                </span>
                <h3 className="editorial mt-6 text-[1.6rem] leading-tight tracking-[-0.03em]">{a.name}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-off-white/70">{a.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* What we do */}
      <section className="bg-off-white py-14 lg:py-20 border-t border-rule">
        <div className="mx-auto px-6 lg:px-10" style={{ maxWidth: "1480px" }}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-10 gap-x-8">
            <div className="lg:col-span-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted mb-4">
                / What we do for candidates
              </p>
              <h2 className="editorial text-[clamp(2rem,4.5vw,4rem)] leading-[1] tracking-[-0.035em] text-ink">
                Six things that
                <br />
                <span className="text-green">actually help.</span>
              </h2>
              <p className="mt-6 text-[15px] leading-relaxed text-muted max-w-md">
                No auto-replies. The person handling your application is a real
                recruiter at Job Nexus HR — and you can reach them.
              </p>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 grid grid-cols-1 sm:grid-cols-2 gap-px bg-rule">
              {WHAT_WE_DO.map((w) => (
                <div
                  key={w.code}
                  className="bg-off-white p-6"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-green">
                    {w.code}
                  </span>
                  <h3 className="editorial text-xl text-ink mt-3 mb-2 tracking-[-0.025em]">
                    {w.name}
                  </h3>
                  <p className="text-[12px] leading-relaxed text-muted">
                    {w.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Find your next role."
        subtitle="Real roles, honest advice and a real person on the other side."
        primaryHref="/jobs"
        primaryLabel="Browse open roles"
        secondaryHref="/contact"
        secondaryLabel="Talk to a recruiter"
      />
    </>
  );
}
