"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { MapPinIcon } from "./icons";
import { hoursForDay, site } from "@/lib/site";

export const CONSENT_KEY = "mt-consent";
export const CONSENT_EVENT = "mt-consent";
export type Consent = "all" | "necessary";

export function readConsent(): Consent | null {
  if (typeof window === "undefined") return null;
  // Storage can throw when the browser blocks it (private mode, strict settings)
  let v: string | null = null;
  try {
    v = window.localStorage.getItem(CONSENT_KEY);
  } catch {}
  return v === "all" || v === "necessary" ? v : sessionConsent;
}

/** Fallback for this page visit when storage is blocked */
let sessionConsent: Consent | null = null;

export function writeConsent(value: Consent) {
  sessionConsent = value;
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {}
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
}

function subscribeConsent(onChange: () => void) {
  window.addEventListener(CONSENT_EVENT, onChange);
  return () => window.removeEventListener(CONSENT_EVENT, onChange);
}

/** Google Map that only loads after cookie consent (or an explicit tap). */
export function MapEmbed({
  src,
  title,
  consentTitle,
  consentText,
  loadLabel,
}: {
  src: string;
  title: string;
  consentTitle: string;
  consentText: string;
  loadLabel: string;
}) {
  const consented = useSyncExternalStore(
    subscribeConsent,
    () => readConsent() === "all",
    () => false,
  );
  const [tapped, setAllowed] = useState(false);
  const allowed = consented || tapped;

  if (allowed) {
    return (
      <iframe
        title={title}
        src={src}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className="h-full w-full border-0"
      />
    );
  }

  return (
    <div className="grain flex h-full w-full flex-col items-center justify-center gap-4 bg-cream p-8 text-center">
      <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white text-blush-600 shadow-card">
        <MapPinIcon size={26} />
      </span>
      <div>
        <p className="font-serif text-2xl text-taupe-900">{consentTitle}</p>
        <p className="mx-auto mt-2 max-w-xs text-sm text-taupe-600">{consentText}</p>
      </div>
      <button type="button" onClick={() => setAllowed(true)} className="btn-primary">
        {loadLabel}
      </button>
    </div>
  );
}

/** "Open now / Closed now" pill computed client-side in Europe/Athens time. */
export function OpenStatus({ openLabel, closedLabel }: { openLabel: string; closedLabel: string }) {
  const [open, setOpen] = useState<boolean | null>(null);

  useEffect(() => {
    const compute = () => {
      const now = new Date();
      const parts = new Intl.DateTimeFormat("en-US", {
        timeZone: site.timeZone,
        weekday: "short",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).formatToParts(now);
      const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
      const weekdayIndex = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
      const hours = hoursForDay(weekdayIndex);
      if (!hours) return setOpen(false);
      const minutes = (Number(get("hour")) % 24) * 60 + Number(get("minute"));
      const toMin = (s: string) => Number(s.slice(0, 2)) * 60 + Number(s.slice(3));
      setOpen(minutes >= toMin(hours.open) && minutes < toMin(hours.close));
    };
    compute();
    const id = window.setInterval(compute, 60_000);
    return () => window.clearInterval(id);
  }, []);

  if (open === null) return null;
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
        open ? "bg-emerald-50 text-emerald-700" : "bg-blush-100 text-blush-600"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${open ? "bg-emerald-500" : "bg-blush-400"}`} aria-hidden />
      {open ? openLabel : closedLabel}
    </span>
  );
}
