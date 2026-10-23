import Image from "next/image";
import { Reveal, SectionHeading } from "./Reveal";
import { InstagramIcon } from "./icons";
import { instagramPosts } from "@/lib/instagram";
import type { Dictionary } from "@/lib/i18n";
import { site, type Locale } from "@/lib/site";

/** Instagram strip: six photos from the salon's own posts, each linking to its post. */
export function InstagramFeed({
  t,
  locale,
}: {
  t: Dictionary["instagram"];
  locale: Locale;
}) {
  const tiles = instagramPosts;
  return (
    <section id="instagram" className="section bg-cream">
      <div className="container-x">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />
        <Reveal className="mt-8 text-center">
          <a
            href={site.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-serif text-2xl text-blush-600 hover:underline"
          >
            <InstagramIcon size={22} />@{site.instagramHandle}
          </a>
        </Reveal>

        <ul className="mt-10 grid grid-cols-3 gap-2 sm:gap-4 lg:grid-cols-6">
          {tiles.map((tile, i) => (
            <Reveal as="li" key={tile.id} delay={i * 60}>
              <a
                href={tile.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${t.viewPost}: ${tile.alt[locale]}`}
                className="group relative block aspect-square overflow-hidden rounded-2xl bg-blush-100 shadow-card"
              >
                <Image
                  src={tile.src}
                  alt={tile.alt[locale]}
                  fill
                  sizes="(min-width: 1024px) 16vw, 33vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-taupe-900/40 opacity-0 transition duration-500 group-hover:opacity-100">
                  <InstagramIcon size={28} className="text-ivory" />
                </span>
              </a>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-10 text-center">
          <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer" className="btn-outline">
            <InstagramIcon size={18} />
            {t.follow}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
