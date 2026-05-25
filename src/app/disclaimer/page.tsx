import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer — Ionous",
  description:
    "General disclaimer regarding the content and use of the Ionous website.",
};

export default function DisclaimerPage() {
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
          Disclaimer
        </h1>
        <p className="text-muted text-sm">Last updated: May 2026</p>

        <div className="mt-12 space-y-10 text-foreground/85 leading-relaxed">
          <Section title="Informational purpose">
            The content on ionous.ai is provided for informational purposes
            only. While we strive for accuracy, Ionous makes no representations
            or warranties of any kind, express or implied, about the
            completeness, accuracy, reliability, or availability of any
            information on the site.
          </Section>

          <Section title="No professional advice">
            Nothing on this site constitutes legal, financial, engineering,
            procurement, or other professional advice. Engagements with Ionous
            are governed by signed agreements; references to capabilities,
            timelines, or outcomes on this site are illustrative and do not
            constitute commitments.
          </Section>

          <Section title="No affiliation or endorsement">
            References to public agencies, programs, vendors, or third-party
            technologies on this site do not imply affiliation with, sponsorship
            by, or endorsement from those entities unless explicitly stated.
            Trademarks belong to their respective owners.
          </Section>

          <Section title="External links">
            The site may link to external resources for context. Ionous is not
            responsible for the content, accuracy, or availability of any
            third-party site reached through such links.
          </Section>

          <Section title="Use at your own risk">
            Any reliance you place on information from this site is strictly at
            your own risk. Ionous will not be liable for any loss or damage
            arising from such reliance.
          </Section>

          <Section title="Contact">
            Questions about this disclaimer can be sent to{" "}
            <a
              href="mailto:legal@ionous.ai"
              className="underline hover:text-foreground"
            >
              legal@ionous.ai
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
