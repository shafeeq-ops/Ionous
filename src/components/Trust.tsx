import Image from "next/image";

const ICONS = [
  { src: "/icons/satellite.svg", label: "Satellite" },
  { src: "/icons/rocket.svg", label: "Rocket" },
  { src: "/icons/ground-station.svg", label: "Ground station" },
  { src: "/icons/radar.svg", label: "Radar" },
  { src: "/icons/comms.svg", label: "Comms" },
  { src: "/icons/shield.svg", label: "Security" },
];

export default function Trust() {
  return (
    <section className="bg-ink-2 border-y border-rule">
      <div className="mx-auto max-w-[1400px] px-6 py-20">
        <div className="text-center mb-12">
          <div className="eyebrow mb-3">Where we operate</div>
          <p className="text-xl md:text-2xl text-foreground/85 max-w-3xl mx-auto">
            Orbit, ground, edge, classified — built for the systems that protect
            critical missions.
          </p>
        </div>
        <ul className="grid grid-cols-3 md:grid-cols-6 gap-6 md:gap-10 items-center">
          {ICONS.map((icon) => (
            <li
              key={icon.label}
              className="flex flex-col items-center gap-3 opacity-65 hover:opacity-100 transition-opacity"
            >
              <Image
                src={icon.src}
                alt={icon.label}
                width={40}
                height={40}
                className="h-10 w-10 invert"
              />
              <span className="eyebrow text-[10px]">{icon.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
