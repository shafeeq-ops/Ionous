import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy — Ionous",
  description:
    "How Ionous uses cookies and similar technologies on the ionous.ai website.",
};

export default function CookiesPage() {
  return (
    <main className="bg-ink text-foreground min-h-screen">
      <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        <Link
          href="/"
          className="eyebrow inline-flex items-center gap-2 text-muted hover:text-foreground transition-colors mb-10"
        >
          <span aria-hidden>←</span> Back to Ionous
        </Link>

        <div className="eyebrow mb-4">Legal</div>
        <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-3">
          Cookie Policy
        </h1>
        <p className="text-muted text-sm">Last updated: May 2026</p>

        <div className="mt-12 space-y-10 text-foreground/85 leading-relaxed">
          <Section title="What cookies we use">
            <p>
              Ionous uses a minimal set of first-party and analytics cookies on
              ionous.ai. We do not use advertising or cross-site tracking
              cookies.
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>
                <strong>Strictly necessary.</strong> Required for basic site
                function (e.g., cookie-banner dismissal state stored in
                <code className="ml-1 px-1 py-0.5 bg-white/5 rounded text-xs">
                  localStorage
                </code>
                ).
              </li>
              <li>
                <strong>Analytics.</strong> Aggregated, anonymized usage
                statistics via Google Analytics. No personally identifying
                information is recorded or shared.
              </li>
            </ul>
          </Section>

          <Section title="Your choices">
            You can clear or block cookies through your browser's settings.
            Blocking analytics cookies does not affect site functionality. To
            opt out of Google Analytics across all sites, install the official{" "}
            <a
              className="underline hover:text-foreground"
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noreferrer noopener"
            >
              opt-out browser add-on
            </a>
            .
          </Section>

          <Section title="Third parties">
            We do not sell or share cookie data with third parties beyond
            Google's standard analytics processing terms.
          </Section>

          <Section title="Contact">
            Questions about cookies can be sent to{" "}
            <a
              href="mailto:privacy@ionous.ai"
              className="underline hover:text-foreground"
            >
              privacy@ionous.ai
            </a>
            .
          </Section>
        </div>

        <p className="mt-16 text-xs text-muted">
          This page is a working draft pending review by counsel.
        </p>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="eyebrow mb-3">{title}</h2>
      <div className="text-base md:text-lg">{children}</div>
    </section>
  );
}
