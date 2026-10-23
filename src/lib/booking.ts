import { hoursForDay, site, type Locale } from "./site";
import { getService } from "./services";

export type SisterPreference = "any" | "amalia" | "anastasia";
export const sisterOptions: SisterPreference[] = ["any", "amalia", "anastasia"];

export interface BookingInput {
  name: string;
  phone: string;
  email?: string;
  serviceId: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  sister: SisterPreference;
  notes?: string;
  consent: boolean;
  locale: Locale;
  website?: string; // honeypot
}

export type BookingErrorKey =
  | "name"
  | "phone"
  | "email"
  | "service"
  | "date"
  | "datePast"
  | "dateClosed"
  | "time"
  | "consent";

export type BookingField = "name" | "phone" | "email" | "serviceId" | "date" | "time" | "consent";

/** Today's date (YYYY-MM-DD) in the salon's time zone. */
export function todayInAthens(now = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: site.timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

export function weekdayOf(dateStr: string) {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay();
}

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};
const pad = (n: number) => String(n).padStart(2, "0");

/** Bookable start times for a given date, based on opening hours. */
export function slotsForDate(dateStr: string): string[] {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return [];
  const h = hoursForDay(weekdayOf(dateStr));
  if (!h) return [];
  const slots: string[] = [];
  // last slot starts one slot before closing
  for (let t = toMinutes(h.open); t <= toMinutes(h.close) - site.slotMinutes; t += site.slotMinutes) {
    slots.push(`${pad(Math.floor(t / 60))}:${pad(t % 60)}`);
  }
  return slots;
}

const PHONE_RE = /^\+?[0-9][0-9\s\-().]{6,19}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateBooking(
  raw: Partial<BookingInput>,
  today = todayInAthens(),
): { ok: true; data: Required<Omit<BookingInput, "website">> } | { ok: false; errors: Partial<Record<BookingField, BookingErrorKey>> } {
  const errors: Partial<Record<BookingField, BookingErrorKey>> = {};

  const name = (raw.name ?? "").trim();
  if (name.length < 2 || name.length > 120) errors.name = "name";

  const phone = (raw.phone ?? "").trim();
  if (!PHONE_RE.test(phone)) errors.phone = "phone";

  const email = (raw.email ?? "").trim();
  if (email && (!EMAIL_RE.test(email) || email.length > 160)) errors.email = "email";

  const serviceId = (raw.serviceId ?? "").trim();
  const service = getService(serviceId);
  if (!service) errors.serviceId = "service";

  const date = (raw.date ?? "").trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    errors.date = "date";
  } else if (date < today) {
    errors.date = "datePast";
  } else if (!hoursForDay(weekdayOf(date))) {
    errors.date = "dateClosed";
  }

  const time = (raw.time ?? "").trim();
  if (!errors.date && !slotsForDate(date).includes(time)) errors.time = "time";
  else if (errors.date && !time) errors.time = "time";

  const sister: SisterPreference = sisterOptions.includes(raw.sister as SisterPreference)
    ? (raw.sister as SisterPreference)
    : "any";

  const notes = (raw.notes ?? "").trim().slice(0, 1000);
  if (raw.consent !== true) errors.consent = "consent";

  const locale: Locale = raw.locale === "en" ? "en" : "el";

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    data: { name, phone, email, serviceId, date, time, sister, notes, consent: true, locale },
  };
}
