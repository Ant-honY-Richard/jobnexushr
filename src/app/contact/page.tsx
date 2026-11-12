import Image from "next/image";
import { CONTACT } from "@/lib/site";
import { JNIcon } from "@/components/icons/JNIcon";
import { db } from "@/db";
import { contactSubmissions } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { ContactForm } from "@/components/ContactForm";

export const metadata = {
  title: "Contact — Job Nexus HR",
  description:
    "Tell us what you need. We'll tell you how we'd handle it.",
};

export const dynamic = "force-dynamic";

function clean(value: FormDataEntryValue | null, max: number): string | null {
  const v = typeof value === "string" ? value.trim().slice(0, max) : "";
  return v || null;
}

async function submitContact(formData: FormData) {
  "use server";
  const name = clean(formData.get("name"), 200);
  const email = clean(formData.get("email"), 200);
  const message = clean(formData.get("message"), 5000);
  if (!name || !email || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("Invalid submission");
  }
  await db.insert(contactSubmissions).values({
    name,
    email,
    phone: clean(formData.get("phone"), 50),
    company: clean(formData.get("company"), 200),
    subject: clean(formData.get("subject"), 300),
    message,
  });
  revalidatePath("/contact");
}

const TYPES = [
  { value: "employer", label: "I'm hiring" },
  { value: "candidate", label: "I'm looking for work" },
  { value: "partnership", label: "Partnership" },
  { value: "other", label: "Something else" },
];

const NEXT = [
  { title: "We read it", body: "A person at Job Nexus HR reads your message — no auto-replies." },
  { title: "We reply", body: "Within one business day, with questions or next steps." },
  { title: "We talk it through", body: "For larger hiring needs, a short call before we propose anything." },
];

/** Line icons (24px grid, 1.6 stroke) — same family as the form fields. */
const LINE = {
  mail: "M4 6h16v12H4zM4 7l8 6 8-6",
  phone:
    "M6.6 3.5h2.6l1.3 3.6-1.8 1.2a11 11 0 0 0 5 5l1.2-1.8 3.6 1.3v2.6a2 2 0 0 1-2.2 2A15.5 15.5 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2Z",
  pin: "M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Zm0-8.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-13v5l3 2",
  arrow: "M5 12h14M13 6l6 6-6 6",
};

function Line({ d, className = "h-5 w-5" }: { d: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={d} />
    </svg>
  );
}

/** Contact card in the same language as the form's choice cards: white, rounded, icon circle, lift on hover. */
function ContactCard({ href, icon, label, value, note }: { href?: string; icon: string; label: string; value: string; note?: string }) {
  const inner = (
    <>
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-green/10 text-ink transition-colors duration-300 group-hover:bg-green group-hover:text-white">
        <Line d={icon} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[12px] font-medium uppercase tracking-[0.1em] text-muted">{label}</span>
        <span className="mt-0.5 block truncate text-[16px] font-semibold text-ink">{value}</span>
        {note && <span className="block text-[13px] text-muted">{note}</span>}
      </span>
      {href && (
        <span className="text-ink/30 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-green">
          <Line d={LINE.arrow} className="h-4 w-4" />
        </span>
      )}
    </>
  );
  const cls =
    "group flex items-center gap-4 rounded-2xl border border-ink/12 bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-green/50 hover:shadow-[0_16px_30px_-22px_rgba(4,46,39,0.5)]";
  return href ? (
    <a href={href} className={cls}>
      {inner}
    </a>
  ) : (
    <div className={cls}>{inner}</div>
  );
}

/** Small numbered label — the same badge the form uses for its steps. */
const StepLabel = ({ n, children }: { n: string; children: React.ReactNode }) => (
  <p className="flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.12em] text-ink/80">
    <span className="grid h-6 w-6 place-items-center rounded-full bg-green/12 font-mono text-[11px] text-dark-green">{n}</span>
    {children}
  </p>
);

