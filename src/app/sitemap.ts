import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Plain file, built once (also required for the GitHub Pages export)
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: `${site.url}/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
      alternates: { languages: { el: `${site.url}/`, en: `${site.url}/en` } },
    },
    {
      url: `${site.url}/en`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: { languages: { el: `${site.url}/`, en: `${site.url}/en` } },
    },
    {
      url: `${site.url}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
      alternates: { languages: { el: `${site.url}/privacy`, en: `${site.url}/en/privacy` } },
    },
    {
      url: `${site.url}/en/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
      alternates: { languages: { el: `${site.url}/privacy`, en: `${site.url}/en/privacy` } },
    },
  ];
}
