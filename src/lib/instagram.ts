import { withBase } from "./base-path";
import type { Locale } from "./site";

/**
 * Photos taken from the salon's own Instagram posts (@mytwinsbeautylounge),
 * cropped square without Instagram's play button or TikTok watermark.
 * Each tile links to its original post.
 */
export interface InstagramPost {
  id: string;
  src: string;
  href: string;
  alt: Record<Locale, string>;
}

const post = (path: string) => `https://www.instagram.com/mytwinsbeautylounge/${path}/`;

export const instagramPosts: InstagramPost[] = [
  {
    id: "balayage-waves",
    src: withBase("/images/instagram/ig-balayage-waves.jpg"),
    href: post("reel/DEE9XIxul_K"),
    alt: { el: "Ξανθό balayage με απαλούς κυματισμούς", en: "Blonde balayage with soft waves" },
  },
  {
    id: "copper-braid",
    src: withBase("/images/instagram/ig-copper-braid.jpg"),
    href: post("reel/DduMakMgjhR"),
    alt: { el: "Χάλκινα μαλλιά σε μισοπιασμένο χτένισμα με πλεξούδα", en: "Copper hair in a half-up braided style" },
  },
  {
    id: "honey-waves",
    src: withBase("/images/instagram/ig-honey-waves.jpg"),
    href: post("reel/DZawGD7g5vT"),
    alt: { el: "Μακριά μελί μαλλιά με κυματισμούς στο σαλόνι", en: "Long honey-toned waves in the salon" },
  },
  {
    id: "bride",
    src: withBase("/images/instagram/ig-bride.jpg"),
    href: post("reel/DZSvoZOAa52"),
    alt: { el: "Νύφη με μακριά κυματιστά μαλλιά και πέπλο", en: "Bride with long wavy hair and a veil" },
  },
  {
    id: "ombre-nails",
    src: withBase("/images/instagram/ig-ombre-nails.jpg"),
    href: post("reel/DWRIYm9Ds6n"),
    alt: { el: "Ροζ ombré μανικιούρ σε κοντά νύχια", en: "Pink ombré manicure on short nails" },
  },
  {
    id: "almond-nails",
    src: withBase("/images/instagram/ig-almond-nails.jpg"),
    href: post("p/DWRIObSlYZD"),
    alt: { el: "Nude μανικιούρ σε νύχια αμύγδαλο", en: "Nude manicure on almond-shaped nails" },
  },
];
