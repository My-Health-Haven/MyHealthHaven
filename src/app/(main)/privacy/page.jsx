import { getCanonicalUrl } from '@/lib/siteSeo';
import PrivacyPolicy from '@/views/PrivacyPolicy';

const canonical = getCanonicalUrl('/privacy');

export const metadata = {
  title: 'Privacy Policy',
  description:
    'MyHealth Haven privacy policy. Learn how we collect, use, and protect your personal information.',
  alternates: {
    canonical,
  },
  openGraph: {
    title: 'Privacy Policy | MyHealth Haven',
    description: 'MyHealth Haven privacy policy.',
    url: canonical,
  },
};

export default function PrivacyPage() {
  return <PrivacyPolicy />;
}
