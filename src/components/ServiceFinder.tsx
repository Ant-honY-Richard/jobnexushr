import Link from "next/link";
import { SERVICES } from "@/lib/services";
import { IconBadge } from "./icons/JNIcon";

/**
 * "Start from your situation" — routes an employer from a plain-language need to the right service.
 * Each row is one link (the whole row is the target). Used on /employers and /staffing.
 */
export function ServiceFinder({
  title,
  intro,
  exclude,
}: {
  title: React.ReactNode;
  intro?: string;
  /** Slug to leave out (e.g. the page you are already on). */
  exclude?: string;
}) {
  const rows = SERVICES.filter((s) => s.slug !== exclude);
  return (
    <section className="border-t border-rule bg-off-white py-14 lg:py-24">
      <div className="mx-auto px-6 lg:px-10" style={{ maxWidth: "1480px" }}>
        <div className="grid grid-cols-1 gap-y-6 lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">/ Find the right service</p>
            <h2 className="editorial mt-4 text-[clamp(2rem,4.2vw,3.75rem)] leading-[1] tracking-[-0.035em] text-ink">
              {title}
            </h2>
          </div>
          {intro && (
            <p className="max-w-md text-[15px] leading-relaxed text-muted lg:col-span-5 lg:col-start-8 lg:self-end">
              {intro}
            </p>
          )}
        </div>

        <ul className="mt-10 border-t border-ink lg:mt-14">
          {rows.map((s) => (
            <li key={s.slug} className="border-b border-rule">
              <Link
                href={s.href}
                data-cursor="cta"
                className="group grid grid-cols-[auto_1fr_auto] items-center gap-x-4 py-5 transition-colors duration-500 hover:bg-ink/[0.025] sm:gap-x-6 lg:grid-cols-12 lg:gap-x-8 lg:py-6"
              >
                <span className="hidden lg:col-span-1 lg:block font-mono text-[11px] tracking-[0.18em] text-muted">{s.code}</span>
                <IconBadge name={s.icon} size="sm" className="lg:hidden" />
                <span className="min-w-0 lg:col-span-6">
                  <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-muted lg:hidden">If you need</span>
                  <span className="mt-1 block text-[16px] leading-snug text-ink lg:mt-0 lg:text-[clamp(1.15rem,1.6vw,1.45rem)] lg:tracking-[-0.02em]">
                    {s.need}
                  </span>
                  <span className="mt-1 block font-mono text-[11px] uppercase tracking-[0.16em] text-dark-green lg:hidden">
                    {s.name}
                  </span>
                </span>
                <span className="hidden lg:col-span-4 lg:flex lg:items-center lg:gap-4">
                  <IconBadge name={s.icon} size="sm" />
                  <span className="editorial text-[1.35rem] leading-tight tracking-[-0.025em] text-ink transition-colors duration-500 group-hover:text-green">
                    {s.name}
                  </span>
                </span>
                <span aria-hidden className="btn-arrow text-[18px] text-green lg:col-span-1 lg:justify-self-end">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
