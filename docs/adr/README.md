# Architecture Decision Records

This directory captures significant architectural decisions for MyHealth Haven,
using lightweight [ADRs](https://adr.github.io/). Each record states the context,
the decision, and its consequences, and is immutable once accepted — to change a
decision, add a new ADR that supersedes the old one.

## Index

| ADR                                            | Title                                            | Status   |
| ---------------------------------------------- | ------------------------------------------------ | -------- |
| [0001](0001-use-nextjs-app-router.md)          | Use Next.js App Router (migrated from Vite SPA)  | Accepted |
| [0002](0002-email-lead-capture-no-database.md) | Capture leads via email, with no database        | Accepted |
| [0003](0003-no-phi-data-posture.md)            | Operate as a non-PHI site (outside HIPAA scope)  | Accepted |
| [0004](0004-security-headers-and-csp.md)       | Apply a strict CSP and security headers globally | Accepted |
| [0005](0005-in-memory-rate-limiting.md)        | Use in-memory per-IP rate limiting for the form  | Accepted |

## Adding a new ADR

Copy the structure of an existing record, give it the next number, and add a row
to the index above.
