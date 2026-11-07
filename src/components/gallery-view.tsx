"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpLeft,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  ImageOff,
  Images,
  Maximize2,
  X,
} from "lucide-react";
import type { CategoryKey, Dictionary } from "@/lib/dictionaries";
import { formatNumber, localizedPath, type Locale } from "@/lib/i18n";
import type { ProductView } from "@/lib/products";

const EASE = [0.22, 1, 0.36, 1] as const;

type Labels = Dictionary["gallery"] & { pieces: string };

export function GalleryView({
  items,
  locale,
  labels,
  initialCategory,
}: {
  items: ProductView[];
  locale: Locale;
  labels: Labels;
  initialCategory: CategoryKey | null;
}) {
  const rtl = locale === "ar";
  const [active, setActive] = useState<CategoryKey | "all">(
    initialCategory ?? "all",
  );
  const [index, setIndex] = useState<number | null>(null);

  const categories = useMemo(() => {
    const set = new Map<CategoryKey, { name: string; count: number }>();
    for (const item of items) {
      const entry = set.get(item.category);
      set.set(item.category, {
        name: item.categoryName,
        count: (entry?.count ?? 0) + 1,
      });
    }
    return [...set.entries()];
  }, [items]);

  const filtered = useMemo(
    () => (active === "all" ? items : items.filter((i) => i.category === active)),
    [active, items],
  );

  const current = index === null ? null : (filtered[index] ?? null);

  const close = useCallback(() => setIndex(null), []);
  const step = useCallback(
    (delta: number) =>
      setIndex((i) =>
        i === null || filtered.length === 0
          ? null
          : (i + delta + filtered.length) % filtered.length,
      ),
    [filtered.length],
  );

  /* Close the lightbox when the filter changes; keyboard + scroll lock. */
  useEffect(() => setIndex(null), [active]);
  useEffect(() => {
    if (index === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(rtl ? -1 : 1);
      if (e.key === "ArrowLeft") step(rtl ? 1 : -1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [index, step, close, rtl]);

  if (items.length === 0) {
    return (
      <div className="grid place-items-center rounded-3xl border border-dashed border-line bg-panel/50 px-8 py-24 text-center">
        <ImageOff className="size-10 text-sand-dim" aria-hidden="true" />
        <p className="mt-5 max-w-md text-sm leading-7 text-sand-dim">
          {labels.emptyAll}
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* ── Filter pills ─────────────────────────────────────────── */}
      <div
        className="mb-10 flex flex-wrap items-center gap-3"
        role="group"
        aria-label={labels.filterLabel}
      >
        <FilterPill
          active={active === "all"}
          onClick={() => setActive("all")}
          label={labels.all}
          count={items.length}
          locale={locale}
        />
        {categories.map(([key, { name, count }]) => (
          <FilterPill
            key={key}
            active={active === key}
            onClick={() => setActive(key)}
            label={name}
            count={count}
            locale={locale}
          />
        ))}
      </div>

      {/* ── Image grid ───────────────────────────────────────────── */}
      {filtered.length === 0 ? (
        <p className="rounded-3xl border border-dashed border-line px-8 py-16 text-center text-sm text-sand-dim">
          {labels.empty}
        </p>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.button
                type="button"
                key={item.slug}
                layout
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5, ease: EASE }}
                onClick={() => setIndex(i)}
                aria-label={`${labels.open}: ${item.name}`}
                className="group relative overflow-hidden rounded-3xl border border-line bg-panel text-start transition-colors duration-500 hover:border-gold/50"
              >
                <div className="relative aspect-[3/4]">
                  <Image
                    src={item.imageUrl}
                    alt={item.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 31vw, (min-width: 640px) 45vw, 92vw"
                    className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/15 to-ink/5" />

                  <span className="absolute left-1/2 top-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 scale-75 place-items-center rounded-full bg-gold text-ink opacity-0 shadow-[0_10px_40px_-8px_rgba(201,162,94,0.7)] transition-all duration-500 group-hover:scale-100 group-hover:opacity-100 rtl:translate-x-1/2">
                    <Maximize2 className="size-5" aria-hidden="true" />
                  </span>

                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-gold-soft">
                      {item.categoryName}
                    </p>
                    <div className="mt-1.5 flex items-end justify-between gap-3">
                      <h3 className="font-display text-xl leading-snug text-sand">
                        {item.name}
                      </h3>
                      <span className="shrink-0 text-sm font-semibold text-gold-soft">
                        {item.price}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* ── Lightbox ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {current && (
          <motion.div
            key="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={current.name}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-md sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={close}
          >
            {/* counter + close */}
            <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5 sm:p-7">
              <span className="inline-flex items-center gap-2 text-xs tracking-[0.3em] text-sand-dim">
                <Images className="size-4 text-gold" aria-hidden="true" />
                {index !== null &&
                  `${formatNumber(index + 1, locale)} ${labels.of} ${formatNumber(filtered.length, locale)}`}
              </span>
              <button
                type="button"
                onClick={close}
                aria-label={labels.close}
                className="grid size-11 place-items-center rounded-full border border-line bg-ink/60 text-sand transition hover:border-gold hover:bg-gold hover:text-ink"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>

            {/* prev / next */}
            <NavButton
              side="start"
              label={labels.prev}
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              icon={rtl ? ChevronRight : ChevronLeft}
            />
            <NavButton
              side="end"
              label={labels.next}
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              icon={rtl ? ChevronLeft : ChevronRight}
            />

            {/* figure */}
            <motion.figure
              key={current.slug}
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="flex h-full max-h-[86svh] w-full max-w-5xl flex-col pt-14"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative min-h-0 flex-1 overflow-hidden rounded-2xl">
                <Image
                  src={current.imageUrl}
                  alt={current.imageAlt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 72vw, 100vw"
                  className="object-contain"
                />
              </div>
              <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-coal/85 px-5 py-4 backdrop-blur">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-gold-soft">
                    {current.categoryName}
                  </p>
                  <h3 className="mt-1 font-display text-2xl text-sand">
                    {current.name}
                  </h3>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-lg font-semibold text-gold-soft">
                    {current.price}
                  </span>
                  <Link
                    href={localizedPath(`/products/${current.slug}`, locale)}
                    className="btn-ghost btn-sm"
                  >
                    {labels.viewProduct}
                    <ArrowUpRight
                      className="size-3.5 rtl:hidden"
                      aria-hidden="true"
                    />
                    <ArrowUpLeft
                      className="size-3.5 ltr:hidden"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FilterPill({
  active,
  onClick,
  label,
  count,
  locale,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
  locale: Locale;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm transition-all duration-300 ${
        active
          ? "border-gold bg-gold font-semibold text-ink"
          : "border-line text-sand/75 hover:border-gold/60 hover:text-sand"
      }`}
    >
      {label}
      <span
        className={`rounded-full px-2 py-0.5 text-[10px] ${
          active ? "bg-ink/15" : "bg-sand/10 text-sand-dim"
        }`}
      >
        {formatNumber(count, locale)}
      </span>
    </button>
  );
}

function NavButton({
  side,
  label,
  onClick,
  icon: Icon,
}: {
  side: "start" | "end";
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  icon: typeof ChevronLeft;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`absolute top-1/2 z-10 grid size-12 -translate-y-1/2 place-items-center rounded-full border border-line bg-ink/70 text-sand backdrop-blur transition hover:border-gold hover:bg-gold hover:text-ink sm:size-14 ${
        side === "start" ? "start-3 sm:start-6" : "end-3 sm:end-6"
      }`}
    >
      <Icon className="size-5" aria-hidden="true" />
    </button>
  );
}
