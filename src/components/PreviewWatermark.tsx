import { showPreviewWatermark } from "@/lib/site";
import { withBase } from "@/lib/base-path";

/**
 * Faint, repeating TechAthos "PREVIEW" watermark over the whole page.
 * It sits above everything but lets every click and tap pass through.
 * Turn it off with `showPreviewWatermark` in src/lib/site.ts.
 */
export function PreviewWatermark() {
  if (!showPreviewWatermark) return null;
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[100] select-none bg-[length:300px_auto] bg-repeat opacity-[0.09] print:opacity-20 sm:bg-[length:380px_auto]"
      style={{ backgroundImage: `url('${withBase("/images/techathos-watermark.svg")}')` }}
    />
  );
}
