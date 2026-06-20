# Disaster Recovery, RTO & RPO

This site is **stateless**: there is no application database and no user data
stored by the app. That makes recovery simple — the system is reconstituted
entirely from source control and a redeploy.

## What constitutes "data" here

| Asset                          | System of record             | Backup / durability                       |
| ------------------------------ | ---------------------------- | ----------------------------------------- |
| Application code & content     | Git repository (GitHub)      | Distributed clones + GitHub               |
| Build/runtime config (secrets) | Vercel Environment Variables | Re-enterable from the password manager    |
| Submitted leads                | Email inbox + Resend logs    | Mail provider retention (not app-managed) |
| Static assets (images, PDFs)   | Git repository (`public/`)   | Same as code                              |

## Objectives

| Metric  | Target                           | Rationale                                                                                                                                                                          |
| ------- | -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **RTO** | ≤ 1 hour                         | A redeploy from `main` to Vercel (or an alternate host) takes minutes; the hour absorbs DNS/provider setup in a worst case.                                                        |
| **RPO** | ~0 for code; per-email for leads | Code is whatever is committed to Git. Leads are only "lost" if email delivery fails _and_ the requester does not retry; idempotent retry-with-backoff on the route minimizes this. |

## Failure scenarios & response

1. **Vercel outage / project deleted.**
   Re-create the project from the Git repo, restore environment variables, and
   deploy. Point DNS at the new deployment. RTO target ≤ 1 hour.

2. **Hosting provider permanently unavailable.**
   The app is a standard Next.js application and can be deployed to any
   Node-capable host (or another Next-compatible platform). Reconfigure TLS/DNS.

3. **Domain / DNS issue.**
   Restore DNS records at the registrar; TLS re-provisions automatically on
   Vercel.

4. **Resend (email) outage.**
   The form returns a clear error and the route retries transient failures. Leads
   during a full outage are not captured server-side; monitor the inbox and, if
   needed, temporarily surface the phone/WhatsApp contact path.

5. **Secret compromise.**
   Follow the rotation procedure in [SECURITY.md](../SECURITY.md) and redeploy.

## Recovery procedure (code/runtime)

```bash
git clone <repo-url> && cd HealthHavenMyVersion2
npm ci
# Set environment variables in the host (see README.md)
npm run build && npm run start   # or deploy to Vercel
```

## Review cadence

Revisit these objectives whenever the architecture gains stateful components
(a database, stored submissions, accounts). At that point RPO becomes a real
backup-frequency decision rather than "≈0".
