import { db } from "@/db";
import { jobs, jobApplications } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { PageHero } from "@/components/PageHero";
import { SignatureLine } from "@/components/SignatureLine";
import { JobApplicationForm } from "@/components/JobApplicationForm";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { notFound } from "next/navigation";

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

function clean(value: FormDataEntryValue | null, max: number): string | null {
  const v = typeof value === "string" ? value.trim().slice(0, max) : "";
  return v || null;
}

async function applyAction(formData: FormData) {
  "use server";
  const jobId = Number(formData.get("jobId"));
  const fullName = clean(formData.get("fullName"), 200);
  const email = clean(formData.get("email"), 200);
  const phone = clean(formData.get("phone"), 50);
  if (
    !Number.isInteger(jobId) ||
    !fullName ||
    !email ||
    !phone ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    throw new Error("Invalid application");
  }
  const open = await db
    .select({ id: jobs.id })
    .from(jobs)
    .where(and(eq(jobs.id, jobId), eq(jobs.isActive, true)))
    .limit(1);
  if (open.length === 0) throw new Error("Job not available");
  await db.insert(jobApplications).values({
    jobId,
    fullName,
    email,
    phone,
    experience: clean(formData.get("experience"), 100),
    coverNote: clean(formData.get("coverNote"), 5000),
  });
  revalidatePath(`/jobs/${jobId}`);
}

export default async function JobDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  // Postgres serial ids are 32-bit; reject anything else before querying.
  if (!/^\d{1,9}$/.test(id)) notFound();
  const jobId = Number(id);

  let job: JobRow | null = null;
  try {
    const result = await db
      .select()
      .from(jobs)
      .where(and(eq(jobs.id, jobId), eq(jobs.isActive, true)))
      .limit(1);
    job = (result[0] as JobRow | undefined) ?? null;
  } catch {
    job = null;
  }

  if (!job) notFound();

  return (
    <>
      <PageHero
        index={`/ Jobs / ${job.id}`}
        label={job.industry}
        crumbs={[{ label: "Jobs", href: "/jobs" }, { label: job.title }]}
        title={
          <>
            {job.title}
            <br />
            <span className="text-muted text-[0.7em] tracking-tight">
              {job.company}
            </span>
          </>
        }
        description={
          <dl className="flex flex-wrap gap-x-8 gap-y-3">
            {[
              ["Location", job.location],
              ["Type", job.employmentType],
              ["Industry", job.industry],
              ...(job.experience ? [["Experience", job.experience]] : []),
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">{k}</dt>
                <dd className="mt-1 text-[15px] text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        }
      />

      <section className="bg-off-white py-14 lg:py-20 border-t border-rule">
        <div className="mx-auto px-6 lg:px-10" style={{ maxWidth: "1480px" }}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 gap-x-10">
            <div className="lg:col-span-7">
              <article>
                <h2 className="editorial text-2xl text-ink mb-3 tracking-[-0.025em]">
                  About the role
                </h2>
                <p className="text-[15px] leading-relaxed text-ink/80 whitespace-pre-line">
                  {job.description}
                </p>

                {job.responsibilities && (
                  <div className="mt-10">
                    <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-green mb-4">
                      Responsibilities
                    </h3>
                    <p className="text-[14px] leading-relaxed text-ink/80 whitespace-pre-line">
                      {job.responsibilities}
                    </p>
                  </div>
                )}

                {job.requirements && (
                  <div className="mt-10">
                    <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-green mb-4">
                      Requirements
                    </h3>
                    <p className="text-[14px] leading-relaxed text-ink/80 whitespace-pre-line">
                      {job.requirements}
                    </p>
                  </div>
                )}

                <div className="mt-12">
                  <SignatureLine />
                </div>
              </article>
            </div>

            <aside className="lg:col-span-4 lg:col-start-9">
              <div className="border border-rule p-6 lg:p-8 sticky top-32">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted mb-2">
                  Apply for this role
                </p>
                <h3 className="editorial text-2xl text-ink mb-6 tracking-[-0.025em]">
                  Send us your details.
                </h3>
                <JobApplicationForm jobId={job.id} jobTitle={job.title} action={applyAction} />

                <div className="mt-8 pt-6 border-t border-rule">
                  <Link
                    href="/jobs"
                    className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted hover:text-green inline-flex items-center gap-2 transition-colors"
                  >
                    ← Back to all jobs
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
