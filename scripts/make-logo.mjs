/**
 * Generates the My Twins Beauty Lounge emblem as SVG + PNG.
 *
 *   node scripts/make-logo.mjs            → public/images/logo.svg + logo.png (1200px, transparent)
 *   node scripts/make-logo.mjs preview    → /tmp/logo-preview.png (800px on ivory, for eyeballing)
 *
 * The wordmark is converted to real glyph outlines (EB Garamond / Manrope),
 * so the artwork renders identically everywhere without web fonts.
 *
 * To use the ORIGINAL logo file instead, simply overwrite public/images/logo.png.
 */
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
const fontkit = createRequire(import.meta.url)("fontkit");
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const preview = process.argv.includes("preview");

const garamond = fontkit.openSync(
  path.join(ROOT, "node_modules/@fontsource-variable/eb-garamond/files/eb-garamond-latin-wght-normal.woff2"),
);
const manrope = fontkit.openSync(
  path.join(ROOT, "node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2"),
);

/** Lays out `text` centred on cx with the given target width; returns SVG path data. */
function wordmark(font, text, { cx, baseline, width, tracking }) {
  const run = font.layout(text);
  const upm = font.unitsPerEm;
  const advanceEm = run.glyphs.reduce((sum, g) => sum + g.advanceWidth / upm, 0) + tracking * (run.glyphs.length - 1);
  const size = width / advanceEm;
  const s = size / upm;
  let x = cx - width / 2;
  const d = [];
  for (const g of run.glyphs) {
    const p = g.path.scale(s, -s).translate(x, baseline).toSVG();
    if (p) d.push(p);
    x += (g.advanceWidth / upm + tracking) * size;
  }
  return { d: d.join(" "), size };
}

// ─── Geometry (1000 × 1000 canvas, ring outer edge at r = 476 like the original file) ───
const C = 500;
const R_OUTER = 476;
const RING_W = 11;

/* Left profile (facing right). The right side is a mirror image. */
const face = `
  M 447 190
  C 468 206 479 226 477 250
  C 476 262 471 268 475 277
  C 482 296 489 316 487 334
  C 486 343 478 347 466 346
  C 468 354 470 359 471 363
  C 480 364 484 370 480 375
  C 485 379 485 386 478 390
  C 471 393 470 397 474 401
  C 481 407 478 417 467 421
  C 452 427 440 429 431 437
  C 418 454 410 482 405 514`;

const brow = `M 426 263 C 442 253 458 254 470 262`;
const eye = `M 418 284 Q 436 296 452 282`;
const lashes = `M 423 288 l -4 7 M 431 292 l -3 7 M 440 292 l -1 7`;
const lips = `
  M 468 363 C 477 359 486 365 481 374 C 486 381 483 391 472 391
  C 475 386 475 377 470 374 C 471 370 469 366 468 363 Z`;
const lipLine = `M 470 374 C 475 372 480 373 484 376`;

/* Hair ribbons — closed shapes filled blush, outlined in gold */
const ribbonOuter = `
  M 447 190
  C 400 148 318 128 254 172
  C 188 218 162 318 184 408
  C 204 486 256 550 326 586
  C 382 614 444 616 490 604
  C 450 606 400 594 358 566
  C 300 526 256 466 244 402
  C 230 334 248 262 294 218
  C 338 176 404 166 447 190 Z`;

const ribbonTop = `
  M 456 183
  C 426 146 366 118 300 128
  C 262 134 236 152 222 176
  C 250 160 286 152 322 156
  C 372 160 418 174 456 183 Z`;

const ribbonInner = `
  M 452 203
  C 418 222 394 256 390 302
  C 386 348 404 386 424 422
  C 436 446 437 472 430 496
  C 421 470 413 448 400 424
  C 380 388 366 342 374 296
  C 382 250 410 214 452 203 Z`;

/* Single-line gold strands */
const strandA = `M 441 196 C 392 196 330 236 316 300 C 300 372 330 440 380 486 C 412 516 430 548 420 588`;
const strandB = `M 447 190 C 430 156 378 128 326 136 C 288 142 262 162 248 186`;
const strandC = `M 254 172 C 228 200 210 242 206 286`;
const strandD = `M 326 586 C 374 604 432 608 490 604 C 524 596 538 574 532 554 C 527 542 514 538 502 546`;
const strandE = `M 405 514 C 402 540 412 566 440 584`;
const strandG = `M 452 176 C 418 138 352 108 290 118 C 256 124 232 140 216 164`;
const strandF = `M 404 272 C 392 310 394 352 410 390`;

/* Lotus between the two gold rules */
const lotus = {
  centre: `M 500 742 C 492 752 491 766 500 778 C 509 766 508 752 500 742 Z`,
  left: `M 484 752 C 480 764 486 775 498 779 C 496 768 492 758 484 752 Z`,
  right: `M 516 752 C 520 764 514 775 502 779 C 504 768 508 758 516 752 Z`,
};

