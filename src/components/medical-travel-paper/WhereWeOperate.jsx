'use client';

import { useEffect, useRef, useState } from 'react';
import { MousePointerClick } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import Sheet from '@/components/paper/Sheet';
import { cls } from '@/components/paper/paperStyles';
import { labelsFor } from './labels';

const P_LEAD =
  'm-0 text-[1.125rem] leading-[1.6] text-[#1b4560] [text-wrap:pretty] sm:text-[1.1875rem]';
const P_BODY = 'm-0 text-[1.0625rem] leading-[1.7] text-[#3f5868] [text-wrap:pretty]';

/*
 * Where we operate: the operations map lies in a window cut into the kraft sheet
 * beside the three paragraphs that explain the one-destination model. On phones
 * and tablets the map follows the first paragraph; on desktop it stays in view
 * while the paragraphs are read.
 *
 * The map works as before: the iframe ignores the pointer until the cover is
 * clicked, and leaving the window with the mouse locks it again so the page
 * scrolls past it. The cover is a real button placed before the map; while the
 * map is locked the iframe is out of the tab order, and unlocking it moves focus
 * into the map. Touch has no mouseleave, so the map also locks again when focus
 * leaves it (a tap elsewhere) or when it scrolls out of view. The embed's own
 * black title bar is cropped off the top of the window (the iframe is taller
 * than the window and shifted up); the map's attribution stays at the bottom.
 */
export default function WhereWeOperate() {
  const { t, language } = useLanguage();
  const labels = labelsFor(language);
  const [mapActive, setMapActive] = useState(false);
  const windowRef = useRef(null);
  const frameRef = useRef(null);
  const coverRef = useRef(null);

  const paragraphs = Array.isArray(t('medicalTravelPage.locationsParagraphs'))
    ? t('medicalTravelPage.locationsParagraphs')
    : [t('medicalTravelPage.locationsDesc')];
  const [first, ...rest] = paragraphs;

  const unlock = () => {
    setMapActive(true);
    window.requestAnimationFrame(() => frameRef.current?.focus({ preventScroll: true }));
  };
  const lock = () => {
    /* if focus is still inside the map, hand it back to the cover */
    const hadFocus = document.activeElement === frameRef.current;
    setMapActive(false);
    if (hadFocus)
      window.requestAnimationFrame(() => coverRef.current?.focus({ preventScroll: true }));
  };

  /* lock again once the map leaves the screen */
  useEffect(() => {
    if (!mapActive || !windowRef.current || !('IntersectionObserver' in window)) return undefined;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) setMapActive(false);
    });
    io.observe(windowRef.current);
    return () => io.disconnect();
  }, [mapActive]);

  return (
    <Sheet tone='kraft' labelledBy='mt-where-title'>
      <div className='grid grid-cols-1 gap-y-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-5'>
        <div className='max-w-[38rem] lg:col-start-2 lg:row-start-1'>
          <div data-reveal='rise'>
            <h2 id='mt-where-title' className={cls.h2}>
              {t('medicalTravelPage.locationsTitle')}
            </h2>
          </div>
          {first ? (
            <p data-reveal='rise' className={`${P_LEAD} mt-6`}>
              {first}
            </p>
          ) : null}
        </div>

        <div className='lg:col-start-1 lg:row-span-2 lg:row-start-1'>
          <div data-reveal='slot' className='lg:sticky lg:top-[112px]'>
            <div ref={windowRef} className='hp-window mt-map' onMouseLeave={lock}>
              {!mapActive && (
                <button
                  ref={coverRef}
                  type='button'
                  onClick={unlock}
                  className='absolute inset-0 z-[1] flex cursor-pointer items-center justify-center border-0 bg-[rgba(244,238,229,0.04)] p-4 transition-colors duration-200 hover:bg-[rgba(244,238,229,0.16)] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[-6px] focus-visible:outline-[#1b4560]'
                >
                  <span className='inline-flex min-h-11 items-center gap-2.5 rounded-full bg-[rgba(255,252,246,0.95)] py-2 pl-2 pr-4 text-[0.9375rem] font-semibold text-[#1b4560] shadow-[0_6px_18px_-8px_rgba(70,50,30,0.55)]'>
                    <span className='grid size-8 place-items-center rounded-full bg-[#00796b] text-white'>
                      <MousePointerClick aria-hidden='true' className='size-4' />
                    </span>
                    {t('medicalTravelPage.mapActivate') || 'Click to interact with map'}
                  </span>
                </button>
              )}
              <iframe
                ref={frameRef}
                src='https://www.google.com/maps/d/embed?mid=1LWn2Sx3NCenBN4f_Wabr45-v7hhciJY&ehbc=2E312F&noprof=1'
                width='100%'
                height='100%'
                style={{ border: 0, pointerEvents: mapActive ? 'auto' : 'none' }}
                title={labels.mapTitle}
                loading='lazy'
                tabIndex={mapActive ? 0 : -1}
                onBlur={() => setMapActive(false)}
              />
              <span aria-hidden='true' className='hp-window-lip' />
            </div>
          </div>
        </div>

        {rest.length ? (
          <div className='flex max-w-[38rem] flex-col gap-5 lg:col-start-2 lg:row-start-2'>
            {rest.map((para, i) => (
              <p key={i} data-reveal='rise' style={{ '--i': i }} className={P_BODY}>
                {para}
              </p>
            ))}
          </div>
        ) : null}
      </div>
    </Sheet>
  );
}
