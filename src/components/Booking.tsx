"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, useSyncExternalStore, type FormEvent } from "react";
import { SectionHeading, Reveal } from "./Reveal";
import { CheckIcon, PhoneIcon, ViberIcon, WhatsAppIcon } from "./icons";
import type { Dictionary } from "@/lib/i18n";
import { site, telUrl, viberUrl, whatsappUrl, type Locale } from "@/lib/site";
import { services } from "@/lib/services";
import {
  slotsForDate,
  todayInAthens,
  validateBooking,
  type BookingErrorKey,
  type BookingField,
  type SisterPreference,
} from "@/lib/booking";

type Props = {
  locale: Locale;
  t: Dictionary["booking"];
  privacyHref: string;
};

type FormState = {
  name: string;
  phone: string;
  email: string;
  serviceId: string;
  date: string;
  time: string;
  sister: SisterPreference;
  notes: string;
  consent: boolean;
  website: string; // honeypot
};

const noSubscribe = () => () => {};

const initial: FormState = {
  name: "",
  phone: "",
  email: "",
  serviceId: "",
  date: "",
  time: "",
  sister: "any",
  notes: "",
  consent: false,
  website: "",
};

export function Booking({ locale, t, privacyHref }: Props) {
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<Record<BookingField, BookingErrorKey>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  // Empty on the server, today's Athens date in the browser
  const today = useSyncExternalStore(noSubscribe, todayInAthens, () => "");
  const [submitted, setSubmitted] = useState<FormState | null>(null);

  // Pre-select a service from links like "#booking?service=hair-cut"
  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash;
      if (!hash.startsWith("#booking")) return;
      const q = hash.split("?")[1];
      const id = q ? new URLSearchParams(q).get("service") : null;
      if (id && services.some((s) => s.id === id)) {
        setForm((f) => ({ ...f, serviceId: id }));
        setStatus((s) => (s === "success" ? "idle" : s));
      }
      if (q) {
        document.getElementById("booking")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  const slots = useMemo(() => slotsForDate(form.date), [form.date]);
  const dateClosed = form.date !== "" && slots.length === 0;

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value, ...(key === "date" ? { time: "" } : {}) }));
    setErrors((e) => {
      const field = (key === "serviceId" ? "serviceId" : key) as BookingField;
      if (!(field in e)) return e;
      const next = { ...e };
      delete next[field];
      return next;
    });
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (form.website) return; // bot
    const result = validateBooking({ ...form, locale }, today || todayInAthens());
    if (!result.ok) {
      setErrors(result.errors);
      const first = Object.keys(result.errors)[0];
      document.getElementById(`bk-${first}`)?.focus();
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, locale }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { errors?: typeof errors } | null;
        if (body?.errors) setErrors(body.errors);
        setStatus("error");
        return;
      }
      setSubmitted(form);
      setStatus("success");
      setForm(initial);
    } catch {
      setStatus("error");
    }
  };

  const err = (field: BookingField) => {
    const key = errors[field];
    return key ? t.errors[key] : null;
  };

  const sisterLabel = (s: SisterPreference) =>
    s === "any" ? t.sisterAny : site.owners[s][locale];

  const dateLocale = locale === "el" ? "el-GR" : "en-GB";

  return (
    <section id="booking" className="section scroll-mt-20 bg-blush-50">
      <div className="container-x">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

        {/* One-tap contact */}
        <Reveal className="mx-auto mt-10 grid max-w-2xl grid-cols-3 gap-3">
          <a href={telUrl()} className="btn-outline flex-col !gap-1 !rounded-2xl !py-4 text-xs sm:flex-row sm:text-sm">
            <PhoneIcon size={20} className="text-taupe-900" />
            {t.call}
          </a>
          <a
            href={whatsappUrl(t.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn flex-col !gap-1 !rounded-2xl bg-[#25D366] !py-4 text-xs text-white shadow-card hover:-translate-y-0.5 hover:brightness-105 sm:flex-row sm:text-sm"
          >
            <WhatsAppIcon size={20} />
            {t.whatsapp}
          </a>
          <a
            href={viberUrl()}
            className="btn flex-col !gap-1 !rounded-2xl bg-[#7360F2] !py-4 text-xs text-white shadow-card hover:-translate-y-0.5 hover:brightness-110 sm:flex-row sm:text-sm"
          >
            <ViberIcon size={20} />
            {t.viber}
          </a>
        </Reveal>

        <Reveal delay={120} className="card mx-auto mt-8 max-w-2xl p-6 sm:p-10">
          {status === "success" && submitted ? (
            <div className="text-center" role="status" aria-live="polite">
              <span className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-champagne-100 text-gold-dark">
                <CheckIcon size={30} />
              </span>
              <h3 className="heading-md mt-5">{t.successTitle}</h3>
              <p className="lead mt-3">{t.successBody}</p>
              <dl className="mt-8 grid gap-3 rounded-2xl bg-blush-50 p-5 text-left text-sm sm:grid-cols-2">
                <div className="sm:col-span-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
                  {t.successSummary}
                </div>
                <div>
                  <dt className="text-taupe-500">{t.service}</dt>
                  <dd className="font-semibold text-taupe-900">
                    {services.find((s) => s.id === submitted.serviceId)?.name[locale]}
                  </dd>
                </div>
                <div>
                  <dt className="text-taupe-500">{t.date} / {t.time}</dt>
                  <dd className="font-semibold text-taupe-900">
                    {new Date(`${submitted.date}T12:00:00`).toLocaleDateString(dateLocale, {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                    })}{" "}
                    · {submitted.time}
                  </dd>
                </div>
                <div>
                  <dt className="text-taupe-500">{t.sister}</dt>
                  <dd className="font-semibold text-taupe-900">{sisterLabel(submitted.sister)}</dd>
                </div>
                <div>
                  <dt className="text-taupe-500">{t.phone}</dt>
                  <dd className="font-semibold text-taupe-900">{submitted.phone}</dd>
                </div>
              </dl>
              <button
                type="button"
                onClick={() => {
                  setStatus("idle");
                  setSubmitted(null);
                }}
                className="btn-outline mt-8"
              >
                {t.another}
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
              {/* Honeypot */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="bk-website">Website</label>
                <input
                  id="bk-website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.website}
                  onChange={(e) => update("website", e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="bk-name" className="label">{t.name}</label>
                <input
                  id="bk-name"
                  type="text"
                  autoComplete="name"
                  required
                  placeholder={t.namePlaceholder}
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "bk-name-err" : undefined}
                  className={`field ${errors.name ? "field-error" : ""}`}
                />
                {err("name") && <p id="bk-name-err" className="mt-1.5 text-xs text-blush-600">{err("name")}</p>}
              </div>

              <div>
                <label htmlFor="bk-phone" className="label">{t.phone}</label>
                <input
                  id="bk-phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  required
                  placeholder={t.phonePlaceholder}
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? "bk-phone-err" : undefined}
                  className={`field ${errors.phone ? "field-error" : ""}`}
                />
                {err("phone") && <p id="bk-phone-err" className="mt-1.5 text-xs text-blush-600">{err("phone")}</p>}
              </div>

              <div>
                <label htmlFor="bk-email" className="label">
                  {t.email} <span className="font-normal text-taupe-300">({t.optional})</span>
                </label>
                <input
                  id="bk-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "bk-email-err" : undefined}
                  className={`field ${errors.email ? "field-error" : ""}`}
                />
                {err("email") && <p id="bk-email-err" className="mt-1.5 text-xs text-blush-600">{err("email")}</p>}
              </div>

              <div>
                <label htmlFor="bk-serviceId" className="label">{t.service}</label>
                <select
                  id="bk-serviceId"
                  required
                  value={form.serviceId}
                  onChange={(e) => update("serviceId", e.target.value)}
                  aria-invalid={!!errors.serviceId}
                  aria-describedby={errors.serviceId ? "bk-service-err" : undefined}
                  className={`field select ${errors.serviceId ? "field-error" : ""}`}
                >
                  <option value="" disabled>{t.servicePlaceholder}</option>
                  <optgroup label={t.hairGroup}>
                    {services.filter((s) => s.category === "hair").map((s) => (
                      <option key={s.id} value={s.id}>{s.name[locale]}</option>
                    ))}
                  </optgroup>
                  <optgroup label={t.nailsGroup}>
                    {services.filter((s) => s.category === "nails").map((s) => (
                      <option key={s.id} value={s.id}>{s.name[locale]}</option>
                    ))}
                  </optgroup>
                </select>
                {err("serviceId") && <p id="bk-service-err" className="mt-1.5 text-xs text-blush-600">{err("serviceId")}</p>}
              </div>

              <div>
                <label htmlFor="bk-date" className="label">{t.date}</label>
                <input
                  id="bk-date"
                  type="date"
                  required
                  min={today || undefined}
                  value={form.date}
                  onChange={(e) => update("date", e.target.value)}
                  aria-invalid={!!errors.date || dateClosed}
                  aria-describedby={errors.date || dateClosed ? "bk-date-err" : undefined}
                  className={`field ${errors.date || dateClosed ? "field-error" : ""}`}
                />
                {(err("date") || dateClosed) && (
                  <p id="bk-date-err" className="mt-1.5 text-xs text-blush-600">
                    {err("date") ?? t.errors.dateClosed}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="bk-time" className="label">{t.time}</label>
                <select
                  id="bk-time"
                  required
                  disabled={slots.length === 0}
                  value={form.time}
                  onChange={(e) => update("time", e.target.value)}
                  aria-invalid={!!errors.time}
                  aria-describedby={errors.time ? "bk-time-err" : undefined}
                  className={`field select disabled:opacity-60 ${errors.time ? "field-error" : ""}`}
                >
                  <option value="" disabled>
                    {slots.length === 0 ? t.pickDateFirst : t.timePlaceholder}
                  </option>
                  {slots.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                {err("time") && <p id="bk-time-err" className="mt-1.5 text-xs text-blush-600">{err("time")}</p>}
              </div>

              <fieldset className="sm:col-span-2">
                <legend className="label">{t.sister}</legend>
                <div className="flex flex-wrap gap-2">
                  {(["any", "amalia", "anastasia"] as SisterPreference[]).map((s) => {
                    const selected = form.sister === s;
                    return (
                      <label
                        key={s}
                        className={`cursor-pointer rounded-full px-4 py-2 text-sm font-semibold ring-1 transition ${
                          selected
                            ? "bg-taupe-900 text-ivory ring-taupe-900"
                            : "bg-white/70 text-taupe-700 ring-blush-200 hover:bg-blush-100"
                        }`}
                      >
                        <input
                          type="radio"
                          name="sister"
                          value={s}
                          checked={selected}
                          onChange={() => update("sister", s)}
                          className="sr-only"
                        />
                        {sisterLabel(s)}
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              <div className="sm:col-span-2">
                <label htmlFor="bk-notes" className="label">
                  {t.notes} <span className="font-normal text-taupe-300">({t.optional})</span>
                </label>
                <textarea
                  id="bk-notes"
                  rows={3}
                  maxLength={1000}
                  placeholder={t.notesPlaceholder}
                  value={form.notes}
                  onChange={(e) => update("notes", e.target.value)}
                  className="field resize-y"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="flex cursor-pointer items-start gap-3 text-sm text-taupe-600">
                  <input
                    id="bk-consent"
                    type="checkbox"
                    checked={form.consent}
                    onChange={(e) => update("consent", e.target.checked)}
                    aria-invalid={!!errors.consent}
                    aria-describedby={errors.consent ? "bk-consent-err" : undefined}
                    className="mt-1 h-4 w-4 shrink-0 accent-taupe-900"
                  />
                  <span>
                    {t.consentPrefix}
                    <Link href={privacyHref} className="font-semibold text-blush-600 underline-offset-2 hover:underline">
                      {t.consentLink}
                    </Link>
                    {t.consentSuffix}
                  </span>
                </label>
                {err("consent") && <p id="bk-consent-err" className="mt-1.5 text-xs text-blush-600">{err("consent")}</p>}
              </div>

              <div className="sm:col-span-2">
                <button type="submit" disabled={status === "submitting"} className="btn-primary w-full disabled:opacity-70">
                  {status === "submitting" ? t.submitting : t.submit}
                </button>
                {status === "error" && (
                  <p role="alert" className="mt-3 text-center text-sm text-blush-600">{t.errorGeneric}</p>
                )}
                <p className="mt-4 text-xs leading-relaxed text-taupe-500">{t.footnote}</p>
              </div>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
