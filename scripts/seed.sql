-- ─────────────────────────────────────────────────────────────
--  RIWAQ — seed data (idempotent: safe to run repeatedly)
--  Run:  psql "$DATABASE_URL" -f scripts/seed.sql
--  Windows:  psql postgresql://postgres:postgres@127.0.0.1:5432/app_db -f scripts/seed.sql
-- ─────────────────────────────────────────────────────────────

INSERT INTO products
  (slug, name_ar, name_en, description_ar, description_en, category, price, image_url, image_alt_ar, image_alt_en, featured, sort_order)
VALUES
  (
    'royal-oud',
    'عود كمبودي ملكي',
    'Royal Cambodian Oud',
    'دهن عود كمبودي معتّق أكثر من عشرين عامًا في أوعية نحاسية؛ افتتاحية دخانية يعقبها قلب من العسل الداكن والجلد الفاخر.',
    'Cambodian oud oil aged over twenty years in copper vessels; a smoky opening followed by a heart of dark honey and fine leather.',
    'perfumes', 1450,
    'https://images.pexels.com/photos/38721545/pexels-photo-38721545.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'قارورة عود أنيقة بخط عربي على سطح خشبي',
    'Elegant oud perfume bottle with Arabic calligraphy on wood',
    TRUE, 1
  ),
  (
    'noir-attar',
    'عطر الليل الشرقي',
    'Oriental Noir Attar',
    'عطر مركّز بلا كحول يمزج العنبر والورد الطائفي ولمسة من الزعفران؛ يبقى على المعصم من الصباح حتى منتصف الليل.',
    'An alcohol-free concentrated attar of amber, Taif rose and a touch of saffron; it lingers from morning to midnight.',
    'perfumes', 980,
    'https://images.pexels.com/photos/38893412/pexels-photo-38893412.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'قارورة عطر في إضاءة درامية وظلال فنية',
    'Perfume bottle in dramatic artistic light and shadow',
    FALSE, 2
  ),
  (
    'golden-dallah',
    'طقم الدالة الذهبية',
    'Golden Dallah Set',
    'طقم ضيافة من ثماني قطع: دالة نحاسية مطلية بالذهب مع ستة فناجين وصينية، مطروقة يدويًا على الطريقة النجدية.',
    'An eight-piece hospitality set: gold-plated brass dallah with six cups and a tray, hand-hammered in the Najdi style.',
    'hospitality', 890,
    'https://images.pexels.com/photos/40235682/pexels-photo-40235682.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'دالة عربية ذهبية مع فناجين على صينية',
    'Golden Arabian dallah with cups on a tray',
    TRUE, 3
  ),
  (
    'medjool-dates',
    'تمر المجهول الفاخر',
    'Reserve Medjool Dates',
    'تمر مجهول مدلّل، كبير الحجم وطريّ القوام، يُقطف في موسمه ويُعبّأ في صندوق خشبي مبطّن بالحرير.',
    'Plump, tender Medjool dates harvested in season and packed in a silk-lined wooden box.',
    'hospitality', 240,
    'https://images.pexels.com/photos/31779629/pexels-photo-31779629.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'تمر طازج بإضاءة دافئة يبرز قوامه الغني',
    'Fresh organic dates in warm light showing rich texture',
    FALSE, 4
  ),
  (
    'candle-lantern',
    'فانوس الضياء النحاسي',
    'Candlelit Brass Lantern',
    'فانوس نحاسي مثقوب يدويًا يرسم على الجدران ظلالًا كأنها أرابيسك حيّ، ويأتي مع شمعة من شمع العسل.',
    'A hand-pierced brass lantern that paints living arabesque shadows on your walls; ships with a beeswax candle.',
    'lighting', 520,
    'https://images.pexels.com/photos/36168883/pexels-photo-36168883.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'فانوس نحاسي منقوش يتوهج بضوء الشمعة',
    'Carved brass lantern glowing softly with candlelight',
    FALSE, 5
  ),
  (
    'souk-lanterns',
    'عنقود فوانيس السوق',
    'Souk Lantern Cascade',
    'عنقود فوانيس نحاسية مراكشية بأحجام متدرجة يُعلَّق كثريّة تليق بالمجالس والأروقة الطويلة.',
    'A cascade of Marrakesh copper lanterns in graduated sizes, hung as a chandelier worthy of majlis and arcades.',
    'lighting', 780,
    'https://images.pexels.com/photos/38019898/pexels-photo-38019898.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'فوانيس نحاسية مغربية متدلية بنقوش متقنة',
    'Ornate copper Moroccan lanterns hanging outdoors',
    FALSE, 6
  ),
  (
    'clay-vases',
    'مزهريات الطين الحرفية',
    'Artisan Clay Vases',
    'ثلاث مزهريات طينية مشكّلة على المخراث ومطهوّة في فرن الحطب؛ تفاوتها الجميل جزء من روحها.',
    'Three wheel-thrown clay vases fired in a wood kiln; their beautiful irregularity is part of their soul.',
    'ceramics', 640,
    'https://images.pexels.com/photos/29286721/pexels-photo-29286721.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'مزهريات خزفية مصنوعة يدويًا في الورشة',
    'Handcrafted ceramic vases in a rustic workshop',
    TRUE, 7
  ),
  (
    'golden-silk',
    'شال الحرير الذهبي',
    'Golden Silk Shawl',
    'شال حرير طبيعي مصبوغ بالزعفران والرمان، منسوج على نول خشبي بخيوط ضيقة تلمع كالذهب المسحوب.',
    'A natural silk shawl dyed with saffron and pomegranate, woven on a wooden loom in threads that gleam like drawn gold.',
    'textiles', 460,
    'https://images.pexels.com/photos/4938324/pexels-photo-4938324.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'قماش حريري ذهبي بطيات أنيقة وملمس لمّاع',
    'Luxurious golden satin fabric with elegant pleats',
    FALSE, 8
  ),
  (
    'emerald-bangles',
    'أساور الزمرد الذهبية',
    'Emerald Gold Bangles',
    'زوج أساور من ذهب عيار 21 مرصّع بالزمرد، بنقشة سعف النخيل المحفورة يدويًا من الداخل والخارج.',
    'A pair of 21k gold bangles set with emeralds, hand-engraved inside and out with a palm-frond pattern.',
    'jewelry', 3200,
    'https://images.pexels.com/photos/20493839/pexels-photo-20493839.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'أساور ذهبية فاخرة بلمسات زمردية على خلفية داكنة',
    'Luxury gold bangles with emerald accents on dark backdrop',
    TRUE, 9
  ),
  (
    'spice-treasury',
    'خزانة التوابل الشرقية',
    'Oriental Spice Treasury',
    'صندوق خشبي مقسّم يحوي تسع توابل موسمية: زعفران نگين، هيل، قرنفل، قرفة، فلفل أخضر، سماق وغيرها.',
    'A compartmented wooden box with nine seasonal spices: negin saffron, cardamom, cloves, cinnamon, green pepper, sumac and more.',
    'spices', 350,
    'https://images.pexels.com/photos/29172134/pexels-photo-29172134.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'تشكيلة توابل ملونة في صندوق خشبي',
    'Colorful spice assortment in a wooden box',
    FALSE, 10
  ),
  (
    'royal-bakhoor',
    'البخور الملكي ومبخرته',
    'Royal Bakhoor & Mubkhar',
    'بخور معجون بدهن العود والمسك الأسود مع مبخرة نحاسية بقاعدة رخامية — طقس مساء كامل في صندوق واحد.',
    'Bakhoor kneaded with oud oil and black musk, with a brass burner on a marble base — a whole evening ritual in one box.',
    'spices', 590,
    'https://images.pexels.com/photos/18294700/pexels-photo-18294700.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'مبخرة يتصاعد منها الدخان وسط توابل السوق',
    'Incense burner with rising smoke among market spices',
    TRUE, 11
  )
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  description_ar = EXCLUDED.description_ar,
  description_en = EXCLUDED.description_en,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  image_url = EXCLUDED.image_url,
  image_alt_ar = EXCLUDED.image_alt_ar,
  image_alt_en = EXCLUDED.image_alt_en,
  featured = EXCLUDED.featured,
  sort_order = EXCLUDED.sort_order;
