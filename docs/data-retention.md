# Data Handling, Retention & Deletion

This document describes what personal data the site touches, where it goes, how
long it is kept, and how deletion requests are honored. It complements the
public [Privacy Policy](../public/PRIVACY%20POLICY.md).

## What we collect

From the **estimate form** (`/estimate`), voluntarily provided:

- Name, email address, phone number
- US state and city
- A free-text description of the procedure of interest
- Preferred language

Automatically:

- Client IP address (used transiently for rate limiting and included in the
  lead-notification email for context)
- Analytics/usage data **only after the visitor consents** (Google Tag
  Manager / GA4)

The site does **not** request or intend to collect protected health
information; see the PHI posture in [SECURITY.md](../SECURITY.md) and
[ADR-0003](adr/0003-no-phi-data-posture.md).

## Where it goes (data flow)

1. The browser POSTs the form to `/api/estimate`.
2. The email address is checked for deliverability — optionally via **AbstractAPI**
   (the address is sent to the provider) and/or a DNS lookup.
3. The submission is emailed via **Resend** to the business lead inbox, and a
   confirmation email is sent to the requester.
4. The application **does not store** the submission — there is no database. The
   durable copies live in the destination mailbox and in Resend's sending logs.

| Processor       | Purpose                   | Data shared                                |
| --------------- | ------------------------- | ------------------------------------------ |
| Vercel          | Hosting / serverless      | Request metadata, IP (in logs)             |
| Resend          | Transactional email       | Full submission (name, contact, procedure) |
| AbstractAPI     | Email validation (opt-in) | Email address only                         |
| Google (GTM/GA) | Analytics (consented)     | Usage/device data                          |

## Retention

| Data                         | Retention                                                                                                                 |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Lead emails (business inbox) | Per mailbox policy. **Recommended:** purge or archive leads no longer needed for follow-up, and review at least annually. |
| Resend sending logs          | Per Resend's retention policy (provider-managed).                                                                         |
| Server runtime logs (Vercel) | Short-lived/ephemeral; contain IP + diagnostic info, no stored PII beyond the request.                                    |
| Analytics data               | Per the configured GA retention setting.                                                                                  |
| IP address in app memory     | Cleared automatically; rate-limit entries expire after the window (~60s).                                                 |

Because there is no application datastore, there is no app-side retention job to
run — retention is governed by the mailbox and the third-party processors above.

## Deletion / data-subject requests

Requests (access, correction, deletion) go to **Info@andersonlg.com**, as stated
in the Privacy Policy. To fulfill a deletion request:

1. Search the business lead inbox/CRM for the requester's email and delete the
   matching messages/records.
2. If required, delete the corresponding events in the **Resend** dashboard logs.
3. For analytics, use the GA user-deletion tooling if the request can be tied to
   an identifier.
4. Confirm completion to the requester.

Keep a lightweight record that the request was fulfilled (date + scope), without
retaining the deleted personal data itself.

## If the architecture changes

Adding a database, a CRM integration, or stored submissions changes this picture
materially. At that point: define concrete retention windows per field,
implement automated deletion, record processors in a data-processing register,
and revisit the GDPR/HIPAA posture.
