# Adding Library Articles

Educational articles in the **Learning Library** are added manually in code — there
is no CMS, database, or admin panel. This guide explains how to add one.

## Where article data lives

Everything is in a single file:

```
src/data/libraryContent.js
```

Each article is one object in the `LIBRARY_ARTICLES` array. Adding an object there
automatically:

- creates its page at `/library/<categorySlug>/<slug>`,
- lists it on the category hub (e.g. `/library/getting-started`),
- adds it to `sitemap.xml`,
- generates its SEO metadata and JSON-LD (`Article`, `BreadcrumbList`, and
  `FAQPage` when FAQs are present).

You do **not** touch routing, the sitemap, or schema files to publish an article.

## How to add a new article

1. Open `src/data/libraryContent.js`.
2. Copy an existing object in `LIBRARY_ARTICLES` (the
   `how-to-prepare-for-your-first-medical-travel-conversation` entry is the most
   complete template).
3. Change the fields (see below). At minimum set `slug`, `title`, `summary`, and
   `content`.
4. Save. The article is live in dev (`npm run dev`) at
   `/library/getting-started/<your-slug>`.

That's it. No other files need editing for a normal article.

## Fields

`normalizeArticle()` fills in sensible defaults, so you only set what differs.

### Required

| Field     | Notes                                                                                                                                     |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `slug`    | URL segment. Lowercase, hyphenated, stable (don't change after publishing). Must be unique and must not collide with a category hub name. |
| `title`   | The article's H1 and card title.                                                                                                          |
| `summary` | One–two sentence description (used on cards and as the SEO description fallback).                                                         |
| `content` | The article body, written in Markdown (see below).                                                                                        |

### Optional (with defaults)

| Field             | Default                           | Notes                                                                                |
| ----------------- | --------------------------------- | ------------------------------------------------------------------------------------ |
| `category`        | `'Getting Started'`               | Display label.                                                                       |
| `categorySlug`    | `'getting-started'`               | Drives the URL and which hub the article appears on.                                 |
| `type`            | `'Guide'`                         | Card badge: `Guide`, `Article`, or `FAQ`.                                            |
| `readTime`        | auto-estimated                    | e.g. `'5 min read'`. Leave unset to auto-calculate from `content`.                   |
| `featured`        | `false`                           | `true` shows the article in the homepage-style "Featured Topics" grid on `/library`. |
| `excerpt`         | falls back to `summary`           | Longer/alternate card + subtitle text if you want it different from `summary`.       |
| `author`          | none                              | e.g. `'MyHealth Haven'`.                                                             |
| `date`            | none                              | Publish date, ISO `YYYY-MM-DD`.                                                      |
| `updatedDate`     | none                              | Last-updated date, ISO `YYYY-MM-DD`. Feeds the `Article` schema `dateModified`.      |
| `image`           | none                              | Card thumbnail (see Images).                                                         |
| `heroImage`       | falls back to `image`             | Large image at the top of the article.                                               |
| `seoTitle`        | falls back to `title`             | See SEO.                                                                             |
| `seoDescription`  | falls back to `excerpt`/`summary` | See SEO.                                                                             |
| `faqs`            | `[]`                              | See FAQs.                                                                            |
| `relatedArticles` | `[]`                              | See Related articles.                                                                |

## Markdown body & writing for search/AI (GEO)

`content` is rendered with `react-markdown`. Supported: `##`/`###` headings, `**bold**`,
links, and `-` bullet lists.

- **Use `##` and `###` only.** The page title is the single H1 — do not put a `#`
  heading in the body.
- Open with a short, plain-language answer paragraph.
- Phrase section headings as questions where natural ("What should I bring?",
  "Who is this best for?"). This helps search and AI answer engines.
- Link to other Library articles with their full path:
  `[Is Medical Travel Right for Me?](/library/getting-started/is-medical-travel-right-for-me)`.
- Keep content medically cautious and avoid unsupported claims.

## Images

1. Put the image file in the `public/` folder (e.g. `public/my-article.webp`).
2. Reference it from the root: `image: '/my-article.webp'` and/or
   `heroImage: '/my-article.webp'`. Always add `imageAlt` / `heroImageAlt`.
3. If you omit images, a branded gradient placeholder is shown automatically.

## SEO title / description

- `seoTitle` becomes the browser/tab title and `og:title` (the site appends
  `| MyHealth Haven`). If unset, `title` is used.
- `seoDescription` becomes the meta description and `og:description`. If unset, it
  falls back to `excerpt`, then `summary`.

Set these explicitly when you want the search snippet to differ from the on-page
title/summary.

## FAQs

Add a `faqs` array of `{ question, answer }` objects:

```js
faqs: [
  { question: 'Do I need to decide right away?', answer: 'No. ...' },
],
```

This renders a visible "Frequently Asked Questions" section **and** emits
`FAQPage` schema. Only include accurate, non-speculative answers.

## Related articles

Add a `relatedArticles` array of other article `slug`s:

```js
relatedArticles: ['is-medical-travel-right-for-me', 'how-we-vet-hospitals'],
```

These render as cards at the bottom of the article. Unknown slugs are skipped.

## Assigning an article to a category

Set both fields to match one of the categories below. The article then appears on
that category's hub and uses the URL `/library/<categorySlug>/<slug>`.

| Category         | `category`           | `categorySlug`         | Hub URL                       |
| ---------------- | -------------------- | ---------------------- | ----------------------------- |
| Getting Started  | `'Getting Started'`  | `'getting-started'`    | `/library/getting-started`    |
| Costs & Planning | `'Costs & Planning'` | `'costs-and-planning'` | `/library/costs-and-planning` |

```js
category: 'Costs & Planning',
categorySlug: 'costs-and-planning',
```

If you omit both, the article defaults to Getting Started.

**Moving a published article between categories changes its URL**, so add a
redirect from the old path in `next.config.mjs` (see the existing
`/library/getting-started/... -> /library/costs-and-planning/...` entries).

## What NOT to edit

- **Don't hand-edit the sitemap** (`src/app/sitemap.js`) — article URLs are
  generated automatically from `LIBRARY_ARTICLES`.
- **Don't rename the `summary` field** — cards and SEO depend on it.
- **Don't create a slug that collides with a category hub** (`getting-started`,
  `costs-and-planning`) — the hub route wins.
