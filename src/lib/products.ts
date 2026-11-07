import { asc, eq } from "drizzle-orm";
import { db } from "@/db";
import { products, type Product } from "@/db/schema";
import { formatPrice, type Locale } from "./i18n";
import { getDictionary, isCategoryKey, type CategoryKey } from "./dictionaries";

/**
 * Every query is wrapped in try/catch so that a missing/unreachable local
 * database renders a graceful empty state instead of crashing the page —
 * handy on a fresh Windows setup before Postgres is running.
 */
export async function getProducts(): Promise<Product[]> {
  try {
    return await db.select().from(products).orderBy(asc(products.sortOrder));
  } catch {
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const rows = await db
      .select()
      .from(products)
      .where(eq(products.slug, slug))
      .limit(1);
    return rows[0] ?? null;
  } catch {
    return null;
  }
}

export async function getRelatedProducts(
  product: Product,
  limit = 4,
): Promise<Product[]> {
  const all = await getProducts();
  const sameCategory = all.filter(
    (p) => p.category === product.category && p.slug !== product.slug,
  );
  const rest = all.filter(
    (p) => p.category !== product.category && p.slug !== product.slug,
  );
  return [...sameCategory, ...rest].slice(0, limit);
}

/** Localized view-model consumed by cards, the gallery and the API. */
export type ProductView = {
  slug: string;
  name: string;
  description: string;
  category: CategoryKey;
  categoryName: string;
  price: string;
  imageUrl: string;
  imageAlt: string;
  featured: boolean;
};

export function toProductView(product: Product, locale: Locale): ProductView {
  const dict = getDictionary(locale);
  const category: CategoryKey = isCategoryKey(product.category)
    ? product.category
    : "perfumes";
  const name = locale === "ar" ? product.nameAr : product.nameEn;
  const alt = locale === "ar" ? product.imageAltAr : product.imageAltEn;

  return {
    slug: product.slug,
    name,
    description:
      locale === "ar" ? product.descriptionAr : product.descriptionEn,
    category,
    categoryName: dict.categories.items[category].name,
    price: formatPrice(product.price, locale),
    imageUrl: product.imageUrl,
    imageAlt: alt || name,
    featured: product.featured,
  };
}
