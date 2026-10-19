'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { CalendarDays } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import LinkNav from '@/components/home/LinkNav';
import { cls, noArrow } from './paperStyles';
import { FilmWindow, frameSrcSet } from './parts';

const FRAMES = [
  {
    src: '/home/step-call.webp',
    alt: {
      en: 'Illustration from the MyHealth Haven film: the patient talks with her Health Navigator on a video call from home.',
      es: 'Ilustración de la película de MyHealth Haven: la paciente habla con su Health Navigator por videollamada desde casa.',
    },
  },
  {
    src: '/home/step-plan.webp',
    alt: {
      en: 'Illustration from the MyHealth Haven film: the Health Navigator lays out the care plan, with the folder, calendar, hospital, home and map joined by one path.',
      es: 'Ilustración de la película de MyHealth Haven: la Health Navigator arma el plan de atención, con la carpeta, el calendario, el hospital, la casa y el mapa unidos por un solo camino.',
    },
  },
  {
    src: '/home/step-travel.webp',
    alt: {
      en: 'Illustration from the MyHealth Haven film: the patient and her Health Navigator walk into the hospital together.',
      es: 'Ilustración de la película de MyHealth Haven: la paciente y su Health Navigator entran juntas al hospital.',
    },
  },
];

/*
 * How it works, told the way the film tells it. On desktop the film window is
 * pinned beside the three steps and changes frame with the step that crosses
 * the middle of the screen (a cross-fade; instant with reduced motion); that
 * step sits on a paper card. On phones and tablets each step carries its own
 * frame, so nothing depends on the pinned window.
 */
export default function StepsSection() {
  const { t, language } = useLanguage();
  const lang = language === 'es' ? 'es' : 'en';
  const [active, setActive] = useState(0);
  const stepRefs = useRef([]);

  /* the active step is the one whose middle is nearest the reading line (45% down
     the screen), read from scroll position so a fast fling or a jump never skips
     a step and each step holds the window for a fair stretch of scrolling */
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      /* capped so a tall screen does not light step 2 before step 1 has been read */
      const line = Math.min(window.innerHeight * 0.45, 405);
      let next = 0;
      let best = Infinity;
      stepRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const d = Math.abs(r.top + r.height / 2 - line);
        if (d < best) {
          best = d;
          next = i;
        }
      });
      setActive(next);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const steps = [1, 2, 3].map((n) => ({ title: t(`home.step${n}Title`), body: t(`home.step${n}Body`) }));

  return (
    <section id='how-it-works' aria-labelledby='hp-steps-title' className={`hp-sheet hp-cream ${cls.pad}`}>
      <div className={`${cls.wrap} grid grid-cols-1 gap-x-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]`}>
        <div>
          <div data-reveal='rise'>
            <h2 id='hp-steps-title' className={cls.h2}>
              {t('home.howItWorksTitle')}
            </h2>
            <p className={cls.lead}>{t('home.howItWorksSubtitle')}</p>
          </div>

          <div role='list' className='m-0 mt-8 flex list-none flex-col gap-10 p-0 lg:mt-9 lg:gap-3'>
            {steps.map((step, i) => (
              <div role='listitem'
                key={i}
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
                data-step={i}
              >
                {/* tablets: the frame stays text-width and lines up with the step's text */}
                <div data-reveal='slot' className='mb-6 md:ml-12 md:max-w-[30rem] lg:hidden'>
                  <FilmWindow src={FRAMES[i].src} alt={FRAMES[i].alt[lang]} sizes='(min-width: 1024px) 1px, 100vw' />
                </div>
                {/* desktop: the step in view sits on a paper card; the others stay on the sheet */}
                <div data-reveal='rise'>
                  <div className={`hp-step ${active === i ? 'hp-step-on' : ''} grid grid-cols-[2.25rem_minmax(0,1fr)] items-baseline gap-x-3 rounded-[12px] lg:-mx-7 lg:grid-cols-[2.5rem_minmax(0,1fr)] lg:px-7 lg:py-6`}>
                    <span className='hp-step-num font-[family-name:var(--font-hh-display)] text-[1.75rem] leading-none [font-variant-numeric:lining-nums]'>
                      <span className='sr-only'>{t('home.step')} </span>
                      {i + 1}
                    </span>
                    <div>
                      <h3 className={cls.h3}>
                        <LinkNav text={step.title} />
                      </h3>
                      <p className={`${cls.body} mt-2.5 max-w-[30rem] sm:text-[1.0625rem]`}>{step.body}</p>
                      {i === 0 ? (
                        <Link href='/schedule' className={`${cls.btnPrimary} mt-5`}>
                          <CalendarDays aria-hidden='true' className='size-5' />
                          {noArrow(t('home.scheduleCall'))}
                        </Link>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='hidden lg:block'>
          <div data-reveal='slot' className='sticky top-[132px] pt-2'>
            <div className='hp-window'>
              {FRAMES.map((frame, i) => (
                <div key={frame.src} className={`hp-story-frame ${active === i ? 'hp-frame-on' : ''}`} aria-hidden={active !== i}>
                  <img className='hp-still' src={frame.src} srcSet={frameSrcSet(frame.src)} sizes='(min-width: 1024px) 700px, 1px' alt={frame.alt[lang]} width={1600} height={900} loading='lazy' decoding='async' />
                </div>
              ))}
              <span aria-hidden='true' className='hp-window-lip' />
            </div>
            <div aria-hidden='true' className='hp-progress mt-6 flex gap-2'>
              {FRAMES.map((frame, i) => (
                <span key={frame.src} className={`h-1.5 flex-1 rounded-full ${i <= active ? 'bg-[#2fa8b0]' : 'bg-[rgba(27,69,96,0.14)]'}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
