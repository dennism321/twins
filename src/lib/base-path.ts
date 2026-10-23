/**
 * Folder the site is served from. Empty for a normal deploy; "/twins" for the
 * GitHub Pages preview (dennism321.github.io/twins), set at build time.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** True for the static GitHub Pages build, which has no booking API or admin page */
export const isStaticPreview = process.env.NEXT_PUBLIC_STATIC_EXPORT === "1";

/** Prefix a root-relative path ("/images/x.jpg") with the base folder. */
export function withBase(path: string) {
  return path.startsWith("/") && !path.startsWith("//") ? `${basePath}${path}` : path;
}
