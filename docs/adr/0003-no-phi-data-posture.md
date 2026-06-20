# 3. Operate as a non-PHI site (outside HIPAA scope)

- Status: Accepted
- Date: 2026

## Context

The business facilitates access to medical care abroad, so visitors might be
tempted to share health details. HIPAA obligations attach to covered entities and
their business associates handling protected health information (PHI). The site
is a lead-generation front end operated by a facilitator (My Health Haven
Management LLC), not a provider, plan, or clearinghouse, and it does not bill
electronically for care. The email and validation processors used (Resend,
AbstractAPI) do not offer Business Associate Agreements on standard plans.

## Decision

Operate the public site on the basis that it is **not a PHI-collecting service**
and is outside HIPAA scope. Concretely:

- The Privacy Policy states PHI should not be submitted through the site.
- The estimate form asks only for a brief, non-clinical description of the
  procedure of interest, and the UI explicitly discourages sharing medical
  records or detailed health history.
- No health data is intentionally stored (see [ADR-0002](0002-email-lead-capture-no-database.md)).

## Consequences

- The site avoids HIPAA administrative, technical, and BAA requirements that
  would otherwise be triggered by handling PHI.
- **Residual risk:** the free-text procedure field can still receive whatever a
  visitor types, which is transmitted via Resend and delivered to the inbox. This
  is documented in [SECURITY.md](../../SECURITY.md) and mitigated by form copy,
  not by technical enforcement.
- If the business ever decides to intentionally handle PHI, this posture is
  void: a new ADR must cover BAAs, a HIPAA-eligible delivery/storage path, access
  controls, audit logging, and removal of free-text PHI capture.
