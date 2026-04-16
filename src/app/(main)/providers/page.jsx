import { getCanonicalUrl } from '@/lib/siteSeo';
import ForProviders from '@/views/ForProviders';

const canonical = getCanonicalUrl('/providers');

export const metadata = {
  title: 'For Providers',
  description:
    'Partner with MyHealth Haven to connect with U.S. patients seeking quality, affordable medical care in Mexico.',
  alternates: {
    canonical,
    languages: { 'x-default': canonical, en: canonical, es: canonical },
  },
  openGraph: {
    title: 'For Providers | MyHealth Haven',
    description:
      'Partner with MyHealth Haven to connect with U.S. patients seeking medical care in Mexico.',
    url: canonical,
  },
};

export default function ProvidersPage() {
  return <ForProviders />;
}
