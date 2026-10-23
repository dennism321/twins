import Image from "next/image";
import { withBase } from "@/lib/base-path";
import { Reveal } from "./Reveal";
import { SparkleIcon } from "./icons";
import type { Dictionary } from "@/lib/i18n";

export function Story({ t }: { t: Dictionary["story"] }) {
  return (
    <section id="story" className="section grain relative scroll-mt-20 overflow-hidden">
      <div className="container-x">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Portraits */}
          <Reveal className="relative lg:col-span-6">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-soft">
                <Image
                  src={withBase("/images/twins-portrait.jpg")}
                  alt={t.portraitAlt}
                  fill
                  sizes="(min-width: 1024px) 45vw, 90vw"
                  className="object-cover transition duration-700 hover:scale-[1.03]"
                />
              </div>
              <div className="absolute -bottom-6 -right-1 w-28 overflow-hidden rounded-2xl border-4 border-ivory shadow-card sm:-bottom-8 sm:-right-3 sm:w-44 sm:rounded-3xl lg:-right-10 lg:w-56">
                <div className="relative aspect-[4/5]">
                  <Image
                    src={withBase("/images/salon-interior.jpg")}
                    alt={t.interiorAlt}
                    fill
                    sizes="224px"
                    className="object-cover"
                  />
                </div>
              </div>
              <div
                className="absolute -left-6 -top-6 -z-10 h-40 w-40 rounded-full bg-blush-200/70 blur-2xl"
                aria-hidden
              />
              <div
                className="absolute -bottom-10 left-10 -z-10 h-44 w-44 rounded-full bg-champagne-200/70 blur-3xl"
                aria-hidden
              />
            </div>
          </Reveal>

          {/* Copy */}
          <div className="lg:col-span-6">
            <Reveal>
              <span className="eyebrow">{t.eyebrow}</span>
              <h2 className="heading-lg mt-4">{t.title}</h2>
            </Reveal>
            <div className="mt-6 space-y-5">
              {t.paragraphs.map((p, i) => (
                <Reveal key={i} delay={i * 90}>
                  <p className={`leading-relaxed text-taupe-600 ${i === 0 ? "text-lg first-letter:float-left first-letter:mr-2 first-letter:font-serif first-letter:text-6xl first-letter:leading-[0.85] first-letter:text-blush-600" : ""}`}>
                    {p}
                  </p>
                </Reveal>
              ))}
            </div>
            <Reveal delay={300} className="mt-8 flex items-center gap-4">
              <span className="font-serif text-3xl italic text-blush-600">{t.signature}</span>
              <span className="h-px flex-1 bg-gradient-to-r from-gold/70 to-transparent" aria-hidden />
            </Reveal>
          </div>
        </div>

        {/* Values */}
        <div className="mt-24 grid gap-5 sm:grid-cols-3">
          {t.values.map((v, i) => (
            <Reveal key={v.title} delay={i * 110} className="card p-7">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-blush-100 text-blush-600">
                <SparkleIcon size={20} />
              </span>
              <h3 className="heading-md mt-5 !text-[1.45rem]">{v.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-taupe-600">{v.text}</p>
            </Reveal>
          ))}
        </div>

        {/* Stats */}
        <Reveal className="mt-14 flex flex-wrap items-center justify-center gap-x-14 gap-y-6">
          {t.stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-serif text-5xl font-medium text-taupe-900">{s.value}</div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-[0.22em] text-gold-dark">
                {s.label}
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
