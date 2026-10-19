import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cls } from '@/components/paper/paperStyles';

/* one felt stroke from a stop to the next; the kit's .hp-felt-line draws it when
   its stop is revealed. Each svg keeps the line's thickness on its short axis. */
function Segment({ across }) {
  const box = across ? '0 0 200 12' : '0 0 12 200';
  const line = across ? 'M2 6C40 8.6 70 3.4 100 6S160 8.6 198 6' : 'M6 2C8.6 40 3.4 70 6 100S8.6 160 6 198';
  const shine = across ? 'M4 5C40 7.6 70 2.4 100 5S160 7.6 196 5' : 'M5 4C7.6 40 2.4 70 5 100S7.6 160 5 196';
  return (
    <svg aria-hidden='true' focusable='false' className={`np-seg ${across ? 'np-seg-h' : 'np-seg-v'}`} viewBox={box} preserveAspectRatio='none'>
      <g className='hp-felt'>
        <path className='hp-felt-line' d={line} pathLength='1' fill='none' stroke='#2fa8b0' strokeWidth='6.5' strokeLinecap='round' />
        <path className='hp-felt-line' d={shine} pathLength='1' fill='none' stroke='#71cfcf' strokeOpacity='.55' strokeWidth='1.4' strokeLinecap='round' />
      </g>
    </svg>
  );
}

/*
 * What the Health Navigator does, from the page's own list of eight. The three
 * that describe the Navigator (the bilingual advocate, the single point of
 * contact, always reachable) sit on the Navigator's card, a paper note; the five
 * that are things the Navigator does, in order, become a path of numbered stops
 * joined by the film's felt line, like the journey on the laptop in the hero.
 *
 * - card: [{ title, body }] (the first is set large)
 * - steps: [{ title, body }]
 * - cta: { href, label } shown on the card
 */
export default function NavigatorWork({ headingId, heading, lead, card, steps, cta, pathLabel, stepLabel }) {
  const [first, ...rest] = card;
  return (
    <div className='np-work'>
      <div data-reveal='rise' className='np-head max-w-[40rem]'>
        <h2 id={headingId} className={cls.h2}>
          {heading}
        </h2>
        {lead ? <p className={cls.lead}>{lead}</p> : null}
      </div>

      <div className='np-card'>
        <div className='np-card-hold'>
          <div data-reveal='drop' className='hp-note-pin max-w-[34rem] xl:ml-auto' style={{ '--r': '-1.1deg' }}>
            <div className='hp-note rounded-[6px] p-6 sm:p-8'>
              {/* the advocate across the card; the other two side by side where the card is wide */}
              <div role='list' className='m-0 grid list-none grid-cols-1 gap-x-8 gap-y-5 p-0 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2'>
                {first ? (
                  <div role='listitem' className='mb-1 border-0 border-b border-dashed border-[rgba(27,69,96,0.22)] pb-6 sm:col-span-2 lg:col-span-1 xl:col-span-2'>
                    <p className='m-0 font-[family-name:var(--font-hh-display)] text-[1.5rem] leading-[1.25] text-[#1b4560] [text-wrap:balance] sm:text-[1.75rem] lg:text-[1.5rem] xl:text-[1.75rem]'>{first.title}</p>
                    {first.body ? <p className={`${cls.body} mt-3`}>{first.body}</p> : null}
                  </div>
                ) : null}
                {rest.map((item, i) => (
                  <div role='listitem' key={i} className='flex gap-3.5'>
                    <span aria-hidden='true' className='hp-tile hp-tile-teal' />
                    <div>
                      <p className='m-0 font-semibold leading-[1.5] text-[#1b4560]'>{item.title}</p>
                      {item.body ? <p className={`${cls.body} mt-1`}>{item.body}</p> : null}
                    </div>
                  </div>
                ))}
              </div>
              {cta ? (
                <Link href={cta.href} className={`${cls.more} mt-5`}>
                  {cta.label}
                  <ArrowRight aria-hidden='true' className='size-4 shrink-0' />
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <div role='list' aria-label={pathLabel} className='np-path list-none'>
        {steps.map((step, i) => (
          <div role='listitem' key={i} data-reveal='rise' style={{ '--i': i }} className='np-step'>
            {i < steps.length - 1 ? (
              <>
                <Segment />
                <Segment across />
              </>
            ) : null}
            <span className='np-stop font-[family-name:var(--font-hh-display)] text-[1.5rem] leading-none [font-variant-numeric:lining-nums]'>
              <span className='sr-only'>{stepLabel} </span>
              {i + 1}
            </span>
            <div className='np-step-text'>
              <p className='m-0 text-[1.0625rem] font-semibold leading-[1.45] text-[#1b4560]'>{step.title}</p>
              {step.body ? <p className={`${cls.body} mt-2`}>{step.body}</p> : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
