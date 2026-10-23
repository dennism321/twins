"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LogoLockup } from "./Logo";
import { CloseIcon, MenuIcon } from "./icons";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/site";

type Props = {
  locale: Locale;
  t: Dictionary["nav"];
  homeHref: string;
  altHref: string;
};

export function Header({ locale, t, homeHref, altHref }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const links = [
    { href: `${homeHref}#story`, label: t.story },
    { href: `${homeHref}#services`, label: t.services },
    { href: `${homeHref}#gallery`, label: t.gallery },
    { href: `${homeHref}#testimonials`, label: t.testimonials },
    { href: `${homeHref}#visit`, label: t.visit },
  ];

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-taupe-900 focus:px-4 focus:py-2 focus:text-ivory"
      >
        {t.skip}
      </a>
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-blush-200/60 bg-ivory/85 shadow-[0_8px_30px_-20px_rgba(90,60,50,0.35)] backdrop-blur-xl"
            : "bg-ivory/60 backdrop-blur-md"
        }`}
      >
        <div className="container-x flex h-[4.5rem] items-center justify-between gap-4 sm:h-20">
          <Link href={homeHref} aria-label={t.home} className="shrink-0">
            <LogoLockup compact />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-full px-3.5 py-2 text-sm font-medium text-taupe-700 transition hover:bg-blush-100 hover:text-taupe-900"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={altHref}
              hrefLang={locale === "el" ? "en" : "el"}
              lang={locale === "el" ? "en" : "el"}
              aria-label={t.switchLangAria}
              className="inline-flex h-10 items-center justify-center rounded-full border border-taupe-900/15 px-3 text-xs font-bold tracking-[0.18em] text-taupe-700 transition hover:border-gold hover:text-taupe-900"
            >
              {t.switchLang}
            </a>
            <a href={`${homeHref}#booking`} className="btn-primary hidden !min-h-10 !px-5 !py-2 sm:inline-flex">
              {t.bookShort}
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-taupe-800 transition hover:bg-blush-100 lg:hidden"
              aria-label={t.openMenu}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <MenuIcon size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label={t.openMenu}
        aria-hidden={!open}
        inert={!open}
        className={`fixed inset-0 z-[60] lg:hidden ${open ? "" : "pointer-events-none"}`}
      >
        <div
          className={`absolute inset-0 bg-taupe-900/30 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
          onClick={() => setOpen(false)}
        />
        <div
          className={`absolute inset-y-0 right-0 flex w-[88%] max-w-sm flex-col bg-ivory shadow-soft transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex h-[4.5rem] items-center justify-between px-5">
            <LogoLockup compact />
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-taupe-800 hover:bg-blush-100"
              aria-label={t.closeMenu}
            >
              <CloseIcon size={22} />
            </button>
          </div>
          <nav aria-label="Mobile" className="mt-4 flex flex-col px-5">
            {links.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-blush-200/70 py-4 font-serif text-2xl text-taupe-900 transition hover:text-blush-600"
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="mt-auto space-y-3 p-5">
            <a href={`${homeHref}#booking`} onClick={() => setOpen(false)} className="btn-primary w-full">
              {t.book}
            </a>
            <a href={altHref} className="btn-outline w-full">
              {locale === "el" ? "English" : "Ελληνικά"}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
