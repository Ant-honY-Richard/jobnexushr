"use client";

export function Marquee() {
  const items = [
    "Better talent",
    "Brighter futures",
    "One account manager",
    "Verified people",
    "Support after day one",
    "Every industry",
  ];
  const doubled = [...items, ...items, ...items];

  return (
    <section className="bg-ink text-off-white py-10 lg:py-14 border-y border-off-white/15 overflow-hidden relative">
      <div className="marquee-track">
        {doubled.map((t, i) => (
          <div key={i} className="flex items-center gap-10 px-8 shrink-0">
            <span className="editorial text-[clamp(2.5rem,6vw,6rem)] leading-none tracking-[-0.04em] text-off-white whitespace-nowrap">
              {t}
            </span>
            <span className="block w-3 h-3 rounded-full bg-green shrink-0" />
          </div>
        ))}
      </div>
    </section>
  );
}
