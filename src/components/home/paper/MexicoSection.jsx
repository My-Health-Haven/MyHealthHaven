'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { cls, noArrow } from './paperStyles';

const COPY = {
  en: { bilingual: 'Bilingual', photo: 'Aerial photo of Cancún, with the lagoon behind the city.' },
  es: { bilingual: 'Bilingüe', photo: 'Foto aérea de Cancún, con la laguna detrás de la ciudad.' },
};

/*
 * Why Mexico: the one navy sheet on the page. The words sit left, the Cancún
 * photo arrives as a postcard dropped on the sheet, and the three figures run
 * along the bottom. 30–60% counts up once when it scrolls in (motion allowed
 * only); the server HTML and reduced motion always show the real figure.
 */
export default function MexicoSection() {
  const { t, language } = useLanguage();
  const c = COPY[language === 'es' ? 'es' : 'en'];
  const savingsRef = useRef(null);

  useEffect(() => {
    const el = savingsRef.current;
    if (!el || !('IntersectionObserver' in window)) return undefined;
    if (!window.matchMedia('(prefers-reduced-motion: no-preference)').matches) return undefined;
    if (el.getBoundingClientRect().top < window.innerHeight) return undefined;
    const write = (a, b) => {
      el.textContent = `${a}–${b}%`;
    };
    write(0, 0);
    let frame = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now) => {
          const k = Math.min(1, (now - start) / 1400);
          const e = 1 - (1 - k) ** 3;
          write(Math.round(30 * e), Math.round(60 * e));
          if (k < 1) frame = window.requestAnimationFrame(tick);
        };
        frame = window.requestAnimationFrame(tick);
      },
      { rootMargin: '0px 0px -12% 0px' }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.cancelAnimationFrame(frame);
      write(30, 60);
    };
  }, []);

  const points = [t('home.whyMexicoPoint1'), t('home.whyMexicoPoint2'), t('home.whyMexicoPoint3')];
  const stats = [
    { value: '30–60%', label: t('home.costEfficiency'), desc: t('home.costEfficiencyDesc'), ref: savingsRef },
    { value: c.bilingual, label: t('home.languageAccess'), desc: t('home.languageAccessDesc') },
    { value: 'Cancún +', label: t('home.supportCities'), desc: t('home.supportCitiesDesc') },
  ];

  return (
    <section aria-labelledby='hp-mexico-title' className={`hp-sheet hp-navy ${cls.pad}`}>
      <div className={cls.wrap}>
        <div className='grid grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-20'>
          <div data-reveal='rise'>
            <h2 id='hp-mexico-title' className={`${cls.h2} text-[#f4eee5]`}>
              {t('home.whyMexicoTitle')}
            </h2>
            <p className='mb-0 mt-4 font-[family-name:var(--font-hh-display)] text-[1.3125rem] leading-[1.35] text-[#9fdcdc] sm:text-[1.5rem]'>
              {t('home.whyMexicoSubtitle')}
            </p>
            <p className='mb-0 mt-6 max-w-[38rem] text-[1.0625rem] leading-[1.65] text-[#d3dde2]'>{t('home.whyMexicoDesc1')}</p>
            <p className='mb-0 mt-4 max-w-[38rem] text-[1.0625rem] leading-[1.65] text-[#d3dde2]'>{t('home.whyMexicoDesc2')}</p>
            <div role='list' className='m-0 mt-7 flex list-none flex-col gap-3 p-0'>
              {points.map((point, i) => (
                <div role='listitem' key={i} data-reveal='lay' style={{ '--i': i }} className='flex gap-3.5'>
                  <span aria-hidden='true' className='hp-tile hp-tile-teal' />
                  <span className='text-[1rem] font-medium leading-[1.6] text-[#f4eee5]'>{point}</span>
                </div>
              ))}
            </div>
            <Link
              href='/medical-travel'
              className='hp-btn mt-9 inline-flex min-h-[54px] items-center justify-center gap-2.5 rounded-full border-2 border-solid border-transparent bg-[#f4eee5] px-6 [&>svg]:shrink-0 text-[1.0625rem] font-semibold text-[#1b4560] no-underline hover:bg-white focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#f4eee5]'
            >
              {noArrow(t('home.learnMedicalTravel'))}
              <ArrowRight aria-hidden='true' className='size-5' />
            </Link>
          </div>

          <div data-reveal='card' className='mx-auto w-full max-w-[540px] lg:mr-0'>
            <figure className='hp-postcard m-0 rounded-[4px] p-3 pb-4 sm:p-4 sm:pb-5'>
              <div className='relative aspect-[4/3] overflow-hidden rounded-[2px]'>
                <img src='/home/cancun-1024.webp' srcSet='/home/cancun-640.webp 640w, /home/cancun-1024.webp 1024w' sizes='(min-width: 1024px) 520px, 92vw' alt={c.photo} width={1024} height={796} loading='lazy' decoding='async' className='absolute inset-0 h-full w-full object-cover' />
              </div>
              <figcaption className='mt-3 px-1 font-[family-name:var(--font-hh-display)] text-[1.375rem] leading-none text-[#1b4560]'>Cancún</figcaption>
            </figure>
          </div>
        </div>

        <div role='list' className='m-0 mt-16 grid list-none grid-cols-1 gap-x-10 gap-y-9 border-0 border-t border-solid border-[rgba(244,238,229,0.2)] p-0 pt-10 sm:grid-cols-3 lg:mt-20'>
          {stats.map((stat, i) => (
            <div role='listitem' key={i} data-reveal='rise' style={{ '--i': i }}>
              <p className='m-0 font-[family-name:var(--font-hh-display)] text-[2.5rem] leading-none text-[#f4eee5] [font-variant-numeric:lining-nums_tabular-nums] lg:text-[3rem]'>
                {stat.ref ? (
                  <>
                    {/* the count runs in the hidden copy; assistive tech always reads the real figure */}
                    <span ref={stat.ref} aria-hidden='true'>
                      {stat.value}
                    </span>
                    <span className='sr-only'>{stat.value}</span>
                  </>
                ) : (
                  stat.value
                )}
              </p>
              <p className='m-0 mt-3 font-semibold text-[#f4eee5]'>{stat.label}</p>
              <p className='m-0 mt-1 text-[0.9375rem] leading-[1.5] text-[#c6d3da]'>{stat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
