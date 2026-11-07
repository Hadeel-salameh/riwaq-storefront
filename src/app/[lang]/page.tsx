import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Coffee,
  Flame,
  Gem,
  Images,
  Lamp,
  Layers,
  Shapes,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { Marquee } from "@/components/marquee";
import { ProductCard } from "@/components/product-card";
import { HeroIn, Reveal } from "@/components/reveal";
import {
  categoryKeys,
  getDictionary,
  type CategoryKey,
} from "@/lib/dictionaries";
import { defaultLocale, isLocale, localizedPath, formatNumber } from "@/lib/i18n";
import { getProducts, toProductView } from "@/lib/products";

export const dynamic = "force-dynamic";

const CATEGORY_ICONS: Record<CategoryKey, LucideIcon> = {
  perfumes: Sparkles,
  hospitality: Coffee,
  spices: Flame,
  lighting: Lamp,
  ceramics: Shapes,
  textiles: Layers,
  jewelry: Gem,
};

const STORY_IMAGE =
  "https://images.pexels.com/photos/38036783/pexels-photo-38036783.jpeg?auto=compress&cs=tinysrgb&w=1600";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : defaultLocale;
  const dict = getDictionary(locale);
  const products = await getProducts();
  const featured = products
    .filter((p) => p.featured)
    .map((p) => toProductView(p, locale));

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative flex min-h-[100svh] items-end overflow-hidden">
        <Image
          src="/images/hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/25" />
        <div className="absolute inset-0 from-ink/70 via-transparent to-transparent rtl:bg-gradient-to-l ltr:bg-gradient-to-r" />

        <div className="relative mx-auto w-full max-w-7xl px-5 pb-20 pt-40 sm:px-8">
          <HeroIn>
            <p className="inline-flex items-center gap-2.5 rounded-full border border-gold/30 bg-ink/40 px-4 py-2 text-xs font-medium tracking-[0.25em] text-gold-soft backdrop-blur">
              <Sparkles className="size-3.5" aria-hidden="true" />
              {dict.hero.kicker}
            </p>
          </HeroIn>

          <HeroIn delay={0.12}>
            <h1 className="mt-7 max-w-4xl font-display text-[clamp(2.6rem,7.2vw,5.4rem)] leading-[1.06] text-sand">
              {dict.hero.titleA}
              <br />
              <span className="text-gold-soft">{dict.hero.titleB}</span>
            </h1>
          </HeroIn>

          <HeroIn delay={0.24}>
            <p className="mt-6 max-w-2xl text-base leading-8 text-sand/75 sm:text-lg">
              {dict.hero.subtitle}
            </p>
          </HeroIn>

          <HeroIn delay={0.36}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href={localizedPath("/gallery", locale)}
                className="btn-gold"
              >
                <Images className="size-4" aria-hidden="true" />
                {dict.hero.ctaGallery}
              </Link>
              <a href="#collection" className="btn-ghost">
                {dict.hero.ctaCollection}
                <ArrowDown className="size-4" aria-hidden="true" />
              </a>
            </div>
          </HeroIn>

          <HeroIn delay={0.48}>
            <dl className="mt-16 grid max-w-xl grid-cols-3 gap-6 border-t border-sand/15 pt-8">
              {dict.hero.stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="font-display text-3xl text-gold-soft sm:text-4xl" dir="ltr">
                    {stat.value}
                  </dd>
                  <dd className="mt-1.5 text-xs text-sand-dim">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </HeroIn>
        </div>

        <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-sand-dim md:flex">
          <span className="text-[10px] uppercase tracking-[0.3em]">
            {dict.hero.scroll}
          </span>
          <ArrowDown className="size-4 animate-bounce" aria-hidden="true" />
        </div>
      </section>

      <Marquee items={dict.marquee} />

      {/* ── Featured collection ──────────────────────────────────── */}
      <section id="collection" className="mx-auto max-w-7xl scroll-mt-28 px-5 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">
                {dict.featured.kicker}
              </p>
              <h2 className="mt-4 font-display text-4xl leading-tight text-sand sm:text-5xl">
                {dict.featured.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-sand-dim">
                {dict.featured.subtitle}
              </p>
            </div>
            <Link
              href={localizedPath("/gallery", locale)}
              className="link-underline inline-flex items-center gap-2 text-sm font-medium text-gold-soft"
            >
              {dict.featured.viewAll}
              <ArrowLeft className="size-4 rtl:inline ltr:hidden" aria-hidden="true" />
              <ArrowRight className="size-4 rtl:hidden ltr:inline" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>

        {featured.length === 0 ? (
          <p className="mt-14 rounded-3xl border border-dashed border-line px-8 py-16 text-center text-sm leading-7 text-sand-dim">
            {dict.featured.empty}
          </p>
        ) : (
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((product, i) => (
              <Reveal key={product.slug} delay={i * 0.08}>
                <ProductCard product={product} locale={locale} priority={i < 3} />
              </Reveal>
            ))}
          </div>
        )}
      </section>

      {/* ── Story ────────────────────────────────────────────────── */}
      <section id="story" className="border-y border-line bg-coal">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-2">
          <Reveal>
            <div className="relative">
              <div className="sheen relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-line">
                <Image
                  src={STORY_IMAGE}
                  alt={dict.story.title}
                  fill
                  sizes="(min-width: 1024px) 45vw, 92vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
              </div>
              <div className="absolute -bottom-6 end-6 animate-floaty rounded-2xl border border-gold/30 bg-ink/90 px-6 py-4 backdrop-blur">
                <p className="font-display text-2xl text-gold-soft" dir="ltr">
                  1962
                </p>
                <p className="mt-1 text-[11px] tracking-wide text-sand-dim">
                  {dict.hero.kicker}
                </p>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">
                {dict.story.kicker}
              </p>
              <h2 className="mt-4 font-display text-4xl leading-tight text-sand sm:text-5xl">
                {dict.story.title}
              </h2>
            </Reveal>
            {dict.story.body.map((paragraph, i) => (
              <Reveal key={i} delay={0.1 + i * 0.08}>
                <p className="mt-6 leading-8 text-sand/75">{paragraph}</p>
              </Reveal>
            ))}
            <Reveal delay={0.3}>
              <p className="mt-8 font-display text-xl text-gold-soft">
                {dict.story.signature}
              </p>
              <Link
                href={localizedPath("/gallery", locale)}
                className="btn-ghost mt-8"
              >
                {dict.story.cta}
                <ArrowLeft className="size-4 rtl:inline ltr:hidden" aria-hidden="true" />
                <ArrowRight className="size-4 rtl:hidden ltr:inline" aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Categories ───────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">
            {dict.categories.kicker}
          </p>
          <h2 className="mt-4 font-display text-4xl leading-tight text-sand sm:text-5xl">
            {dict.categories.title}
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-sand-dim">
            {dict.categories.subtitle}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categoryKeys.map((key, i) => {
            const Icon = CATEGORY_ICONS[key];
            const category = dict.categories.items[key];
            const first = i === 0;
            return (
              <Reveal key={key} delay={i * 0.05} className={first ? "sm:col-span-2" : ""}>
                <Link
                  href={`${localizedPath("/gallery", locale)}?category=${key}`}
                  className="group sheen flex h-full flex-col justify-between rounded-3xl border border-line bg-panel p-6 transition-colors duration-500 hover:border-gold/50 sm:p-7"
                >
                  <div className="flex items-start justify-between">
                    <span className="grid size-12 place-items-center rounded-2xl border border-gold/25 bg-gold/10 text-gold-soft">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <ArrowLeft
                      className="size-5 text-sand-dim transition-all duration-500 group-hover:-translate-x-1 group-hover:text-gold-soft rtl:inline ltr:hidden"
                      aria-hidden="true"
                    />
                    <ArrowRight
                      className="size-5 text-sand-dim transition-all duration-500 group-hover:translate-x-1 group-hover:text-gold-soft rtl:hidden ltr:inline"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-10">
                    <h3 className="font-display text-2xl text-sand">
                      {category.name}
                    </h3>
                    <p className="mt-2 text-xs leading-6 text-sand-dim">
                      {category.blurb}
                    </p>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ── Gallery CTA banner ───────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-5 pb-8 sm:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-gold/25 bg-panel px-6 py-16 text-center sm:px-12 sm:py-20">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-32 start-1/2 h-72 w-[36rem] max-w-[90vw] -translate-x-1/2 rounded-full bg-gold/15 blur-[100px] rtl:translate-x-1/2"
            />
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">
              {dict.gallery.kicker}
            </p>
            <h2 className="mx-auto mt-5 max-w-2xl font-display text-3xl leading-snug text-sand sm:text-5xl sm:leading-tight">
              {dict.banner.title}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-sand-dim">
              {dict.banner.subtitle}
            </p>
            <Link
              href={localizedPath("/gallery", locale)}
              className="btn-gold mt-9"
            >
              <Images className="size-4" aria-hidden="true" />
              {dict.banner.cta}
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
