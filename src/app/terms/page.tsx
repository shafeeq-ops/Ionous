import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms — Ionous",
  description:
    "Terms of use for the Ionous website. For services agreements, please contact us directly.",
};

export default function TermsPage() {
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
          Terms of Use
        </h1>
        <p className="text-muted text-sm">Last updated: May 2026</p>

        <div className="mt-12 space-y-10 text-foreground/85 leading-relaxed">
          <Section title="Acceptance">
            By accessing or using the Ionous website, you agree to these terms.
            If you do not agree, please discontinue use of the site. These terms
            do not govern services we deliver under a separate written
            agreement.
          </Section>

          <Section title="Use of the site">
            <p>
              The site is provided for informational purposes. You agree not to:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>
                Reverse engineer, scrape, or attempt to disrupt the site or its
                infrastructure;
              </li>
              <li>
                Submit briefing requests containing material you do not have the
                right to share, or that is misleading, unlawful, or harmful;
              </li>
              <li>Misrepresent your identity or affiliation.</li>
            </ul>
          </Section>

          <Section title="Intellectual property">
            All text, imagery, source code, 3D models, and design elements on
            this site are owned by Ionous or our licensors. No license to reuse
            or republish is granted by your access to the site.
          </Section>

          <Section title="No warranty">
            The site is provided on an &ldquo;as is&rdquo; and &ldquo;as
            available&rdquo; basis. Ionous makes no warranties, express or
            implied, regarding the operation of the site or the accuracy of its
            content.
          </Section>

          <Section title="Limitation of liability">
            To the maximum extent permitted by law, Ionous will not be liable
            for any indirect, incidental, special, or consequential damages
            arising from your use of the site.
          </Section>

          <Section title="Contact">
            For terms governing engagements, partnerships, or procurement,
            contact{" "}
            <a
              href="mailto:legal@ionous.com"
              className="underline hover:text-foreground"
            >
              legal@ionous.com
            </a>
            .
          </Section>
        </div>

        <p className="mt-16 text-xs text-muted">
          This page is a working draft pending review by counsel. Reach out to
          us if you need a fully executed copy for procurement.
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
