'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowLeft, House } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import PaperPage from '@/components/paper/PaperPage';
import PageHero from '@/components/paper/PageHero';
import { cls } from '@/components/paper/paperStyles';

const ALT = {
  en: 'Illustration from the MyHealth Haven film: a patient waits, thinking of home.',
  es: 'Ilustración de la película de MyHealth Haven: una paciente espera y piensa en su casa.',
};

/*
 * The placeholder for a procedure's own page (/procedures/<slug>), as one calm
 * sheet of paper: the site's "coming soon" words beside the film's waiting
 * frame, the way home, and the way back to the procedures index. The sheet
 * fills the screen, as the old placeholder did.
 */
const ComingSoon = () => {
  const { t, language } = useLanguage();
  return (
    <PaperPage>
      <PageHero
        className='flex min-h-[calc(100svh-64px)] items-center lg:min-h-[calc(100svh-92px)]'
        emphasis={t('misc.comingSoon')}
        lead={t('misc.comingSoonDesc')}
        frame={{ src: '/pages/waiting.webp', alt: ALT[language] || ALT.en }}
      >
        <div className='flex flex-col gap-3 sm:flex-row sm:flex-wrap'>
          <Link href='/' className={cls.btnPrimary}>
            <House aria-hidden='true' className='size-5' />
            {t('misc.returnHome')}
          </Link>
          <Link href='/procedures' className={cls.btnOutline}>
            <ArrowLeft aria-hidden='true' className='size-5' />
            {t('navbar.procedures')}
          </Link>
        </div>
      </PageHero>
    </PaperPage>
  );
};

export default ComingSoon;
