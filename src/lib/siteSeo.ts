import { LIBRARY_ARTICLES, getLibraryArticlePath } from '../data/libraryContent.js';

export const SITE_NAME = 'MyHealth Haven';
export const SITE_LEGAL_NAME = 'My Health Haven Management, LLC';
export const SITE_ORIGIN = 'https://www.myhealthhaven.org';
export const SITE_EMAIL = 'healthnavigator@andersonlg.com';
export const SITE_PHONE_E164 = '+12142763928';
export const SITE_PHONE_DISPLAY = '+1 (214) 276 3928';
export const DEFAULT_OG_IMAGE = '/cancun-skyline.jpg';

export const SITE_ADDRESS = {
  streetAddress: '30 N Gould St, Ste R',
  addressLocality: 'Sheridan',
  addressRegion: 'WY',
  postalCode: '82801',
  addressCountry: 'US',
} as const;
export const DEFAULT_META_DESCRIPTION =
  'MyHealth Haven helps U.S. patients navigate trusted medical care in Mexico with bilingual support, transparent planning, and continuity before and after treatment.';
export const SEO_LASTMOD = '2026-03-24';

// ---------------------------------------------------------------------------
// Interfaces
// ---------------------------------------------------------------------------

export interface RouteDefinition {
  path: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: string;
  prerender?: boolean;
  sitemap?: boolean;
  indexable?: boolean;
  lastmod?: string;
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

interface WebPageSchemaArgs {
  path: string;
  name: string;
  description: string;
  type?: 'WebPage' | 'CollectionPage' | 'ContactPage';
  image?: string;
}

interface ArticleSchemaArgs {
  path: string;
  headline: string;
  description: string;
  image?: string;
  dateModified?: string;
}

interface ServiceSchemaArgs {
  path: string;
  name: string;
  description: string;
  image?: string;
  serviceType?: string;
}

// ---------------------------------------------------------------------------
// Path helpers
// ---------------------------------------------------------------------------

export const normalizePath = (path: string = '/'): string => {
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

export const getCanonicalUrl = (path: string = '/'): string =>
  `${SITE_ORIGIN}${normalizePath(path)}`;

export const toAbsoluteUrl = (path: string = DEFAULT_OG_IMAGE): string =>
  /^https?:\/\//i.test(path) ? path : `${SITE_ORIGIN}${path.startsWith('/') ? path : `/${path}`}`;

// ---------------------------------------------------------------------------
// Route definitions
// ---------------------------------------------------------------------------

export const PUBLIC_ROUTE_DEFINITIONS: RouteDefinition[] = (
  [
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
    {
      path: '/library/getting-started',
      changefreq: 'monthly',
      priority: '0.7',
      prerender: true,
    },
    ...LIBRARY_ARTICLES.map((article: { slug: string; categorySlug?: string }) => ({
      path: getLibraryArticlePath(article),
      changefreq: 'monthly' as const,
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
      sitemap: false,
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
    {
      path: '/providers',
      changefreq: 'monthly',
      priority: '0.6',
      prerender: true,
    },
  ] as Omit<RouteDefinition, 'lastmod'>[]
).map((route) => ({
  ...route,
  lastmod: SEO_LASTMOD,
  path: normalizePath(route.path),
}));

export const SITEMAP_ROUTE_DEFINITIONS: RouteDefinition[] = PUBLIC_ROUTE_DEFINITIONS.filter(
  (route) => route.sitemap !== false && route.indexable !== false
);

// ---------------------------------------------------------------------------
// Schema builders
// ---------------------------------------------------------------------------

export const createBreadcrumbSchema = (
  items: BreadcrumbItem[] = []
): Record<string, unknown> | null => {
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

const POSTAL_ADDRESS_SCHEMA = {
  '@type': 'PostalAddress',
  streetAddress: SITE_ADDRESS.streetAddress,
  addressLocality: SITE_ADDRESS.addressLocality,
  addressRegion: SITE_ADDRESS.addressRegion,
  postalCode: SITE_ADDRESS.postalCode,
  addressCountry: SITE_ADDRESS.addressCountry,
} as const;

export const createMedicalBusinessSchema = (): Record<string, unknown> => ({
  '@context': 'https://schema.org',
  '@type': 'MedicalBusiness',
  name: SITE_NAME,
  legalName: SITE_LEGAL_NAME,
  url: SITE_ORIGIN,
  logo: toAbsoluteUrl('/logo.png'),
  email: SITE_EMAIL,
  telephone: SITE_PHONE_E164,
  description: DEFAULT_META_DESCRIPTION,
  address: POSTAL_ADDRESS_SCHEMA,
  areaServed: [
    { '@type': 'Country', name: 'United States' },
    { '@type': 'Country', name: 'Mexico' },
  ],
  availableLanguage: ['English', 'Spanish'],
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

export const createOrganizationSchema = (): Record<string, unknown> => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  legalName: SITE_LEGAL_NAME,
  url: SITE_ORIGIN,
  logo: toAbsoluteUrl('/logo.png'),
  email: SITE_EMAIL,
  telephone: SITE_PHONE_E164,
  address: POSTAL_ADDRESS_SCHEMA,
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

export const createWebsiteSchema = (): Record<string, unknown> => ({
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
}: WebPageSchemaArgs): Record<string, unknown> => ({
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

export const createCollectionPageSchema = ({
  path,
  name,
  description,
  image = DEFAULT_OG_IMAGE,
}: Omit<WebPageSchemaArgs, 'type'>): Record<string, unknown> =>
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
}: ServiceSchemaArgs): Record<string, unknown> => ({
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

export const createContactPageSchema = ({
  path,
  name,
  description,
  image = DEFAULT_OG_IMAGE,
}: Omit<WebPageSchemaArgs, 'type'>): Record<string, unknown> => ({
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

export const createFAQSchema = (faqItems: FAQItem[] = []): Record<string, unknown> | null => {
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
}: ArticleSchemaArgs): Record<string, unknown> => ({
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
