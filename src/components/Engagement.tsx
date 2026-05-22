const TRACKS = [
  {
    eyebrow: "Primary engagement",
    title: "Request a Briefing",
    body: "A working session with our principal engineers and program leads. We bring a point of view on your mission thread, your existing systems, and where Ionous would deliver day-one operational value.",
    cta: "Submit Briefing Request",
    href: "#contact",
  },
  {
    eyebrow: "Workshop format",
    title: "Mission Readiness Workshops",
    body: "A scoped, hands-on workshop with your operators and engineering leadership. Outputs include an integration map, a risk-ranked backlog, and a 30/60/90 path to first production capability.",
    cta: "Schedule a Workshop",
    href: "#contact",
  },
];

export default function Engagement() {
  return (
    <section id="engagement" className="section-paper relative">
      <div className="mx-auto max-w-[1400px] px-6 py-28 md:py-36">
        <div className="border-b border-rule-light pb-10 mb-12">
          <div className="eyebrow mb-4">Engagement</div>
          <h2 className="text-4xl md:text-6xl font-medium tracking-tight max-w-4xl">
            Two ways to start with Ionous.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {TRACKS.map((t) => (
            <div key={t.title} className="flex flex-col border-t border-rule-light pt-10">
              <div className="eyebrow mb-5">{t.eyebrow}</div>
              <h3 className="text-3xl md:text-4xl font-medium tracking-tight">{t.title}</h3>
              <p className="mt-5 text-base md:text-lg text-foreground-on-paper/75 leading-relaxed max-w-xl">
                {t.body}
              </p>
              <a
                href={t.href}
                className="mt-10 inline-flex h-12 w-fit items-center rounded-full bg-foreground-on-paper px-6 text-sm font-medium text-paper hover:bg-foreground-on-paper/85 transition-colors"
              >
                {t.cta}
                <span aria-hidden className="ml-2">→</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
