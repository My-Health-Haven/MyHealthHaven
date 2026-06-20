# 4. Apply a strict CSP and security headers globally

- Status: Accepted
- Date: 2026

## Context

As a public site that embeds third-party scripts (Google Tag Manager/Analytics),
Google Maps/Calendar iframes, and talks to external APIs (Resend, AbstractAPI),
the app needs defense-in-depth against XSS, clickjacking, MIME sniffing, and
mixed content — especially since it collects contact details through a form.

## Decision

Set security headers on every response via `next.config.mjs`:

- A **Content-Security-Policy** with `default-src 'self'`, `object-src 'none'`,
  `base-uri 'self'`, `frame-ancestors 'self'`, `form-action 'self'`, and explicit
  allowlists for the GTM/GA scripts, the API `connect-src` endpoints, Google
  frames, and font/style sources.
- `Strict-Transport-Security` with `includeSubDomains; preload` and
  `upgrade-insecure-requests`.
- `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`,
  `Referrer-Policy: strict-origin-when-cross-origin`, a restrictive
  `Permissions-Policy`, `Cross-Origin-Opener-Policy`, and
  `Cross-Origin-Resource-Policy`.

## Consequences

- Materially reduces XSS/clickjacking/mixed-content risk.
- **Trade-off:** the CSP currently allows `'unsafe-inline'` for scripts/styles,
  which is required by the current MUI/Emotion + GTM setup. This weakens the CSP's
  XSS protection; a future hardening step is to move to nonce/hash-based inline
  policies.
- Adding any new third-party script, frame, font, or API endpoint requires
  updating the CSP allowlist, or it will be blocked in the browser.
