# 2. Capture leads via email, with no database

- Status: Accepted
- Date: 2026

## Context

The site's single conversion goal is to capture estimate requests and route them
to a health navigator for manual follow-up. The volume is low and each lead is
handled by a person, not an automated pipeline. Introducing a database would add
operational burden (backups, migrations, access control, retention tooling) and
would expand the system's data-protection and compliance surface.

## Decision

Do **not** add an application database. The estimate route validates and
sanitizes the submission, then sends it via **Resend** to the business lead inbox
plus a confirmation email to the requester. The mailbox (and Resend's logs) are
the system of record for leads.

## Consequences

- No stored user data in the app → a much smaller security and compliance
  surface (no AuthZ model, no data-isolation concerns, trivial DR — see
  [ADR-0003](0003-no-phi-data-posture.md) and the DR doc).
- Lead durability depends on email delivery; the route mitigates this with
  retry-with-backoff and an idempotency key to avoid duplicate or lost sends.
- Retention and deletion are governed by the mailbox and third-party processors,
  not an app-side job (see `docs/data-retention.md`).
- If product needs grow (CRM, dashboards, de-dup, analytics on leads), this
  decision should be revisited; adding storage will require new ADRs covering
  retention, backups, and access control.
