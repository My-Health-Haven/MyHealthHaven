import { SITE_ORIGIN } from '@/lib/siteSeo';
import Home from '@/views/Home';

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

export default function HomePage() {
  return <Home />;
}
