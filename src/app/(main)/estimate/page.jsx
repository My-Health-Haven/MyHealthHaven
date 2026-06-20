import { getCanonicalUrl, createContactPageSchema, createBreadcrumbSchema } from '@/lib/siteSeo';
import Estimate from '@/views/Estimate';
import JsonLd from '@/components/JsonLd';

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
    description: 'Get a free estimate for your medical procedure in Mexico.',
    url: canonical,
  },
};

const estimateSchemas = [
  createContactPageSchema({
    path: '/estimate',
    name: 'Free Estimate | MyHealth Haven',
    description:
      'Get a free estimate for your medical procedure in Mexico. Our health navigators will help you understand costs and plan your care.',
  }),
  createBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Free Estimate', path: '/estimate' },
  ]),
];

export default function EstimatePage() {
  return (
    <>
      <JsonLd data={estimateSchemas} />
      <Estimate />
    </>
  );
}
