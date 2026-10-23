"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { SectionHeading } from "./Reveal";
import { ArrowLeftIcon, ArrowRightIcon, CloseIcon } from "./icons";
import type { Dictionary } from "@/lib/i18n";
import { galleryItems, type GalleryCategory } from "@/lib/gallery";

type Filter = "all" | GalleryCategory;

export function Gallery({ t }: { t: Dictionary["gallery"] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [active, setActive] = useState<number | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);
  const touchStartX = useRef<number | null>(null);

  const items = filter === "all" ? galleryItems : galleryItems.filter((g) => g.category === filter);

  const open = (i: number, trigger: HTMLElement) => {
    lastTrigger.current = trigger;
    setActive(i);
  };
  const close = useCallback(() => {
    setActive(null);
    lastTrigger.current?.focus();
  }, []);
  const step = useCallback(
    (dir: 1 | -1) => {
      setActive((cur) => (cur === null ? cur : (cur + dir + items.length) % items.length));
    },
    [items.length],
  );

  useEffect(() => {
    if (active === null) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [active, close, step]);

  const filters: { key: Filter; label: string }[] = [
    { key: "all", label: t.filters.all },
    { key: "hair", label: t.filters.hair },
    { key: "nails", label: t.filters.nails },
  ];

  const current = active !== null ? items[active] : null;

  return (
    <section id="gallery" className="section scroll-mt-20">
      <div className="container-x">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

        <div role="tablist" aria-label={t.eyebrow} className="mt-10 flex justify-center gap-2">
          {filters.map((f) => {
            const selected = filter === f.key;
            return (
              <button
                key={f.key}
                role="tab"
                aria-selected={selected}
                type="button"
                onClick={() => {
                  setFilter(f.key);
                  setActive(null);
                }}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 ${
                  selected
                    ? "bg-taupe-900 text-ivory shadow-card"
                    : "bg-white/70 text-taupe-700 ring-1 ring-blush-200 hover:bg-blush-100"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        <ul className="masonry mt-10">
          {items.map((item, i) => (
            <li key={item.id} className="animate-fade-in">
              <button
                type="button"
                onClick={(e) => open(i, e.currentTarget)}
                className="group relative block w-full overflow-hidden rounded-3xl bg-blush-100 shadow-card focus-visible:outline-gold"
                aria-label={`${t.open}: ${t.items[item.id] ?? item.id}`}
              >
                <Image
                  src={item.src}
                  alt={t.items[item.id] ?? ""}
                  width={item.width}
                  height={item.height}
                  sizes="(min-width: 768px) 33vw, 50vw"
                  className="h-auto w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
                />
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-taupe-900/60 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
                <span className="pointer-events-none absolute bottom-4 left-4 right-4 translate-y-2 text-left text-xs font-semibold tracking-wide text-ivory opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  {t.items[item.id]}
                </span>
                <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-ivory/85 px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-taupe-800 backdrop-blur">
                  {item.category === "hair" ? t.filters.hair : t.filters.nails}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Lightbox */}
      {current ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t.items[current.id]}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-taupe-900/90 p-4 backdrop-blur-sm animate-fade-in"
          onClick={close}
          onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchStartX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchStartX.current;
            if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
            touchStartX.current = null;
          }}
        >
          <button
            ref={closeBtn}
            type="button"
            onClick={close}
            aria-label={t.close}
            className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-ivory/10 text-ivory transition hover:bg-ivory/25"
          >
            <CloseIcon size={22} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            aria-label={t.prev}
            className="absolute left-2 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-taupe-900/60 text-ivory backdrop-blur-sm sm:bg-ivory/10 transition hover:bg-ivory/25 sm:h-12 sm:w-12 md:left-6"
          >
            <ArrowLeftIcon size={22} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            aria-label={t.next}
            className="absolute right-2 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-taupe-900/60 text-ivory backdrop-blur-sm sm:bg-ivory/10 transition hover:bg-ivory/25 sm:h-12 sm:w-12 md:right-6"
          >
            <ArrowRightIcon size={22} />
          </button>

          <figure
            className="relative flex max-h-full w-full max-w-4xl flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative max-h-[78vh] w-auto overflow-hidden rounded-2xl shadow-soft">
              <Image
                key={current.id}
                src={current.src}
                alt={t.items[current.id] ?? ""}
                width={current.width}
                height={current.height}
                sizes="(min-width: 1024px) 60vw, 95vw"
                className="max-h-[78vh] w-auto object-contain"
                priority
              />
            </div>
            <figcaption className="mt-4 flex items-center gap-3 text-sm text-ivory/85">
              <span>{t.items[current.id]}</span>
              <span className="text-ivory/50">
                {active! + 1} {t.of} {items.length}
              </span>
            </figcaption>
          </figure>
        </div>
      ) : null}
    </section>
  );
}
