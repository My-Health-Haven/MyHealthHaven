'use client';

import { useRef, useState } from 'react';
import { Play, X } from 'lucide-react';
import { frameSrcSet } from './parts';

/*
 * A video that plays in a window cut into the paper, as on the home page: the
 * poster is a film frame (pre-sized webp with an -800 twin); Play swaps it for
 * the video in the same 16:9 window, whole, with controls and nothing laid over
 * it, after scrolling the window clear of the sticky header. Focus moves to the
 * video on play and back to the poster button on close.
 *
 * labels: { play, video, close } in the page's language; duration: '2:10'.
 */
export default function VideoWindow({ src, poster, duration, labels, sizes = '(min-width: 1024px) 1000px, 100vw', className = '' }) {
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
    const rect = win.getBoundingClientRect();
    if (rect.top < headerBottom + 8 || rect.bottom > window.innerHeight) {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: window.scrollY + rect.top - headerBottom - 12, behavior: reduce ? 'auto' : 'smooth' });
    }
    setPlaying(true);
    film.play().catch(() => {});
    window.requestAnimationFrame(() => film.focus({ preventScroll: true }));
  };

  const close = () => {
    filmRef.current?.pause();
    setPlaying(false);
    window.requestAnimationFrame(() => posterRef.current?.focus({ preventScroll: true }));
  };

  return (
    <div className={className}>
      <div ref={windowRef} className={`hp-window ${playing ? 'is-playing' : ''}`}>
        <video
          ref={filmRef}
          className='hp-film'
          src={src}
          preload='none'
          controls={playing}
          playsInline
          aria-label={labels.video}
          aria-hidden={!playing}
          tabIndex={playing ? 0 : -1}
        />
        {playing ? null : (
          <button
            ref={posterRef}
            type='button'
            onClick={watch}
            aria-label={labels.play}
            className='absolute inset-0 block h-full w-full cursor-pointer border-0 bg-transparent p-0 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[-6px] focus-visible:outline-[#1b4560]'
          >
            <img className='hp-still' src={poster} srcSet={frameSrcSet(poster)} sizes={sizes} alt='' width={1600} height={900} loading='lazy' decoding='async' />
            <span className='hp-play-badge absolute left-3 top-3 inline-flex items-center gap-2.5 rounded-full bg-[rgba(255,255,255,0.92)] py-1.5 pl-1.5 pr-3.5 text-[0.9375rem] font-semibold text-[#1b4560] shadow-[0_4px_14px_-6px_rgba(70,50,30,0.45)] sm:left-4 sm:top-4 sm:py-2 sm:pl-2 sm:pr-4'>
              <span className='grid size-8 place-items-center rounded-full bg-[#00796b] text-white sm:size-9'>
                <Play aria-hidden='true' className='size-4 translate-x-[1px] fill-current' />
              </span>
              {duration}
            </span>
          </button>
        )}
        <span aria-hidden='true' className='hp-window-lip' />
      </div>
      <div className='mt-2 flex min-h-11 items-center'>
        {playing ? (
          <button
            type='button'
            onClick={close}
            className='inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border-0 bg-transparent px-3 text-[0.9375rem] font-semibold text-[#1b4560] hover:bg-[rgba(27,69,96,0.08)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1b4560]'
          >
            <X aria-hidden='true' className='size-4' />
            {labels.close}
          </button>
        ) : null}
      </div>
    </div>
  );
}
