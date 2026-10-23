import { Header } from "./Header";
import { Hero } from "./Hero";
import { Story } from "./Story";
import { Services } from "./Services";
import { Gallery } from "./Gallery";
import { Testimonials } from "./Testimonials";
import { Booking } from "./Booking";
import { Visit } from "./Visit";
import { InstagramFeed } from "./InstagramFeed";
import { Footer } from "./Footer";
import { Overlays } from "./Overlays";
import { LocalBusinessJsonLd } from "./JsonLd";
import { getDictionary } from "@/lib/i18n";
import { localePath, otherLocale, type Locale } from "@/lib/site";

export function HomePage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const home = localePath(locale, "/");

  return (
    <>
      <LocalBusinessJsonLd locale={locale} />
      <Header locale={locale} t={t.nav} homeHref={home} altHref={localePath(otherLocale(locale), "/")} />
      <main id="main">
        <Hero t={t.hero} />
        <Story t={t.story} />
        <Services t={t.services} locale={locale} />
        <Gallery t={t.gallery} />
        <Testimonials t={t.testimonials} />
        <Booking locale={locale} t={t.booking} privacyHref={localePath(locale, "/privacy")} />
        <Visit t={t.visit} locale={locale} />
        <InstagramFeed t={t.instagram} locale={locale} />
      </main>
      <Footer locale={locale} t={t} currentPath="/" />
      <Overlays locale={locale} cookie={t.cookie} whatsapp={t.whatsapp} whatsappMessage={t.booking.whatsappMessage} />
    </>
  );
}
