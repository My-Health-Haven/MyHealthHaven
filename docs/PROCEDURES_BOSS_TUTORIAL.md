# Procedures Spreadsheet Tutorial (Non-Technical)

This guide explains how to update the website's Procedures section using Google Sheets, without touching code.

## What This Controls

The spreadsheet powers:

- Procedure cards shown on the website
- Filter options on the left side of the Procedures page
- Optional price text on each card (example: `From $13,500 USD`)

Important:

- Updates are not instant. Expect up to 5 minutes due to caching.

## Simple Model

There are 2 tabs:

1. Main data tab (your current procedures tab, for example `Tabla_1`)
2. Optional config tab (`procedures_config`) for labels and column behavior rules

## Main Data Tab: What Each Row Means

- Row 1 = technical headers (must stay stable)
- Row 2+ = real procedure data

Important:

- Customer-facing labels now come from `procedures_config` (not row 2).
- This is cleaner for Google Sheets Tables and avoids row-2 validation issues.

## What You Can Safely Edit

Safe:

- Add or edit procedure rows (row 2 and below)
- Edit values in existing cells
- Add new columns
- Change labels/behavior in `procedures_config`

Do not change:

- `procedure_id` header name
- `procedure_name` header name
- The fact that row 1 is technical headers

## Most Common Tasks

### 1. Edit an Existing Procedure

1. Find the procedure row.
2. Update text fields (category, section, name, tags, etc.).
3. Keep `visible` checked/true if you want it on the site.
4. Save. Wait up to 5 minutes.

### 2. Add a New Procedure

1. Add a new row below existing data (starting at row 2 if there is no legacy labels row).
2. Fill all key columns.
3. Use a unique `procedure_id`.
4. Set `visible` to true/yes.
5. Set `sort_order` number.
6. Save. Wait up to 5 minutes.

### 3. Add Optional Price Message on Card

1. Add new column header: `price_note` (row 1).
2. In rows with pricing, enter full text such as `From $13,500 USD`.
3. Leave blank where no price should show.
4. Save. Wait up to 5 minutes.

### 4. Change Filter Labels Shown to Customers

1. Open `procedures_config` tab.
2. Find the row for the column (example `top_category`).
3. Edit the `label` cell (example `Category`).
4. Save. Wait up to 5 minutes.

Examples:

- `top_category` -> `Category`
- `group_bucket` -> `Complexity`
- `care_type` -> `Type`
- `section_group` -> `Speciality`
- `section` -> `Procedure Type`
- `tags` -> `Purpose`

## Why `procedures_config` Tab Exists

The `procedures_config` tab lets non-developers control behavior without code changes.

It defines:

- Customer-facing labels
- Which columns appear as filters
- Which columns appear on cards
- Which columns are searchable
- Max allowed text length per column

This prevents breakage when new columns are added.

## Create `procedures_config` (Step by Step)

1. Create a new tab named `procedures_config`.
2. In row 1, add headers:
   - `column_key`
   - `label`
   - `behavior`
   - `searchable`
   - `card_label`
   - `card_order`
   - `max_length`
3. Add rows for each column you want to control.

Recommended starter rows:

```tsv
column_key	label	behavior	searchable	card_label	card_order	max_length
top_category	Category	filter-only	false			80
group_bucket	Complexity	filter-only	false			80
care_type	Type	filter-only	true			80
section_group	Speciality	filter-only	true			120
section	Procedure Type	filter-only	true			120
tags	Purpose	filter-only	true			200
price_note	Price	card-display	false		1	80
```

## What `card_label` Means (Simple Explanation)

`card_label` is optional and only matters for columns with `behavior = card-display`.

Example with `price_note`:

- If `card_label` is blank and cell value is `From $3,500 USD`, the website shows:
  - `From $3,500 USD`
- If `card_label` is `Starting at` and cell value is `$3,500 USD`, the website shows:
  - `Starting at: $3,500 USD`

For your current setup, leaving `card_label` blank is usually best.

## Behavior Options (Plain English)

- `filter-only`: appears in filter panel
- `card-display`: appears on each procedure card (only if cell has value)
- `searchable`: hidden from filter/card, but included in search
- `hidden`: not shown in filter/search/card

## Data Quality and Safety

The system already protects against common problems:

- Requires `procedure_id` and `procedure_name`
- Normalizes `visible` and `sort_order`
- Ignores duplicate `procedure_id` rows
- Trims/limits long text
- Renders text only (no HTML execution)

## Google Sheets Settings to Apply

1. Protect row 1 (technical headers).
2. Add data validation:
   - `visible`: dropdown (`YES`, `NO`)
   - `sort_order`: number only
3. Restrict structure edits (headers/config tab) to admins.

Google Sheets Tables note:

- Using `procedures_config` for labels avoids the row-2 invalid-data problem in table mode.

## Troubleshooting

If a change does not appear:

1. Wait 5 minutes.
2. Hard refresh browser.
3. Confirm `visible` is true/yes.
4. Confirm `procedure_id` is unique and not blank.
5. Confirm header names in row 1 were not renamed.
6. Confirm the `procedures_config` row for that column has the expected `label` and `behavior`.
7. If still broken, send the changed row and screenshot to developer.
