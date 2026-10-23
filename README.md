# My Twins Beauty Lounge

Website for My Twins Beauty Lounge, a hair and nail salon in Nea Smyrni, Athens.
Greek (default) and English, with online booking and a small admin page for bookings.

Built by TechAthos with Next.js, Tailwind CSS and PostgreSQL (Drizzle ORM).

## Run locally

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev
```

Open http://localhost:3000 (Greek) or http://localhost:3000/en (English).

## Environment variables

| Name | What it is |
| --- | --- |
| `DATABASE_URL` | PostgreSQL connection string for bookings |
| `ADMIN_PASSWORD` | Password for `/admin`. Required in production: admin login is off until it is set |
| `NEXT_PUBLIC_SITE_URL` | Public site address, used for SEO links |

## Before going live

- Set `showPreviewWatermark` to `false` in `src/lib/site.ts` to remove the TechAthos preview watermark.
- Replace the placeholder contact details marked `TODO` in `src/lib/site.ts`.
- Replace the sample reviews in `src/lib/i18n/el.ts` and `src/lib/i18n/en.ts` with real ones.

Hero video: "Woman Having her Hair Blow Dried" from [Pexels](https://www.pexels.com/video/woman-having-her-hair-blow-dried-7575520/) (Pexels license).
