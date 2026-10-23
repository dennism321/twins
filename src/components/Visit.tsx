import { Reveal, SectionHeading } from "./Reveal";
import { ClockIcon, ExternalIcon, MailIcon, MapPinIcon, PhoneIcon } from "./icons";
import { MapEmbed, OpenStatus } from "./VisitClient";
import type { Dictionary } from "@/lib/i18n";
import {
  fullAddress,
  hoursForDay,
  mapsDirectionsUrl,
  mapsEmbedUrl,
  site,
  telUrl,
  type Locale,
} from "@/lib/site";

export function HoursList({
  t,
  compact = false,
}: {
  t: Pick<Dictionary["visit"], "days" | "daysShort" | "closed">;
  compact?: boolean;
}) {
  // Tue → Sun ordering reads naturally for a salon week
  const order = [1, 2, 3, 4, 5, 6, 0];
  return (
    <ul className={`divide-y ${compact ? "divide-ivory/10 text-sm" : "divide-blush-200/70"}`}>
      {order.map((d) => {
        const h = hoursForDay(d);
        return (
          <li key={d} className="flex items-center justify-between py-2">
            <span className={compact ? "text-ivory/70" : "text-taupe-600"}>
              {compact ? t.daysShort[d] : t.days[d]}
            </span>
            <span className={`font-semibold tabular-nums ${h ? (compact ? "text-ivory" : "text-taupe-900") : compact ? "text-ivory/40" : "text-taupe-300"}`}>
              {h ? `${h.open} – ${h.close}` : t.closed}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

export function Visit({ t, locale }: { t: Dictionary["visit"]; locale: Locale }) {
  const address = fullAddress(locale);
  return (
    <section id="visit" className="section scroll-mt-20">
      <div className="container-x">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-5">
          {/* Info */}
          <div className="min-w-0 space-y-6 lg:col-span-2">
            <Reveal className="card p-7">
              <div className="flex items-start gap-4">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blush-100 text-blush-600">
                  <MapPinIcon size={20} />
                </span>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-dark">{t.addressLabel}</h3>
                  <address className="mt-2 not-italic leading-relaxed text-taupe-900">
                    {site.address.street[locale]}
                    <br />
                    {site.address.city[locale]} {site.address.postalCode}, {site.address.region[locale]}
                  </address>
                  <a
                    href={mapsDirectionsUrl(locale)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-blush-600 hover:underline"
                  >
                    {t.directions}
                    <ExternalIcon size={14} />
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={80} className="card p-7">
              <div className="flex items-start gap-4">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blush-100 text-blush-600">
                  <ClockIcon size={20} />
                </span>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-dark">{t.hoursLabel}</h3>
                    <OpenStatus openLabel={t.openNow} closedLabel={t.closedNow} />
                  </div>
                  <div className="mt-3">
                    <HoursList t={t} />
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={160} className="card p-7">
              <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-dark">{t.contactLabel}</h3>
              <ul className="mt-3 space-y-2 text-taupe-900">
                <li>
                  <a href={telUrl()} className="inline-flex items-center gap-2 hover:text-blush-600">
                    <PhoneIcon size={16} className="text-taupe-500" /> {site.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${site.email}`} className="inline-flex min-w-0 items-center gap-2 [overflow-wrap:anywhere] hover:text-blush-600">
                    <MailIcon size={16} className="text-taupe-500" /> {site.email}
                  </a>
                </li>
              </ul>
              <h3 className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-gold-dark">{t.transitTitle}</h3>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-taupe-600">
                {t.transit.map((line) => (
                  <li key={line} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
                    {line}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Map */}
          <Reveal delay={120} className="min-w-0 overflow-hidden rounded-[2rem] shadow-soft lg:col-span-3">
            <div className="relative h-[380px] w-full sm:h-[460px] lg:h-full lg:min-h-[640px]">
              <MapEmbed
                src={mapsEmbedUrl(locale)}
                title={t.mapTitle}
                consentTitle={t.mapConsentTitle}
                consentText={t.mapConsentText}
                loadLabel={t.mapLoad}
              />
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${site.name}, ${address}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-ivory/90 px-3.5 py-2 text-xs font-semibold text-taupe-900 shadow-card backdrop-blur hover:bg-ivory"
              >
                <MapPinIcon size={14} />
                {t.openInMaps}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
