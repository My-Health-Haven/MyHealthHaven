'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { Play, X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import LinkNav from '@/components/home/LinkNav';
import { cls } from './paperStyles';
import { frameSrcSet } from './parts';

const COPY = {
  en: {
    play: 'Play the video Meet Your Health Navigator, 2 minutes 10 seconds',
    video: 'Meet Your Health Navigator, 2 minutes 10 seconds',
    close: 'Close the video',
  },
  es: {
    play: 'Reproducir el video Conozca a su Health Navigator, 2 minutos 10 segundos',
    video: 'Conozca a su Health Navigator, 2 minutos 10 segundos',
    close: 'Cerrar el video',
  },
};

/*
 * Meet your Health Navigators: one wide window on a cream sheet. The poster is
 * the Navigator from the brand film; Play swaps it for the site's own Navigator
 * video in the same 16:9 window (whole, with controls, nothing laid over it),
 * scrolled clear of the sticky header first, as in the hero. While it is not
 * playing, the window grows into place as it scrolls in.
 */
export default function NavigatorSection() {
  const { t, language } = useLanguage();
  const c = COPY[language === 'es' ? 'es' : 'en'];
  const [playing, setPlaying] = useState(false);
  const windowRef = useRef(null);
  const filmRef = useRef(null);
  const posterRef = useRef(null);

  const watch = () => {
    const win = windowRef.current;
    const film = filmRef.current;
    if (!win || !film) return;
    const header = document.querySelector('header');
    const headerBottom = header ? Math.max(0, header.getBoundingClientRect().bottom) : 0;
    /* the scroll-in growth scales the window from its bottom edge and is dropped
       once it plays, so measure the full-size window: bottom minus layout height */
    const rect = win.getBoundingClientRect();
    const top = rect.bottom - win.offsetHeight;
    if (top < headerBottom + 8 || rect.bottom > window.innerHeight) {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: window.scrollY + top - headerBottom - 12, behavior: reduce ? 'auto' : 'smooth' });
    }
    setPlaying(true);
    film.play().catch(() => {});
    /* the poster button that had focus is gone; hand focus to the playing film */
    window.requestAnimationFrame(() => film.focus({ preventScroll: true }));
  };

  const close = () => {
    filmRef.current?.pause();
    setPlaying(false);
    window.requestAnimationFrame(() => posterRef.current?.focus({ preventScroll: true }));
  };

  return (
    <section aria-labelledby='hp-nav-title' className={`hp-sheet hp-cream ${cls.pad}`}>
      <div className={cls.wrap}>
        <div data-reveal='rise' className='mx-auto max-w-[44rem] text-center'>
          <h2 id='hp-nav-title' className={`${cls.h2}`}>
            <LinkNav text={t('home.meetNavigatorsTitle')} />
          </h2>
          <p className={`${cls.lead} mx-auto`}>{t('home.meetNavigatorsSubtitle')}</p>
        </div>

        <div className='mx-auto mt-10 max-w-[1000px] lg:mt-14'>
          <div data-scrub className={playing ? '' : 'hp-scrub-grow'}>
            <div ref={windowRef} className={`hp-window ${playing ? 'is-playing' : ''}`}>
              <video
                ref={filmRef}
                className='hp-film'
                src='/Meet Your Health Navigator.mp4'
                preload='none'
                controls={playing}
                playsInline
                aria-label={c.video}
                aria-hidden={!playing}
                tabIndex={playing ? 0 : -1}
              />
              {playing ? null : (
                <button
                  ref={posterRef}
                  type='button'
                  onClick={watch}
                  aria-label={c.play}
                  className='absolute inset-0 block h-full w-full cursor-pointer border-0 bg-transparent p-0 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[-6px] focus-visible:outline-[#1b4560]'
                >
                  <img className='hp-still' src='/home/navigator.webp' srcSet={frameSrcSet('/home/navigator.webp')} sizes='(min-width: 1024px) 1000px, 100vw' alt='' width={1600} height={900} loading='lazy' decoding='async' />
                  <span className='hp-play-badge absolute left-3 top-3 inline-flex items-center gap-2.5 rounded-full bg-[rgba(255,255,255,0.92)] py-1.5 pl-1.5 pr-3.5 text-[0.9375rem] font-semibold text-[#1b4560] shadow-[0_4px_14px_-6px_rgba(70,50,30,0.45)] sm:left-4 sm:top-4 sm:py-2 sm:pl-2 sm:pr-4'>
                    <span className='grid size-8 place-items-center rounded-full bg-[#00796b] text-white sm:size-9'>
                      <Play aria-hidden='true' className='size-4 translate-x-[1px] fill-current' />
                    </span>
                    2:10
                  </span>
                </button>
              )}
              <span aria-hidden='true' className='hp-window-lip' />
            </div>
          </div>
          <div className='mt-2 flex min-h-11 items-center'>
            {playing ? (
              <button
                type='button'
                onClick={close}
                className='inline-flex min-h-11 items-center gap-2 rounded-full border-0 bg-transparent px-3 text-[0.9375rem] font-semibold text-[#1b4560] hover:bg-[rgba(27,69,96,0.08)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1b4560]'
              >
                <X aria-hidden='true' className='size-4' />
                {c.close}
              </button>
            ) : null}
          </div>
        </div>

        <div className='mt-4 text-center'>
          <Link href='/schedule' className={cls.btnOutline}>
            {t('home.seeHowNavigatorsWork')}
          </Link>
        </div>
      </div>
    </section>
  );
}
