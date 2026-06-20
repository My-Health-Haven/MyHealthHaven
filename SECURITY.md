# Security Policy

## Reporting a vulnerability

Please report suspected security issues privately to **Info@andersonlg.com**.
Do not open a public GitHub issue for security reports. We aim to acknowledge
reports within 5 business days.

## Scope & threat model

This is a public marketing site with **no authentication and no database**. The
only attacker-reachable server logic is the estimate form endpoint
(`src/app/api/estimate/route.js`). The primary risks are therefore input
injection, spam/abuse of the form, secret exposure, and supply-chain issues.

## Controls in place

- **Transport security:** HTTPS everywhere (Vercel-managed TLS, automatic
  renewal), HSTS with `preload`, and `upgrade-insecure-requests`.
- **HTTP security headers** (`next.config.mjs`): a strict Content-Security-Policy,
  `X-Content-Type-Options`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy`,
  `Permissions-Policy`, `Cross-Origin-Opener-Policy`, and
  `Cross-Origin-Resource-Policy`.
- **Input handling:** all form input is trimmed, length-bounded, and
  HTML-escaped before being placed in emails; phone numbers are stripped to
  digits. React escapes rendered output. There is no SQL/NoSQL layer.
- **Abuse prevention:** hidden honeypot field, per-IP rate limiting, disposable
  email-domain blocking, and email-deliverability verification.
- **SSRF guard:** the email-verification provider URL is locked to a fixed
  hostname and must be HTTPS.
- **CORS:** API responses only echo an `Access-Control-Allow-Origin` for hosts in
  the `ALLOWED_ORIGINS` allowlist.
- **Secrets:** all API keys are server-only environment variables and are never
  shipped to the browser. `.env*` files are git-ignored.
- **Supply chain:** Dependabot (npm + GitHub Actions), a CI `npm audit` gate that
  fails on **high/critical** advisories, and gitleaks secret scanning
  (`.github/workflows/security.yml`).
- **Resilience:** outbound email uses retry-with-backoff and a content-derived
  `Idempotency-Key` to avoid duplicate or lost leads.

## Secrets management & rotation

- Secrets are stored in the Vercel project's Environment Variables, not in the
  repository.
- Rotate `RESEND_API_KEY` and `EMAIL_VERIFIER_API_KEY` if they may have been
  exposed, when an operator with access leaves, and at least annually.
- Rotation procedure: issue a new key in the provider dashboard → update the
  Vercel environment variable → redeploy → revoke the old key.
- If a secret is ever committed, treat it as compromised: rotate immediately;
  scrubbing git history is secondary.

## Protected health information (PHI) posture

This site is operated on the basis that it is **not a PHI-collecting service**
and is **not a HIPAA-covered entity or business associate**. The published
[Privacy Policy](public/PRIVACY%20POLICY.md) states that PHI should not be
submitted, and the estimate form asks only for a brief, non-clinical description
of the procedure of interest.

Operational note: the free-text procedure field could still receive health
details a visitor chooses to type. That content is transmitted to Resend (and,
for the email address only, AbstractAPI) and delivered to the business inbox.
None of these are covered by a HIPAA Business Associate Agreement under standard
plans. The form copy and Privacy Policy are intended to discourage PHI; if the
business posture ever changes to intentionally handle PHI, this flow must be
re-architected (BAAs, a HIPAA-eligible delivery path, and removal of free-text
PHI). See [ADR-0003](docs/adr/0003-no-phi-data-posture.md).

## Known / accepted issues

- **postcss (moderate) bundled inside Next.js 16.** `npm audit` reports a
  moderate postcss advisory reachable only through Next's internal dependency.
  The only `npm audit fix` for it downgrades Next.js to v9 (a major breaking
  change), so it is **accepted** until Next ships an updated transitive
  dependency. It is build-time only and not exploitable through the deployed
  site. The CI audit gate is set to `--audit-level=high` so this moderate
  finding does not block builds; it is still reported in the non-blocking full
  audit step.
