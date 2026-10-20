'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowLeft, House } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import PaperPage from '@/components/paper/PaperPage';
import PageHero from '@/components/paper/PageHero';
import { cls } from '@/components/paper/paperStyles';

/* UI labels and alt text only */
const UI = {
  en: {
    back: 'Back to Procedures',
    alt: 'Illustration from the MyHealth Haven film: a Health Navigator lays out the pieces of a care plan on a table.',
  },
  es: {
    back: 'Volver a Procedimientos',
    alt: 'Ilustración de la película de MyHealth Haven: una Health Navigator acomoda sobre una mesa las piezas de un plan de atención.',
  },
};

/*
 * The placeholder for a procedure's own page (/procedures/<slug>), as one calm
 * sheet of paper: the site's "coming soon" words beside the film's quiet, ready
 * treatment room, the way home, and the way back to the procedures index. The
 * sheet fills the screen, as the old placeholder did.
 */
const ComingSoon = () => {
  const { t, language } = useLanguage();
  const ui = UI[language] || UI.en;
  return (
    <PaperPage>
      <PageHero
        className='flex min-h-[calc(100svh-64px)] items-center lg:min-h-[calc(100svh-92px)]'
        emphasis={t('misc.comingSoon')}
        lead={t('misc.comingSoonDesc')}
        frame={{ src: '/pages/coming-plan.webp', alt: ui.alt }}
      >
        <div className='flex flex-col gap-3 sm:flex-row sm:flex-wrap'>
          <Link href='/' className={cls.btnPrimary}>
            <House aria-hidden='true' className='size-5' />
            {t('misc.returnHome')}
          </Link>
          <Link href='/procedures' className={cls.btnOutline}>
            <ArrowLeft aria-hidden='true' className='size-5' />
            {ui.back}
          </Link>
        </div>
      </PageHero>
    </PaperPage>
  );
};

export default ComingSoon;
