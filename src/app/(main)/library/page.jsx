import {
  getCanonicalUrl,
  createCollectionPageSchema,
  createBreadcrumbSchema,
} from '@/lib/siteSeo';
import Library from '@/views/Library';
import JsonLd from '@/components/JsonLd';

const canonical = getCanonicalUrl('/library');

export const metadata = {
  title: 'Learning Library',
  description:
    'Articles and guides about medical travel, cross-border healthcare, and navigating medical options in Mexico.',
  alternates: {
    canonical,
    languages: { 'x-default': canonical, en: canonical, es: canonical },
  },
  openGraph: {
    title: 'Learning Library | MyHealth Haven',
    description:
      'Articles and guides about medical travel and cross-border healthcare.',
    url: canonical,
  },
};

const librarySchemas = [
  createCollectionPageSchema({
    path: '/library',
    name: 'Learning Library | MyHealth Haven',
    description:
      'Articles and guides about medical travel, cross-border healthcare, and navigating medical options in Mexico.',
  }),
  createBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Library', path: '/library' },
  ]),
];

export default function LibraryPage() {
  return (
    <>
      <JsonLd data={librarySchemas} />
      <Library />
    </>
  );
}
