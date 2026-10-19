'use client';

import { useId } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { cls } from '@/components/paper/paperStyles';
import { HouseGlyph, PlaneGlyph } from './glyphs';

/*
 * The care timeline as one felt road through the paper (styles in
 * travelStyles.js). The ten steps keep the old cards' copy: title, timing and
 * caption from translations (medicalTravelPage.timelineCards), and the old
 * cards' teal milestones (steps 5, 6, 8 and 10) as filled discs.
 *
 * Desktop: a round trip. Home sits on the left; steps 1-5 run along the upper
 * road, the flight to Cancún is the dashed arc on the right, steps 6-10 run
 * back along the lower road, and the flight home is the dashed stretch between
 * 9 and 10. Phones and tablets: the same road runs down the left edge and ends
 * at home. The road is laid piece by piece as it scrolls in (motion allowed
 * only, through the kit's data-reveal); everything is there without motion.
 */

const MILESTONES = new Set([4, 5, 7, 9]);
const PIECES = [0, 1, 2, 3, 4];
/* the road between two discs on each layout: felt pieces, or a dashed flight */
const FLIGHT_DESKTOP = new Set([4, 5, 9]);
const FLIGHT_PHONE = new Set([4, 8]);
/* a slight hand-laid wobble, the same on server and client */
const wobble = (k) => ({ '--r': `${(((k * 37) % 7) - 3) * 0.9}deg`, '--y': `${(((k * 53) % 5) - 2) * 0.5}px` });
/* reveal order along the loop (desktop) is scaled so the whole loop lays in ~2.4s */
const D = (n) => +(n * 0.4).toFixed(2);

const ARC_RIGHT = 'M0 26A62 62 0 0 1 0 150';
const ARC_HOME_OUT = 'M2 88A62 62 0 0 1 64 26';
const ARC_HOME_IN = 'M64 150A62 62 0 0 1 2 88';

function DrawnPath({ d, maskId, children }) {
  return (
    <>
      <defs>
        <mask id={maskId} maskUnits='userSpaceOnUse' x='-20' y='-20' width='120' height='220'>
          <path className='hp-felt-line' d={d} pathLength='1' fill='none' stroke='#fff' strokeWidth='18' strokeLinecap='round' />
        </mask>
      </defs>
      <g mask={`url(#${maskId})`}>{children}</g>
    </>
  );
}

function FeltArc({ d, maskId }) {
  return (
    <DrawnPath d={d} maskId={maskId}>
      <path className='mt-road-felt' d={d} fill='none' stroke='#2fa8b0' strokeWidth='12' strokeLinecap='round' strokeDasharray='15 19' />
    </DrawnPath>
  );
}

