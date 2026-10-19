import Link from 'next/link';
import { CalendarDays } from 'lucide-react';
import { cls } from '@/components/paper/paperStyles';
import { LIB_GRID } from './libraryStyles';

/*
 * The library pages' last word, on the page's one navy sheet: the heading on
 * the left anchor, the lead and the call button on the right one (stacked on
 * phones). The kit's ClosingCall only draws in navy ink, so it cannot sit on
 * a navy sheet; this is its navy counterpart, with About's cream button.
 */
export default function NavyCall({ id, title, lead, href, label, icon }) {
  const Icon = icon || CalendarDays;
  return (
    <section aria-labelledby={id} className={`hp-sheet hp-navy ${cls.pad}`}>
      <div className={`${cls.wrap} ${LIB_GRID} items-end gap-y-6`}>
        <div data-reveal='rise'>
          <h2 id={id} className={`${cls.h2} max-w-[34rem] text-[#f4eee5]`}>
            {title}
          </h2>
        </div>
        <div data-reveal='rise' style={{ '--i': 1 }}>
          {lead ? <p className='m-0 max-w-[36rem] text-[1.0625rem] leading-[1.65] text-[#d3dde2] sm:text-[1.1875rem]'>{lead}</p> : null}
          <Link
            href={href}
            className={`hp-btn inline-flex min-h-[54px] items-center justify-center gap-2.5 rounded-full border-2 border-solid border-transparent bg-[#f4eee5] px-6 text-[1.0625rem] font-semibold text-[#1b4560] no-underline hover:bg-white focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#f4eee5] [&>svg]:shrink-0 ${
              lead ? 'mt-7' : ''
            }`}
          >
            <Icon aria-hidden='true' className='size-5' />
            {label}
          </Link>
        </div>
      </div>
    </section>
  );
}
