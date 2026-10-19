'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, BadgeDollarSign, CalendarDays, Play, X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { display } from '@/components/paper/fonts';

/*
 * Maze hero (prototype, branch redesign/without-the-maze-hero). The headline is
 * the brand's tagline, "Made in America, Made Better in Mexico."
 *
 * The page borrows the world of the brand's own film (public/my-health-haven.mp4,
 * 1:52): cream paper, felt-cut shapes, a patient lost in a maze of gray paths
 * and a guide who finds the one teal path to the hospital. The two stills in
 * public/hero/ come from ONE fixed shot of that film (0:56.5, the maze; 0:58.5,
 * the path drawn), so the soft left-to-right reveal on load never doubles the
 * picture: only the path appears, and the guide turns her head, as in the film.
 *
 * The film always plays whole: Watch swaps the stills for the video in the same
 * exact 16:9 window, with sound and controls, and nothing laid over it. The
 * video element is in the page from the start so play() runs inside the click
 * (iOS needs that for sound), and the window scrolls into view below the
 * sticky header before it plays.
 *
 * Colours are the logo's and the site theme's: ink is the logo's navy cross
 * (#215675, darkened to #1b4560 for text), the button is the theme teal one
 * step deeper (#00796b, white text 5.4:1), the felt path is the logo's teal
 * (#2fa8b0), the accent is the theme purple (#8e24aa). Fonts: Young Serif for
 * the headline only, the site's Inter for everything else.
 */

const COPY = {
  /* the brand's own tagline (translations home.madeInAmerica), set as two parallel lines */
  en: {
    before: 'Made in America,',
    emphasis: 'Made Better in Mexico.',
    sub: 'Accredited hospitals, all-in estimates, and a bilingual Health Navigator™ with you from your first call to your recovery at home.',
    primary: 'Schedule a free consultation',
    watch: 'Watch the story',
    playStill: 'Play the MyHealth Haven story, 1 minute 52 seconds',
    close: 'Close the video',
    savings: '30–60% below U.S. list prices',
    estimate: 'Get a free cost estimate',
    still: 'Illustration from the MyHealth Haven film: a guide shows a patient the one clear path through a maze to the hospital.',
    video: 'The MyHealth Haven story, 1 minute 52 seconds',
  },
  es: {
    before: 'Hecho en América,',
    emphasis: 'Mejorado en México.',
    /* "usted", like the rest of the site's Spanish */
    sub: 'Hospitales acreditados, presupuestos con todo incluido y un Health Navigator™ bilingüe con usted desde su primera llamada hasta su recuperación en casa.',
    primary: 'Agende una consulta gratis',
    watch: 'Vea la historia',
    playStill: 'Reproducir la historia de MyHealth Haven, 1 minuto 52 segundos',
    close: 'Cerrar el video',
    savings: '30–60% menos que los precios de lista en EE. UU.',
    estimate: 'Pida su presupuesto gratis',
    still: 'Ilustración de la película de MyHealth Haven: una guía le muestra a una paciente el único camino claro del laberinto hasta el hospital.',
    video: 'La historia de MyHealth Haven, 1 minuto 52 segundos',
  },
};

