import { db } from "./src/db/index";
import { products } from "./src/db/schema";

const RIWAQ_PRODUCTS = [
  {
    slug: "royal-oud",
    nameAr: "عود كمبودي ملكي",
    nameEn: "Royal Cambodian Oud",
    descriptionAr: "دهن عود كمبودي معتّق أكثر من عشرين عامًا في أوعية نحاسية؛ افتتاحية دخانية يعقبها قلب من العسل الداكن والجلد الفاخر.",
    descriptionEn: "Cambodian oud oil aged over twenty years in copper vessels; a smoky opening followed by a heart of dark honey and fine leather.",
    category: "perfumes",
    price: "1450.00",
    imageUrl: "https://pexels.com",
    imageAltAr: "قارورة عود أنيقة بخط عربي على سطح خشبي",
    imageAltEn: "Elegant oud perfume bottle with Arabic calligraphy on wood",
    featured: true,
    sortOrder: 1,
  },
  {
    slug: "golden-dallah",
    nameAr: "طقم الدالة الذهبية",
    nameEn: "Golden Dallah Set",
    descriptionAr: "طقم ضيافة من ثماني قطع: دالة نحاسية مطلية بالذهب مع ستة فناجين وصينية، مطروقة يدويًا على الطريقة النجدية.",
    descriptionEn: "An eight-piece hospitality set: gold-plated brass dallah with six cups and a tray, hand-hammered in the Najdi style.",
    category: "hospitality",
    price: "890.00",
    imageUrl: "https://pexels.com",
    imageAltAr: "دالة عربية ذهبية مع فناجين على صينية",
    imageAltEn: "Golden Arabian dallah with cups on a tray",
    featured: true,
    sortOrder: 3,
  },
  {
    slug: "clay-vases",
    nameAr: "مزهريات الطين الحرفية",
    nameEn: "Artisan Clay Vases",
    descriptionAr: "ثلاث مزهريات طينية مشكّلة على المخراث ومطهوّة في فرن الحطب؛ تفاوتها الجميل جزء من روحها.",
    descriptionEn: "Three wheel-thrown clay vases fired in a wood kiln; their beautiful irregularity is part of their soul.",
    category: "ceramics",
    price: "640.00",
    imageUrl: "https://pexels.com",
    imageAltAr: "مزهريات خزفية مصنوعة يدويًا في الورشة",
    imageAltEn: "Handcrafted ceramic vases in a rustic workshop",
    featured: true,
    sortOrder: 7,
  },
  {
    slug: "emerald-bangles",
    nameAr: "أساور الزمرد الذهبية",
    nameEn: "Emerald Gold Bangles",
    descriptionAr: "زوج أساور من ذهب عيار 21 مرصّع بالزمرد، بنقشة سعف النخيل المحفورة يدويًا من الداخل والخارج.",
    descriptionEn: "A pair of 21k gold bangles set with emeralds, hand-engraved inside and out with a palm-frond pattern.",
    category: "jewelry",
    price: "3200.00",
    imageUrl: "https://pexels.com",
    imageAltAr: "أساور ذهبية فاخرة بلمسات زمردية على خلفية داكنة",
    imageAltEn: "Luxury gold bangles with emerald accents on dark backdrop",
    featured: true,
    sortOrder: 9,
  },
  {
    slug: "royal-bakhoor",
    nameAr: "البخور الملكي ومبخرته",
    nameEn: "Royal Bakhoor & Mubkhar",
    descriptionAr: "بخور معجون بدهن العود والمسك الأسود مع مبخرة نحاسية بقاعدة رخامية — طقس مساء كامل في صندوق واحد.",
    descriptionEn: "Bakhoor kneaded with oud oil and black musk, with a brass burner on a marble base — a whole evening ritual in one box.",
    category: "spices",
    price: "590.00",
    imageUrl: "https://pexels.com",
    imageAltAr: "مبخرة يتصاعد منها الدخان وسط توابل السوق",
    imageAltEn: "Incense burner with rising smoke among market spices",
    featured: true,
    sortOrder: 11,
  }
];

async function main() {
  console.log("… جاري ضخ المنتجات الفاخرة في Supabase ...");
  try {
    await db.insert(products).values(RIWAQ_PRODUCTS).onConflictDoNothing();
    console.log("✅ تم ضخ المنتجات بنجاح! قاعدة بيانات رواق جاهزة الآن.");
  } catch (error) {
    console.error("✖ فشل ضخ البيانات:", error);
  }
}

main();

