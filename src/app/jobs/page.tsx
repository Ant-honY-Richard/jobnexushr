import { db } from "@/db";
import { jobs } from "@/db/schema";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";
import Link from "next/link";
import { and, desc, eq, ilike } from "drizzle-orm";
import { JOB_INDUSTRIES, JOB_TYPES } from "@/lib/job-filters";
import { JNIcon } from "@/components/icons/JNIcon";

export const metadata = {
  title: "Jobs — Job Nexus HR",
  description: "Explore open positions across industries, supported by Job Nexus HR.",
};

export const dynamic = "force-dynamic";

type JobRow = {
  id: number;
  title: string;
  company: string;
  location: string;
  industry: string;
  employmentType: string;
  experience: string | null;
  description: string;
  responsibilities: string | null;
  requirements: string | null;
  isActive: boolean;
  createdAt: Date;
};

type SearchParams = Record<string, string | string[] | undefined>;

function param(sp: SearchParams, key: string): string {
  const v = sp[key];
  return (Array.isArray(v) ? v[0] : v)?.trim().slice(0, 100) ?? "";
}

// Escape LIKE wildcards so user input is matched literally.
const contains = (v: string) => `%${v.replace(/[\\%_]/g, "\\$&")}%`;

export default async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const q = param(sp, "q");
  const location = param(sp, "location");
  const industry = param(sp, "industry");
  const type = param(sp, "type");
  const hasFilters = Boolean(q || location || industry || type);

  let allJobs: JobRow[] = [];
  try {
    const filters = [
      eq(jobs.isActive, true),
      q ? ilike(jobs.title, contains(q)) : undefined,
      location ? ilike(jobs.location, contains(location)) : undefined,
      industry ? ilike(jobs.industry, contains(industry)) : undefined,
      type ? ilike(jobs.employmentType, contains(type)) : undefined,
    ];
    allJobs = (await db
      .select()
      .from(jobs)
      .where(and(...filters))
      .orderBy(desc(jobs.createdAt))) as JobRow[];
  } catch {
    allJobs = [];
  }

  return (
    <>
      <PageHero
        index="/ Jobs"
        label="Open roles"
        title={
          <>
            Open roles,
            <br />
            <span className="text-green">real recruiters.</span>
          </>
        }
        description="Browse current openings and apply in a few minutes. A recruiter will get back to you personally."
        visual={{ asset: "page-jobs", icon: "talent", label: "Open Roles" }}
        swoosh
      />

      <section className="bg-off-white py-12 lg:py-16">
        <div className="mx-auto px-6 lg:px-10" style={{ maxWidth: "1480px" }}>
          {/* Search card — same rounded, icon-led fields as the contact form */}
          <form
            action="/jobs"
            method="get"
            role="search"
            aria-label="Filter jobs"
            className="grid grid-cols-1 gap-4 rounded-[24px] border border-white bg-white p-5 shadow-[0_30px_70px_-40px_rgba(4,46,39,0.45)] sm:grid-cols-2 sm:p-6 lg:grid-cols-[1.4fr_1fr_1fr_0.8fr_auto] lg:items-end lg:p-7"
          >
            <div>
              <label htmlFor="jobs-q" className="mb-2 block text-[13px] font-medium text-ink">Job title</label>
              <div className="flex items-center gap-3 rounded-xl border border-ink/12 bg-white px-4 transition-[border-color,box-shadow] duration-300 focus-within:border-green focus-within:shadow-[0_0_0_3px_rgba(14,149,106,0.14)]">
                <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-ink/40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm5-2 4 4" /></svg>
                <input type="text" id="jobs-q" name="q" defaultValue={q} placeholder="e.g. Warehouse supervisor" className="w-full min-w-0 bg-transparent py-3.5 text-[16px] text-ink outline-none placeholder:text-muted/80 md:text-[15px]" />
              </div>
            </div>
            <div>
              <label htmlFor="jobs-location" className="mb-2 block text-[13px] font-medium text-ink">Location</label>
              <div className="flex items-center gap-3 rounded-xl border border-ink/12 bg-white px-4 transition-[border-color,box-shadow] duration-300 focus-within:border-green focus-within:shadow-[0_0_0_3px_rgba(14,149,106,0.14)]">
                <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-ink/40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Zm0-8.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" /></svg>
                <input type="text" id="jobs-location" name="location" defaultValue={location} placeholder="City or state" className="w-full min-w-0 bg-transparent py-3.5 text-[16px] text-ink outline-none placeholder:text-muted/80 md:text-[15px]" />
              </div>
            </div>
            <div>
              <label htmlFor="jobs-industry" className="mb-2 block text-[13px] font-medium text-ink">Industry</label>
              <div className="flex items-center gap-3 rounded-xl border border-ink/12 bg-white px-4 transition-[border-color,box-shadow] duration-300 focus-within:border-green focus-within:shadow-[0_0_0_3px_rgba(14,149,106,0.14)] relative">
                <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-ink/40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 20V4h9v16M14 9h5v11M8 8h3M8 12h3M8 16h3M3 20h18" /></svg>
                <select id="jobs-industry" name="industry" defaultValue={industry} className="w-full min-w-0 bg-transparent py-3.5 text-[16px] text-ink outline-none placeholder:text-muted/80 md:text-[15px] cursor-pointer appearance-none pr-6">
                  <option value="">All industries</option>
                  {JOB_INDUSTRIES.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
                <svg viewBox="0 0 12 12" className="pointer-events-none absolute right-4 h-3.5 w-3.5 text-ink/60" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><path d="M2.5 4.5 6 8l3.5-3.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
            </div>
            <div>
              <label htmlFor="jobs-type" className="mb-2 block text-[13px] font-medium text-ink">Type</label>
              <div className="flex items-center gap-3 rounded-xl border border-ink/12 bg-white px-4 transition-[border-color,box-shadow] duration-300 focus-within:border-green focus-within:shadow-[0_0_0_3px_rgba(14,149,106,0.14)] relative">
                <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-ink/40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-13v5l3 2" /></svg>
                <select id="jobs-type" name="type" defaultValue={type} className="w-full min-w-0 bg-transparent py-3.5 text-[16px] text-ink outline-none placeholder:text-muted/80 md:text-[15px] cursor-pointer appearance-none pr-6">
                  <option value="">All types</option>
                  {JOB_TYPES.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
                <svg viewBox="0 0 12 12" className="pointer-events-none absolute right-4 h-3.5 w-3.5 text-ink/60" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><path d="M2.5 4.5 6 8l3.5-3.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
            </div>
            <button
              type="submit"
              data-cursor="cta"
              className="group inline-flex h-[54px] items-center justify-center gap-3 rounded-xl bg-forest px-7 text-[15px] font-semibold text-white transition-colors duration-500 hover:bg-green sm:col-span-2 lg:col-span-1"
            >
              Search <span className="btn-arrow">→</span>
            </button>
          </form>

          {/* Result summary */}
          <div className="mb-8 mt-6 flex flex-wrap items-center justify-between gap-3" aria-live="polite">
            <p className="text-[13px] font-medium text-ink/70">
              {allJobs.length} {allJobs.length === 1 ? "open role" : "open roles"}
              {hasFilters && " matching your filters"}
            </p>
            {hasFilters && (
              <Link href="/jobs" className="py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-dark-green link-underline">
                Clear filters ×
              </Link>
            )}
          </div>

          {allJobs.length === 0 ? (
            <div className="relative overflow-hidden rounded-[24px] border border-ink/10 bg-gradient-to-br from-green/[0.07] via-white to-white px-6 py-12 text-center lg:p-16">
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-green/12 text-[#0E956A]">
                <JNIcon name="candidate" className="h-8 w-8" />
              </span>
              <p className="mt-5 text-[12px] font-semibold uppercase tracking-[0.14em] text-dark-green">
                {hasFilters ? "No matching roles" : "No published listings"}
              </p>
              <h2 className="editorial mt-2 text-[clamp(1.8rem,3vw,2.4rem)] leading-tight tracking-[-0.03em] text-ink">
                {hasFilters ? "Nothing matches that search." : "No roles are listed right now."}
              </h2>
              <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-muted">
                {hasFilters
                  ? "Try fewer filters, or tell us what you’re looking for and we’ll contact you when something matches."
                  : "We add roles as new client positions open. Tell us what you’re looking for and we’ll contact you when something matches."}
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  data-cursor="cta"
                  className="group inline-flex items-center justify-center gap-3 rounded-xl bg-forest px-6 py-3.5 text-[15px] font-semibold text-white transition-colors duration-500 hover:bg-green"
                >
                  Tell us what you&apos;re looking for <span className="btn-arrow">→</span>
                </Link>
                <Link
                  href="/candidates"
                  data-cursor="link"
                  className="group inline-flex items-center justify-center gap-3 rounded-xl border border-ink/15 bg-white px-6 py-3.5 text-[15px] font-medium text-ink transition-colors duration-500 hover:border-green hover:text-green"
                >
                  How we help candidates <span className="btn-arrow">→</span>
                </Link>
              </div>
            </div>
          ) : (
            <ul className="border-t border-ink">
              {allJobs.map((job) => (
                <li key={job.id} className="border-b border-rule">
                  <Link
                    href={`/jobs/${job.id}`}
                    data-cursor="cta"
                    className="group grid grid-cols-1 gap-y-3 py-6 transition-colors duration-500 hover:bg-ink/[0.02] lg:grid-cols-12 lg:items-center lg:gap-x-6 lg:py-7"
                  >
                    <div className="lg:col-span-5">
                      <h2 className="editorial text-[1.6rem] leading-tight tracking-[-0.025em] text-ink transition-colors duration-500 group-hover:text-green">
                        {job.title}
                      </h2>
                      <p className="mt-1 text-[14px] text-muted">{job.company}</p>
                    </div>
                    <dl className="flex flex-wrap gap-x-5 gap-y-1 text-[13px] text-ink/75 lg:col-span-5">
                      <div className="flex gap-1.5"><dt className="sr-only">Location</dt><dd>{job.location}</dd></div>
                      <div className="flex gap-1.5"><dt className="sr-only">Industry</dt><dd>{job.industry}</dd></div>
                      {job.experience && (
                        <div className="flex gap-1.5"><dt className="sr-only">Experience</dt><dd>{job.experience}</dd></div>
                      )}
                      <div>
                        <dt className="sr-only">Type</dt>
                        <dd className="border border-green/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-dark-green">
                          {job.employmentType}
                        </dd>
                      </div>
                    </dl>
                    <span className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-dark-green lg:col-span-2 lg:justify-end">
                      View &amp; apply <span aria-hidden className="btn-arrow">→</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <CTASection
        title="Don't see what fits?"
        subtitle="Tell us what you're looking for — we'll contact you when a matching role opens."
        primaryLabel="Share what you're looking for"
      />
    </>
  );
}
