"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const ITEMS = [
  { href: "#capabilities", label: "Capabilities" },
  { href: "#technology", label: "Technology" },
  { href: "#engagement", label: "Engagement" },
  { href: "#values", label: "Values" },
  { href: "#crew", label: "Crew" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-30 transition-colors duration-300 ${
        scrolled ? "border-b border-rule bg-ink/85 backdrop-blur" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-14 max-w-[1400px] items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="block h-2 w-2 rounded-full bg-foreground transition-transform group-hover:scale-125" />
          <span className="font-mono text-sm tracking-[0.22em] uppercase text-foreground">
            Ionous
          </span>
        </Link>
        <ul className="hidden md:flex items-center gap-7 text-sm text-foreground/75">
          {ITEMS.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="hover:text-foreground transition-colors">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="inline-flex h-9 items-center rounded-full border border-foreground/40 px-4 text-sm text-foreground hover:bg-foreground hover:text-ink transition-colors"
        >
          Request Briefing
        </a>
      </nav>
    </header>
  );
}
