import { LIBRARY_ARTICLES } from '../data/libraryContent.js';

export const SITE_NAME = 'MyHealth Haven';
export const SITE_ORIGIN = 'https://www.myhealthhaven.org';
export const SITE_EMAIL = 'healthnavigator@andersonlg.com';
export const SITE_PHONE_E164 = '+12142763928';
export const SITE_PHONE_DISPLAY = '+1 (214) 276 3928';
export const DEFAULT_OG_IMAGE = '/cancun-skyline.jpg';
export const DEFAULT_META_DESCRIPTION =
  'MyHealth Haven helps U.S. patients navigate trusted medical care in Mexico with bilingual support, transparent planning, and continuity before and after treatment.';
export const SEO_LASTMOD = '2026-03-24';

export const normalizePath = (path = '/') => {
  const withoutQuery = String(path || '/')
    .trim()
    .replace(/[?#].*$/, '')
    .replace(/\/{2,}/g, '/');

  if (!withoutQuery || withoutQuery === '/') {
    return '/';
  }

  const normalized = withoutQuery.startsWith('/') ? withoutQuery : `/${withoutQuery}`;
  return normalized.length > 1 && normalized.endsWith('/') ? normalized.slice(0, -1) : normalized;
};

export const getCanonicalUrl = (path = '/') => `${SITE_ORIGIN}${normalizePath(path)}`;

export const toAbsoluteUrl = (path = DEFAULT_OG_IMAGE) =>
  /^https?:\/\//i.test(path)
    ? path
    : `${SITE_ORIGIN}${path.startsWith('/') ? path : `/${path}`}`;

export const PUBLIC_ROUTE_DEFINITIONS = [
  {
    path: '/',
    changefreq: 'weekly',
    priority: '1.0',
    prerender: true,
  },
  {
    path: '/navigators',
    changefreq: 'monthly',
    priority: '0.9',
    prerender: true,
  },
  {
    path: '/medical-travel',
    changefreq: 'monthly',
    priority: '0.9',
    prerender: true,
  },
  {
    path: '/procedures',
    changefreq: 'weekly',
    priority: '0.9',
    prerender: true,
  },
  {
    path: '/library',
    changefreq: 'weekly',
    priority: '0.8',
    prerender: true,
  },
  ...LIBRARY_ARTICLES.map((article) => ({
    path: `/library/${article.slug}`,
    changefreq: 'monthly',
    priority: '0.7',
    prerender: true,
  })),
  {
    path: '/estimate',
    changefreq: 'monthly',
    priority: '0.8',
    prerender: true,
  },
  {
    path: '/contact',
    changefreq: 'monthly',
    priority: '0.8',
    prerender: true,
  },
  {
    path: '/schedule',
    changefreq: 'monthly',
    priority: '0.8',
    prerender: true,
  },
  {
    path: '/privacy',
    changefreq: 'yearly',
    priority: '0.4',
    prerender: true,
  },
  {
    path: '/terms',
    changefreq: 'yearly',
    priority: '0.4',
    prerender: true,
  },
  {
    path: '/about',
    changefreq: 'monthly',
    priority: '0.7',
    prerender: true,
  },
  {
    path: '/employers',
    changefreq: 'monthly',
    priority: '0.6',
    prerender: true,
  },
].map((route) => ({
  ...route,
  lastmod: route.lastmod || SEO_LASTMOD,
  path: normalizePath(route.path),
}));

export const SITEMAP_ROUTE_DEFINITIONS = PUBLIC_ROUTE_DEFINITIONS.filter(
  (route) => route.sitemap !== false && route.indexable !== false
);

export const PRERENDER_ROUTES = PUBLIC_ROUTE_DEFINITIONS.filter((route) => route.prerender).map(
  (route) => route.path
);

export const createBreadcrumbSchema = (items = []) => {
  const normalizedItems = items.filter((item) => item?.name && item?.path);

  if (normalizedItems.length === 0) {
    return null;
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: normalizedItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: getCanonicalUrl(item.path),
    })),
  };
};

export const createOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_ORIGIN,
  logo: toAbsoluteUrl('/logo.png'),
  email: SITE_EMAIL,
  telephone: SITE_PHONE_E164,
  areaServed: ['United States', 'Mexico'],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      telephone: SITE_PHONE_E164,
      email: SITE_EMAIL,
      availableLanguage: ['English', 'Spanish'],
      areaServed: ['US', 'MX'],
    },
  ],
});

export const createWebsiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_ORIGIN,
  inLanguage: 'en-US',
  publisher: {
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_ORIGIN,
  },
});

export const createWebPageSchema = ({
  path,
  name,
  description,
  type = 'WebPage',
  image = DEFAULT_OG_IMAGE,
}) => ({
  '@context': 'https://schema.org',
  '@type': type,
  name,
  description,
  url: getCanonicalUrl(path),
  image: toAbsoluteUrl(image),
  isPartOf: {
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_ORIGIN,
  },
  about: {
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_ORIGIN,
  },
  inLanguage: 'en-US',
});

export const createCollectionPageSchema = ({ path, name, description, image = DEFAULT_OG_IMAGE }) =>
  createWebPageSchema({
    path,
    name,
    description,
    type: 'CollectionPage',
    image,
  });

export const createServiceSchema = ({
  path,
  name,
  description,
  image = DEFAULT_OG_IMAGE,
  serviceType,
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name,
  description,
  url: getCanonicalUrl(path),
  image: toAbsoluteUrl(image),
  provider: {
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_ORIGIN,
  },
  areaServed: ['United States', 'Mexico'],
  availableLanguage: ['English', 'Spanish'],
  ...(serviceType ? { serviceType } : {}),
});

export const createContactPageSchema = ({ path, name, description, image = DEFAULT_OG_IMAGE }) => ({
  ...createWebPageSchema({
    path,
    name,
    description,
    type: 'ContactPage',
    image,
  }),
  mainEntity: {
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_ORIGIN,
    email: SITE_EMAIL,
    telephone: SITE_PHONE_E164,
  },
});

export const createFAQSchema = (faqItems = []) => {
  const normalizedItems = faqItems.filter((item) => item?.question && item?.answer);

  if (normalizedItems.length === 0) {
    return null;
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: normalizedItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
};

export const createArticleSchema = ({
  path,
  headline,
  description,
  image = DEFAULT_OG_IMAGE,
  dateModified = SEO_LASTMOD,
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline,
  description,
  url: getCanonicalUrl(path),
  image: toAbsoluteUrl(image),
  dateModified,
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': getCanonicalUrl(path),
  },
  author: {
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_ORIGIN,
  },
  publisher: {
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_ORIGIN,
    logo: {
      '@type': 'ImageObject',
      url: toAbsoluteUrl('/logo.png'),
    },
  },
  inLanguage: 'en-US',
});
