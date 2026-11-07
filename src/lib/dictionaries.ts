import type { Locale } from "./i18n";

/**
 * Central bilingual dictionaries. The Arabic tree is the source of truth for
 * the type — every key must exist in both languages.
 */

export const categoryKeys = [
  "perfumes",
  "hospitality",
  "spices",
  "lighting",
  "ceramics",
  "textiles",
  "jewelry",
] as const;

export type CategoryKey = (typeof categoryKeys)[number];

export function isCategoryKey(value: string): value is CategoryKey {
  return (categoryKeys as readonly string[]).includes(value);
}

const ar = {
  brand: {
    name: "رِواق",
    latin: "RIWAQ",
    tagline: "دارُ الحِرَف الشرقية الفاخرة",
  },
  nav: {
    home: "الرئيسية",
    gallery: "معرض الصور",
    craft: "حكايتنا",
    collection: "المجموعة",
    cta: "تسوّق الآن",
    openMenu: "فتح القائمة",
    closeMenu: "إغلاق القائمة",
  },
  hero: {
    kicker: "دار رِواق — منذ عام 1962",
    titleA: "كنوزٌ تُشكِّلها الأيادي،",
    titleB: "وترويها الحكايات",
    subtitle:
      "مختاراتٌ فاخرة من العود الكمبودي، والزعفران النقي، والخزف التراثي، والحرير المنسوج يدويًا — من أيدي أمهر الحرفيين إلى بيتك.",
    ctaGallery: "استكشف معرض الصور",
    ctaCollection: "اكتشف المجموعة",
    scroll: "مرّر للأسفل",
    stats: [
      { value: "+60", label: "عامًا من الحِرفة" },
      { value: "+120", label: "حرفيًا مشاركًا" },
      { value: "+480", label: "قطعة حصرية" },
    ],
  },
  marquee: [
    "عود كمبودي معتّق",
    "زعفران سوبر نقي",
    "دلال نحاسية مطروقة يدويًا",
    "خزف تراثي مطلي بالذهب",
    "حرير طبيعي منسوج يدويًا",
    "فوانيس نحاسية مراكشية",
  ],
  featured: {
    kicker: "توقيع الدار",
    title: "قطعٌ مختارة بعناية",
    subtitle: "أقرب ما تكون إلى قلوب حرفيينا — قطع لا تتكرر كثيرًا، وتُروى حكايتها مع كل تفصيلة.",
    viewAll: "عرض كل المنتجات",
    priceLabel: "السعر",
    empty: "المنتجات ستظهر هنا قريبًا — تأكد من تشغيل قاعدة البيانات وتهجير البيانات.",
  },
  categories: {
    kicker: "أروقة المتجر",
    title: "تجوّل بين الأقسام",
    subtitle: "سبعة أروقة، لكلٍّ منها روحه وحرفيّوه.",
    items: {
      perfumes: { name: "عطور وعود", blurb: "دهن العود والعطور الشرقية" },
      hospitality: { name: "ضيافة", blurb: "دلال وأطقم قهوة وأجود التمور" },
      spices: { name: "توابل وبخور", blurb: "زعفران وبخور ملكي" },
      lighting: { name: "فوانيس وإضاءة", blurb: "نحاس مطروق يمنح الدفء" },
      ceramics: { name: "خزفيات", blurb: "طينٌ يُشكَّل على المخراث" },
      textiles: { name: "منسوجات", blurb: "حرير وصوف منسوجان يدويًا" },
      jewelry: { name: "مجوهرات", blurb: "ذهبٌ وأحجار بلمسة شرقية" },
    } as Record<CategoryKey, { name: string; blurb: string }>,
  },
  story: {
    kicker: "حكايتنا",
    title: "من السوق القديم إلى العالم",
    body: [
      "بدأت رِواق عام 1962 كدُكّان صغير في السوق القديم، يبيع دهن العود والدلال النحاسية. وعبر ثلاثة أجيال، حملنا اسم الحرفيين الذين آمنّا بهم إلى أرففٍ تليق بإتقانهم.",
      "اليوم، نسافر لنختار كل قطعة بأنفسنا: من مزارع الزعفران إلى مرابع العود، ومن مخاريط الفخّارين إلى مناسج الحرير. لا نبيع منتجات، بل نسلّمك حكاية تُمسكها بيدك.",
    ],
    signature: "— عائلة رِواق",
    cta: "تعرّف على المعرض",
  },
  gallery: {
    kicker: "الأرشيف المصوّر",
    title: "معرض صور المنتجات",
    subtitle: "كل صورة تحكي حرفة. تصفّح المجموعة كاملة، وصفِّها حسب القسم، وافتح أي صورة بدقتها الكاملة.",
    all: "الكل",
    filterLabel: "تصفية حسب القسم",
    pieces: "قطعة",
    empty: "لا توجد صور في هذا القسم بعد.",
    emptyAll: "المعرض فارغ الآن — شغّل قاعدة البيانات وأدخل البيانات الأولية لعرض المنتجات.",
    open: "فتح الصورة",
    close: "إغلاق",
    next: "التالية",
    prev: "السابقة",
    of: "من",
    viewProduct: "عرض تفاصيل المنتج",
  },
  banner: {
    title: "قطعةٌ واحدة قد تروي حكاية بيتك كله",
    subtitle:
      "تصفّح الأرشيف المصوّر كاملًا، اختر ما يشبهك، وسنغلّفه لك تغليفًا يليق بالهدايا.",
    cta: "إلى معرض الصور",
  },
  product: {
    back: "عودة إلى المعرض",
    categoryLabel: "القسم",
    priceLabel: "السعر",
    addToCart: "أضف إلى السلة",
    note: "شحن مجاني داخل المملكة للطلبات فوق 500 ريال. تغليف هدايا فاخر مع كل طلب.",
    inStock: "متوفر — صُنع عند الطلب خلال ٧ أيام",
    details: "تفاصيل القطعة",
    detailRows: [
      ["المنشأ", "صناعة يدوية — الشرق الأوسط"],
      ["الخامات", "خامات طبيعية فاخرة"],
      ["الضمان", "ضمان الدار مدى الحياة على الحِرفة"],
    ],
    related: "قد يعجبك أيضًا",
    notFound: "لم نعثر على هذا المنتج",
    sku: "المرجع",
  },
  footer: {
    about:
      "رِواق دارُ حِرفٍ شرقية تأسست عام 1962. نختار العود والزعفران والخزف والحرير من أمهر الأيادي، ونوصلها إليك بحكايتها.",
    linksTitle: "أروقة الدار",
    contactTitle: "تواصل معنا",
    address: "السوق القديم، الدكان رقم 7",
    phone: "+966 55 000 0000",
    email: "salam@riwaq.shop",
    newsletter: {
      title: "رسائل الدار",
      subtitle: "قصص الحرفيين والقطع الجديدة — مرة كل شهر، بلا إزعاج.",
      placeholder: "بريدك الإلكتروني",
      button: "اشترك",
      thanks: "أهلًا بك في الدار! وصلنا اشتراكك.",
    },
    rights: "جميع الحقوق محفوظة لدار رِواق",
  },
  notFound: {
    title: "ضَلَلتَ الطريق بين الأروقة",
    subtitle: "الصفحة التي تبحث عنها غير موجودة. Page not found.",
    cta: "العودة إلى الرئيسية — Back home",
  },
  language: {
    switchTo: "English",
    label: "تغيير اللغة",
  },
};

