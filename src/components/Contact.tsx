"use client";

import { useState } from "react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  return (
    <section id="contact" className="bg-ink relative">
      <div className="mx-auto max-w-[1400px] px-6 py-28 md:py-36">
        <div className="border-b border-rule pb-10 mb-12">
          <div className="eyebrow mb-4">Contact</div>
          <h2 className="text-4xl md:text-6xl font-medium tracking-tight text-foreground max-w-4xl">
            Request a Briefing.
          </h2>
          <p className="mt-5 text-foreground/70 max-w-2xl">
            Tell us about your mission, your existing systems, and the
            constraints you're operating under. We respond within two business
            days.
          </p>
        </div>

        {submitted ? (
          <div className="border border-rule rounded-md p-10 text-center">
            <div className="eyebrow mb-3">Confirmation</div>
            <p className="text-xl text-foreground">
              Briefing request received. We&apos;ll be in touch shortly.
            </p>
          </div>
        ) : (
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setError(null);
              setSubmitting(true);
              const form = e.currentTarget;
              const data = new FormData(form);
              const payload = Object.fromEntries(data.entries());
              try {
                const res = await fetch("/api/contact", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(payload),
                });
                const json = (await res.json()) as { ok: boolean; error?: string };
                if (!json.ok) {
                  setError(json.error ?? "Something went wrong. Please try again.");
                  return;
                }
                setSubmitted(true);
              } catch {
                setError("Network error. Please try again.");
              } finally {
                setSubmitting(false);
              }
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl"
          >
            <p className="hidden">
              <label>
                Don&apos;t fill this out: <input name="bot-field" />
              </label>
            </p>
            <Field name="name" label="Name" />
            <Field name="email" label="Email" type="email" />
            <Field name="company" label="Program or company" className="md:col-span-2" />
            <Field
              name="message"
              label="Message"
              textarea
              className="md:col-span-2"
              placeholder="Space operations, C2 integration, software modernization..."
            />
            {error && (
              <p className="md:col-span-2 text-sm text-red-400" role="alert">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={submitting}
              className="md:col-span-2 inline-flex h-12 w-fit items-center rounded-full bg-foreground px-6 text-sm font-medium text-ink hover:bg-foreground/85 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? "Sending…" : "Submit Briefing Request"}
              <span aria-hidden className="ml-2">→</span>
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

function Field({
  name,
  label,
  type = "text",
  textarea = false,
  className = "",
  placeholder,
}: {
  name: string;
  label: string;
  type?: string;
  textarea?: boolean;
  className?: string;
  placeholder?: string;
}) {
  const common =
    "w-full bg-transparent border-b border-rule focus:border-foreground focus:outline-none py-3 text-foreground placeholder:text-muted";
  return (
    <label className={`flex flex-col gap-2 ${className}`}>
      <span className="eyebrow">{label}</span>
      {textarea ? (
        <textarea
          name={name}
          rows={4}
          required
          className={common}
          placeholder={placeholder}
        />
      ) : (
        <input
          type={type}
          name={name}
          required
          className={common}
          placeholder={placeholder}
        />
      )}
    </label>
  );
}
