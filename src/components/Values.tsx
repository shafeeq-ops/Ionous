"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

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
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      ScrollTrigger.batch("[data-value-card]", {
        start: "top 85%",
        once: true,
        onEnter: (batch) =>
          gsap.fromTo(
            batch,
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, stagger: 0.08, duration: 0.6, ease: "power2.out" },
          ),
      });
      ScrollTrigger.batch("[data-value-bullet]", {
        start: "top 90%",
        once: true,
        onEnter: (batch) =>
          gsap.fromTo(
            batch,
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, stagger: 0.06, duration: 0.5, ease: "power2.out" },
          ),
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="values" className="bg-ink relative">
      <div className="mx-auto max-w-[1400px] px-6 py-28 md:py-36">
        <div className="border-b border-rule pb-10 mb-12">
          <div className="eyebrow mb-4">Values</div>
          <h2 className="text-4xl md:text-6xl font-medium tracking-tight text-foreground max-w-4xl">
            What Makes Ionous Different.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 mb-20">
          {VALUES.map((v) => (
            <div
              key={v.num}
              data-value-card
              className="group relative flex flex-col border-t border-rule pt-8 pl-4 -ml-4 pr-4 rounded-sm transition-colors duration-300 hover:bg-white/[0.025]"
            >
              <span
                aria-hidden
                className="absolute left-0 top-0 h-px w-0 bg-foreground transition-[width] duration-500 ease-out group-hover:w-16"
              />
              <div className="text-4xl md:text-5xl font-medium tracking-tight text-muted mb-6 tabular-nums">
                {v.num}
              </div>
              <h3 className="text-2xl md:text-3xl font-medium tracking-tight text-foreground">
                {v.title}
              </h3>
              <p className="mt-4 text-foreground/70 leading-relaxed max-w-xl">
                {v.body}
              </p>
            </div>
          ))}
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-rule pt-10">
          {BULLETS.map((b) => (
            <li
              key={b}
              data-value-bullet
              className="text-sm md:text-base text-muted leading-relaxed"
            >
              <span className="ornament" />
              {b}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
