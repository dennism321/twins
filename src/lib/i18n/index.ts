import type { Metadata } from "next";
import { el, type Dictionary } from "./el";
import { en } from "./en";
import { localePath, site, type Locale } from "@/lib/site";
import { isStaticPreview } from "@/lib/base-path";

export type { Dictionary };

const dictionaries: Record<Locale, Dictionary> = { el, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

/** Builds per-locale SEO metadata with hreflang alternates. */
export function buildMetadata(
  locale: Locale,
  path: "/" | "/privacy" = "/",
): Metadata {
  const t = getDictionary(locale);
  const isPrivacy = path === "/privacy";
  const title = isPrivacy
    ? `${t.meta.privacyTitle} | ${site.name}`
    : t.meta.title;
  const description = isPrivacy
    ? t.meta.privacyDescription
    : t.meta.description;
  const canonical = localePath(locale, path);

  return {
    metadataBase: new URL(site.url),
    title,
    description,
    keywords: t.meta.keywords,
    applicationName: site.name,
    authors: [{ name: site.name }],
    creator: site.name,
    category: "beauty",
    alternates: {
      canonical,
      languages: {
        el: localePath("el", path),
        en: localePath("en", path),
        "x-default": localePath("el", path),
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "el" ? "el_GR" : "en_GB",
      alternateLocale: locale === "el" ? "en_GB" : "el_GR",
      url: canonical,
      siteName: site.name,
      title,
      description,
      images: [
        {
          url: "/images/hero.jpg",
          width: 1280,
          height: 720,
          alt: t.meta.ogImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/hero.jpg"],
    },
    // Keep the GitHub Pages preview copy out of search results
    robots: isStaticPreview
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
  };
}
