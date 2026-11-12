import Link from "next/link";

/**
 * Closing call-to-action band. `tone="light"` is used on pages whose previous section is already dark,
 * so two ink blocks never stack (and the dark footer still follows a clear change of surface).
 */
export function CTASection({
  title,
  subtitle,
  primaryHref = "/contact",
  primaryLabel = "Tell us what you need",
  secondaryHref,
  secondaryLabel,
  tone = "dark",
}: {
  title: string;
  subtitle?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  tone?: "dark" | "light";
}) {
  const dark = tone === "dark";
  return (
    <section
      className={`py-14 lg:py-20 ${dark ? "on-dark text-off-white" : "border-t border-rule bg-off-white text-ink"}`}
      // Dark band uses the footer's green-black so the two read as one continuous closing surface.
      style={dark ? { background: "linear-gradient(180deg, #0c1d19 0%, #081815 100%)" } : undefined}
    >
      <div className="mx-auto px-6 lg:px-10" style={{ maxWidth: "1480px" }}>
        <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-green">/ Next step</p>
            <h2
              className={`editorial text-[clamp(2.2rem,5vw,5rem)] leading-[0.98] tracking-[-0.04em] ${
                dark ? "text-off-white" : "text-ink"
              }`}
            >
              {title}
            </h2>
            {subtitle && (
              <p className={`mt-6 max-w-xl text-[16px] leading-relaxed ${dark ? "text-off-white/70" : "text-muted"}`}>
                {subtitle}
              </p>
            )}
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row lg:flex-col">
            <Link
              href={primaryHref}
              data-cursor="cta"
              className={`group inline-flex items-center justify-center gap-4 border px-6 py-4 font-mono text-[11px] uppercase tracking-[0.18em] transition-all duration-500 ${
                dark
                  ? "border-green bg-green text-ink hover:bg-off-white hover:border-off-white"
                  : "border-ink bg-ink text-off-white hover:border-green hover:bg-green hover:text-ink"
              }`}
            >
              {primaryLabel} <span className="btn-arrow">→</span>
            </Link>
            {secondaryHref && secondaryLabel && (
              <Link
                href={secondaryHref}
                data-cursor="link"
                className={`group inline-flex items-center justify-center gap-4 border px-6 py-4 font-mono text-[11px] uppercase tracking-[0.18em] transition-all duration-500 hover:border-green hover:text-green ${
                  dark ? "border-off-white/30" : "border-ink/15"
                }`}
              >
                {secondaryLabel} <span className="btn-arrow">→</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
