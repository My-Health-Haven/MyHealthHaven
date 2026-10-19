import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cls } from '@/components/paper/paperStyles';

/*
 * Explore by Category as the patient's path: the four categories in the
 * site's order (getting started, choosing a provider, costs, recovery), each
 * a paper card on a dashed felt path like the one in the planning frame. A
 * category with its own hub page links to it, as the old card did (the whole
 * card is the link, with an arrow); one without a hub yet is the same card
 * muted (flat, dashed edge, grey marker) with the site's "Coming Soon" label
 * where the arrow would be, and links nowhere.
 *
 * On desktop the stops share a row (four across at normal text sizes); with
 * large text the row wraps in order instead of squeezing the titles.
 *
 * items: [{ key, title, description, href | null }]
 */
export default function CategoryPath({ items, label, soonLabel }) {
  return (
    <div role='list' aria-label={label} className='hl-path m-0 grid list-none grid-cols-1 gap-4 p-0 lg:grid-cols-[repeat(auto-fit,minmax(min(100%,13rem),1fr))] lg:gap-5'>
      {items.map((item, i) => {
        const inner = (
          <div className='grid grid-cols-[22px_minmax(0,1fr)] items-start gap-x-4 lg:flex lg:h-full lg:flex-col'>
            <span aria-hidden='true' className={`hl-marker mt-[9px] lg:mb-6 lg:mt-0 ${item.href ? '' : 'hl-marker-soon'}`} />
            <div className='lg:mb-5'>
              <h3 className={`hl-title ${cls.h3} [text-wrap:balance] ${item.href ? '' : '!text-[#3f5868]'}`}>{item.title}</h3>
              <p className={`${cls.body} mt-2`}>{item.description}</p>
            </div>
            {/* the arrow or the label takes its own row, so large text never runs under it */}
            {item.href ? (
              <span
                aria-hidden='true'
                className='col-start-2 mt-4 inline-flex size-10 items-center justify-center justify-self-start rounded-full bg-[rgba(0,121,107,0.1)] text-[#00796b] lg:mt-auto'
              >
                <ArrowRight className='size-5' />
              </span>
            ) : (
              <span className='hl-soon col-start-2 mt-4 inline-flex min-h-8 items-center justify-self-start self-start rounded-full border border-solid border-[rgba(63,88,104,0.45)] px-3 text-[0.8125rem] font-semibold leading-[1.3] text-[#3f5868] lg:mt-auto'>
                {soonLabel}
              </span>
            )}
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
              <div className='hl-stop-soon relative h-full rounded-[10px] p-6'>{inner}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
