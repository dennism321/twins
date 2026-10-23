"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { WhatsAppIcon } from "./icons";
import { readConsent, writeConsent } from "./VisitClient";
import type { Dictionary } from "@/lib/i18n";
import { localePath, whatsappUrl, type Locale } from "@/lib/site";

export function Overlays({
  locale,
  cookie,
  whatsapp,
  whatsappMessage,
}: {
  locale: Locale;
  cookie: Dictionary["cookie"];
  whatsapp: Dictionary["whatsapp"];
  whatsappMessage: string;
}) {
  const [showCookie, setShowCookie] = useState(false);

  useEffect(() => {
    if (readConsent() === null) {
      const id = window.setTimeout(() => setShowCookie(true), 900);
      return () => window.clearTimeout(id);
    }
  }, []);

  const decide = (value: "all" | "necessary") => {
    writeConsent(value);
    setShowCookie(false);
  };

  return (
    <>
      {/* Floating WhatsApp */}
      <a
        href={whatsappUrl(whatsappMessage)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={whatsapp.label}
        title={whatsapp.label}
        className={`fixed right-4 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-soft transition-all duration-500 hover:scale-105 hover:brightness-105 sm:right-6 ${
          showCookie ? "bottom-[13.5rem] sm:bottom-6" : "bottom-5 sm:bottom-6"
        }`}
      >
        <WhatsAppIcon size={30} />
        <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/40 [animation-duration:2.4s]" aria-hidden />
      </a>

      {/* Cookie notice */}
      <div
        role="dialog"
        aria-live="polite"
        aria-label={cookie.title}
        aria-hidden={!showCookie}
        inert={!showCookie}
        className={`fixed inset-x-3 bottom-3 z-50 transition-all duration-500 sm:inset-x-auto sm:bottom-6 sm:left-6 sm:max-w-md ${
          showCookie ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
        }`}
      >
        <div className="rounded-3xl border border-blush-200 bg-ivory/95 p-5 shadow-soft backdrop-blur-xl">
          <p className="font-serif text-xl text-taupe-900">{cookie.title}</p>
          <p className="mt-2 text-sm leading-relaxed text-taupe-600">
            {cookie.text}{" "}
            <Link href={localePath(locale, "/privacy")} className="font-semibold text-blush-600 underline-offset-2 hover:underline">
              {cookie.more}
            </Link>
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <button type="button" onClick={() => decide("all")} className="btn-primary !min-h-11 flex-1 !py-2.5">
              {cookie.acceptAll}
            </button>
            <button type="button" onClick={() => decide("necessary")} className="btn-outline !min-h-11 flex-1 !py-2.5">
              {cookie.necessary}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
