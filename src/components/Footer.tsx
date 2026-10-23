import Link from "next/link";
import { BrandLogo } from "./Logo";
import { FacebookIcon, InstagramIcon, MailIcon, MapPinIcon, PhoneIcon } from "./icons";
import { HoursList } from "./Visit";
import type { Dictionary } from "@/lib/i18n";
import { localePath, otherLocale, site, telUrl, type Locale } from "@/lib/site";

export function Footer({
  locale,
  t,
  currentPath = "/",
}: {
  locale: Locale;
  t: Dictionary;
  currentPath?: "/" | "/privacy";
}) {
  const home = localePath(locale, "/");
  const alt = otherLocale(locale);
  const year = new Date().getFullYear();

  const links = [
    { href: `${home}#story`, label: t.nav.story },
    { href: `${home}#services`, label: t.nav.services },
    { href: `${home}#gallery`, label: t.nav.gallery },
    { href: `${home}#testimonials`, label: t.nav.testimonials },
    { href: `${home}#booking`, label: t.nav.book },
    { href: `${home}#visit`, label: t.nav.visit },
  ];

  return (
    <footer className="bg-taupe-900 text-ivory">
      <div className="container-x py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <BrandLogo className="h-28 w-28" sizes="112px" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-ivory/70">{t.footer.tagline}</p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ivory/15 text-ivory transition hover:border-gold hover:text-champagne-200"
              >
                <InstagramIcon size={20} />
              </a>
              <a
                href={site.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ivory/15 text-ivory transition hover:border-gold hover:text-champagne-200"
              >
                <FacebookIcon size={20} />
              </a>
            </div>
          </div>

          {/* Explore */}
          <nav aria-label="Footer" className="lg:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-champagne-200">{t.footer.explore}</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-ivory/75 transition hover:text-ivory">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-champagne-200">{t.footer.contact}</h3>
            <ul className="mt-5 space-y-3 text-sm text-ivory/75">
              <li className="flex items-start gap-2.5">
                <MapPinIcon size={16} className="mt-0.5 shrink-0 text-gold" />
                <address className="not-italic">
                  {site.address.street[locale]}
                  <br />
                  {site.address.city[locale]} {site.address.postalCode}, {site.address.region[locale]}
                </address>
              </li>
              <li>
                <a href={telUrl()} className="flex items-center gap-2.5 transition hover:text-ivory">
                  <PhoneIcon size={16} className="shrink-0 text-gold" /> {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="flex items-center gap-2.5 transition hover:text-ivory">
                  <MailIcon size={16} className="shrink-0 text-gold" /> {site.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-champagne-200">{t.footer.hours}</h3>
            <div className="mt-3">
              <HoursList t={t.visit} compact />
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-ivory/10 pt-6 text-xs text-ivory/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. {t.footer.rights}
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href={localePath(locale, "/privacy")} className="transition hover:text-ivory">
              {t.footer.privacy}
            </Link>
            <a
              href={localePath(alt, currentPath)}
              hrefLang={alt}
              lang={alt}
              className="inline-flex items-center gap-1.5 transition hover:text-ivory"
            >
              <span aria-hidden>🌐</span>
              {alt === "en" ? "English" : "Ελληνικά"}
            </a>
            <span className="hidden text-ivory/35 sm:inline">{t.footer.madeWith}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
