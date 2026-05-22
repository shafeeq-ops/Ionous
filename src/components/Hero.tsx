"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import dynamic from "next/dynamic";

const Scene = dynamic(() => import("./Scene"), { ssr: false });

export default function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(eyebrowRef.current, {
        opacity: 0,
        y: 12,
        duration: 0.8,
        ease: "power2.out",
      });
      gsap.from(headlineRef.current, {
        opacity: 0,
        y: 28,
        duration: 1.2,
        delay: 0.15,
        ease: "power3.out",
      });
      gsap.from(subRef.current, {
        opacity: 0,
        y: 18,
        duration: 1,
        delay: 0.4,
        ease: "power2.out",
      });
      gsap.from(ctaRef.current, {
        opacity: 0,
        y: 14,
        duration: 0.9,
        delay: 0.6,
        ease: "power2.out",
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative min-h-[100svh] overflow-hidden hero-vignette">
      <div className="absolute inset-0 z-0">
        <Scene variant="hero" />
      </div>
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-ink/30 to-ink pointer-events-none" />
      <div className="relative z-20 mx-auto flex min-h-[100svh] max-w-[1400px] flex-col justify-end px-6 pb-24 pt-32">
        <div ref={eyebrowRef} className="eyebrow mb-6">
          Infrastructure &amp; Software Consultancy
        </div>
        <h1
          ref={headlineRef}
          className="max-w-5xl text-[clamp(2.5rem,6.5vw,6rem)] font-medium leading-[0.95] tracking-tight text-foreground"
        >
          Mission-Critical Systems
          <br />
          for Space &amp; Defense.
        </h1>
        <p
          ref={subRef}
          className="mt-8 max-w-2xl text-lg text-foreground/75 leading-relaxed"
        >
          We design, build, and integrate software and infrastructure for
          enterprise space operators and warfighting organizations—where
          failure is not an option.
        </p>
        <div ref={ctaRef} className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#contact"
            className="inline-flex h-12 items-center rounded-full bg-foreground px-6 text-sm font-medium text-ink hover:bg-foreground/85 transition-colors"
          >
            Request a Briefing
            <span aria-hidden className="ml-2">→</span>
          </a>
          <a
            href="#capabilities"
            className="inline-flex h-12 items-center rounded-full border border-foreground/30 px-6 text-sm text-foreground hover:border-foreground transition-colors"
          >
            Explore Capabilities
          </a>
        </div>
      </div>
    </section>
  );
}