export type Dictionary = typeof ar;

const en: Dictionary = {
  brand: {
    name: "RIWAQ",
    latin: "رِواق",
    tagline: "A house of fine oriental craft",
  },
  nav: {
    home: "Home",
    gallery: "Image Gallery",
    craft: "Our Story",
    collection: "Collection",
    cta: "Shop now",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
  hero: {
    kicker: "House of Riwaq — since 1962",
    titleA: "Treasures shaped by hands,",
    titleB: "told by stories",
    subtitle:
      "A curated selection of Cambodian oud, pure saffron, heritage ceramics and hand-woven silk — from the finest artisans to your home.",
    ctaGallery: "Explore the image gallery",
    ctaCollection: "Discover the collection",
    scroll: "Scroll down",
    stats: [
      { value: "60+", label: "years of craft" },
      { value: "120+", label: "artisans" },
      { value: "480+", label: "exclusive pieces" },
    ],
  },
  marquee: [
    "Aged Cambodian oud",
    "Super-negin saffron",
    "Hand-hammered brass dallahs",
    "Gold-leaf heritage ceramics",
    "Hand-woven natural silk",
    "Marrakesh brass lanterns",
  ],
  featured: {
    kicker: "House signature",
    title: "Hand-picked pieces",
    subtitle: "The pieces closest to our artisans' hearts — rarely repeated, each with a story in every detail.",
    viewAll: "View all products",
    priceLabel: "Price",
    empty: "Products will appear here soon — make sure the database is running and seeded.",
  },
  categories: {
    kicker: "Arcades of the house",
    title: "Wander the sections",
    subtitle: "Seven arcades, each with its own soul and makers.",
    items: {
      perfumes: { name: "Perfumes & Oud", blurb: "Oud oil and oriental attars" },
      hospitality: { name: "Hospitality", blurb: "Dallahs, coffee sets & fine dates" },
      spices: { name: "Spices & Incense", blurb: "Saffron and royal bakhoor" },
      lighting: { name: "Lanterns & Lighting", blurb: "Hammered brass warmth" },
      ceramics: { name: "Ceramics", blurb: "Clay shaped on the wheel" },
      textiles: { name: "Textiles", blurb: "Hand-woven silk and wool" },
      jewelry: { name: "Jewelry", blurb: "Gold and stones, eastern touch" },
    } as Record<CategoryKey, { name: string; blurb: string }>,
  },
  story: {
    kicker: "Our story",
    title: "From the old souk to the world",
    body: [
      "Riwaq began in 1962 as a tiny stall in the old souk, selling oud oil and brass dallahs. Across three generations we carried the names of the artisans we believe in onto shelves worthy of their mastery.",
      "Today we travel to choose every piece ourselves: from saffron farms to oud forests, from potters' wheels to silk looms. We do not sell products — we hand you a story you can hold.",
    ],
    signature: "— The Riwaq family",
    cta: "Visit the gallery",
  },
  gallery: {
    kicker: "The visual archive",
    title: "Product image gallery",
    subtitle: "Every image tells a craft. Browse the full collection, filter by section, and open any photo in full resolution.",
    all: "All",
    filterLabel: "Filter by section",
    pieces: "pieces",
    empty: "No images in this section yet.",
    emptyAll: "The gallery is empty right now — start the database and seed it to display products.",
    open: "Open image",
    close: "Close",
    next: "Next",
    prev: "Previous",
    of: "of",
    viewProduct: "View product details",
  },
  banner: {
    title: "One piece can tell your home's whole story",
    subtitle:
      "Browse the full visual archive, pick what feels like you, and we will wrap it like the gift it is.",
    cta: "To the image gallery",
  },
  product: {
    back: "Back to the gallery",
    categoryLabel: "Section",
    priceLabel: "Price",
    addToCart: "Add to cart",
    note: "Free shipping within the Kingdom for orders over 500 SAR. Luxury gift wrapping with every order.",
    inStock: "Available — made to order within 7 days",
    details: "Piece details",
    detailRows: [
      ["Origin", "Handcrafted — Middle East"],
      ["Materials", "Fine natural materials"],
      ["Warranty", "Lifetime craft warranty by the house"],
    ],
    related: "You may also like",
    notFound: "We could not find this product",
    sku: "Reference",
  },
  footer: {
    about:
      "Riwaq is a house of oriental craft founded in 1962. We hand-pick oud, saffron, ceramics and silk from the finest hands, and deliver them to you with their story.",
    linksTitle: "Arcades",
    contactTitle: "Contact us",
    address: "The Old Souk, Stall No. 7",
    phone: "+966 55 000 0000",
    email: "salam@riwaq.shop",
    newsletter: {
      title: "Letters from the house",
      subtitle: "Artisan stories and new pieces — once a month, no noise.",
      placeholder: "Your email address",
      button: "Subscribe",
      thanks: "Welcome to the house — you are subscribed.",
    },
    rights: "All rights reserved to House of Riwaq",
  },
  notFound: {
    title: "Lost between the arcades",
    subtitle: "The page you are looking for does not exist. الصفحة غير موجودة.",
    cta: "Back home — العودة للرئيسية",
  },
  language: {
    switchTo: "العربية",
    label: "Switch language",
  },
};

const dictionaries: Record<Locale, Dictionary> = { ar, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.ar;
}
