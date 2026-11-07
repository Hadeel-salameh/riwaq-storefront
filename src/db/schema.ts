import {
  boolean,
  integer,
  numeric,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

/**
 * Products of the boutique. All customer-facing copy is stored bilingually
 * (Arabic + English) so the storefront can switch languages without any
 * external translation service.
 */
export const products = pgTable(
  "products",
  {
    id: serial("id").primaryKey(),
    slug: text("slug").notNull(),
    nameAr: text("name_ar").notNull(),
    nameEn: text("name_en").notNull(),
    descriptionAr: text("description_ar").notNull(),
    descriptionEn: text("description_en").notNull(),
    /**
     * Category key — one of:
     * perfumes | hospitality | spices | lighting | ceramics | textiles | jewelry
     * (labels are translated in src/lib/dictionaries.ts)
     */
    category: text("category").notNull(),
    price: numeric("price", { precision: 10, scale: 2 }).notNull(),
    imageUrl: text("image_url").notNull(),
    imageAltAr: text("image_alt_ar").notNull().default(""),
    imageAltEn: text("image_alt_en").notNull().default(""),
    featured: boolean("featured").notNull().default(false),
    sortOrder: integer("sort_order").notNull().default(0),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [uniqueIndex("products_slug_unique").on(table.slug)],
);

export type Product = typeof products.$inferSelect;
