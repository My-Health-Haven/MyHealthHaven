import { getCanonicalUrl } from '@/lib/siteSeo';
import Procedures from '@/views/Procedures';

const canonical = getCanonicalUrl('/procedures');

export const metadata = {
  title: 'Medical Procedures',
  description:
    'Browse medical procedures available through MyHealth Haven. Compare options for surgery, dental, cosmetic, and diagnostic care in Mexico.',
  alternates: {
    canonical,
    languages: { 'x-default': canonical, en: canonical, es: canonical },
  },
  openGraph: {
    title: 'Medical Procedures | MyHealth Haven',
    description:
      'Browse medical procedures available through MyHealth Haven in Mexico.',
    url: canonical,
  },
};

export default function ProceduresPage() {
  return <Procedures />;
}
