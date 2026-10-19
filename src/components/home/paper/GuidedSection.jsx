'use client';

import { Flag, Handshake, HeartHandshake, LockKeyhole } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import LinkNav from '@/components/home/LinkNav';
import { cls } from './paperStyles';
import { FilmWindow, Underlined } from './parts';

const ALT = {
  en: {
    worry: 'Illustration from the MyHealth Haven film: a patient sits alone on her sofa under a tangled cloud of worry.',
    guided: 'Illustration from the MyHealth Haven film: a Health Navigator lays out a written plan, a calendar and a phone for the patient, with the road to the hospital behind them.',
  },
  es: {
    worry: 'Ilustración de la película de MyHealth Haven: una paciente sola en su sofá bajo una nube enredada de preocupación.',
    guided: 'Ilustración de la película de MyHealth Haven: una Health Navigator le presenta a la paciente un plan escrito, un calendario y un teléfono, con el camino al hospital detrás.',
  },
};

/*
 * "Medical travel should not feel like a gamble": two rooms from the film side
 * by side. Left, the patient alone with the problems (grey maze tiles); right,
 * the guided plan with what MyHealth Haven does (the teal path). The four
 * "what you can expect" points carry the full feature copy, so nothing from
 * the old cards is lost. The trust row closes the sheet.
 */
export default function GuidedSection() {
  const { t, language, getLocalizedHomeContent } = useLanguage();
  const alt = ALT[language === 'es' ? 'es' : 'en'];
  const { problem, solution } = getLocalizedHomeContent();

  const problems = [t('home.unpredictableBills'), t('home.unclearCredentials'), t('home.languageBarriers')];
  const pillars = [
    { title: t('home.safetyTitle'), body: t('home.safetyBody') },
    { title: t('home.navigatorsTitle'), body: t('home.navigatorsBody') },
    { title: t('home.clarityTitle'), body: t('home.clarityBody') },
    { title: t('home.continuityTitle'), body: t('home.continuityBody') },
  ];
  const trust = [
    { Icon: Flag, title: t('home.trustUsFoundedTitle'), desc: t('home.trustUsFoundedDesc') },
    { Icon: Handshake, title: t('home.trustMexicoPartneredTitle'), desc: t('home.trustMexicoPartneredDesc') },
    { Icon: HeartHandshake, title: t('home.trustPatientFocusedTitle'), desc: t('home.trustPatientFocusedDesc') },
    { Icon: LockKeyhole, title: t('home.trustPrivateSecureTitle'), desc: t('home.trustPrivateSecureDesc') },
  ];

  return (
    <section aria-labelledby='hp-guided-title' className={`hp-sheet hp-kraft ${cls.pad}`}>
      <div className={cls.wrap}>
        <div data-reveal='rise' className='max-w-[46rem]'>
          <h2 id='hp-guided-title' className={cls.h2}>
            {t('home.whyGuidedTitlePrefix')}{' '}
            <Underlined>
              <span className='text-[#00796b]'>{t('home.whyGuidedTitleEmphasis')}</span>
            </Underlined>{' '}
            {t('home.whyGuidedTitleSuffix')}
          </h2>
          <p className={cls.lead}>{t('home.whyGuidedSubtitle')}</p>
        </div>

        <div className='mt-12 grid grid-cols-1 gap-14 lg:mt-16 lg:grid-cols-2 lg:gap-16'>
          <article aria-labelledby='hp-problem-title'>
            <div data-reveal='slot'>
              <FilmWindow src='/home/worry.webp' alt={alt.worry} sizes='(min-width: 1024px) 620px, 100vw' />
            </div>
            <h3 id='hp-problem-title' className={`${cls.h3} mt-8`}>
              {problem.title}
            </h3>
            <p className={`${cls.body} mt-3 max-w-[36rem]`}>{problem.desc}</p>
            <p className={`${cls.label} mt-7`}>{t('home.withoutGuidance')}</p>
            <div role='list' className='m-0 mt-4 flex list-none flex-col gap-3.5 p-0'>
              {problems.map((item, i) => (
                <div role='listitem' key={i} data-reveal='lay' style={{ '--i': i }} className='flex gap-3.5'>
                  <span aria-hidden='true' className='hp-tile' />
                  <span className={cls.body}>{item}</span>
                </div>
              ))}
            </div>
          </article>

          <article aria-labelledby='hp-solution-title'>
            <div data-reveal='slot' style={{ '--i': 1 }}>
              <FilmWindow src='/home/guided.webp' alt={alt.guided} sizes='(min-width: 1024px) 620px, 100vw' />
            </div>
            <h3 id='hp-solution-title' className={`${cls.h3} mt-8`}>
              {solution.title}
            </h3>
            <p className={`${cls.body} mt-3 max-w-[36rem]`}>{solution.desc}</p>
            <p className={`${cls.label} mt-7`}>{t('home.whatCanExpect')}</p>
            <div role='list' className='m-0 mt-4 grid list-none grid-cols-1 gap-x-8 gap-y-5 p-0 sm:grid-cols-2'>
              {pillars.map((item, i) => (
                <div role='listitem' key={i} data-reveal='lay' style={{ '--i': i }} className='flex gap-3.5'>
                  <span aria-hidden='true' className='hp-tile hp-tile-teal' />
                  <div>
                    <p className='m-0 font-semibold leading-[1.5] text-[#1b4560]'>
                      <LinkNav text={item.title} />
                    </p>
                    <p className={`${cls.body} mt-1`}>{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </div>

        <div role='list' className='m-0 mt-16 grid list-none grid-cols-1 gap-x-8 gap-y-6 border-0 border-t border-solid border-[rgba(27,69,96,0.16)] p-0 pt-9 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4'>
          {trust.map((item, i) => (
            <div role='listitem' key={i} data-reveal='rise' style={{ '--i': i }} className='flex gap-3.5'>
              <span className='grid size-10 shrink-0 place-items-center rounded-full bg-[rgba(0,121,107,0.1)] text-[#00796b]'>
                <item.Icon aria-hidden='true' className='size-5' />
              </span>
              <div>
                <p className='m-0 font-semibold text-[#1b4560]'>{item.title}</p>
                <p className='m-0 mt-0.5 text-[0.9375rem] leading-[1.5] text-[#3f5868]'>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
