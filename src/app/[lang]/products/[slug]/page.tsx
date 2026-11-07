import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Heart,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { getDictionary } from "@/lib/dictionaries";
import { defaultLocale, isLocale, localizedPath } from "@/lib/i18n";
import {
  getProductBySlug,
  getRelatedProducts,
  toProductView,
} from "@/lib/products";

export const dynamic = "force-dynamic";

type PageParams = { lang: string; slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale = isLocale(lang) ? lang : defaultLocale;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "404" };
  return {
    title: locale === "ar" ? product.nameAr : product.nameEn,
    description:
      locale === "ar" ? product.descriptionAr : product.descriptionEn,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { lang, slug } = await params;
  const locale = isLocale(lang) ? lang : defaultLocale;
  const dict = getDictionary(locale);

  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const view = toProductView(product, locale);
  const related = (await getRelatedProducts(product)).map((p) =>
    toProductView(p, locale),
  );

  const BackArrow = locale === "ar" ? ArrowRight : ArrowLeft;

  return (
    <div className="mx-auto max-w-7xl px-5 pb-24 pt-32 sm:px-8 sm:pt-36">
      <Reveal y={16}>
        <Link
          href={localizedPath("/gallery", locale)}
          className="link-underline inline-flex items-center gap-2 text-sm text-sand-dim transition-colors hover:text-gold-soft"
        >
          <BackArrow className="size-4" aria-hidden="true" />
          {dict.product.back}
        </Link>
      </Reveal>

      <div className="mt-10 grid items-start gap-12 lg:grid-cols-2">
        <Reveal>
          <div className="sheen relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-line bg-panel">
            <Image
              src={view.imageUrl}
              alt={view.imageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 46vw, 92vw"
              className="object-cover"
            />
            <span className="absolute start-5 top-5 rounded-full border border-sand/20 bg-ink/55 px-4 py-1.5 text-xs font-medium text-sand backdrop-blur-md">
              {view.categoryName}
            </span>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <Link
              href={`${localizedPath("/gallery", locale)}?category=${view.category}`}
              className="text-xs font-semibold uppercase tracking-[0.3em] text-gold transition-colors hover:text-gold-soft"
            >
              {view.categoryName}
            </Link>
            <h1 className="mt-4 font-display text-4xl leading-tight text-sand sm:text-5xl">
              {view.name}
            </h1>
            <p className="mt-5 font-display text-3xl text-gold-soft">
              {view.price}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-7 text-base leading-8 text-sand/80">
              {view.description}
            </p>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-7 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-xs font-medium text-gold-soft">
              <BadgeCheck className="size-4" aria-hidden="true" />
              {dict.product.inStock}
            </p>
          </Reveal>

          <Reveal delay={0.22}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button type="button" className="btn-gold">
                <ShoppingBag className="size-4" aria-hidden="true" />
                {dict.product.addToCart}
              </button>
              <button
                type="button"
                aria-label="wishlist"
                className="grid size-[50px] place-items-center rounded-full border border-line text-sand transition hover:border-gold hover:text-gold-soft"
              >
                <Heart className="size-5" aria-hidden="true" />
              </button>
            </div>
          </Reveal>

          <Reveal delay={0.28}>
            <div className="mt-10 rounded-3xl border border-line bg-panel p-6 sm:p-7">
              <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
                {dict.product.details}
              </h2>
              <dl className="mt-5 divide-y divide-line">
                {[...dict.product.detailRows, [dict.product.sku, view.slug] as [string, string]].map(
                  ([term, value]) => (
                    <div
                      key={term}
                      className="flex items-center justify-between gap-6 py-3.5 text-sm"
                    >
                      <dt className="text-sand-dim">{term}</dt>
                      <dd className="text-sand">{value}</dd>
                    </div>
                  ),
                )}
              </dl>
            </div>
            <p className="mt-6 flex items-start gap-2.5 text-xs leading-6 text-sand-dim">
              <Truck className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
              {dict.product.note}
            </p>
          </Reveal>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-24">
          <Reveal>
            <h2 className="font-display text-3xl text-sand sm:text-4xl">
              {dict.product.related}
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item, i) => (
              <Reveal key={item.slug} delay={i * 0.07}>
                <ProductCard product={item} locale={locale} />
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
