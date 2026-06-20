# 1. Use Next.js App Router (migrated from Vite SPA)

- Status: Accepted
- Date: 2026

## Context

The project began as a client-rendered Vite + React Router single-page app (the
original README still described that stack). A marketing site for a medical-travel
service depends heavily on SEO, fast first paint, social/OpenGraph previews, and
structured data — all of which are awkward in a pure client-rendered SPA. The
site also needs one small server endpoint to handle estimate-form submissions
without exposing email credentials to the browser.

## Decision

Build on **Next.js 16 with the App Router**, using static generation / SSG for
content pages and a single server Route Handler (`/api/estimate`) for the form.
Deploy on Vercel.

## Consequences

- Content pages are pre-rendered and served from the CDN; metadata, sitemaps,
  `robots`, and JSON-LD are generated server-side.
- A server runtime exists for the one endpoint that needs secrets, removing the
  need for a separate backend service.
- The codebase moved from `src/pages` (React Router) to `src/app` (App Router);
  the README must be kept in sync with this stack (now corrected).
- Hosting is coupled to a Next-compatible platform, though the app remains
  portable to any Node host (see the disaster-recovery doc).
