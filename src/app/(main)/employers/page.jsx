import { getCanonicalUrl } from '@/lib/siteSeo';
import ForEmployers from '@/views/ForEmployers';

const canonical = getCanonicalUrl('/employers');

export const metadata = {
  title: 'For Employers',
  description:
    'Discover how MyHealth Haven helps employers offer affordable cross-border medical benefits to their employees.',
  alternates: {
    canonical,
    languages: { 'x-default': canonical, en: canonical, es: canonical },
  },
  openGraph: {
    title: 'For Employers | MyHealth Haven',
    description:
      'Discover how MyHealth Haven helps employers offer affordable cross-border medical benefits.',
    url: canonical,
  },
};

export default function EmployersPage() {
  return <ForEmployers />;
}