export default function JourneyLoop() {
  const { t } = useLanguage();
  const uid = useId().replace(/:/g, '');
  const raw = t('medicalTravelPage.timelineCards');
  const cards = Array.isArray(raw) ? raw : [];
  const title = t('medicalTravelPage.timelineCardTitle') || 'A Clear, Supportive Journey';
  const subtitle = t('medicalTravelPage.timelineCardSubtitle') || 'So You Always Know What Comes Next';

  return (
    <section aria-labelledby='mt-journey-title' className={`hp-sheet hp-cream ${cls.pad}`}>
      <div className={cls.wrap}>
        <div data-reveal='rise' className='max-w-[60rem]'>
          <h2 id='mt-journey-title' className={cls.h2}>
            {title}
            <br />
            <span className='hp-felt-text'>{subtitle}</span>
          </h2>
        </div>

        <div role='list' className='mt-loop m-0 mt-12 p-0 lg:mt-20 lg:px-1'>
          {/* home: where the road leaves and where it comes back (desktop) */}
          <span aria-hidden='true' className='mt-cap mt-cap-l'>
            <span data-reveal='draw' className='absolute inset-0 block' style={{ '--id': 0 }}>
              <svg viewBox='0 0 64 176'>
                <FeltArc d={ARC_HOME_OUT} maskId={`${uid}-out`} />
              </svg>
            </span>
            <span data-reveal='draw' className='absolute inset-0 block' style={{ '--id': D(62) }}>
              <svg viewBox='0 0 64 176'>
                <FeltArc d={ARC_HOME_IN} maskId={`${uid}-in`} />
              </svg>
            </span>
            <span data-reveal='drop' className='mt-house' style={{ '--id': 0 }}>
              <HouseGlyph className='size-[22px]' />
            </span>
          </span>
          {/* the flight to Cancún (desktop) */}
          <span aria-hidden='true' className='mt-cap mt-cap-r'>
            <span data-reveal='draw' className='absolute inset-0 block' style={{ '--id': D(31) }}>
              <svg viewBox='0 0 76 176'>
                <DrawnPath d={ARC_RIGHT} maskId={`${uid}-fly`}>
                  <path d={ARC_RIGHT} fill='none' stroke='#00796b' strokeWidth='3' strokeLinecap='round' strokeDasharray='6 8' />
                </DrawnPath>
              </svg>
            </span>
            <span data-reveal='lay' className='mt-plane' style={{ '--rot': '180deg', '--id': D(31) }}>
              <PlaneGlyph className='size-[18px]' />
            </span>
          </span>

          {cards.map((card, i) => {
            const lane = i < 5 ? 1 : 2;
            const j = lane === 1 ? i : i - 5;
            /* desktop: lane 1 runs left to right (columns 2-6), lane 2 right to left */
            const col = lane === 1 ? 2 + i : 6 - j;
            const base = lane === 1 ? 1 + j * 6 : 32 + j * 6;
            const disc = lane === 1 ? base : base + 5;
            const pieceOrder = (p) => (lane === 1 ? base + 1 + p : base + (4 - p));
            const flightD = FLIGHT_DESKTOP.has(i);
            const flightM = FLIGHT_PHONE.has(i);
            const last = i === cards.length - 1;
            return (
              <div role='listitem' key={i} className='mt-stop' data-lane={lane} style={{ '--col': col }}>
                <div data-reveal='rise' className='mt-text' style={{ '--id': D(disc), '--im': 0 }}>
                  <h3 className='m-0 font-[family-name:var(--font-hh-display)] text-[1.25rem] font-normal leading-[1.2] text-[#1b4560] [overflow-wrap:break-word] lg:text-[1.0625rem] xl:text-[1.1875rem]'>
                    <span className='sr-only'>{i + 1}. </span>
                    {card.title}
                  </h3>
                  {card.timing ? <p className='m-0 mt-1.5 text-[0.875rem] font-semibold leading-[1.4] text-[#00695c]'>{card.timing}</p> : null}
                  {card.caption ? <p className='m-0 mt-1 text-[0.9375rem] leading-[1.5] text-[#3f5868] lg:text-[0.875rem] xl:text-[0.9375rem]'>{card.caption}</p> : null}
                </div>

                <div aria-hidden='true' className='mt-road'>
                  <span data-reveal='drop' className={`mt-disc ${MILESTONES.has(i) ? 'mt-disc-on' : ''}`} style={{ '--id': D(disc), '--im': 0 }}>
                    {i + 1}
                  </span>
                  <span className='mt-seg' data-d={flightD ? 'flight' : 'road'} data-m={flightM ? 'flight' : 'road'}>
                    {PIECES.map((p) => (
                      <span key={p} data-reveal='lay' className='mt-pw' style={{ '--id': D(pieceOrder(p)), '--im': 1 + p * 0.7 }}>
                        <span className='mt-piece' style={wobble(i * 5 + p)} />
                      </span>
                    ))}
                    {i === 9 ? (
                      <span data-reveal='lay' className='mt-plane mt-plane-d' style={{ '--rot': '-90deg', '--id': D(58) }}>
                        <PlaneGlyph className='size-[18px]' />
                      </span>
                    ) : null}
                    {flightM ? (
                      <span data-reveal='lay' className='mt-plane mt-plane-m' style={{ '--rot': '180deg', '--im': 2.4 }}>
                        <PlaneGlyph className='size-[18px]' />
                      </span>
                    ) : null}
                  </span>
                  {last ? (
                    <span className='mt-home-end'>
                      <span data-reveal='drop' className='mt-house' style={{ '--im': 3.5 }}>
                        <HouseGlyph className='size-[22px]' />
                      </span>
                    </span>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
