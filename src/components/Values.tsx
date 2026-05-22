const VALUES = [
  {
    num: "01",
    title: "Day-One Operational Value",
    body: "Scoped to your mission thread and existing systems. We deliver outcomes, not slide decks.",
  },
  {
    num: "02",
    title: "Mission-Grade Technology",
    body: "Secure-by-design architecture for enterprise and defense workloads. Built to survive the operational edge.",
  },
  {
    num: "03",
    title: "Full-Stack Interoperability",
    body: "We meet you where you are—connecting with and enhancing your existing data, ground segment, and mission software.",
  },
  {
    num: "04",
    title: "Multi-Layered Security & Data Sovereignty",
    body: "Security that enables collaboration instead of blocking it. Built for classified, ITAR, and enterprise compliance from the ground up.",
  },
];

const BULLETS = [
  "AI-assisted engineering workflows without compromising authority.",
  "Cross-functional teams: engineering, ops, and program leadership.",
  "Proven delivery across space, defense, and national security sectors.",
];

export default function Values() {
  return (
    <section id="values" className="section-paper relative">
      <div className="mx-auto max-w-[1400px] px-6 py-28 md:py-36">
        <div className="border-b border-rule-light pb-10 mb-12">
          <div className="eyebrow mb-4">Values</div>
          <h2 className="text-4xl md:text-6xl font-medium tracking-tight max-w-4xl">
            What Makes Ionous Different.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 mb-20">
          {VALUES.map((v) => (
            <div key={v.num} className="flex flex-col border-t border-rule-light pt-8">
              <div className="eyebrow mb-5">{v.num}</div>
              <h3 className="text-2xl md:text-3xl font-medium tracking-tight">
                {v.title}
              </h3>
              <p className="mt-4 text-foreground-on-paper/75 leading-relaxed max-w-xl">{v.body}</p>
            </div>
          ))}
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-rule-light pt-10">
          {BULLETS.map((b) => (
            <li key={b} className="text-sm md:text-base text-muted-on-paper leading-relaxed">
              <span className="ornament" />
              {b}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
