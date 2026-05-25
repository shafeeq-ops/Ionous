"use client";

import { useEffect } from "react";

const DURATION = 550;
const NAV_OFFSET = 72;

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

function animateScrollTo(targetY: number) {
  const startY = window.scrollY;
  const distance = targetY - startY;
  if (Math.abs(distance) < 4) return;
  const startTime = performance.now();

  let cancelled = false;
  const cancel = () => {
    cancelled = true;
    window.removeEventListener("wheel", cancel, { capture: true });
    window.removeEventListener("touchstart", cancel, { capture: true });
    window.removeEventListener("keydown", cancel, { capture: true });
  };
  window.addEventListener("wheel", cancel, { capture: true, passive: true, once: true });
  window.addEventListener("touchstart", cancel, { capture: true, passive: true, once: true });
  window.addEventListener("keydown", cancel, { capture: true, once: true });

  const step = (now: number) => {
    if (cancelled) return;
    const elapsed = now - startTime;
    const t = Math.min(elapsed / DURATION, 1);
    window.scrollTo(0, startY + distance * easeOutCubic(t));
    if (t < 1) requestAnimationFrame(step);
    else cancel();
  };
  requestAnimationFrame(step);
}

export default function SmoothScroll() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest?.("a[href^='#']") as HTMLAnchorElement | null;
      if (!link) return;
      const href = link.getAttribute("href");
      if (!href || href === "#") return;
      const id = href.slice(1);
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      const targetY = Math.max(0, el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET);
      if (reduceMotion) {
        window.scrollTo(0, targetY);
      } else {
        animateScrollTo(targetY);
      }
      history.replaceState(null, "", href);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
