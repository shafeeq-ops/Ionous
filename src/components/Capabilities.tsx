"use client";

import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import type { ServiceSlug } from "./ServiceModel";

const Scene = dynamic(() => import("./Scene"), { ssr: false });

type Capability = {
  slug: ServiceSlug;
  label: string;
  headline: string;
  body: string;
};

const CAPABILITIES: Capability[] = [
  {
    slug: "space-infrastructure",
    label: "Space Infrastructure",
    headline: "Operating Layer for the Modern Space Enterprise",
    body: "Bus-agnostic ground software, mission planning, and orbital ops tooling that compresses the distance between command intent and on-orbit action.",
  },
  {
    slug: "software-engineering",
    label: "Software Engineering",
    headline: "Full-Stack Development for Mission-Critical Systems",
    body: "Cloud-native, secure-by-design software engineered for environments where reliability, latency, and auditability are non-negotiable.",
  },
  {
    slug: "mission-systems",
    label: "Mission Systems",
    headline: "Operating Layer for Warfighting Decision Advantage",
    body: "Sensor-to-shooter integration, AI-assisted operator cockpits, and decision systems hardened for the operational edge.",
  },
  {
    slug: "enterprise-integration",
    label: "Enterprise Integration",
    headline: "Decision Advantage Across the Enterprise",
    body: "Connect legacy platforms, commercial cloud, and classified enclaves—so your teams deploy faster without sacrificing security or sovereignty.",
  },
];

export default function Capabilities() {
  const [activeSlug, setActiveSlug] = useState<ServiceSlug>(CAPABILITIES[0].slug);
  const detailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!detailRef.current) return;
    gsap.fromTo(
      detailRef.current,
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" },
    );
  }, [activeSlug]);

  const active = CAPABILITIES.find((c) => c.slug === activeSlug) ?? CAPABILITIES[0];

  return (
    <section id="capabilities" className="section-paper relative">
      <div className="mx-auto max-w-[1400px] px-6 py-28 md:py-36">
        <div className="border-b border-rule-light pb-10 mb-12">
          <div className="eyebrow mb-4">Capabilities</div>
          <h2 className="text-4xl md:text-6xl font-medium tracking-tight">
            Foundational Infrastructure &amp; Software.
            <br />
            Delivered for Mission.<sup className="text-xl align-top">™</sup>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20">
          <ul className="flex flex-col">
            {CAPABILITIES.map((cap) => {
              const isActive = cap.slug === activeSlug;
              return (
                <li key={cap.slug} className="border-b border-rule-light">
                  <button
                    onClick={() => setActiveSlug(cap.slug)}
                    className={`group w-full text-left py-6 transition-colors ${
                      isActive ? "text-foreground-on-paper" : "text-muted-on-paper hover:text-foreground-on-paper"
                    }`}
                  >
                    <div className="ornament text-2xl md:text-3xl font-medium tracking-tight">
                      {cap.label}
                    </div>
                    <div className="mt-1 text-sm text-muted-on-paper">{cap.headline}</div>
                  </button>
                </li>
              );
            })}
          </ul>

          <div ref={detailRef} className="flex flex-col gap-8">
            <div className="aspect-[4/3] w-full rounded-sm overflow-hidden bg-ink relative">
              <Scene variant="service" slug={active.slug} />
              <div className="absolute top-4 left-4 eyebrow text-foreground/80">
                {active.label.replace(/\s/g, " · ").toUpperCase()}
              </div>
            </div>
            <div>
              <div className="eyebrow mb-3">{active.label}</div>
              <h3 className="text-3xl md:text-4xl font-medium tracking-tight leading-tight">
                {active.headline}
              </h3>
              <p className="mt-5 text-base md:text-lg text-foreground-on-paper/75 leading-relaxed max-w-xl">
                {active.body}
              </p>
              <a
                href="#contact"
                className="mt-8 inline-flex items-center text-sm font-medium border-b border-foreground-on-paper/40 pb-1 hover:border-foreground-on-paper transition-colors"
              >
                Explore {active.label}
                <span aria-hidden className="ml-2">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
