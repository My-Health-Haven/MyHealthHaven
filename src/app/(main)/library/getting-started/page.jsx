import { getCanonicalUrl, createCollectionPageSchema, createBreadcrumbSchema } from '@/lib/siteSeo';
import { LIBRARY_CATEGORY_DETAILS } from '@/data/libraryContent';
import LibraryCategory from '@/views/LibraryCategory';
import JsonLd from '@/components/JsonLd';

const details = LIBRARY_CATEGORY_DETAILS['getting-started'];
const canonical = getCanonicalUrl('/library/getting-started');

export const metadata = {
  title: details.name,
  description: details.description,
  alternates: {
    canonical,
    languages: { 'x-default': canonical, en: canonical, es: canonical },
  },
  openGraph: {
    title: `${details.name} | MyHealth Haven`,
    description: details.description,
    url: canonical,
  },
};

const gettingStartedSchemas = [
  createCollectionPageSchema({
    path: '/library/getting-started',
    name: `${details.name} | MyHealth Haven`,
    description: details.description,
  }),
  createBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Library', path: '/library' },
    { name: details.name, path: '/library/getting-started' },
  ]),
];

export default function GettingStartedPage() {
  return (
    <>
      <JsonLd data={gettingStartedSchemas} />
      <LibraryCategory categorySlug='getting-started' />
    </>
  );
}
