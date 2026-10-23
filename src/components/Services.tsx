import { Reveal, SectionHeading } from "./Reveal";
import { ArrowRightIcon, ClockIcon, NailPolishIcon, ScissorsIcon } from "./icons";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/site";
import {
  formatPrice,
  servicesByCategory,
  type ServiceCategory,
  type ServiceItem,
} from "@/lib/services";

function ServiceCard({
  item,
  locale,
  bookLabel,
  durationLabel,
  index,
}: {
  item: ServiceItem;
  locale: Locale;
  bookLabel: string;
  durationLabel: string;
  index: number;
}) {
  return (
    <Reveal as="li" delay={index * 70} className="group card flex flex-col p-6 transition duration-500 hover:-translate-y-1 hover:shadow-soft">
      <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
        <h4 className="font-serif text-2xl font-medium text-taupe-900">{item.name[locale]}</h4>
        <span className="shrink-0 rounded-full bg-champagne-100 px-3 py-1 text-xs font-semibold text-gold-dark">
          {formatPrice(item, locale)}
        </span>
      </div>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-taupe-600">{item.description[locale]}</p>
      <div className="mt-5 flex items-center justify-between border-t border-blush-200/70 pt-4 text-xs text-taupe-500">
        <span className="inline-flex items-center gap-1.5">
          <ClockIcon size={15} />
          <span className="sr-only">{durationLabel}: </span>
          {item.duration[locale]}
        </span>
        <a
          href={`#booking?service=${item.id}`}
          data-service={item.id}
          className="-my-3 inline-flex items-center gap-1 py-3 font-semibold text-blush-600 transition group-hover:gap-2"
        >
          {bookLabel}
          <ArrowRightIcon size={14} />
        </a>
      </div>
    </Reveal>
  );
}

function Category({
  category,
  title,
  intro,
  locale,
  t,
}: {
  category: ServiceCategory;
  title: string;
  intro: string;
  locale: Locale;
  t: Dictionary["services"];
}) {
  const Icon = category === "hair" ? ScissorsIcon : NailPolishIcon;
  return (
    <div>
      <Reveal className="mb-7 flex items-center gap-4">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-taupe-900 text-champagne-200 shadow-card">
          <Icon size={22} />
        </span>
        <div>
          <h3 className="font-serif text-3xl font-medium text-taupe-900">{title}</h3>
          <p className="text-sm text-taupe-500">{intro}</p>
        </div>
      </Reveal>
      <ul className="grid gap-4 sm:grid-cols-2">
        {servicesByCategory(category).map((item, i) => (
          <ServiceCard
            key={item.id}
            item={item}
            locale={locale}
            index={i}
            bookLabel={t.bookThis}
            durationLabel={t.duration}
          />
        ))}
      </ul>
    </div>
  );
}

export function Services({ t, locale }: { t: Dictionary["services"]; locale: Locale }) {
  return (
    <section id="services" className="section scroll-mt-20 bg-blush-50">
      <div className="container-x">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />
        <div className="mt-16 grid gap-16 lg:grid-cols-2 lg:gap-10">
          <Category category="hair" title={t.hair} intro={t.hairIntro} locale={locale} t={t} />
          <Category category="nails" title={t.nails} intro={t.nailsIntro} locale={locale} t={t} />
        </div>
        <Reveal className="mt-12 text-center text-sm text-taupe-500">
          <p>{t.note}</p>
        </Reveal>
      </div>
    </section>
  );
}
