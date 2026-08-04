// Shared builders for Library category routes.
//
// Each category has a literal route folder (Next.js needs a static segment):
//   src/app/(main)/library/<categorySlug>/page.jsx          -> category hub
//   src/app/(main)/library/<categorySlug>/[slug]/page.jsx    -> article
//
// Those files stay thin by delegating metadata + JSON-LD to the helpers here, so
// adding a new category is: add LIBRARY_CATEGORY_DETAILS entry -> copy the route
// folder -> add the hub path to PUBLIC_ROUTE_DEFINITIONS in siteSeo.ts.
import {
  LIBRARY_CATEGORY_DETAILS,
  getArticlesByCategory,
  getLibraryArticleBySlug,
  getLibraryArticlePath,
} from '@/data/libraryContent';
import {
  DEFAULT_OG_IMAGE,
  createArticleSchema,
  createBreadcrumbSchema,
  createCollectionPageSchema,
  createFAQSchema,
  getCanonicalUrl,
} from '@/lib/siteSeo';

const SITE_SUFFIX = 'MyHealth Haven';

export const getCategoryPath = (categorySlug) => `/library/${categorySlug}`;

export const getCategoryDetails = (categorySlug) => LIBRARY_CATEGORY_DETAILS[categorySlug] || null;

/**
 * Resolve an article ONLY if it belongs to the given category. Without this
 * guard the same article would render under every category's `[slug]` route,
 * producing duplicate content at multiple URLs.
 */
export const getCategoryArticle = (categorySlug, slug) => {
  const article = getLibraryArticleBySlug(slug);
  return article && article.categorySlug === categorySlug ? article : null;
};

export const buildCategoryParams = (categorySlug) =>
  getArticlesByCategory(categorySlug).map((article) => ({ slug: article.slug }));

// ─── Category hub ────────────────────────────────────────────────────────
export const buildCategoryMetadata = (categorySlug) => {
  const details = getCategoryDetails(categorySlug);
  if (!details) return {};

  const canonical = getCanonicalUrl(getCategoryPath(categorySlug));

  return {
    title: details.name,
    description: details.description,
    alternates: {
      canonical,
      languages: { 'x-default': canonical, en: canonical, es: canonical },
    },
    openGraph: {
      title: `${details.name} | ${SITE_SUFFIX}`,
      description: details.description,
      url: canonical,
    },
  };
};

export const buildCategorySchemas = (categorySlug) => {
  const details = getCategoryDetails(categorySlug);
  if (!details) return [];

  const path = getCategoryPath(categorySlug);

  return [
    createCollectionPageSchema({
      path,
      name: `${details.name} | ${SITE_SUFFIX}`,
      description: details.description,
    }),
    createBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Library', path: '/library' },
      { name: details.name, path },
    ]),
  ];
};

// ─── Article page ────────────────────────────────────────────────────────
export const buildArticleMetadata = (categorySlug, slug) => {
  const article = getCategoryArticle(categorySlug, slug);
  if (!article) return {};

  const canonical = getCanonicalUrl(getLibraryArticlePath(article));
  const ogTitle = `${article.seoTitle} | ${SITE_SUFFIX}`;
  const ogImage = article.heroImage || DEFAULT_OG_IMAGE;

  return {
    title: article.seoTitle,
    description: article.seoDescription,
    authors: article.author ? [{ name: article.author }] : undefined,
    alternates: {
      canonical,
      languages: { 'x-default': canonical, en: canonical, es: canonical },
    },
    openGraph: {
      title: ogTitle,
      description: article.seoDescription,
      url: canonical,
      type: 'article',
      publishedTime: article.date,
      modifiedTime: article.updatedDate || article.date,
      images: [
        {
          url: ogImage,
          alt: article.heroImageAlt || article.imageAlt || article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: article.seoDescription,
      images: [ogImage],
    },
  };
};

export const buildArticleSchemas = (categorySlug, slug) => {
  const article = getCategoryArticle(categorySlug, slug);
  if (!article) return [];

  const path = getLibraryArticlePath(article);

  return [
    createArticleSchema({
      path,
      headline: article.seoTitle,
      description: article.seoDescription,
      image: article.heroImage,
      datePublished: article.date,
      dateModified: article.updatedDate || article.date,
      articleSection: article.category,
    }),
    createBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Library', path: '/library' },
      { name: article.category, path: getCategoryPath(categorySlug) },
      { name: article.title, path },
    ]),
    createFAQSchema(article.faqs),
  ];
};