const HERO_CSS = `
.hh-hero { --hh-paper: #f4eee5; background-color: var(--hh-paper); background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 .45 0 0 0 0 .38 0 0 0 0 .3 0 0 0 .06 0'/%3E%3C/filter%3E%3Crect width='240' height='240' filter='url(%23n)'/%3E%3C/svg%3E"); }
/* a window cut into the paper: the film sits one layer down, lit from the top left;
   a warm shade inside the top and left cut, a lighter paper lip on the bottom edge, no floating shadow */
.hh-window { position: relative; aspect-ratio: 16 / 9; border-radius: 10px; overflow: hidden; background: #d1c5b4; }
.hh-window::after { content: ""; position: absolute; inset: 0; border-radius: inherit; pointer-events: none;
  box-shadow: inset 4px 5px 9px -2px rgba(70,50,30,0.38), inset 0 0 0 1px rgba(70,50,30,0.16), inset 0 -2px 0 rgba(255,250,240,0.55); }
.hh-window-lip { position: absolute; left: 6px; right: 6px; bottom: -3px; height: 3px; border-radius: 0 0 8px 8px; background: rgba(255,252,246,0.85); }
.hh-window.is-playing::after { display: none; }
.hh-still { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.hh-film { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain; background: #000; visibility: hidden; }
.hh-window.is-playing .hh-film { visibility: visible; }
.hh-underline .hh-felt { filter: drop-shadow(0 2px 0 rgba(20,60,70,0.22)); }
/* mask edge travels only across the path (x 37%..84% of the frame); outside
   that span the two stills are identical, so the start and end look settled */
@keyframes hh-wipe { from { -webkit-mask-position: 65.6% 0; mask-position: 65.6% 0; } to { -webkit-mask-position: 18.75% 0; mask-position: 18.75% 0; } }
@keyframes hh-draw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
@keyframes hh-rise { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: no-preference) {
  /* the path is found left to right, as it is drawn in the film. Both stills
     are the same film frame (the "before" one has the path recoloured to tile
     grey), so only the path changes while the edge passes. */
  .hh-path-found { -webkit-mask-image: linear-gradient(90deg, #000 46%, transparent 54%); mask-image: linear-gradient(90deg, #000 46%, transparent 54%); -webkit-mask-size: 260% 100%; mask-size: 260% 100%; animation: hh-wipe 2s cubic-bezier(.4,.1,.4,1) .5s both; }
  .hh-underline path { animation: hh-draw 1.1s cubic-bezier(.65,.05,.25,1) 1.5s both; }
  .hh-rise { animation: hh-rise .8s cubic-bezier(.2,.8,.2,1) both; }
  .hh-rise-2 { animation-delay: .12s; } .hh-rise-3 { animation-delay: .24s; } .hh-rise-4 { animation-delay: .36s; }
  .hh-btn { transition: transform .18s cubic-bezier(.2,.8,.2,1), background-color .18s ease, box-shadow .18s ease; }
  .hh-btn:hover { transform: translateY(-2px); }
  .hh-play-badge { transition: transform .25s cubic-bezier(.2,.8,.2,1); }
  .hh-window:hover .hh-play-badge { transform: scale(1.08); }
  .hh-more svg { transition: transform .2s cubic-bezier(.2,.8,.2,1); }
  .hh-more:hover svg { transform: translateX(3px); }
}
.hh-btn:active { transform: translateY(1px) scale(.98); }
/* buttons take the page font (the browser default is Arial) */
.hh-hero button { font-family: inherit; }
`;

