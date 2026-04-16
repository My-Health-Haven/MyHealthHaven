import { getCanonicalUrl } from '@/lib/siteSeo';
import Estimate from '@/views/Estimate';

const canonical = getCanonicalUrl('/estimate');

export const metadata = {
  title: 'Free Estimate',
  description:
    'Get a free estimate for your medical procedure in Mexico. Our health navigators will help you understand costs and plan your care.',
  alternates: {
    canonical,
    languages: { 'x-default': canonical, en: canonical, es: canonical },
  },
  openGraph: {
    title: 'Free Estimate | MyHealth Haven',
    description:
      'Get a free estimate for your medical procedure in Mexico.',
    url: canonical,
  },
};

export default function EstimatePage() {
  return <Estimate />;
}
