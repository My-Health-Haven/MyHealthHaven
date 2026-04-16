import { getCanonicalUrl } from '@/lib/siteSeo';
import { LIBRARY_ARTICLES, getLibraryArticleBySlug } from '@/data/libraryContent';
import ArticleDetail from '@/views/ArticleDetail';

export function generateStaticParams() {
  return LIBRARY_ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = getLibraryArticleBySlug(slug);
  if (!article) return {};

  const canonical = getCanonicalUrl(`/library/${slug}`);

  return {
    title: article.title,
    description: article.summary,
    alternates: {
      canonical,
      languages: { 'x-default': canonical, en: canonical, es: canonical },
    },
    openGraph: {
      title: `${article.title} | MyHealth Haven`,
      description: article.summary,
      url: canonical,
      type: 'article',
    },
  };
}

export default async function ArticleDetailPage({ params }) {
  const { slug } = await params;
  return <ArticleDetail slug={slug} />;
}
