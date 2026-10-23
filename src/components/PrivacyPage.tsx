import Link from "next/link";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Overlays } from "./Overlays";
import { ArrowLeftIcon } from "./icons";
import { getDictionary } from "@/lib/i18n";
import { fullAddress, localePath, otherLocale, site, type Locale } from "@/lib/site";

function fill(text: string, locale: Locale) {
  return text
    .replace("{address}", fullAddress(locale))
    .replace("{email}", site.email)
    .replace("{phone}", site.phoneDisplay);
}

export function PrivacyPage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const home = localePath(locale, "/");

  return (
    <>
      <Header locale={locale} t={t.nav} homeHref={home} altHref={localePath(otherLocale(locale), "/privacy")} />
      <main id="main" className="grain">
        <article className="container-x max-w-3xl py-16 sm:py-24">
          <Link href={home} className="inline-flex items-center gap-2 text-sm font-semibold text-blush-600 hover:underline">
            <ArrowLeftIcon size={16} />
            {t.privacy.backHome}
          </Link>
          <span className="eyebrow mt-8">{site.name}</span>
          <h1 className="heading-lg mt-4">{t.privacy.title}</h1>
          <p className="mt-3 text-sm text-taupe-500">{t.privacy.updated}</p>
          <p className="lead mt-8">{t.privacy.intro}</p>

          <div className="mt-12 space-y-10">
            {t.privacy.sections.map((s) => (
              <section key={s.heading}>
                <h2 className="heading-md">{s.heading}</h2>
                <div className="mt-4 space-y-3">
                  {s.body.map((p, i) => (
                    <p key={i} className="leading-relaxed text-taupe-600">
                      {fill(p, locale)}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="card mt-14 p-6 text-sm text-taupe-600">
            <p className="font-semibold text-taupe-900">{site.name}</p>
            <p>{fullAddress(locale)}</p>
            <p>
              <a href={`mailto:${site.email}`} className="text-blush-600 hover:underline">{site.email}</a> ·{" "}
              <a href={`tel:${site.phoneE164}`} className="text-blush-600 hover:underline">{site.phoneDisplay}</a>
            </p>
          </div>
        </article>
      </main>
      <Footer locale={locale} t={t} currentPath="/privacy" />
      <Overlays locale={locale} cookie={t.cookie} whatsapp={t.whatsapp} whatsappMessage={t.booking.whatsappMessage} />
    </>
  );
}
