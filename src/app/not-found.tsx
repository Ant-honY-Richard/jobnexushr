import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-[80vh] flex items-center bg-off-white pt-32 pb-16 px-6">
      <div className="mx-auto" style={{ maxWidth: "1480px" }}>
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
          404 / Not found
        </span>
        <h1 className="editorial text-[clamp(3rem,8vw,8rem)] leading-[0.95] tracking-[-0.04em] text-ink mt-6 max-w-4xl">
          We couldn&apos;t find
          <br />
          that <span className="text-green">page.</span>
        </h1>
        <p className="mt-6 max-w-md text-[15px] leading-relaxed text-muted">
          It may have moved, or the link may be wrong. Head home, or tell us what you were looking for.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-3">
          <Link
            href="/"
            className="group inline-flex items-center gap-4 bg-ink text-off-white border border-ink hover:bg-green hover:text-ink hover:border-green px-6 py-4 font-mono text-[11px] uppercase tracking-[0.18em] transition-all duration-500"
          >
            Back home <span className="btn-arrow">→</span>
          </Link>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-4 border border-ink/15 px-6 py-4 font-mono text-[11px] uppercase tracking-[0.18em] hover:border-green hover:text-green transition-colors duration-500"
          >
            Contact us <span className="btn-arrow">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