const wm = wordmark(garamond, "MY TWINS", { cx: C, baseline: 712, width: 676, tracking: 0.035 });
const sub = wordmark(manrope, "BEAUTY LOUNGE", { cx: C, baseline: 828, width: 516, tracking: 0.33 });

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" width="1000" height="1000">
  <defs>
    <linearGradient id="gold" x1="0.1" y1="0" x2="0.9" y2="1">
      <stop offset="0" stop-color="#ead8ad"/>
      <stop offset="0.28" stop-color="#b98f4e"/>
      <stop offset="0.52" stop-color="#e9d4a4"/>
      <stop offset="0.78" stop-color="#b48a47"/>
      <stop offset="1" stop-color="#e3c993"/>
    </linearGradient>
    <linearGradient id="goldLine" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#d2b074"/>
      <stop offset="0.5" stop-color="#a97f3f"/>
      <stop offset="1" stop-color="#d6b67c"/>
    </linearGradient>
    <linearGradient id="rose" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#d9a99d"/>
      <stop offset="0.5" stop-color="#b87a6f"/>
      <stop offset="1" stop-color="#9f6158"/>
    </linearGradient>
    <linearGradient id="blush" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#e6bfb4"/>
      <stop offset="0.55" stop-color="#f6e4de"/>
      <stop offset="1" stop-color="#e9c8be"/>
    </linearGradient>
    <linearGradient id="blush2" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#f3d9d1"/>
      <stop offset="1" stop-color="#e3b9ad"/>
    </linearGradient>
    <radialGradient id="disc" cx="0.5" cy="0.42" r="0.62">
      <stop offset="0" stop-color="#fffbf8"/>
      <stop offset="0.6" stop-color="#fcf2ed"/>
      <stop offset="1" stop-color="#f3dcd3"/>
    </radialGradient>
  </defs>

  <!-- disc + rings -->
  <circle cx="${C}" cy="${C}" r="${R_OUTER - RING_W}" fill="url(#disc)"/>
  <circle cx="${C}" cy="${C}" r="${R_OUTER - RING_W / 2}" fill="none" stroke="url(#gold)" stroke-width="${RING_W}"/>
  <circle cx="${C}" cy="${C}" r="${R_OUTER - RING_W - 4}" fill="none" stroke="#f3e3c4" stroke-width="1.2" opacity="0.9"/>

  <!-- twins -->
  <g id="twin" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path d="${ribbonOuter}" fill="url(#blush)" stroke="url(#goldLine)" stroke-width="2.4"/>
    <path d="${ribbonTop}" fill="url(#blush2)" stroke="url(#goldLine)" stroke-width="2"/>
    <path d="${ribbonInner}" fill="url(#blush2)" stroke="url(#goldLine)" stroke-width="2"/>
    <path d="${strandA}" stroke="url(#goldLine)" stroke-width="3"/>
    <path d="${strandB}" stroke="url(#goldLine)" stroke-width="2.4"/>
    <path d="${strandC}" stroke="#d9b98a" stroke-width="1.6"/>
    <path d="${strandD}" stroke="url(#goldLine)" stroke-width="2.6"/>
    <path d="${strandE}" stroke="url(#goldLine)" stroke-width="2.2"/>
    <path d="${strandF}" stroke="#e2c79b" stroke-width="1.4"/>
    <path d="${strandG}" stroke="#d9b98a" stroke-width="1.5"/>
    <path d="${face}" stroke="url(#goldLine)" stroke-width="3.2"/>
    <path d="${brow}" stroke="#bf9a5c" stroke-width="1.8"/>
    <path d="${eye}" stroke="#a9784a" stroke-width="2.4"/>
    <path d="${lashes}" stroke="#a9784a" stroke-width="1.8"/>
    <path d="${lips}" fill="#c9857a" stroke="none"/>
    <path d="${lipLine}" stroke="#a9605a" stroke-width="1.2"/>
  </g>
  <use href="#twin" transform="translate(1000 0) scale(-1 1)"/>

  <!-- wordmark -->
  <path d="${wm.d}" fill="url(#rose)" stroke="url(#rose)" stroke-width="${(wm.size * 0.012).toFixed(2)}"/>

  <!-- rules + lotus -->
  <path d="M 236 766 H 458 M 542 766 H 764" stroke="url(#goldLine)" stroke-width="1.6" stroke-linecap="round"/>
  <path d="${lotus.left}" fill="#e8c4ba"/>
  <path d="${lotus.right}" fill="#e8c4ba"/>
  <path d="${lotus.centre}" fill="#d9a397"/>

  <path d="${sub.d}" fill="#a98246" stroke="#a98246" stroke-width="${(sub.size * 0.03).toFixed(2)}" stroke-linejoin="round"/>
</svg>
`;

if (preview) {
  const out = "/tmp/logo-preview.png";
  await sharp(Buffer.from(svg), { density: 96 })
    .resize(800, 800)
    .flatten({ background: "#5c4c46" })
    .png()
    .toFile(out);
  console.log("preview →", out);
} else {
  const dir = path.join(ROOT, "public/images");
  fs.writeFileSync(path.join(dir, "logo.svg"), svg);
  await sharp(Buffer.from(svg), { density: 115.2 }) // 1000 units → 1200px
    .resize(1200, 1200)
    .png({ compressionLevel: 9 })
    .toFile(path.join(dir, "logo.png"));
  // Favicons straight from the emblem
  await sharp(Buffer.from(svg), { density: 96 }).resize(256, 256).png().toFile(path.join(ROOT, "src/app/icon.png"));
  await sharp(Buffer.from(svg), { density: 96 })
    .resize(156, 156)
    .extend({ top: 12, bottom: 12, left: 12, right: 12, background: "#fffaf5" })
    .flatten({ background: "#fffaf5" })
    .png()
    .toFile(path.join(ROOT, "src/app/apple-icon.png"));
  console.log("written → public/images/logo.svg, logo.png, src/app/icon.png, src/app/apple-icon.png");
}
