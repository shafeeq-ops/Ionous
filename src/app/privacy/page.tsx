import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy — Ionous",
  description:
    "How Ionous collects, uses, and protects information submitted through our website and briefing requests.",
};

export default function PrivacyPage() {
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
          Privacy Policy
        </h1>
        <p className="text-muted text-sm">Last updated: May 2026</p>

        <div className="mt-12 space-y-10 text-foreground/85 leading-relaxed">
          <Section title="Overview">
            Ionous (&ldquo;we,&rdquo; &ldquo;us&rdquo;) provides software and
            systems integration services to enterprise and government customers.
            This policy describes the limited information we collect when you
            visit our website or submit a briefing request, how we use it, and
            the choices available to you.
          </Section>

          <Section title="Information we collect">
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Briefing requests.</strong> Name, work email, program or
                company affiliation, and the contents of your message.
              </li>
              <li>
                <strong>Technical metadata.</strong> Browser user agent,
                referring page, and timestamp of submission, used to detect
                abuse and route inquiries.
              </li>
              <li>
                <strong>Anonymous analytics.</strong> Aggregate page-view
                statistics through our hosting provider. We do not place
                advertising or cross-site tracking cookies.
              </li>
            </ul>
          </Section>

          <Section title="How we use it">
            Submission contents are forwarded to our internal intake workflow so
            we can respond to your inquiry. We do not sell or rent personal
            information, and we do not use briefing-request data for marketing
            unrelated to your inquiry.
          </Section>

          <Section title="Retention">
            We retain briefing-request records for as long as an active business
            relationship is reasonably foreseeable, after which records are
            deleted or anonymized.
          </Section>

          <Section title="Your choices">
            You may request access to, correction of, or deletion of information
            we hold about you by writing to{" "}
            <a
              href="mailto:privacy@ionous.com"
              className="underline hover:text-foreground"
            >
              privacy@ionous.com
            </a>
            . We will respond within a reasonable time.
          </Section>

          <Section title="Contact">
            Questions about this policy can be sent to{" "}
            <a
              href="mailto:privacy@ionous.com"
              className="underline hover:text-foreground"
            >
              privacy@ionous.com
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
