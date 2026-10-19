'use client';

import Link from 'next/link';
import { CalendarDays, Plus } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { cls } from '@/components/paper/paperStyles';

const FAQ_COUNT = 13;

/*
 * Frequently asked questions: the heading and a way to ask a person stay pinned
 * on the left on desktop; the thirteen answers are native <details>, so they
 * open with a keyboard, a screen reader and no JavaScript.
 */
export default function FaqLedger() {
  const { t } = useLanguage();
  const faqs = Array.from({ length: FAQ_COUNT }, (_, i) => ({ q: t(`home.faq${i + 1}Q`), a: t(`home.faq${i + 1}A`) }));

  return (
    <section id='faq' aria-labelledby='hp-faq-title' className={`hp-sheet hp-kraft ${cls.pad}`}>
      <div className={`${cls.wrap} grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-20`}>
        <div>
          <div data-reveal='rise' className='lg:sticky lg:top-[132px]'>
            <h2 id='hp-faq-title' className={cls.h2}>
              {t('home.faqTitle')}
            </h2>
            <p className={cls.lead}>{t('home.faqSubtitle')}</p>
            <Link href='/schedule' className={`${cls.btnOutline} mt-8`}>
              <CalendarDays aria-hidden='true' className='size-5' />
              {t('home.scheduleConsultation')}
            </Link>
          </div>
        </div>

        <div className='hp-faq border-0 border-t border-solid border-[rgba(27,69,96,0.2)]'>
          {faqs.map((faq, i) => (
            <details key={i} data-reveal='rise' className='border-0 border-b border-solid border-[rgba(27,69,96,0.2)]'>
              <summary className='flex cursor-pointer items-start justify-between gap-6 rounded-[4px] py-5 text-[1.0625rem] font-semibold leading-[1.45] text-[#1b4560] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1b4560]'>
                <span>{faq.q}</span>
                <span aria-hidden='true' className='hp-faq-icon mt-[-2px] grid size-8 shrink-0 place-items-center rounded-full bg-[rgba(0,121,107,0.1)] text-[#00796b]'>
                  <Plus className='size-4' />
                </span>
              </summary>
              <p className={`${cls.body} max-w-[38rem] pb-6 pr-0 sm:pr-14`}>{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
