import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { categoryKeys, type Dictionary } from "@/lib/dictionaries";
import { localizedPath, type Locale } from "@/lib/i18n";
import { NewsletterForm } from "./newsletter-form";

/* Brand icons were removed from lucide — these minimal filled SVGs replace them. */
const SOCIAL_ICONS: Record<string, string> = {
  Instagram:
    "M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3",
  X: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  Facebook:
    "M22 12.06C22 6.505 17.523 2 12 2S2 6.505 2 12.06c0 5.023 3.657 9.184 8.438 9.939v-7.03H7.898v-2.91h2.54V9.845c0-2.522 1.492-3.915 3.777-3.915 1.094 0 2.238.197 2.238.197v2.476h-1.26c-1.243 0-1.63.775-1.63 1.57v1.888h2.773l-.443 2.908h-2.33V22c4.78-.755 8.437-4.916 8.437-9.939",
};

export function SiteFooter({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const year = new Date().getFullYear();
  const homePath = localizedPath("/", locale);

  const mainLinks = [
    { href: homePath, label: dict.nav.home },
    { href: localizedPath("/gallery", locale), label: dict.nav.gallery },
    { href: `${homePath}#collection`, label: dict.nav.collection },
    { href: `${homePath}#story`, label: dict.nav.craft },
  ];

  return (
    <footer className="mt-24 border-t border-line bg-coal">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.5fr_1fr_1fr_1.4fr]">
        <div>
          <Link href={homePath} className="flex items-baseline gap-2.5">
            <span className="font-display text-4xl text-gold-soft">
              {dict.brand.name}
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-sand-dim">
              {dict.brand.latin}
            </span>
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-7 text-sand-dim">
            {dict.footer.about}
          </p>
          <div className="mt-6 flex gap-3">
            {Object.entries(SOCIAL_ICONS).map(([label, path]) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="grid size-10 place-items-center rounded-full border border-line text-sand-dim transition hover:border-gold hover:text-gold-soft"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-4"
                  aria-hidden="true"
                >
                  <path d={path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        <nav aria-label={dict.footer.linksTitle}>
          <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            {dict.footer.linksTitle}
          </h3>
          <ul className="mt-5 space-y-3">
            {mainLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="link-underline text-sm text-sand/80 hover:text-sand"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={dict.categories.title}>
          <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            {dict.categories.title}
          </h3>
          <ul className="mt-5 space-y-3">
            {categoryKeys.map((key) => (
              <li key={key}>
                <Link
                  href={`${localizedPath("/gallery", locale)}?category=${key}`}
                  className="link-underline text-sm text-sand/80 hover:text-sand"
                >
                  {dict.categories.items[key].name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            {dict.footer.contactTitle}
          </h3>
          <ul className="mt-5 space-y-3 text-sm text-sand/80">
            <li className="flex items-center gap-2.5">
              <MapPin className="size-4 shrink-0 text-gold" aria-hidden="true" />
              {dict.footer.address}
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="size-4 shrink-0 text-gold" aria-hidden="true" />
              <span dir="ltr">{dict.footer.phone}</span>
            </li>
            <li className="flex items-center gap-2.5" dir="ltr">
              <Mail className="size-4 shrink-0 text-gold" aria-hidden="true" />
              {dict.footer.email}
            </li>
          </ul>

          <div className="mt-8">
            <h4 className="font-display text-xl text-sand">
              {dict.footer.newsletter.title}
            </h4>
            <p className="mt-2 text-xs leading-6 text-sand-dim">
              {dict.footer.newsletter.subtitle}
            </p>
            <NewsletterForm dict={dict.footer.newsletter} />
          </div>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-6 text-xs text-sand-dim sm:px-8">
          <p>
            © {year} {dict.brand.name}. {dict.footer.rights}
          </p>
          <p className="tracking-wide">
            {dict.brand.tagline} · Photography: Pexels
          </p>
        </div>
      </div>
    </footer>
  );
}
