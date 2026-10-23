import type { NextConfig } from "next";

/**
 * STATIC_EXPORT=1 builds a plain-files copy of the site for GitHub Pages
 * (see .github/workflows/pages.yml). Without it, this is the full app with
 * the booking API and admin page.
 */
const staticExport = process.env.STATIC_EXPORT === "1";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  ...(staticExport && {
    output: "export",
    basePath,
    trailingSlash: true,
  }),
  env: {
    NEXT_PUBLIC_STATIC_EXPORT: staticExport ? "1" : "0",
  },
  images: {
    // 75 for photography, 90 for the emblem's fine gold line-work
    qualities: [75, 90],
    // GitHub Pages can't resize images on the fly, so serve the originals there
    unoptimized: staticExport,
  },
};

export default nextConfig;
