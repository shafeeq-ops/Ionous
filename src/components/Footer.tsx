"use client";

const NAVIGATION = [
  { label: "Home", href: "#top" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Technology", href: "#technology" },
  { label: "Engagement", href: "#engagement" },
  { label: "Values", href: "#values" },
  { label: "Contact", href: "#contact" },
];

const LEGAL = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Cookie Policy", href: "/cookies" },
  { label: "Disclaimer", href: "/disclaimer" },
];

export default function Footer() {
  return (
    <footer className="bg-ink-2 border-t border-rule">
      <div className="mx-auto max-w-[1400px] px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr_1fr] gap-12 lg:gap-16">
          <div>
            <div className="font-mono text-base tracking-[0.22em] uppercase text-foreground mb-4">
              ionous.ai
            </div>
            <p className="text-sm text-foreground/65 leading-relaxed max-w-sm">
              Infrastructure and software consultancy for enterprise space and
              warfighting organizations.
            </p>
          </div>

          <FooterColumn title="Navigation" items={NAVIGATION} />
          <FooterColumn title="Legal" items={LEGAL} />
        </div>

        <div className="mt-14 pt-8 border-t border-rule flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} ionous.ai. All rights reserved.
          </p>
          <a
            href="#top"
            aria-label="Back to top"
            className="inline-flex h-9 w-9 items-center justify-center border border-rule rounded-md text-foreground/70 hover:text-foreground hover:border-foreground/40 transition-colors"
          >
            <span aria-hidden>↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  items,
}: {
  title: string;
  items: { label: string; href: string }[];
}) {
  return (
    <div>
      <div className="eyebrow mb-5">{title}</div>
      <ul className="flex flex-col gap-3">
        {items.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              className="text-sm text-foreground/75 hover:text-foreground transition-colors"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
