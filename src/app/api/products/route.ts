import type { NextRequest } from "next/server";
import { isCategoryKey } from "@/lib/dictionaries";
import { defaultLocale, isLocale } from "@/lib/i18n";
import { getProducts, toProductView } from "@/lib/products";

export const dynamic = "force-dynamic";

/**
 * GET /api/products?lang=ar|en&category=perfumes
 * Returns the localized product catalog consumed by the bilingual storefront.
 */
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const langParam = params.get("lang");
  const locale = isLocale(langParam) ? langParam : defaultLocale;
  const category = params.get("category");

  const products = await getProducts();
  const items = products
    .filter((p) =>
      category && isCategoryKey(category) ? p.category === category : true,
    )
    .map((p) => toProductView(p, locale));

  return Response.json({ locale, count: items.length, items });
}
