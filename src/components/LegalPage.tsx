import Link from "next/link";
import { PageHero } from "./PageHero";
import { LEGAL } from "@/lib/site";

export type LegalSection = { id: string; title: string; body: React.ReactNode };

/**
 * Long-form layout for Privacy / Terms / Cookies: a contents list (sticky on desktop), numbered
 * sections at a comfortable reading measure, and links to the sibling policies.
 */
export function LegalPage({
  index,
  label,
  title,
  intro,
  sections,
  note,
  current,
}: {
  index: string;
  label: string;
  title: React.ReactNode;
  intro: React.ReactNode;
  sections: LegalSection[];
  note?: React.ReactNode;
  current: "/privacy" | "/terms" | "/cookies";
}) {
  const siblings = [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Use" },
    { href: "/cookies", label: "Cookie Policy" },
  ] as const;

  return (
    <>
      <PageHero index={index} label={label} title={title} />
      <section className="bg-off-white py-12 lg:py-20">
        <div className="mx-auto grid grid-cols-1 gap-y-10 px-6 lg:grid-cols-12 lg:gap-x-8 lg:px-10" style={{ maxWidth: "1480px" }}>
          <aside className="lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">On this page</p>
              <ol className="mt-4 border-t border-rule">
                {sections.map((s, i) => (
                  <li key={s.id} className="border-b border-rule">
                    <a href={`#${s.id}`} className="flex gap-3 py-3 text-[14px] text-ink/80 transition-colors hover:text-green">
                      <span className="font-mono text-[11px] tracking-[0.18em] text-muted">{String(i + 1).padStart(2, "0")}</span>
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
              <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">Related</p>
              <ul className="mt-3 space-y-1">
                {siblings
                  .filter((p) => p.href !== current)
                  .map((p) => (
                    <li key={p.href}>
                      <Link href={p.href} className="inline-block py-1 text-[14px] text-dark-green link-underline">
                        {p.label}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </aside>

          <article className="lg:col-span-8 lg:col-start-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">Last updated: {LEGAL.policyDate}</p>
            <div className="prose-jn mt-4 max-w-[68ch] text-[17px]">{intro}</div>
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className="mt-12 scroll-mt-28 border-t border-rule pt-8 lg:mt-14">
                <p className="font-mono text-[11px] tracking-[0.18em] text-dark-green">{String(i + 1).padStart(2, "0")}</p>
                <h2 id={`${s.id}-h`} className="editorial mt-2 text-[clamp(1.6rem,2.6vw,2.2rem)] leading-tight tracking-[-0.03em] text-ink">
                  {s.title}
                </h2>
                <div className="prose-jn mt-5 max-w-[68ch]">{s.body}</div>
              </section>
            ))}
            {note && (
              <div className="mt-14 max-w-[68ch] border-l-2 border-green bg-green/5 px-5 py-4 text-[14px] leading-relaxed text-ink/75">
                {note}
              </div>
            )}
          </article>
        </div>
      </section>
    </>
  );
}
