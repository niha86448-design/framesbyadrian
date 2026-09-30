# FramesByAdrian

Photography & videography portfolio for Adrian — sports, weddings, corporate, music, and events. Galleries are powered live by Google Drive; the contact form delivers via Resend.

Built with Next.js 16 (App Router), React 19, Tailwind CSS, framer-motion, and react-three-fiber.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
```

> Note: `npm run dev` is intentionally unoptimized (on-demand compilation, no minification).
> For a realistic performance check, run the production build below — this is what Vercel serves.

```bash
npm run build
npm run start
```

## Environment variables

See `.env.example`. Set these in Vercel → Project → Settings → Environment Variables for production.

| Variable | Purpose |
| --- | --- |
| `GOOGLE_DRIVE_API_KEY` | Server-only key that powers the photo/video galleries |
| `RESEND_API_KEY` | Contact form email delivery ([resend.com](https://resend.com)) |
| `CONTACT_TO_EMAIL` | Where enquiries are sent (default `framesbyaj@gmail.com`) |
| `CONTACT_FROM_EMAIL` | Sender address (use `onboarding@resend.dev` until a domain is verified) |
| `NEXT_PUBLIC_SITE_URL` | Public site URL, for SEO/social image resolution |

## Project structure

- `app/` — App Router pages (`/`, `/photos`, `/videos`, `/contact`, `/invoice`) and API routes (`/api/drive`, `/api/contact`)
- `components/` — UI and animation components
- `config/driveFolders.ts` — maps gallery categories to Google Drive folder IDs
- `lib/` — shared types and category lists
- `content/about.ts` — founder bio content

## Deployment

Hosted on [Vercel](https://vercel.com). Pushes to `main` deploy automatically.
