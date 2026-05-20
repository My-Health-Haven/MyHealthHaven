import {
  SITE_ORIGIN,
  createWebPageSchema,
  createServiceSchema,
} from '@/lib/siteSeo';
import Home from '@/views/Home';
import JsonLd from '@/components/JsonLd';

export const metadata = {
  title: 'MyHealth Haven | Health Navigation Between the U.S. and Mexico',
  description:
    'MyHealth Haven helps U.S. patients navigate trusted medical care in Mexico with bilingual support, transparent planning, and continuity before and after treatment.',
  alternates: {
    canonical: SITE_ORIGIN,
    languages: { 'x-default': SITE_ORIGIN, en: SITE_ORIGIN, es: SITE_ORIGIN },
  },
  openGraph: {
    title: 'MyHealth Haven | Health Navigation Between the U.S. and Mexico',
    description:
      'MyHealth Haven helps U.S. patients navigate trusted medical care in Mexico with bilingual support, transparent planning, and continuity before and after treatment.',
    url: SITE_ORIGIN,
    type: 'website',
  },
};

const homeSchemas = [
  createWebPageSchema({
    path: '/',
    name: 'MyHealth Haven | Health Navigation Between the U.S. and Mexico',
    description:
      'MyHealth Haven helps U.S. patients navigate trusted medical care in Mexico with bilingual support, transparent planning, and continuity before and after treatment.',
  }),
  createServiceSchema({
    path: '/',
    name: 'Cross-Border Medical Navigation',
    description:
      'Bilingual concierge service that guides U.S. patients to trusted providers in Mexico, from estimate through post-procedure follow-up.',
    serviceType: 'Medical Travel Navigation',
  }),
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={homeSchemas} />
      <Home />
    </>
  );
}
