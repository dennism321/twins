import { fullAddress, localePath, site, type Locale } from "@/lib/site";
import { services } from "@/lib/services";
import { getDictionary } from "@/lib/i18n";

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/** LocalBusiness (HairSalon + NailSalon) structured data for rich results. */
export function LocalBusinessJsonLd({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const url = `${site.url}${localePath(locale, "/")}`;

  const offerCatalog = (category: "hair" | "nails", name: string) => ({
    "@type": "OfferCatalog",
    name,
    itemListElement: services
      .filter((s) => s.category === category)
      .map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.name[locale],
          description: s.description[locale],
          provider: { "@id": `${site.url}/#salon` },
          areaServed: { "@type": "City", name: site.address.city[locale] },
        },
        ...(s.priceFrom !== null
          ? {
              priceSpecification: {
                "@type": "PriceSpecification",
                price: s.priceFrom,
                priceCurrency: "EUR",
                minPrice: s.priceFrom,
              },
            }
          : {}),
      })),
  });

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["HairSalon", "NailSalon", "BeautySalon"],
        "@id": `${site.url}/#salon`,
        name: site.name,
        alternateName: "My Twins Νέα Σμύρνη",
        description: t.meta.description,
        url,
        telephone: site.phoneE164,
        email: site.email,
        image: [`${site.url}/images/hero.jpg`, `${site.url}/images/salon-interior.jpg`],
        logo: `${site.url}/images/logo.png`,
        priceRange: "€€",
        currenciesAccepted: "EUR",
        paymentAccepted: "Cash, Credit Card, Debit Card",
        foundingDate: String(site.founded),
        address: {
          "@type": "PostalAddress",
          streetAddress: site.address.street[locale],
          addressLocality: site.address.city[locale],
          addressRegion: site.address.region[locale],
          postalCode: site.address.postalCode,
          addressCountry: site.address.countryCode,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: site.geo.lat,
          longitude: site.geo.lng,
        },
        hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress(locale))}`,
        openingHoursSpecification: site.hours.map((h) => ({
          "@type": "OpeningHoursSpecification",
          dayOfWeek: h.days.map((d) => DAY_NAMES[d]),
          opens: h.open,
          closes: h.close,
        })),
        sameAs: [site.instagramUrl, site.facebookUrl],
        founder: [
          { "@type": "Person", name: site.owners.amalia[locale], jobTitle: locale === "el" ? "Κομμώτρια & Τεχνίτρια νυχιών" : "Hair stylist & Nail technician" },
          { "@type": "Person", name: site.owners.anastasia[locale], jobTitle: locale === "el" ? "Κομμώτρια & Τεχνίτρια νυχιών" : "Hair stylist & Nail technician" },
        ],
        knowsLanguage: ["el", "en"],
        areaServed: [
          { "@type": "City", name: site.address.city[locale] },
          { "@type": "AdministrativeArea", name: locale === "el" ? "Νότια Προάστια Αθήνας" : "Athens South Suburbs" },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: t.services.eyebrow,
          itemListElement: [
            offerCatalog("hair", t.services.hair),
            offerCatalog("nails", t.services.nails),
          ],
        },
        potentialAction: {
          "@type": "ReserveAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${url}#booking`,
            actionPlatform: ["http://schema.org/DesktopWebPlatform", "http://schema.org/MobileWebPlatform"],
          },
          result: { "@type": "Reservation", name: t.nav.book },
        },
        aggregateRating: undefined,
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        inLanguage: locale,
        publisher: { "@id": `${site.url}/#salon` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
