import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Amiri, IBM_Plex_Sans_Arabic, Marcellus } from "next/font/google";
import "../globals.css";
import { SiteNavbar } from "@/components/site-navbar";
import { SiteFooter } from "@/components/site-footer";
import { getDictionary } from "@/lib/dictionaries";
import { defaultLocale, dirOf, isLocale, locales } from "@/lib/i18n";

/* Local, build-time font loading — works identically offline on Windows. */
const amiri = Amiri({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  variable: "--font-amiri",
  display: "swap",
});
const plex = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-plex",
  display: "swap",
});
const marcellus = Marcellus({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-marcellus",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : defaultLocale;
  const dict = getDictionary(locale);
  return {
    title: {
      default: `${dict.brand.name} — ${dict.brand.tagline}`,
      template: `%s · ${dict.brand.name}`,
    },
    description: dict.hero.subtitle,
  };
}

export const viewport: Viewport = {
  themeColor: "#0b0906",
};

/**
 * The root layout lives inside the [lang] segment so that <html lang dir>
 * always matches the requested language (ar → RTL, en → LTR).
 */
export default async function LangLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : defaultLocale;
  const dict = getDictionary(locale);

  return (
    <html
      lang={locale}
      dir={dirOf(locale)}
      className={`${amiri.variable} ${plex.variable} ${marcellus.variable}`}
      data-scroll-behavior="smooth"
    >
      <body className="flex min-h-dvh flex-col">
        <div className="grain" aria-hidden="true" />
        <SiteNavbar locale={locale} dict={dict} />
        <main className="flex-1">{children}</main>
        <SiteFooter locale={locale} dict={dict} />
      </body>
    </html>
  );
}