# Procedures Sheet Guide

This guide explains how to edit the procedures spreadsheet safely without breaking the website.

## 1. Sheet Structure

Use a primary data tab with this structure:

1. Row 1: Technical headers (machine keys). Keep this row locked.
2. Row 2: Optional customer-facing labels. This row is optional and ignored as data.
3. Row 3+: Procedure rows (real data).

Minimum required headers in Row 1:

- `procedure_id`
- `procedure_name`

If either is renamed/removed, parsing fails.

## 2. What Editors Can Change Safely

Safe without code changes:

- Add, edit, or remove procedure rows.
- Edit existing cell values in data rows.
- Add new columns in Row 1 and fill values in rows below.
- Change Row 2 labels to better customer-facing wording.

Risky without review:

- Renaming `procedure_id` or `procedure_name`.
- Deleting Row 1.
- Reordering or deleting columns heavily used by operations.

## 3. Optional Config Tab (Advanced, Recommended)

Create a separate tab named `procedures_config` (or `procedure_config`, `procedures_labels`, `procedure_labels`, `labels`).

Required config header:

- `column_key`

Optional config headers:

- `label`
- `behavior`
- `searchable`
- `card_label`
- `card_order`
- `max_length`

Example:

| column_key | label | behavior | searchable | card_label | card_order | max_length |
| --- | --- | --- | --- | --- | --- | --- |
| top_category | Category | filter-only | false |  |  | 80 |
| group_bucket | Complexity | filter-only | false |  |  | 80 |
| care_type | Type | filter-only | true |  |  | 80 |
| section_group | Speciality | filter-only | true |  |  | 120 |
| tags | Purpose | filter-only | true |  |  | 200 |
| price_note | Price | card-display | false |  | 1 | 80 |

## 4. Behavior Modes

`behavior` controls where a column appears:

- `filter-only`: appears in the filter panel.
- `card-display`: appears on the procedure card (only if value is not blank).
- `searchable`: search-only behavior (hidden from filters/cards, included in search).
- `hidden`: hidden from filters, search, and cards.

If config is not provided:

- Internal columns (`procedure_id`, `procedure_name`, `short_description`, `visible`, `sort_order`) default to hidden.
- `price_note` defaults to `card-display`.
- Most other columns default to `filter-only`.

## 5. Price Note Column (`From $...`)

To support price text:

1. Add `price_note` in Row 1.
2. Optionally set Row 2 label (for internal clarity).
3. Put full message in each row, for example `From $13,500 USD`.
4. Leave blank when it should not display.

The card renders this field only when non-empty.

## 6. Validation and Safety Rules in Code

Server-side parser protections:

- Requires `procedure_id` and `procedure_name`.
- Normalizes booleans (`visible`) and numbers (`sort_order`).
- Splits `tags` by comma into arrays.
- Truncates text to max lengths.
- Skips duplicate `procedure_id` rows.
- Ignores optional Row 2 label row.
- Returns validation warnings in API response.

Frontend safety:

- Sheet values are rendered as plain text (no HTML rendering).
- Blank optional card fields are not displayed.

## 7. Google Sheets Hardening Checklist

Use these in Google Sheets:

1. Protect ranges:
   - Lock Row 1.
   - Lock Row 2 if only managers should edit labels.
2. Data validation:
   - `visible`: dropdown with `YES`, `NO`.
   - `sort_order`: number only.
   - controlled fields (like category buckets): dropdown lists where possible.
3. Permissions:
   - Give most users editor access to data rows only.
   - Restrict structure changes (header/config tabs) to admins.
4. Version safety:
   - Keep Sheet version history enabled.
   - Make structural changes in copy first, then apply to production sheet.

## 8. Quick "No-Break" Workflow for New Columns

1. Add the new technical header in Row 1.
2. Add friendly label in Row 2.
3. Decide behavior in config tab (`filter-only`, `card-display`, `searchable`, or `hidden`).
4. Add sample values to a few rows.
5. Validate the procedures page.
6. Roll out to all rows.
