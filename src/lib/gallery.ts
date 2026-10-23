import { withBase } from "./base-path";

export type GalleryCategory = "hair" | "nails";

export interface GalleryItem {
  id: string;
  src: string;
  width: number;
  height: number;
  category: GalleryCategory;
}

/** Swap these for real photos — keep width/height so the masonry stays stable. */
export const galleryItems: GalleryItem[] = [
  { id: "hair-balayage", src: withBase("/images/gallery/hair-balayage.jpg"), width: 864, height: 1152, category: "hair" },
  { id: "nails-art", src: withBase("/images/gallery/nails-art.jpg"), width: 1024, height: 1024, category: "nails" },
  { id: "hair-blowout", src: withBase("/images/gallery/hair-blowout.jpg"), width: 1024, height: 1024, category: "hair" },
  { id: "nails-nude", src: withBase("/images/gallery/nails-nude.jpg"), width: 864, height: 1152, category: "nails" },
  { id: "hair-bridal", src: withBase("/images/gallery/hair-bridal.jpg"), width: 864, height: 1152, category: "hair" },
  { id: "nails-pedicure", src: withBase("/images/gallery/nails-pedicure.jpg"), width: 1152, height: 864, category: "nails" },
  { id: "hair-cut", src: withBase("/images/gallery/hair-cut.jpg"), width: 1024, height: 1024, category: "hair" },
];
