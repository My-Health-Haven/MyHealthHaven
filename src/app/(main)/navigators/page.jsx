import { getCanonicalUrl } from '@/lib/siteSeo';
import Navigators from '@/views/Navigators';

const canonical = getCanonicalUrl('/navigators');

export const metadata = {
  title: 'Health Navigators',
  description:
    'Meet our bilingual health navigators who guide U.S. patients through cross-border medical care in Mexico with personalized support.',
  alternates: {
    canonical,
    languages: { 'x-default': canonical, en: canonical, es: canonical },
  },
  openGraph: {
    title: 'Health Navigators | MyHealth Haven',
    description:
      'Meet our bilingual health navigators who guide U.S. patients through cross-border medical care in Mexico.',
    url: canonical,
  },
};

export default function NavigatorsPage() {
  return <Navigators />;
}
