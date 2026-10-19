'use client';

import Link from 'next/link';
import { CalendarDays } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import PageHero from '@/components/paper/PageHero';
import { cls } from '@/components/paper/paperStyles';
import { labelsFor } from './labels';

/* where the title's underlined second half starts, per language (the words are
   the site's own; only the line break and the felt underline are new) */
const EMPHASIS_FROM = { en: ' a structured', es: ' un recorrido' };

/*
 * The opening sheet: the film frame of the route from home to the hospital laid
 * out over a map, beside the title, the lead and the first step (/schedule).
 * As in the kit's hero, the underlined half starts its own line; each half is
 * balanced on its own so neither leaves a single word behind (the Spanish title
 * is long). The text column is a little wider than the kit default (.mt-hero).
 */
export default function TravelHero() {
  const { t, language } = useLanguage();
  const labels = labelsFor(language);
  const fullTitle = t('medicalTravelPage.title');
  const at = fullTitle.indexOf(EMPHASIS_FROM[language === 'es' ? 'es' : 'en']);
  const title =
    at > 0 ? (
      <>
        <span className='mt-bal'>{fullTitle.slice(0, at)}</span> <br />
        <span className='mt-bal'>
          <span className='hp-felt-text'>{fullTitle.slice(at + 1)}</span>
        </span>
      </>
    ) : (
      fullTitle
    );

  return (
    <PageHero
      id='mt-hero-title'
      className='mt-hero'
      title={title}
      lead={t('medicalTravelPage.subtitle')}
      frame={{
        src: '/pages/travel-map.webp',
        alt: labels.heroAlt,
        loading: 'eager',
        fetchPriority: 'high',
      }}
    >
      <Link href='/schedule' className={cls.btnPrimary}>
        <CalendarDays aria-hidden='true' className='size-5' />
        {t('medicalTravelPage.cta')}
      </Link>
    </PageHero>
  );
}
