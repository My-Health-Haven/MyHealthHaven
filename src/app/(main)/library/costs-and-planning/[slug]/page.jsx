import {
  buildArticleMetadata,
  buildArticleSchemas,
  buildCategoryParams,
  getCategoryArticle,
} from '@/lib/libraryPages';
import ArticleDetail from '@/views/ArticleDetail';
import JsonLd from '@/components/JsonLd';
import { notFound } from 'next/navigation';

const CATEGORY_SLUG = 'costs-and-planning';

// Articles are published at build time, so only the slugs below are valid
// routes. Anything else returns a real 404 instead of a soft 404 (HTTP 200 with
// not-found content), which search engines can otherwise index as a thin page.
export const dynamicParams = false;

export function generateStaticParams() {
  return buildCategoryParams(CATEGORY_SLUG);
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return buildArticleMetadata(CATEGORY_SLUG, slug);
}

export default async function CostsAndPlanningArticlePage({ params }) {
  const { slug } = await params;
  if (!getCategoryArticle(CATEGORY_SLUG, slug)) notFound();

  return (
    <>
      <JsonLd data={buildArticleSchemas(CATEGORY_SLUG, slug)} />
      <ArticleDetail slug={slug} />
    </>
  );
}
