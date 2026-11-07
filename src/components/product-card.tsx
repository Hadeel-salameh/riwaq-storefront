import Image from "next/image";
import Link from "next/link";
import { ArrowUpLeft, ArrowUpRight } from "lucide-react";
import { localizedPath, type Locale } from "@/lib/i18n";
import type { ProductView } from "@/lib/products";

export function ProductCard({
  product,
  locale,
  priority = false,
}: {
  product: ProductView;
  locale: Locale;
  priority?: boolean;
}) {
  return (
    <Link
      href={localizedPath(`/products/${product.slug}`, locale)}
      aria-label={product.name}
      className="group sheen relative block overflow-hidden rounded-3xl border border-line bg-panel transition-colors duration-500 hover:border-gold/50"
    >
      <div className="relative aspect-[4/5]">
        <Image
          src={product.imageUrl}
          alt={product.imageAlt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 31vw, (min-width: 640px) 45vw, 92vw"
          className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/20 to-ink/10" />

        <span className="absolute start-4 top-4 rounded-full border border-sand/20 bg-ink/55 px-3.5 py-1.5 text-[11px] font-medium text-sand backdrop-blur-md">
          {product.categoryName}
        </span>

        <span className="absolute end-4 top-4 grid size-10 translate-y-2 place-items-center rounded-full bg-gold text-ink opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight className="size-4 rtl:hidden" aria-hidden="true" />
          <ArrowUpLeft className="size-4 ltr:hidden" aria-hidden="true" />
        </span>

        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
          <h3 className="font-display text-2xl leading-snug text-sand">
            {product.name}
          </h3>
          <div className="mt-2 flex items-center justify-between gap-3">
            <span className="text-lg font-semibold text-gold-soft">
              {product.price}
            </span>
            <span className="h-px flex-1 bg-sand/15 transition-colors duration-500 group-hover:bg-gold/40" />
          </div>
        </div>
      </div>
    </Link>
  );
}
