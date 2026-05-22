const PILLARS = [
  {
    eyebrow: "Layer 01",
    title: "Secure-by-design infrastructure",
    body: "Multi-layered security and data sovereignty built for classified, ITAR, and enterprise compliance from the ground up. Security that enables collaboration instead of blocking it.",
  },
  {
    eyebrow: "Layer 02",
    title: "AI-assisted engineering",
    body: "Operator-led AI workflows that accelerate delivery without compromising authority. Models serve operators; operators stay in command of the decision.",
  },
  {
    eyebrow: "Layer 03",
    title: "Full-stack interoperability",
    body: "Ionous meets you where you are, connecting with and enhancing your existing data systems, ground segment, and mission software.",
  },
];

export default function Technology() {
  return (
    <section id="technology" className="bg-ink relative">
      <div className="mx-auto max-w-[1400px] px-6 py-28 md:py-36">
        <div className="border-b border-rule pb-10 mb-12">
          <div className="eyebrow mb-4">Technology</div>
          <h2 className="text-4xl md:text-6xl font-medium tracking-tight text-foreground max-w-4xl">
            Mission-grade technology, delivered as an operating layer.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14">
          {PILLARS.map((p) => (
            <div key={p.title} className="flex flex-col border-t border-rule pt-8">
              <div className="eyebrow mb-5">{p.eyebrow}</div>
              <h3 className="text-2xl md:text-3xl font-medium tracking-tight leading-tight">
                {p.title}
              </h3>
              <p className="mt-5 text-foreground/70 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
