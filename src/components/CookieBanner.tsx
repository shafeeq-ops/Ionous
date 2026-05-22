"use client";

import { useEffect, useState } from "react";

const KEY = "ionous.cookies.v1";

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!localStorage.getItem(KEY)) setShow(true);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-4 inset-x-4 md:inset-x-auto md:right-6 md:left-auto md:max-w-md z-40 border border-rule bg-ink/95 backdrop-blur p-4 rounded-md flex items-start gap-4">
      <p className="text-xs text-foreground/80 leading-relaxed flex-1">
        We use minimal analytics cookies to understand how visitors use this
        site. No personal data is sold or shared.
      </p>
      <button
        type="button"
        onClick={() => {
          localStorage.setItem(KEY, "accepted");
          setShow(false);
        }}
        className="text-xs font-medium uppercase tracking-wider text-foreground border-b border-foreground/60 hover:border-foreground transition-colors"
      >
        Dismiss
      </button>
    </div>
  );
}
