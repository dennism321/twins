import type { Locale } from "./site";

export type ServiceCategory = "hair" | "nails";

type Bilingual = Record<Locale, string>;

export interface ServiceItem {
  id: string;
  category: ServiceCategory;
  name: Bilingual;
  description: Bilingual;
  /** Starting price in EUR — TODO: replace placeholder prices */
  priceFrom: number | null;
  /** Optional suffix, e.g. "per nail" */
  priceNote?: Bilingual;
  duration: Bilingual;
}

export const services: ServiceItem[] = [
  // ── Hair ──────────────────────────────────────────────────────────────────
  {
    id: "hair-cut",
    category: "hair",
    name: { el: "Κούρεμα & Styling", en: "Cut & Styling" },
    description: {
      el: "Κούρεμα μετά από συζήτηση για το πρόσωπο, την υφή των μαλλιών και την καθημερινότητά σας. Περιλαμβάνει λούσιμο και φινίρισμα.",
      en: "A cut shaped around your face, your hair's texture and your everyday routine. Includes wash and finish.",
    },
    priceFrom: 25,
    duration: { el: "60 λεπτά", en: "60 min" },
  },
  {
    id: "hair-blowdry",
    category: "hair",
    name: { el: "Χτένισμα / Blow-dry", en: "Blow-dry" },
    description: {
      el: "Λούσιμο, ελαφριά ενυδάτωση και χτένισμα με βούρτσα ή πρέσα. Ίσιο, κυματιστό ή με όγκο — όπως σας αρέσει.",
      en: "Wash, light conditioning and a brush or iron blow-dry. Sleek, wavy or full of volume — your call.",
    },
    priceFrom: 15,
    duration: { el: "45 λεπτά", en: "45 min" },
  },
  {
    id: "hair-color",
    category: "hair",
    name: { el: "Βαφή & Χρώμα", en: "Colour" },
    description: {
      el: "Ρίζα ή ολόκληρο χρώμα με προϊόντα χαμηλής αμμωνίας που σέβονται την τρίχα. Πάντα με προσωπική πρόταση απόχρωσης.",
      en: "Root touch-up or full colour with low-ammonia products that respect the hair. Always with a personal shade consultation.",
    },
    priceFrom: 35,
    duration: { el: "90 λεπτά", en: "90 min" },
  },
  {
    id: "hair-balayage",
    category: "hair",
    name: { el: "Balayage & Ανταύγειες", en: "Balayage & Highlights" },
    description: {
      el: "Φυσικές, φωτεινές ανταύγειες ζωγραφισμένες στο χέρι, για αποτέλεσμα που μεγαλώνει όμορφα χωρίς έντονη γραμμή.",
      en: "Hand-painted, sun-kissed dimension that grows out gracefully without a harsh line.",
    },
    priceFrom: 90,
    duration: { el: "2,5–3 ώρες", en: "2.5–3 hrs" },
  },
  {
    id: "hair-treatment",
    category: "hair",
    name: { el: "Θεραπείες μαλλιών", en: "Hair Treatments" },
    description: {
      el: "Ενυδάτωση, αναδόμηση, κερατίνη ή botox μαλλιών, ανάλογα με το τι χρειάζεται η τρίχα σας αυτή τη στιγμή.",
      en: "Hydration, rebuilding, keratin or hair botox — depending on what your hair needs right now.",
    },
    priceFrom: 20,
    duration: { el: "30–90 λεπτά", en: "30–90 min" },
  },
  {
    id: "hair-bridal",
    category: "hair",
    name: { el: "Νυφικό & Βραδινό χτένισμα", en: "Bridal & Event Hair" },
    description: {
      el: "Δοκιμαστικό, συζήτηση για το ύφος της ημέρας και χτένισμα που κρατά μέχρι τον τελευταίο χορό. Διαθέσιμο και κατ' οίκον.",
      en: "A trial session, a conversation about the mood of the day and a style that lasts until the last dance. Also available on location.",
    },
    priceFrom: 80,
    priceNote: { el: "κατόπιν συνεννόησης", en: "by consultation" },
    duration: { el: "90 λεπτά", en: "90 min" },
  },

  // ── Nails ─────────────────────────────────────────────────────────────────
  {
    id: "nails-manicure",
    category: "nails",
    name: { el: "Manicure", en: "Manicure" },
    description: {
      el: "Κλασικό ή spa manicure με περιποίηση επωνυχίων, σχήμα και απλό βερνίκι. Μια μικρή πολυτέλεια για κάθε εβδομάδα.",
      en: "Classic or spa manicure with cuticle care, shaping and regular polish. A small weekly luxury.",
    },
    priceFrom: 12,
    duration: { el: "40 λεπτά", en: "40 min" },
  },
  {
    id: "nails-pedicure",
    category: "nails",
    name: { el: "Pedicure", en: "Pedicure" },
    description: {
      el: "Spa pedicure με απολέπιση, ενυδάτωση και βερνίκι, σε αναπαυτική πολυθρόνα. Επιλογή απλού ή ημιμόνιμου.",
      en: "Spa pedicure with exfoliation, hydration and polish in a comfortable chair. Regular or gel finish.",
    },
    priceFrom: 20,
    duration: { el: "60 λεπτά", en: "60 min" },
  },
  {
    id: "nails-gel",
    category: "nails",
    name: { el: "Ημιμόνιμο Manicure", en: "Gel / Semi-permanent" },
    description: {
      el: "Ημιμόνιμο βερνίκι με διάρκεια έως 3 εβδομάδες και απαλή αφαίρεση που δεν ταλαιπωρεί το φυσικό νύχι.",
      en: "Gel polish that lasts up to 3 weeks, with gentle removal that doesn't stress the natural nail.",
    },
    priceFrom: 20,
    duration: { el: "60 λεπτά", en: "60 min" },
  },
  {
    id: "nails-art",
    category: "nails",
    name: { el: "Nail Art", en: "Nail Art" },
    description: {
      el: "Από ένα λεπτό french μέχρι χειροποίητα σχέδια, φύλλα χρυσού και chrome. Φέρτε μας μια ιδέα και θα την προσαρμόσουμε σε εσάς.",
      en: "From a fine French tip to hand-painted designs, gold leaf and chrome. Bring us an idea and we'll make it yours.",
    },
    priceFrom: 2,
    priceNote: { el: "ανά νύχι", en: "per nail" },
    duration: { el: "15–45 λεπτά", en: "15–45 min" },
  },
  {
    id: "nails-extensions",
    category: "nails",
    name: { el: "Τεχνητά νύχια & Ενίσχυση", en: "Extensions & Strengthening" },
    description: {
      el: "Gel ή acrygel extensions και ενίσχυση φυσικού νυχιού, πάντα με σεβασμό στην υγεία της πλάκας.",
      en: "Gel or acrygel extensions and natural nail strengthening — always respecting the health of the nail plate.",
    },
    priceFrom: 40,
    duration: { el: "90–120 λεπτά", en: "90–120 min" },
  },
];

export const serviceIds = new Set(services.map((s) => s.id));

export function getService(id: string) {
  return services.find((s) => s.id === id);
}

export function servicesByCategory(category: ServiceCategory) {
  return services.filter((s) => s.category === category);
}

export function formatPrice(item: ServiceItem, locale: Locale) {
  if (item.priceFrom === null) {
    return locale === "el" ? "κατόπιν συνεννόησης" : "by consultation";
  }
  const amount = new Intl.NumberFormat(locale === "el" ? "el-GR" : "en-GB", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(item.priceFrom);
  const base = locale === "el" ? `από ${amount}` : `from ${amount}`;
  return item.priceNote ? `${base} · ${item.priceNote[locale]}` : base;
}
