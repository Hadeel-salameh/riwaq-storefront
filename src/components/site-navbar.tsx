"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, ShoppingBag, X } from "lucide-react";
import type { Dictionary } from "@/lib/dictionaries";
import { localizedPath, type Locale } from "@/lib/i18n";
import { LanguageSwitcher } from "./language-switcher";

export function SiteNavbar({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const homePath = localizedPath("/", locale);
  const links = [
    { href: homePath, label: dict.nav.home },
    { href: localizedPath("/gallery", locale), label: dict.nav.gallery },
    { href: `${homePath}#collection`, label: dict.nav.collection },
    { href: `${homePath}#story`, label: dict.nav.craft },
  ];

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled || open
            ? "border-b border-line bg-ink/85 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link
            href={homePath}
            className="flex items-baseline gap-2.5"
            aria-label={dict.brand.name}
          >
            <span className="font-display text-3xl leading-none text-gold-soft">
              {dict.brand.name}
            </span>
            <span className="hidden text-[10px] font-medium uppercase tracking-[0.4em] text-sand-dim sm:block">
              {dict.brand.latin}
            </span>
          </Link>

          <nav
            className="hidden items-center gap-8 lg:flex"
            aria-label={dict.brand.name}
          >
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`link-underline text-sm transition-colors ${
                    active
                      ? "text-gold-soft"
                      : "text-sand/75 hover:text-sand"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <LanguageSwitcher locale={locale} dict={dict} />
            <Link
              href={localizedPath("/gallery", locale)}
              className="btn-gold btn-sm hidden md:inline-flex"
            >
              <ShoppingBag className="size-4" aria-hidden="true" />
              {dict.nav.cta}
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? dict.nav.closeMenu : dict.nav.openMenu}
              aria-expanded={open}
              className="grid size-11 place-items-center rounded-full border border-line text-sand transition hover:border-gold lg:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col justify-center gap-2 bg-ink/95 px-8 backdrop-blur-md lg:hidden"
          >
            {links.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * i + 0.1, duration: 0.5 }}
              >
                <Link
                  href={link.href}
                  className="block py-3 font-display text-4xl text-sand transition-colors hover:text-gold-soft"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 text-xs tracking-[0.3em] text-sand-dim"
            >
              {dict.brand.tagline}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
