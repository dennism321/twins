import Image from "next/image";

/**
 * The brand emblem. Replace `public/images/logo.png` with the original artwork
 * (square PNG) and every placement — hero, header, footer, admin — updates.
 */
export const LOGO_SRC = "/images/logo.png";

/**
 * The emblem's gold ring sits a few percent inside the square canvas (white or
 * transparent margin around it). Zooming slightly pushes that margin outside the
 * circular clip so only the medallion shows. Set to 1 for a tight-cropped file.
 */
export const LOGO_ZOOM = 1;

type BrandLogoProps = {
  className?: string;
  /** `sizes` hint for next/image, e.g. "56px" or "(min-width: 640px) 360px, 60vw" */
  sizes?: string;
  priority?: boolean;
  /** Hide from assistive tech when a parent already labels the image */
  decorative?: boolean;
  alt?: string;
};

export function BrandLogo({
  className = "h-11 w-11",
  sizes = "56px",
  priority = false,
  decorative = false,
  alt = "My Twins Beauty Lounge",
}: BrandLogoProps) {
  return (
    <span
      className={`relative block shrink-0 overflow-hidden rounded-full bg-cream ${className}`}
      aria-hidden={decorative || undefined}
    >
      <Image
        src={LOGO_SRC}
        alt={decorative ? "" : alt}
        fill
        priority={priority}
        sizes={sizes}
        quality={90}
        className="object-cover"
        style={{ transform: `scale(${LOGO_ZOOM})` }}
      />
    </span>
  );
}

/** Compact header lockup: emblem + wordmark */
export function LogoLockup({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <BrandLogo className={compact ? "h-11 w-11" : "h-14 w-14"} sizes="64px" />
      <span className="flex flex-col leading-none">
        <span className="font-serif text-[1.35rem] font-medium tracking-wide text-taupe-900">
          My Twins
        </span>
        <span className="mt-1 text-[0.58rem] font-semibold uppercase tracking-[0.34em] text-gold-dark">
          Beauty Lounge
        </span>
      </span>
    </span>
  );
}
