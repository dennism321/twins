import type { ReactNode } from "react";
import "@fontsource-variable/eb-garamond";
import "@fontsource-variable/eb-garamond/wght-italic.css";
import "@fontsource-variable/manrope";
import "@/app/globals.css";
import type { Locale } from "@/lib/site";
import { PreviewWatermark } from "./PreviewWatermark";

/** Shared <html>/<body> for both language root layouts. */
export function RootShell({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    // The inline script below adds the "js" class before React loads, so the
    // class differs from the server HTML on purpose.
    // data-scroll-behavior lets Next.js turn smooth scrolling off while it jumps to the top of a new page
    <html lang={locale} className="scroll-smooth" data-scroll-behavior="smooth" suppressHydrationWarning>
      {/* App Router root layouts own <head>; next/head is for the Pages Router */}
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head>
        {/* Enables scroll-reveal styling only when JS is running */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <meta name="theme-color" content="#fffaf5" />
        <meta name="geo.region" content="GR-I" />
        <meta name="geo.placename" content={locale === "el" ? "Νέα Σμύρνη, Αθήνα" : "Nea Smyrni, Athens"} />
      </head>
      <body className="min-h-dvh bg-ivory font-sans text-taupe-900 antialiased">
        {children}
        <PreviewWatermark />
      </body>
    </html>
  );
}
