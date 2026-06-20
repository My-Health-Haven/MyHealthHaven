# MyHealth Haven

MyHealth Haven is a marketing and content website that helps Americans access
vetted medical care in Mexico. It provides transparency, safety information, and
a path to request a free estimate, with a health navigator following up
personally.

> Architecture, security, and operational docs live in
> [`ARCHITECTURE.md`](ARCHITECTURE.md), [`SECURITY.md`](SECURITY.md), and
> [`docs/`](docs/).

## Technology stack

- **Next.js 16 (App Router)** + **React 18** — statically generated / SSG content
  pages plus one server route for the estimate form.
- **Material UI (MUI) v7** + **Emotion** and **Tailwind CSS** for styling.
- **Turbopack** for dev/build.
- **Resend** for transactional email; **AbstractAPI** (optional) for email
  validation.
- **Vitest** + **Testing Library** for tests.
- Deployed on **Vercel** (automatic TLS + CDN).

## Project structure

```text
/
├── public/                 # Static assets (images, video, PDFs, policy docs)
├── src/
│   ├── app/                # Next.js App Router (routes, layouts, API)
│   │   └── api/estimate/    # Estimate form server route (email submission)
│   ├── components/         # Reusable UI components
│   ├── views/              # Page-level view components (Home, Estimate, ...)
│   ├── context/            # React Context (e.g. language)
│   ├── data/               # Static content data (procedures, locations)
│   └── lib/                # Helpers (validation, SEO, hooks)
├── docs/                   # ADRs, disaster recovery, data retention
├── next.config.mjs         # Security headers, CSP, redirects
└── vitest.config.js        # Test + coverage configuration
```

## Getting started

```bash
npm install
npm run dev      # starts the dev server at http://localhost:3000
```

Build and run a production server:

```bash
npm run build
npm run start
```

## Scripts

| Script                  | Purpose                                       |
| ----------------------- | --------------------------------------------- |
| `npm run dev`           | Start the development server                  |
| `npm run build`         | Production build                              |
| `npm run start`         | Serve the production build                    |
| `npm run lint`          | ESLint                                        |
| `npm run format`        | Prettier (write); CI runs `format -- --check` |
| `npm test`              | Run the test suite once                       |
| `npm run test:watch`    | Run tests in watch mode                       |
| `npm run test:coverage` | Run tests and enforce coverage thresholds     |
| `npm run audit:ci`      | Fail on high/critical dependency advisories   |

## Estimate form email submission

The Free Estimate form submits to `/api/estimate`, which validates and sanitizes
the request and sends it to email via Resend. Configure these environment
variables in Vercel (or your runtime):

| Variable                           | Required | Purpose                                                                |
| ---------------------------------- | -------- | ---------------------------------------------------------------------- |
| `RESEND_API_KEY`                   | yes      | Resend API key for sending email                                       |
| `ESTIMATE_FROM_EMAIL`              | rec.     | Verified sender address/domain (falls back to `onboarding@resend.dev`) |
| `ESTIMATE_TO_EMAIL`                | no       | Lead destination inbox (defaults to `healthnavigator@andersonlg.com`)  |
| `ESTIMATE_RATE_LIMIT_MAX`          | no       | Max submissions per IP per minute (default `5`)                        |
| `ALLOWED_ORIGINS`                  | no       | Comma-separated CORS allowlist for the API route                       |
| `EMAIL_VERIFIER_API_KEY`           | no       | AbstractAPI key; enables provider email verification                   |
| `ESTIMATE_BLOCK_DISPOSABLE_EMAILS` | no       | Block disposable email domains (default `true`)                        |
| `NEXT_PUBLIC_GTM_ID`               | no       | Google Tag Manager container ID (analytics, consent-gated)             |

Notes:

- `reply_to` on the lead email is set to the requester's email so you can respond
  directly from your inbox.
- Email delivery uses retry-with-backoff and a content-derived idempotency key to
  avoid duplicate or lost leads.

## Content editing

- **Procedures** catalog: `src/data/procedures.js` (static data; no build step).
- **Page content / views**: `src/views/` and the route files under `src/app`.
- **Legal docs**: `public/PRIVACY POLICY.md`, `public/TERMS OF USE .md`.

## License

This project is proprietary software. All rights reserved.
