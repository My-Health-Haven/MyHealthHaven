import {
  getCanonicalUrl,
  createArticleSchema,
  createBreadcrumbSchema,
  createFAQSchema,
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

  return {
    title: article.seoTitle,
    description: article.seoDescription,
    alternates: {
      canonical,
      languages: { 'x-default': canonical, en: canonical, es: canonical },
    },
    openGraph: {
      title: `${article.seoTitle} | MyHealth Haven`,
      description: article.seoDescription,
      url: canonical,
      type: 'article',
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
      dateModified: article.updatedDate || undefined,
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
