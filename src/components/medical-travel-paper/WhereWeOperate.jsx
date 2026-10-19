'use client';

import { useState } from 'react';
import { MousePointerClick } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import Sheet from '@/components/paper/Sheet';
import { cls } from '@/components/paper/paperStyles';
import { labelsFor } from './labels';

/*
 * Where we operate: the operations map lies in a window cut into the kraft sheet
 * beside the three paragraphs that explain the one-destination model. The map
 * works exactly as before: the iframe ignores the pointer until the cover is
 * clicked, and leaving the window with the mouse locks it again (so the page
 * scrolls past it). The cover is now a real button, so it also answers the
 * keyboard. On desktop the map stays in view while the paragraphs are read.
 */
export default function WhereWeOperate() {
  const { t, language } = useLanguage();
  const labels = labelsFor(language);
  const [mapActive, setMapActive] = useState(false);

  const paragraphs = Array.isArray(t('medicalTravelPage.locationsParagraphs'))
    ? t('medicalTravelPage.locationsParagraphs')
    : [t('medicalTravelPage.locationsDesc')];

  return (
    <Sheet tone='kraft' labelledBy='mt-where-title'>
      <div className='grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16'>
        <div className='lg:col-start-2 lg:row-start-1'>
          <div data-reveal='rise'>
            <h2 id='mt-where-title' className={cls.h2}>
              {t('medicalTravelPage.locationsTitle')}
            </h2>
          </div>
          <div className='mt-6 flex max-w-[38rem] flex-col gap-5'>
            {paragraphs.map((para, i) => (
              <p
                key={i}
                data-reveal='rise'
                style={{ '--i': i }}
                className={
                  i === 0
                    ? 'm-0 text-[1.125rem] leading-[1.6] text-[#1b4560] [text-wrap:pretty] sm:text-[1.1875rem]'
                    : 'm-0 text-[1.0625rem] leading-[1.7] text-[#3f5868] [text-wrap:pretty]'
                }
              >
                {para}
              </p>
            ))}
          </div>
        </div>

        <div className='lg:col-start-1 lg:row-start-1'>
          <div data-reveal='slot' className='lg:sticky lg:top-[112px]'>
            <div className='hp-window mt-map' onMouseLeave={() => setMapActive(false)}>
              <iframe
                src='https://www.google.com/maps/d/embed?mid=1LWn2Sx3NCenBN4f_Wabr45-v7hhciJY&ehbc=2E312F&noprof=1'
                width='100%'
                height='100%'
                style={{ border: 0, pointerEvents: mapActive ? 'auto' : 'none' }}
                title={labels.mapTitle}
                loading='lazy'
              />
              {!mapActive && (
                <button
                  type='button'
                  onClick={() => setMapActive(true)}
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
              <span aria-hidden='true' className='hp-window-lip' />
            </div>
          </div>
        </div>
      </div>
    </Sheet>
  );
}
