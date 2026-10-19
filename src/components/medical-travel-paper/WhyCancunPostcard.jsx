'use client';

import { useLanguage } from '@/context/LanguageContext';
import Sheet from '@/components/paper/Sheet';
import Postcard from '@/components/paper/Postcard';
import TileList from '@/components/paper/TileList';
import { cls } from '@/components/paper/paperStyles';
import { frameSrcSet } from '@/components/paper/parts';
import { labelsFor } from './labels';
import { PlaneGlyph } from './glyphs';

/*
 * Why Cancún, the page's one navy sheet: a postcard from Cancún, front and back.
 * The front is the old card's watercolour map of the Yucatán (captioned with the
 * old map pin, "Cancún, Mexico"); the back carries the heading and the four
 * reasons on the teal path tiles, under a stamp. The trust row closes the sheet
 * as a ledger, like the figures under the home page's Cancún postcard.
 * In the DOM the back (heading first) comes before the front; the grid shows
 * the front first.
 */
export default function WhyCancunPostcard() {
  const { t, language } = useLanguage();
  const labels = labelsFor(language);

  const reasons = [1, 2, 3, 4].map((n) => ({
    title: t(`medicalTravelPage.whyCancunCard${n}Title`),
    body: t(`medicalTravelPage.whyCancunCard${n}Desc`),
  }));
  const trust = [
    { title: t('medicalTravelPage.trustUsFoundedTitle'), desc: t('medicalTravelPage.trustUsFoundedDesc') },
    { title: t('medicalTravelPage.trustFocusedTitle'), desc: t('medicalTravelPage.trustFocusedDesc') },
    { title: t('medicalTravelPage.trustQualityTitle'), desc: t('medicalTravelPage.trustQualityDesc') },
  ];

  return (
    <Sheet tone='navy' labelledBy='mt-why-title'>
      <div className='grid grid-cols-1 items-center gap-10 sm:gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-10 xl:gap-14'>
        {/* the back of the card */}
        <div data-reveal='card' style={{ '--i': 1 }} className='mx-auto w-full max-w-[600px] lg:col-start-2 lg:row-start-1 lg:mt-14'>
          <div className='hp-postcard mt-back relative rounded-[4px] px-6 pb-8 pt-7 sm:px-9 sm:pb-10 sm:pt-9'>
            <span aria-hidden='true' className='mt-stamp right-4 top-4 sm:right-7 sm:top-7'>
              <span className='mt-stamp-face'>
                <PlaneGlyph className='size-6 rotate-45 sm:size-7' />
              </span>
            </span>
            <svg aria-hidden='true' viewBox='0 0 132 64' className='mt-postmark right-[58px] top-[34px] h-[52px] w-[108px] sm:right-[66px] sm:top-[44px]'>
              <circle cx='96' cy='32' r='24' fill='none' stroke='#1b4560' strokeOpacity='.32' strokeWidth='1.6' />
              <circle cx='96' cy='32' r='18' fill='none' stroke='#1b4560' strokeOpacity='.22' strokeWidth='1' />
              {[22, 32, 42].map((y) => (
                <path key={y} d={`M2 ${y}c8-5 14-5 22 0s14 5 22 0 14-5 22 0 14 5 22 0`} fill='none' stroke='#1b4560' strokeOpacity='.28' strokeWidth='1.6' strokeLinecap='round' />
              ))}
            </svg>
            <h2 id='mt-why-title' className={`${cls.h2} relative pr-[64px] sm:pr-[104px]`}>
              {t('medicalTravelPage.whyCancunTitle')}
            </h2>
            <div className='mt-7 border-0 border-t border-dashed border-[rgba(27,69,96,0.22)] pt-7'>
              <TileList columns={2} items={reasons} className='sm:gap-y-6 lg:grid-cols-1 xl:grid-cols-2' />
            </div>
          </div>
        </div>

        {/* the front */}
        <div className='order-first lg:order-none lg:col-start-1 lg:row-start-1'>
          <Postcard
            src='/pages/why-cancun-map.webp'
            srcSet={frameSrcSet('/pages/why-cancun-map.webp')}
            sizes='(min-width: 1024px) 600px, 92vw'
            alt={labels.cancunMapAlt}
            width={1600}
            height={900}
            aspect='16 / 9'
            tilt='-2.2deg'
            caption={t('medicalTravelPage.whyCancunPin')}
            className='lg:max-w-[600px]'
          />
        </div>
      </div>

      <div role='list' className='m-0 mt-16 grid list-none grid-cols-1 gap-x-10 gap-y-9 border-0 border-t border-solid border-[rgba(244,238,229,0.2)] p-0 pt-10 md:grid-cols-3 lg:mt-24'>
        {trust.map((item, i) => (
          <div role='listitem' key={i} data-reveal='rise' style={{ '--i': i }}>
            <p className='m-0 font-[family-name:var(--font-hh-display)] text-[1.5rem] leading-[1.2] text-[#f4eee5] md:text-[1.375rem] lg:text-[1.75rem]'>{item.title}</p>
            <p className='m-0 mt-3 max-w-[24rem] text-[0.9375rem] leading-[1.55] text-[#c6d3da]'>{item.desc}</p>
          </div>
        ))}
      </div>
    </Sheet>
  );
}
