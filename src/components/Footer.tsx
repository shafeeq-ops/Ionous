"use client";

const NAVIGATION = [
  { label: "Home", href: "#top" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Technology", href: "#technology" },
  { label: "Engagement", href: "#engagement" },
  { label: "Values", href: "#values" },
  { label: "Contact", href: "#contact" },
];

const INDUSTRIES = [
  { label: "Aerospace Infrastructure", href: "#contact" },
  { label: "Robotics & Autonomy", href: "#contact" },
  { label: "Industrial & Manufacturing", href: "#contact" },
  { label: "Logistics & Supply Chain", href: "#contact" },
  { label: "Defense & Dual-Use", href: "#contact" },
  { label: "Mission Operations", href: "#contact" },
  { label: "Hospital Operations", href: "#contact" },
  { label: "Data Protection", href: "#contact" },
];

const CAPABILITIES = [
  { label: "Mission Ops Copilots", href: "#contact" },
  { label: "Telemetry AI", href: "#contact" },
  { label: "Anomaly Detection", href: "#contact" },
  { label: "Simulation Intelligence", href: "#contact" },
  { label: "Autonomous Orchestration", href: "#contact" },
  { label: "Edge AI", href: "#contact" },
  { label: "Predictive Maintenance", href: "#contact" },
  { label: "Digital Twins", href: "#contact" },
  { label: "Routing Intelligence", href: "#contact" },
  { label: "Mission Intelligence", href: "#contact" },
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1.3fr_1fr] gap-10 lg:gap-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="font-mono text-base tracking-[0.22em] uppercase text-foreground mb-4">
              ionous.ai
            </div>
            <p className="text-sm text-foreground/65 leading-relaxed max-w-sm">
              Infrastructure and software consultancy for enterprise space and
              warfighting organizations.
            </p>
          </div>

          <FooterColumn title="Navigation" items={NAVIGATION} />
          <FooterColumn title="Industries" items={INDUSTRIES} />
          <FooterColumn title="Capabilities" items={CAPABILITIES} />
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
