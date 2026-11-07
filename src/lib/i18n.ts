export const locales = ["ar", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ar";

export function isLocale(value: string | null | undefined): value is Locale {
  return value === "ar" || value === "en";
}

/** Text direction for a locale. */
export function dirOf(locale: Locale): "rtl" | "ltr" {
  return locale === "ar" ? "rtl" : "ltr";
}

/** Prefix a path with the locale, e.g. localizedPath("/gallery", "en") → "/en/gallery". */
export function localizedPath(path: string, locale: Locale): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${normalized === "/" ? "" : normalized}`;
}

/** Format a numeric price coming from the DB as localized SAR currency. */
export function formatPrice(value: string | number, locale: Locale): string {
  const amount = typeof value === "string" ? Number(value) : value;
  if (!Number.isFinite(amount)) return String(value);
  return new Intl.NumberFormat(locale === "ar" ? "ar-SA" : "en-US", {
    style: "currency",
    currency: "SAR",
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Format an integer with localized digits. */
export function formatNumber(value: number, locale: Locale): string {
  return new Intl.NumberFormat(locale === "ar" ? "ar-SA" : "en-US", {
    maximumFractionDigits: 0,
  }).format(value);
}
