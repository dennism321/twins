import Image from "next/image";
import { BrandLogo } from "./Logo";
import { ArrowRightIcon, ChevronDownIcon, SparkleIcon } from "./icons";
import type { Dictionary } from "@/lib/i18n";
import { site } from "@/lib/site";

/**
 * Big centred medallion that turns a full 360° around its vertical axis,
 * east → west (the right edge swings toward the viewer and over to the left).
 * Two faces (front + mirrored back) keep the artwork readable from both sides,
 * like a spinning coin. Pure CSS — see `.logo-*` in globals.css.
 */
function HeroLogo({ label }: { label: string }) {
  const sizes = "(min-width: 640px) 352px, 60vw";
  return (
    <div className="logo-stage animate-fade-in mb-8 sm:mb-10" role="img" aria-label={label}>
      <span className="logo-glow" aria-hidden />
      <div className="logo-coin">
        <div className="logo-face">
          <BrandLogo className="h-full w-full" sizes={sizes} priority decorative />
        </div>
        <div className="logo-face logo-face-back" aria-hidden>
          <BrandLogo className="h-full w-full" sizes={sizes} priority decorative />
        </div>
      </div>
    </div>
  );
}

export function Hero({ t }: { t: Dictionary["hero"] }) {
  return (
    <section className="relative isolate overflow-hidden bg-taupe-900">
      {/* Full-width background video with a warm veil so the medallion and copy stay legible.
          The photo (a frame from the video) shows while it loads and for visitors who prefer reduced motion. */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero.jpg"
          alt={t.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <video
          className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
          src="/videos/hero.mp4"
          poster="/images/hero.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden
        />
        <div className="absolute inset-0 bg-taupe-900/45" />
        <div className="absolute inset-0 bg-gradient-to-b from-taupe-900/55 via-taupe-900/10 to-taupe-900/85" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_55%_at_50%_42%,rgba(59,48,43,0.5),transparent_72%)]" />
      </div>

      <div className="container-x flex min-h-[calc(100svh-4.5rem)] flex-col items-center justify-center py-14 text-center sm:min-h-[calc(100svh-5rem)] sm:py-20">
        <HeroLogo label={site.name} />

        <span className="inline-flex animate-fade-up items-center gap-2 rounded-full border border-ivory/30 bg-ivory/10 px-3.5 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-ivory backdrop-blur-md [animation-delay:200ms]">
          <SparkleIcon size={14} />
          {t.eyebrow}
        </span>

        <h1 className="heading-xl mt-6 max-w-4xl animate-fade-up !text-ivory drop-shadow-[0_2px_20px_rgba(59,48,43,0.4)] [animation-delay:320ms]">
          {t.title}
        </h1>

        <p className="mt-6 max-w-2xl animate-fade-up text-base leading-relaxed text-ivory/90 [animation-delay:440ms] sm:text-lg">
          {t.subtitle}
        </p>

        <div className="mt-8 flex w-full max-w-md animate-fade-up flex-col gap-3 [animation-delay:560ms] sm:w-auto sm:max-w-none sm:flex-row sm:items-center sm:justify-center">
          <a href="#booking" className="btn-gold">
            {t.cta}
            <ArrowRightIcon size={18} />
          </a>
          <a
            href="#services"
            className="btn border border-ivory/40 text-ivory backdrop-blur-md transition hover:bg-ivory/15"
          >
            {t.secondary}
          </a>
        </div>

        <ul className="mt-8 flex animate-fade-up flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-medium tracking-wide text-ivory/80 [animation-delay:680ms]">
          {t.badges.map((b) => (
            <li key={b} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-champagne-300" aria-hidden />
              {b}
            </li>
          ))}
        </ul>
      </div>

      <a
        href="#story"
        aria-label={t.scroll}
        className="absolute bottom-3 left-1/2 block -translate-x-1/2 animate-float text-ivory/80 transition hover:text-ivory sm:bottom-5"
      >
        <ChevronDownIcon size={28} />
      </a>
    </section>
  );
}
