import {
  DEFAULT_META_DESCRIPTION,
  SITE_ORIGIN,
  createFAQSchema,
  createServiceSchema,
  createWebPageSchema,
} from '@/lib/siteSeo';
import { HOME_FAQ_COUNT, translations } from '@/data/translations';
import Home from '@/views/Home';
import JsonLd from '@/components/JsonLd';

const HOME_TITLE = 'MyHealth Haven | Medical Care in Mexico for U.S. Patients';

export const metadata = {
  // No `title` here on purpose. The root layout's `title.template` appends
  // " | MyHealth Haven" to any title a page sets, which gave the home page a
  // doubled brand. Omitting it falls back to the root `title.default`, which is
  // used verbatim.
  description: DEFAULT_META_DESCRIPTION,
  alternates: {
    canonical: SITE_ORIGIN,
  },
  openGraph: {
    title: HOME_TITLE,
    description: DEFAULT_META_DESCRIPTION,
    url: SITE_ORIGIN,
    type: 'website',
  },
};

/*
 * The same questions FaqLedger puts on the page, read from the English copy it
 * reads. Google only honours FAQPage markup whose questions and answers are
 * visible on the page, so both sides have to come from one source; the Spanish
 * copy is a client-side language switch on this one URL, so the schema stays
 * English, as the indexed page is.
 */
const homeCopy = translations.en.home;
const faqItems = Array.from({ length: HOME_FAQ_COUNT }, (_, i) => ({
  question: homeCopy[`faq${i + 1}Q`],
  answer: homeCopy[`faq${i + 1}A`],
})).filter((item) => item.question && item.answer);

const homeSchemas = [
  createWebPageSchema({
    path: '/',
    name: HOME_TITLE,
    description: DEFAULT_META_DESCRIPTION,
  }),
  createServiceSchema({
    path: '/',
    name: 'Cross-Border Medical Navigation',
    description:
      'Bilingual concierge service that guides U.S. patients to trusted providers in Mexico, from estimate through post-procedure follow-up.',
    serviceType: 'Medical Travel Navigation',
  }),
  createFAQSchema(faqItems),
].filter(Boolean);

export default function HomePage() {
  return (
    <>
      <JsonLd data={homeSchemas} />
      <Home />
    </>
  );
}
