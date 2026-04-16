import { getCanonicalUrl } from '@/lib/siteSeo';
import MedicalTravel from '@/views/MedicalTravel';

const canonical = getCanonicalUrl('/medical-travel');

export const metadata = {
  title: 'Medical Travel Guide',
  description:
    'Everything you need to know about traveling to Mexico for medical care. Guided cross-border healthcare from planning to recovery.',
  alternates: {
    canonical,
    languages: { 'x-default': canonical, en: canonical, es: canonical },
  },
  openGraph: {
    title: 'Medical Travel Guide | MyHealth Haven',
    description:
      'Everything you need to know about traveling to Mexico for medical care.',
    url: canonical,
  },
};

export default function MedicalTravelPage() {
  return <MedicalTravel />;
}
