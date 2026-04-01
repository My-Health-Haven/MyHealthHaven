import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import {
  DEFAULT_META_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  getCanonicalUrl,
  normalizePath,
  toAbsoluteUrl,
} from './siteSeo';

const LOCALE_BY_LANGUAGE = {
  en: 'en_US',
  es: 'es_MX',
};

const toSchemaArray = (value) => {
  if (Array.isArray(value)) {
    return value.filter(Boolean);
  }

  return value ? [value] : [];
};

const serializeJsonLd = (value) => JSON.stringify(value).replace(/</g, '\\u003c');

const Seo = ({
  title,
  description = DEFAULT_META_DESCRIPTION,
  canonicalPath,
  image = DEFAULT_OG_IMAGE,
  imageAlt,
  type = 'website',
  robots = 'index, follow',
  keywords,
  schema,
  twitterCard = 'summary_large_image',
}) => {
  const location = useLocation();
  const { language } = useLanguage();
  const resolvedPath = normalizePath(canonicalPath || location.pathname || '/');
  const canonicalUrl = getCanonicalUrl(resolvedPath);
  const imageUrl = toAbsoluteUrl(image);
  const locale = LOCALE_BY_LANGUAGE[language] || LOCALE_BY_LANGUAGE.en;
  const jsonLdSchemas = toSchemaArray(schema);
  const googleBot =
    robots.startsWith('noindex') || robots.startsWith('none')
      ? robots
      : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

  return (
    <Helmet htmlAttributes={{ lang: language === 'es' ? 'es' : 'en' }}>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      <meta name="googlebot" content={googleBot} />
      {keywords ? <meta name="keywords" content={keywords} /> : null}
      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" hreflang="x-default" href={canonicalUrl} />
      <link rel="alternate" hreflang="en" href={canonicalUrl} />
      <link rel="alternate" hreflang="es" href={canonicalUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content={locale} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={imageAlt || title} />
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={imageAlt || title} />
      {jsonLdSchemas.map((item, index) => (
        <script key={`${canonicalUrl}-schema-${index}`} type="application/ld+json">
          {serializeJsonLd(item)}
        </script>
      ))}
    </Helmet>
  );
};

export default Seo;
