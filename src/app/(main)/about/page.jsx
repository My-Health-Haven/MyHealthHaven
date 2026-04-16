import { getCanonicalUrl } from '@/lib/siteSeo';
import About from '@/views/About';

const canonical = getCanonicalUrl('/about');

export const metadata = {
  title: 'About Us',
  description:
    'Learn about MyHealth Haven — our mission to help U.S. patients navigate trusted medical care in Mexico with transparency and bilingual support.',
  alternates: {
    canonical,
    languages: { 'x-default': canonical, en: canonical, es: canonical },
  },
  openGraph: {
    title: 'About Us | MyHealth Haven',
    description:
      'Learn about MyHealth Haven and our mission to help U.S. patients navigate trusted medical care in Mexico.',
    url: canonical,
  },
};

export default function AboutPage() {
  return <About />;
}
