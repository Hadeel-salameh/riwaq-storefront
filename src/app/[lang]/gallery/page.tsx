import type { Metadata } from "next";
import { Images } from "lucide-react";
import { GalleryView } from "@/components/gallery-view";
import { Reveal } from "@/components/reveal";
import { getDictionary, isCategoryKey, type CategoryKey } from "@/lib/dictionaries";
import { defaultLocale, formatNumber, isLocale } from "@/lib/i18n";
import { getProducts, toProductView } from "@/lib/products";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = getDictionary(isLocale(lang) ? lang : defaultLocale);
  return { title: dict.gallery.title, description: dict.gallery.subtitle };
}

export default async function GalleryPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ category?: string }>;
}) {
  const [{ lang }, sp] = await Promise.all([params, searchParams]);
  const locale = isLocale(lang) ? lang : defaultLocale;
  const dict = getDictionary(locale);
  const items = (await getProducts()).map((p) => toProductView(p, locale));
  const initialCategory: CategoryKey | null =
    sp.category && isCategoryKey(sp.category) ? sp.category : null;

  return (
    <div className="mx-auto max-w-7xl px-5 pb-24 pt-32 sm:px-8 sm:pt-36">
      <Reveal y={20}>
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">
          {dict.gallery.kicker}
        </p>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
          <h1 className="max-w-2xl font-display text-4xl leading-tight text-sand sm:text-6xl">
            {dict.gallery.title}
          </h1>
          {items.length > 0 && (
            <p className="inline-flex items-center gap-2.5 rounded-full border border-line px-4 py-2 text-sm text-sand-dim">
              <Images className="size-4 text-gold" aria-hidden="true" />
              {formatNumber(items.length, locale)} {dict.gallery.pieces}
            </p>
          )}
        </div>
        <p className="mt-5 max-w-2xl text-sm leading-7 text-sand-dim sm:text-base sm:leading-8">
          {dict.gallery.subtitle}
        </p>
      </Reveal>

      <div className="mt-12">
        <GalleryView
          items={items}
          locale={locale}
          labels={dict.gallery}
          initialCategory={initialCategory}
        />
      </div>
    </div>
  );
}
