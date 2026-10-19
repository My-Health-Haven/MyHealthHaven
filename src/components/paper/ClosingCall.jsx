import Link from 'next/link';
import { CalendarDays } from 'lucide-react';
import { cls } from './paperStyles';
import { FilmWindow } from './parts';

/*
 * The last word of a page: the next step, with a filled primary button and an
 * optional outline secondary. With a frame it mirrors the home closing (picture
 * left, words right); without one it is a short centred call.
 *
 * primary / secondary: { href, label, icon? } (icon: a lucide component).
 */
export default function ClosingCall({ id = 'hp-close-title', title, lead, primary, secondary, frame, signoff, tone = 'cream' }) {
  const PrimaryIcon = primary?.icon || CalendarDays;
  const SecondaryIcon = secondary?.icon;
  const buttons = (
    <div className={`mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap ${frame ? '' : 'sm:justify-center'}`}>
      {primary ? (
        <Link href={primary.href} className={`${cls.btnPrimary} lg:px-5 lg:text-[1rem]`}>
          <PrimaryIcon aria-hidden='true' className='size-5' />
          {primary.label}
        </Link>
      ) : null}
      {secondary ? (
        <Link href={secondary.href} className={`${cls.btnOutline} lg:px-5 lg:text-[1rem]`}>
          {SecondaryIcon ? <SecondaryIcon aria-hidden='true' className='size-5' /> : null}
          {secondary.label}
        </Link>
      ) : null}
    </div>
  );

  return (
    <section aria-labelledby={id} className={`hp-sheet hp-${tone} ${cls.pad}`}>
      {frame ? (
        <div className={`${cls.wrap} grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16`}>
          <div data-reveal='slot'>
            <FilmWindow src={frame.src} alt={frame.alt} sizes='(min-width: 1024px) 640px, 100vw' />
          </div>
          <div data-reveal='rise'>
            <h2 id={id} className={cls.h2}>
              {title}
            </h2>
            {lead ? <p className={cls.lead}>{lead}</p> : null}
            {buttons}
            {signoff ? (
              <p className='mb-0 mt-10 border-0 border-t border-solid border-[rgba(27,69,96,0.16)] pt-6 font-[family-name:var(--font-hh-display)] text-[1.25rem] leading-[1.35] text-[#1b4560]'>
                {signoff}
              </p>
            ) : null}
          </div>
        </div>
      ) : (
        <div className={`${cls.wrap}`}>
          <div data-reveal='rise' className='mx-auto max-w-[44rem] text-center'>
            <h2 id={id} className={cls.h2}>
              {title}
            </h2>
            {lead ? <p className={`${cls.lead} mx-auto`}>{lead}</p> : null}
            {buttons}
            {signoff ? <p className='mb-0 mt-8 font-[family-name:var(--font-hh-display)] text-[1.25rem] leading-[1.35] text-[#1b4560]'>{signoff}</p> : null}
          </div>
        </div>
      )}
    </section>
  );
}
