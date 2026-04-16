import { getCanonicalUrl } from '@/lib/siteSeo';
import TermsOfUse from '@/views/TermsOfUse';

const canonical = getCanonicalUrl('/terms');

export const metadata = {
  title: 'Terms of Use',
  description:
    'MyHealth Haven terms of use. Read the terms and conditions governing your use of our website and services.',
  alternates: {
    canonical,
    languages: { 'x-default': canonical, en: canonical, es: canonical },
  },
  openGraph: {
    title: 'Terms of Use | MyHealth Haven',
    description: 'MyHealth Haven terms of use.',
    url: canonical,
  },
};

export default function TermsPage() {
  return <TermsOfUse />;
}