- **Don't edit `src/lib/libraryPages.js`** to publish an article — it only holds
  the shared metadata/JSON-LD builders used by every category route.
- **Don't change a published article's `slug`** without adding a redirect in
  `next.config.mjs` (see the existing `/library/...` redirects there for the
  pattern).

## Limitations

- **Article content is English-only.** Site chrome (navigation, buttons, category
  labels) is bilingual, but article bodies, titles, excerpts, FAQs, and category
  intros are written in English only.
- **Adding _articles_ to an existing category needs no new files** — just the data
  entry. Adding a **brand-new category** takes four small steps (Next.js needs a
  literal folder per category):
  1. Add an entry to `LIBRARY_CATEGORY_DETAILS` in `src/data/libraryContent.js`
     (`slug`, `name`, `description`, `intro`, `ctaTitle`).
  2. Set the matching `slug` on that category in `LIBRARY_CATEGORIES` so its card
     on `/library` becomes clickable.
  3. Copy `src/app/(main)/library/costs-and-planning/` to a folder named after the
     new slug and change the `CATEGORY_SLUG` constant in both `page.jsx` files.
  4. Add the hub path to `PUBLIC_ROUTE_DEFINITIONS` in `src/lib/siteSeo.ts`.

  All metadata and JSON-LD come from the shared builders in
  `src/lib/libraryPages.js`, so there is no per-category SEO code to maintain.
