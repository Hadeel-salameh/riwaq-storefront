"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Languages } from "lucide-react";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";

/** Swaps the leading /ar|/en segment of the current path. */
export function LanguageSwitcher({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const pathname = usePathname() ?? `/${locale}`;
  const target: Locale = locale === "ar" ? "en" : "ar";
  const href = pathname.replace(/^\/(ar|en)(?=\/|$)/, `/${target}`);

  return (
    <Link
      href={href === pathname ? `/${target}` : href}
      aria-label={dict.language.label}
      className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-xs font-semibold text-sand/85 transition-colors duration-300 hover:border-gold hover:text-gold-soft"
    >
      <Languages className="size-4 text-gold" aria-hidden="true" />
      <span>{dict.language.switchTo}</span>
    </Link>
  );
}