export default function ContactPage() {
  return (
    <>
      <section
        className="relative overflow-hidden pb-12 pt-28 lg:pb-16 lg:pt-32"
        style={{ background: "linear-gradient(180deg, #F2F8F5 0%, #F6FAF8 45%, #FAF9F7 100%)" }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-[30%] hidden h-[900px] w-[700px] rotate-[28deg] rounded-[80px] bg-gradient-to-b from-green/[0.07] to-transparent lg:block"
        />

        <div
          className="relative mx-auto grid grid-cols-1 items-start gap-y-10 px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-x-12 lg:px-10 xl:gap-x-16"
          style={{ maxWidth: "1480px" }}
        >
          {/* Left — stays in view while the (taller) form scrolls */}
          <div className="lg:sticky lg:top-28">
            <span className="inline-flex items-center gap-2 rounded-full border border-green/25 bg-white px-3 py-1.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-dark-green shadow-[0_8px_20px_-16px_rgba(4,46,39,0.5)]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-green/50" />
                <span className="relative h-2 w-2 rounded-full bg-green" />
              </span>
              Contact us
            </span>
            <h1
              className="editorial mt-5 text-[clamp(3rem,12vw,4.2rem)] leading-[0.98] tracking-[-0.04em] text-ink lg:text-[clamp(3.4rem,5vw,5.2rem)]"
              style={{ fontWeight: 700 }}
            >
              How can
              <br />
              <span className="text-green">we help?</span>
            </h1>
            <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-ink/75">
              Hiring, looking for work or exploring a partnership — a real person reads every message and
              replies within one business day.
            </p>

            {/* Contact cards + office photo */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,0.78fr)]">
              <div className="space-y-3">
                <ContactCard href={`mailto:${CONTACT.email}`} icon={LINE.mail} label="Email us" value={CONTACT.email} />
                <ContactCard href={`tel:${CONTACT.tel}`} icon={LINE.phone} label="Call us" value={CONTACT.phone} />
                <ContactCard icon={LINE.pin} label="Our location" value={CONTACT.city} note="Job Nexus HR — Recruitment & Staffing" />
                <div className="flex items-center gap-4 rounded-2xl bg-gradient-to-r from-green/[0.12] to-green/[0.03] p-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-green text-white">
                    <Line d={LINE.clock} />
                  </span>
                  <span>
                    <span className="block text-[15px] font-semibold text-ink">Reply within one business day</span>
                    <span className="block text-[13px] text-ink/65">From a person, not an auto-reply</span>
                  </span>
                </div>
              </div>

              <figure className="relative hidden overflow-hidden rounded-3xl border border-white bg-white shadow-[0_24px_50px_-30px_rgba(4,46,39,0.5)] sm:block">
                <Image
                  src="/visuals/contact-office-sketch.webp"
                  alt="Pencil sketch of the Job Nexus HR office building"
                  fill
                  sizes="(min-width: 1024px) 18vw, 40vw"
                  className="object-cover object-[52%_45%]"
                />
                <figcaption className="absolute bottom-3 left-3 right-3 flex items-center gap-2 rounded-xl bg-white/95 px-3 py-2 text-[12px] font-medium text-ink backdrop-blur">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-green text-white">
                    <Line d={LINE.pin} className="h-3.5 w-3.5" />
                  </span>
                  {CONTACT.city}
                </figcaption>
                <span aria-hidden className="absolute right-0 top-0 h-14 w-14 bg-green" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%)" }} />
              </figure>
            </div>

            <div className="mt-8 hidden sm:block">
              <p className="font-script text-[1.8rem] leading-none text-ink/85 xl:text-[2rem]">
                Let&apos;s build a stronger workforce together.
              </p>
              <svg viewBox="0 0 300 20" className="ml-24 mt-1 h-4 w-64 text-green" fill="none" aria-hidden>
                <path d="M2 16 C 90 4, 190 2, 298 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* Right — form card */}
          <div className="relative z-10">
            <span
              aria-hidden
              className="absolute -right-2 -top-3 hidden h-28 w-28 rounded-tr-[34px] border-r-[10px] border-t-[10px] border-green/80 sm:block"
            />
            <div className="relative rounded-[28px] border border-white bg-white p-6 shadow-[0_40px_90px_-40px_rgba(4,46,39,0.45)] sm:p-8 lg:p-10">
              <div className="mb-8 flex items-center gap-5">
                <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-green text-white shadow-[0_14px_30px_-12px_rgba(14,149,106,0.8)] lg:h-[72px] lg:w-[72px]">
                  <JNIcon name="mail" className="jn-icon-on-green h-8 w-8 [stroke-width:1.8]" />
                </span>
                <div>
                  <h2 className="text-[clamp(1.5rem,2.4vw,2rem)] font-semibold leading-tight tracking-[-0.02em] text-ink">
                    Send us a message
                  </h2>
                  <p className="mt-1 text-[15px] text-ink/70">Fill in the form and we&apos;ll get back to you shortly.</p>
                </div>
              </div>
              <ContactForm action={submitContact} types={TYPES} />
            </div>
          </div>
        </div>
      </section>

      {/* What happens next — same cards, badges and progress line as the form */}
      <section className="border-t border-rule bg-off-white py-14 lg:py-20">
        <div className="mx-auto px-6 lg:px-10" style={{ maxWidth: "1480px" }}>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <StepLabel n="→">After you send it</StepLabel>
              <h2 className="editorial mt-4 text-[clamp(2rem,4vw,3.2rem)] leading-[1.02] tracking-[-0.035em] text-ink" style={{ fontWeight: 700 }}>
                What happens <span className="text-green">next.</span>
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-[13px] text-ink/70">
              {["Trusted by businesses across India", "People. Process. Progress."].map((t) => (
                <span key={t} className="rounded-full border border-ink/10 bg-white px-3 py-1.5">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="relative mt-10">
            <span aria-hidden className="absolute left-0 right-0 top-[22px] hidden h-1.5 rounded-full bg-ink/[0.06] md:block" />
            <span aria-hidden className="absolute left-0 top-[22px] hidden h-1.5 w-2/3 rounded-full bg-gradient-to-r from-green to-dark-green md:block" />
            <ol className="relative grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
              {NEXT.map((n, i) => (
                <li key={n.title} className="flex gap-4 md:block">
                  <span
                    className={`relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full font-mono text-[13px] ring-4 ring-off-white ${
                      i < 2 ? "bg-green text-white" : "border border-green/40 bg-white text-dark-green"
                    }`}
                  >
                    0{i + 1}
                  </span>
                  <div className="flex-1 rounded-2xl border border-ink/12 bg-white p-5 md:mt-5">
                    <p className="text-[17px] font-semibold text-ink">{n.title}</p>
                    <p className="mt-1.5 text-[14px] leading-relaxed text-ink/70">{n.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
