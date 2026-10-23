"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type CSSProperties } from "react";
import { SectionHeading } from "./Reveal";
import { ArrowLeftIcon, ArrowRightIcon, QuoteIcon, StarIcon } from "./icons";
import type { Dictionary } from "@/lib/i18n";

const AUTOPLAY_MS = 6500;

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
const prefersReducedMotion = () => window.matchMedia(REDUCED_MOTION).matches;
function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((p) => p.replace(/[^\p{L}]/gu, "")[0] ?? "")
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/**
 * Card carousel: the current review sits centre stage, its neighbours peek in
 * from both sides (smaller and dimmed). Swipe, arrows, dots or a click on a
 * side card move it; it auto-advances unless hovered, focused or the visitor
 * prefers reduced motion.
 */
export function Testimonials({ t }: { t: Dictionary["testimonials"] }) {
  const items = t.items;
  const count = items.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useSyncExternalStore(subscribeReducedMotion, prefersReducedMotion, () => false);
  const touchStartX = useRef<number | null>(null);

  const go = useCallback((next: number) => setIndex(((next % count) + count) % count), [count]);

  const autoplay = !paused && !reduceMotion;

  useEffect(() => {
    if (!autoplay) return;
    const id = window.setTimeout(() => go(index + 1), AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [index, autoplay, go]);

  /** Shortest signed distance from the active card, wrapping around (e.g. -2…2) */
  const offsetOf = (i: number) => {
    let d = i - index;
    if (d > count / 2) d -= count;
    if (d < -count / 2) d += count;
    return d;
  };

  return (
    <section id="testimonials" className="section relative scroll-mt-20 overflow-clip bg-taupe-900 text-ivory">
      {/* Soft gold glow behind the cards */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[radial-gradient(closest-side,rgba(195,162,101,0.28),transparent)] blur-2xl"
      />

      <div className="container-x relative">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} light />

        <div
          className="relative mt-12 sm:mt-14"
          role="region"
          aria-roledescription="carousel"
          aria-label={t.eyebrow}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") go(index - 1);
            if (e.key === "ArrowRight") go(index + 1);
          }}
          onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchStartX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchStartX.current;
            if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
            touchStartX.current = null;
          }}
        >
          {/* All cards share one grid cell, so the track is as tall as the tallest card */}
          <div className="grid [grid-template-areas:'stack'] [mask-image:linear-gradient(90deg,transparent,#000_9%,#000_91%,transparent)]">
            {items.map((item, i) => {
              const d = offsetOf(i);
              const active = d === 0;
              const near = Math.abs(d) === 1;
              const style: CSSProperties = {
                gridArea: "stack",
                // --shift (set per screen size below) is how far each neighbour sits from centre
                transform: `translateX(calc(var(--shift) * ${d})) scale(${active ? 1 : 0.86})`,
                opacity: active ? 1 : near ? 0.5 : 0,
                zIndex: active ? 3 : near ? 2 : 1,
              };
              return (
                <figure
                  key={item.name}
                  style={style}
                  aria-hidden={!active}
                  aria-roledescription="slide"
                  aria-label={`${i + 1} / ${count}`}
                  onClick={() => !active && near && go(i)}
                  className={`relative mx-auto flex w-[80%] flex-col overflow-hidden rounded-[1.75rem] p-6 transition-[transform,opacity,background-color,box-shadow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] [--shift:94%] motion-reduce:transition-none sm:w-[68%] sm:p-9 sm:[--shift:104%] lg:w-[46%] lg:p-10 ${
                    active
                      ? "bg-ivory text-taupe-900 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.65)]"
                      : `bg-ivory/10 text-ivory ring-1 ring-ivory/15 backdrop-blur-sm ${near ? "cursor-pointer hover:bg-ivory/15" : "pointer-events-none"}`
                  }`}
                >
                  <QuoteIcon
                    size={88}
                    className={`pointer-events-none absolute -right-2 -top-3 ${active ? "text-blush-200" : "text-ivory/10"}`}
                  />

                  <div className={`relative flex gap-1 ${active ? "text-gold" : "text-champagne-300/70"}`} aria-hidden>
                    {Array.from({ length: 5 }, (_, s) => (
                      <StarIcon key={s} size={18} />
                    ))}
                  </div>

                  <blockquote
                    className={`relative mt-5 flex-1 font-serif text-[1.3rem] leading-snug sm:text-2xl ${
                      active ? "text-taupe-900" : "text-ivory/90"
                    }`}
                  >
                    “{item.text}”
                  </blockquote>

                  <figcaption
                    className={`relative mt-7 flex items-center gap-4 border-t pt-6 ${
                      active ? "border-blush-200" : "border-ivory/15"
                    }`}
                  >
                    <span
                      aria-hidden
                      className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-champagne-200 via-gold to-blush-500 font-serif text-lg font-medium text-ivory shadow-card ring-2 ring-ivory"
                    >
                      {initials(item.name)}
                    </span>
                    <div className="min-w-0">
                      <div className={`font-semibold tracking-wide ${active ? "text-taupe-900" : "text-ivory"}`}>
                        {item.name}
                      </div>
                      <span
                        className={`mt-1 inline-block rounded-full px-2.5 py-0.5 text-[0.7rem] font-semibold uppercase tracking-[0.18em] ${
                          active ? "bg-champagne-100 text-gold-dark" : "bg-ivory/10 text-ivory/70"
                        }`}
                      >
                        {item.service}
                      </span>
                    </div>
                  </figcaption>

                  {/* Time until the next review slides in */}
                  {active && autoplay && (
                    <span
                      key={index}
                      aria-hidden
                      className="absolute inset-x-0 bottom-0 h-1 origin-left bg-gradient-to-r from-gold to-blush-400"
                      style={{ animation: `review-progress ${AUTOPLAY_MS}ms linear both` }}
                    />
                  )}
                </figure>
              );
            })}
          </div>

          <div className="mt-10 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label={t.prev}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-ivory/25 text-ivory transition hover:border-gold hover:bg-gold hover:text-taupe-900"
            >
              <ArrowLeftIcon size={18} />
            </button>
            <div className="flex items-center gap-2" role="tablist">
              {items.map((item, i) => (
                <button
                  key={item.name}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`${t.goTo} ${i + 1}`}
                  onClick={() => go(i)}
                  // after: layer widens the tap area to ~32px without changing the look
                  className={`relative h-2 rounded-full transition-all duration-500 after:absolute after:-inset-3 after:content-[''] ${
                    i === index ? "w-8 bg-gold" : "w-2 bg-ivory/30 hover:bg-ivory/60"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label={t.next}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-ivory/25 text-ivory transition hover:border-gold hover:bg-gold hover:text-taupe-900"
            >
              <ArrowRightIcon size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
