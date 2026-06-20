import { getCanonicalUrl } from '@/lib/siteSeo';
import Schedule from '@/views/Schedule';

const canonical = getCanonicalUrl('/schedule');

export const metadata = {
  title: 'Schedule a Consultation',
  description:
    'Schedule a free consultation with a MyHealth Haven health navigator to discuss your medical care options in Mexico.',
  alternates: {
    canonical,
    languages: { 'x-default': canonical, en: canonical, es: canonical },
  },
  openGraph: {
    title: 'Schedule a Consultation | MyHealth Haven',
    description: 'Schedule a free consultation with a MyHealth Haven health navigator.',
    url: canonical,
  },
};

export default function SchedulePage() {
  return <Schedule />;
}
