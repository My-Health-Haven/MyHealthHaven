'use client';

import Link from 'next/link';
import { CalendarDays, Mail } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import LinkNav from '@/components/home/LinkNav';
import { cls } from '@/components/paper/paperStyles';
import { FilmWindow } from '@/components/paper/parts';

const ALT = {
  en: 'Illustration from the MyHealth Haven film: the patient hugs her Health Navigator, back home after her care.',
  es: 'Ilustración de la película de MyHealth Haven: la paciente abraza a su Health Navigator, ya en casa después de su atención.',
};

/*
 * The last word: the film's closing hug beside the two ways to start. The
 * window is the hero's mirror (picture left, words right), and the frame
 * settles from a slight zoom as it scrolls in.
 */
export default function ClosingSection() {
  const { t, language } = useLanguage();

  return (
    <section aria-labelledby='hp-close-title' className={`hp-sheet hp-cream ${cls.pad}`}>
      <div className={`${cls.wrap} grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16`}>
        <div data-scrub className='hp-scrub-zoom'>
          <div data-reveal='slot'>
            <FilmWindow src='/home/closing.webp' alt={ALT[language === 'es' ? 'es' : 'en']} sizes='(min-width: 1024px) 680px, 100vw' />
          </div>
        </div>

        <div data-reveal='rise'>
          <h2 id='hp-close-title' className={`${cls.h2}`}>
            <LinkNav text={t('home.ctaTitle')} />
          </h2>
          <p className={cls.lead}>{t('home.ctaDesc')}</p>
          <div className='mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap'>
            <Link href='/schedule' className={`${cls.btnPrimary} lg:px-5 lg:text-[1rem]`}>
              <CalendarDays aria-hidden='true' className='size-5' />
              {t('home.scheduleConsultation')}
            </Link>
            <Link href='/estimate' className={`${cls.btnOutline} lg:px-5 lg:text-[1rem]`}>
              <Mail aria-hidden='true' className='size-5' />
              {t('home.getEstimate')}
            </Link>
          </div>
          <p className='mb-0 mt-10 border-0 border-t border-solid border-[rgba(27,69,96,0.16)] pt-6 font-[family-name:var(--font-hh-display)] text-[1.25rem] leading-[1.35] text-[#1b4560]'>
            {t('home.ctaBadge')}
          </p>
        </div>
      </div>
    </section>
  );
}
