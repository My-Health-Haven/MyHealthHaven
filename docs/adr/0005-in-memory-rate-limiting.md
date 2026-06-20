# 5. Use in-memory per-IP rate limiting for the form

- Status: Accepted
- Date: 2026

## Context

The estimate endpoint sends emails and calls a paid verification API, so it needs
protection against spam and abuse. A full distributed rate limiter (e.g. Redis /
Upstash / Vercel KV) would be globally accurate but adds an external dependency,
cost, and configuration for what is currently a low-traffic form.

## Decision

Implement a lightweight **in-memory, per-IP sliding-window** limiter in the route
(default 5 requests/minute, configurable via `ESTIMATE_RATE_LIMIT_MAX`), layered
with other abuse controls: a honeypot field, disposable-domain blocking, and
email-deliverability verification.

## Consequences

- Zero added infrastructure; effective against naive/simple abuse, and defense in
  depth means the honeypot and email verification still apply even when the
  limiter is bypassed.
- **Known limitation:** on serverless, memory is per-instance and not shared, and
  it resets on cold starts — so the limit is approximate, not a global guarantee.
  This is acceptable at current volume.
- If abuse becomes a real problem (or traffic grows), replace the in-memory store
  with a shared store (Upstash/Vercel KV) or an edge/WAF rate limit. That change
  should get its own ADR.
