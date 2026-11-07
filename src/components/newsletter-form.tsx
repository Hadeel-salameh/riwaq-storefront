"use client";

import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import type { Dictionary } from "@/lib/dictionaries";

export function NewsletterForm({
  dict,
}: {
  dict: Dictionary["footer"]["newsletter"];
}) {
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <p className="mt-4 inline-flex items-center gap-2 rounded-2xl border border-gold/40 bg-gold/10 px-4 py-3 text-sm text-gold-soft">
        <CheckCircle2 className="size-4" aria-hidden="true" />
        {dict.thanks}
      </p>
    );
  }

  return (
    <form
      className="mt-4 flex overflow-hidden rounded-full border border-line bg-ink focus-within:border-gold/60"
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
    >
      <input
        type="email"
        required
        dir="ltr"
        placeholder={dict.placeholder}
        aria-label={dict.placeholder}
        className="min-w-0 flex-1 bg-transparent px-5 py-3 text-sm text-sand placeholder:text-sand-dim/60 focus:outline-none ltr:text-left rtl:text-right"
      />
      <button
        type="submit"
        className="inline-flex items-center gap-2 bg-gold px-5 text-sm font-semibold text-ink transition hover:bg-gold-soft"
      >
        <Send className="size-4 rtl:-scale-x-100" aria-hidden="true" />
        <span className="hidden sm:inline">{dict.button}</span>
      </button>
    </form>
  );
}
