import {
  getCanonicalUrl,
  createArticleSchema,
  createBreadcrumbSchema,
  createFAQSchema,
  DEFAULT_OG_IMAGE,
} from '@/lib/siteSeo';
import {
  getArticlesByCategory,
  getLibraryArticleBySlug,
  getLibraryArticlePath,
} from '@/data/libraryContent';
import ArticleDetail from '@/views/ArticleDetail';
import JsonLd from '@/components/JsonLd';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return getArticlesByCategory('getting-started').map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = getLibraryArticleBySlug(slug);
  if (!article) return {};

  const canonical = getCanonicalUrl(getLibraryArticlePath(article));
  const ogTitle = `${article.seoTitle} | MyHealth Haven`;
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
}

export default async function GettingStartedArticlePage({ params }) {
  const { slug } = await params;
  const article = getLibraryArticleBySlug(slug);
  if (!article) notFound();

  const path = getLibraryArticlePath(article);

  const schemas = [
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
      { name: article.category, path: '/library/getting-started' },
      { name: article.title, path },
    ]),
    createFAQSchema(article.faqs),
  ];

  return (
    <>
      <JsonLd data={schemas} />
      <ArticleDetail slug={slug} />
    </>
  );
}
