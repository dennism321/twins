/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SITE CONFIGURATION — edit the values marked TODO with the real details.
 *  Everything (header, footer, booking buttons, map, SEO schema) reads from here.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type Locale = "el" | "en";
export const locales: Locale[] = ["el", "en"];
export const defaultLocale: Locale = "el";

/**
 * TechAthos "PREVIEW" watermark tiled faintly over every page, for showing the
 * client a draft. TODO: set to false before the site goes live.
 */
export const showPreviewWatermark = true;

export const site = {
  name: "My Twins Beauty Lounge",
  shortName: "My Twins",
  founded: 2018,
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://mytwinsbeautylounge.gr",

  // TODO: replace with the real number (display + machine formats)
  phoneDisplay: "+30 210 000 0000",
  phoneE164: "+302100000000",
  whatsappNumber: "302100000000", // digits only, with country code
  email: "hello@mytwinsbeautylounge.gr",

  // TODO: replace with the real social handles / URLs
  instagramHandle: "mytwinsbeautylounge",
  instagramUrl: "https://www.instagram.com/mytwinsbeautylounge",
  facebookUrl: "https://www.facebook.com/mytwinsbeautylounge",

  // From the salon's Instagram bio. (Its Google Maps listing uses the corner entrance, Βουρνόβα 2.)
  address: {
    street: { el: "Ιωνίας 1", en: "1 Ionias" },
    city: { el: "Νέα Σμύρνη", en: "Nea Smyrni" },
    region: { el: "Αθήνα", en: "Athens" },
    postalCode: "171 21",
    countryCode: "GR",
    country: { el: "Ελλάδα", en: "Greece" },
  },
  // Ιωνίας 1, Νέα Σμύρνη (OpenStreetMap)
  geo: { lat: 37.95251, lng: 23.71589 },

  /**
   * Opening hours. `days` use JS weekday numbers (0 = Sunday … 6 = Saturday).
   * Days not listed are closed. Times are local (Europe/Athens).
   */
  hours: [
    { days: [2, 3, 4, 5], open: "10:00", close: "20:00" },
    { days: [6], open: "09:00", close: "16:00" },
  ],
  timeZone: "Europe/Athens",
  slotMinutes: 30,

  owners: {
    amalia: { el: "Αμαλία", en: "Amalia" },
    anastasia: { el: "Αναστασία", en: "Anastasia" },
  },
} as const;

export const openingDays = new Set<number>(
  site.hours.flatMap((h) => [...h.days]),
);

export function hoursForDay(weekday: number) {
  return site.hours.find((h) => (h.days as readonly number[]).includes(weekday));
}

export function fullAddress(locale: Locale) {
  const a = site.address;
  return `${a.street[locale]}, ${a.city[locale]} ${a.postalCode}, ${a.region[locale]}`;
}

export function mapsEmbedUrl(locale: Locale) {
  const q = encodeURIComponent(`${site.name}, ${fullAddress(locale)}`);
  return `https://www.google.com/maps?q=${q}&hl=${locale}&z=16&output=embed`;
}

export function mapsDirectionsUrl(locale: Locale) {
  const q = encodeURIComponent(fullAddress(locale));
  return `https://www.google.com/maps/dir/?api=1&destination=${q}`;
}

export function whatsappUrl(message: string) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function viberUrl() {
  return `viber://chat?number=${encodeURIComponent(site.phoneE164)}`;
}

export function telUrl() {
  return `tel:${site.phoneE164}`;
}

export function localePath(locale: Locale, path = "/") {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (locale === "el") return clean;
  return clean === "/" ? "/en" : `/en${clean}`;
}

export function otherLocale(locale: Locale): Locale {
  return locale === "el" ? "en" : "el";
}