export default function MazeHero() {
  const { language } = useLanguage();
  const t = COPY[language === 'es' ? 'es' : 'en'];
  const [playing, setPlaying] = useState(false);
  const windowRef = useRef(null);
  const filmRef = useRef(null);
  const stillRef = useRef(null);

  /* Bring the whole window into view below the sticky header, then play inside the
     same click so the browser allows sound. */
  const watch = () => {
    const win = windowRef.current;
    const film = filmRef.current;
    if (!win || !film) return;
    const header = document.querySelector('header');
    const headerBottom = header ? Math.max(0, header.getBoundingClientRect().bottom) : 0;
    const rect = win.getBoundingClientRect();
    if (rect.top < headerBottom + 8 || rect.bottom > window.innerHeight) {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: window.scrollY + rect.top - headerBottom - 12, behavior: reduce ? 'auto' : 'smooth' });
    }
    setPlaying(true);
    film.play().catch(() => {});
    /* the button that had focus is gone; hand focus to the playing film */
    window.requestAnimationFrame(() => film.focus({ preventScroll: true }));
  };

  const close = () => {
    filmRef.current?.pause();
    setPlaying(false);
    window.requestAnimationFrame(() => stillRef.current?.focus({ preventScroll: true }));
  };

  return (
    <section aria-labelledby='hh-hero-title' className={`hh-hero ${display.variable} relative overflow-hidden`}>
      <style>{HERO_CSS}</style>
      <div className='mx-auto grid max-w-[1360px] grid-cols-1 items-start gap-6 px-4 pb-8 pt-5 sm:px-8 md:pb-14 md:pt-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.18fr)] lg:gap-12 lg:px-12 lg:pb-16 lg:pt-14'>
        {/* the words: first in the source so keyboard focus reaches the buttons before the film */}
        <div className='order-2 [container-type:inline-size] lg:order-1 lg:pt-6'>
          {/* sized to the column (cqi) so the second line fits on one line; with very large
              text settings the floor (1.5rem) wins and the line may wrap rather than clip */}
          <h1
            id='hh-hero-title'
            className='hh-rise m-0 font-[family-name:var(--font-hh-display)] [font-size:max(1.5rem,min(3.3rem,8.6cqi))] font-normal leading-[1.08] tracking-[-0.01em] text-[#1b4560]'
          >
            <span className='block'>{t.before}</span>
            <span className='relative inline-block'>
              {t.emphasis}
              <svg aria-hidden='true' viewBox='0 0 300 18' preserveAspectRatio='none' className='hh-underline absolute -bottom-[0.22em] left-0 h-[0.34em] w-full overflow-visible'>
                <g className='hh-felt'>
                  <path d='M3 11c40-8 70 4 104-2s58-9 92-3 60 6 98-4' pathLength='1' fill='none' stroke='#2fa8b0' strokeWidth='7.5' strokeLinecap='round' />
                  <path d='M6 9.6c40-8 70 4 102-2s58-9 92-3 58 6 96-4' pathLength='1' fill='none' stroke='#71cfcf' strokeOpacity='.55' strokeWidth='1.6' strokeLinecap='round' />
                </g>
              </svg>
            </span>
          </h1>
          <p className='hh-rise hh-rise-2 mb-0 mt-5 max-w-[34rem] [text-wrap:pretty] text-[1.0625rem] leading-[1.55] text-[#445e6e] sm:text-[1.1875rem]'>{t.sub}</p>

          <div className='hh-rise hh-rise-3 mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap'>
            <Link
              href='/schedule'
              className='hh-btn inline-flex min-h-[54px] items-center justify-center gap-2.5 rounded-full border-2 border-solid border-transparent bg-[#00796b] px-6 [&>svg]:shrink-0 text-[1.0625rem] font-semibold text-white no-underline lg:px-5 lg:text-[1rem] shadow-[0_10px_24px_-12px_rgba(0,105,92,0.7)] hover:bg-[#00695c] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#1b4560]'
            >
              <CalendarDays aria-hidden='true' className='size-5' />
              {t.primary}
            </Link>
            <button
              type='button'
              onClick={watch}
              className='hh-btn inline-flex min-h-[54px] items-center justify-center gap-2.5 rounded-full border-2 border-solid border-[#1b4560] bg-transparent px-6 [&>svg]:shrink-0 text-[1.0625rem] lg:px-5 lg:text-[1rem] font-semibold text-[#1b4560] hover:bg-[rgba(27,69,96,0.06)] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#1b4560]'
            >
              <Play aria-hidden='true' className='size-4 fill-current' />
              {t.watch}
            </button>
          </div>

          <p className='hh-rise hh-rise-4 mb-0 mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 border-0 border-t border-solid border-[rgba(27,69,96,0.16)] pt-5 text-[0.9375rem] font-medium text-[#1b4560]'>
            <span className='inline-flex items-center gap-2'>
              <BadgeDollarSign aria-hidden='true' className='size-[1.15rem] shrink-0 text-[#8e24aa]' />
              {t.savings}
            </span>
            <Link
              href='/estimate'
              className='hh-more inline-flex min-h-11 items-center gap-1.5 font-semibold text-[#00695c] underline decoration-[rgba(0,105,92,0.35)] underline-offset-4 hover:decoration-[#00695c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1b4560]'
            >
              {t.estimate}
              <ArrowRight aria-hidden='true' className='size-4' />
            </Link>
          </p>
        </div>
        {/* the film's window: first on phones, right on desktop */}
        <div className='order-1 lg:order-2'>
          <div ref={windowRef} className={`hh-window ${playing ? 'is-playing' : ''}`}>
            <video
              ref={filmRef}
              className='hh-film'
              src='/my-health-haven.mp4'
              preload='none'
              controls={playing}
              playsInline
              aria-label={t.video}
              aria-hidden={!playing}
              tabIndex={playing ? 0 : -1}
            />
            {playing ? null : (
              <button
                ref={stillRef}
                type='button'
                onClick={watch}
                aria-label={t.playStill}
                className='group absolute inset-0 block h-full w-full cursor-pointer border-0 bg-transparent p-0 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[-6px] focus-visible:outline-[#1b4560]'
              >
                <img className='hh-still' src='/hero/maze-before.webp' alt='' width={1600} height={900} fetchPriority='high' />
                <img className='hh-still hh-path-found' src='/hero/maze-path.webp' alt={t.still} width={1600} height={900} />
                {/* on the empty paper at the top left, clear of the two women */}
                <span className='hh-play-badge absolute left-3 top-3 inline-flex items-center gap-2.5 rounded-full bg-[rgba(255,255,255,0.92)] py-1.5 pl-1.5 pr-3.5 text-[0.9375rem] font-semibold text-[#1b4560] shadow-[0_4px_14px_-6px_rgba(70,50,30,0.45)] sm:left-4 sm:top-4 sm:py-2 sm:pl-2 sm:pr-4'>
                  <span className='grid size-8 place-items-center rounded-full bg-[#00796b] text-white sm:size-9'>
                    <Play aria-hidden='true' className='size-4 translate-x-[1px] fill-current' />
                  </span>
                  1:52
                </span>
              </button>
            )}
            <span aria-hidden='true' className='hh-window-lip' />
          </div>
          {/* reserved on desktop so nothing jumps when the film starts; on phones it would push the button below the fold */}
          <div className={`mt-2 min-h-11 items-center ${playing ? 'flex' : 'hidden lg:flex'}`}>
            {playing ? (
              <button
                type='button'
                onClick={close}
                className='inline-flex min-h-11 items-center gap-2 rounded-full border-0 bg-transparent px-3 text-[0.9375rem] font-semibold text-[#1b4560] hover:bg-[rgba(27,69,96,0.08)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1b4560]'
              >
                <X aria-hidden='true' className='size-4' />
                {t.close}
              </button>
            ) : null}
          </div>
        </div>

      </div>
    </section>
  );
}
