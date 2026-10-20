'use client';

import Link from 'next/link';
import { CalendarDays } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import Sheet from '@/components/paper/Sheet';
import { cls } from '@/components/paper/paperStyles';
import { FilmWindow } from '@/components/paper/parts';
import { labelsFor } from './labels';

/*
 * The last word: the timeline's conclusion beside the film frame of the patient
 * and her Health Navigator walking through the hospital together, and the old
 * page's closing button to /schedule. Picture left, words right, as the home
 * closing; the frame settles from a slight zoom as it scrolls in.
 */
export default function JourneyClose() {
  const { t, language } = useLanguage();
  const labels = labelsFor(language);

  return (
    <Sheet
      tone='kraft'
      labelledBy='mt-close-title'
      innerClassName='grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16'
    >
      <div data-scrub className='hp-scrub-zoom'>
        <div data-reveal='slot'>
          <FilmWindow
            src='/pages/travel-walk.webp'
            alt={labels.walkAlt}
            sizes='(min-width: 1024px) 680px, 100vw'
          />
        </div>
      </div>

      <div data-reveal='rise'>
        <h2 id='mt-close-title' className={cls.h2}>
          {t('medicalTravelPage.timelineConclusion.title')}
        </h2>
        <p className='mb-0 mt-5 font-[family-name:var(--font-hh-display)] text-[1.5rem] leading-[1.35] text-[#1b4560] sm:text-[1.75rem]'>
          <span className='hp-felt-text hp-felt-lines'>{t('medicalTravelPage.timelineConclusion.subtitle')}</span>
        </p>
        <p className={`${cls.lead} mt-6`}>
          {t('medicalTravelPage.timelineConclusion.description')}
        </p>
        <div className='mt-9'>
          <Link href='/schedule' className={cls.btnPrimary}>
            <CalendarDays aria-hidden='true' className='size-5' />
            {t('schedulePage.title')}
          </Link>
        </div>
      </div>
    </Sheet>
  );
}
