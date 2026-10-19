import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cls } from '@/components/paper/paperStyles';

/*
 * Explore by Category as the patient's path: the four categories in the
 * site's order (getting started, choosing a provider, costs, recovery), joined
 * by a dashed felt path like the one in the planning frame. A category with
 * its own hub page is a paper card laid on the path and links to it, as the
 * old card did (the whole card is the link); one without a hub yet stays flat
 * on the sheet with an open marker and no arrow, and links nowhere.
 *
 * items: [{ key, title, description, href | null }]
 */
export default function CategoryPath({ items, label }) {
  return (
    <div role='list' aria-label={label} className='hl-path m-0 grid list-none grid-cols-1 gap-4 p-0 lg:grid-cols-4 lg:gap-5'>
      {items.map((item, i) => {
        const inner = (
          <div className='grid grid-cols-[22px_minmax(0,1fr)_auto] items-start gap-x-4 lg:flex lg:h-full lg:flex-col'>
            <span aria-hidden='true' className={`hl-marker mt-[9px] lg:mb-6 lg:mt-0 ${item.href ? '' : 'hl-marker-open'}`} />
            <div className='lg:mb-5'>
              <h3 className={`hl-title ${cls.h3} [text-wrap:balance]`}>{item.title}</h3>
              <p className={`${cls.body} mt-2`}>{item.description}</p>
            </div>
            {item.href ? (
              <span
                aria-hidden='true'
                className='inline-flex size-10 items-center justify-center self-center rounded-full bg-[rgba(0,121,107,0.1)] text-[#00796b] lg:mt-auto lg:self-start'
              >
                <ArrowRight className='size-5' />
              </span>
            ) : null}
          </div>
        );
        return (
          <div role='listitem' key={item.key} data-reveal='lay' style={{ '--i': i }} className='relative'>
            {item.href ? (
              <Link
                href={item.href}
                className='hl-card hl-stop-card relative block h-full rounded-[10px] p-6 no-underline focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#1b4560]'
              >
                {inner}
              </Link>
            ) : (
              <div className='relative h-full rounded-[10px] p-6'>{inner}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
