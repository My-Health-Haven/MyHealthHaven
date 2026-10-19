import Link from 'next/link';

/*
 * The breadcrumb trail above a library page's title, as the old MUI
 * Breadcrumbs had it (same links, same order), drawn as role=list divs: the
 * site theme paints any hovered <li> in <main> solid teal. Each separator
 * travels with the crumb after it, so a wrapped trail never ends a line on a
 * dangling "/". The last crumb is the current page; a long article title is
 * cut short on narrow screens (the full title is the h1 right below it).
 *
 * items: [{ label, href? }]
 * compact: phones drop the current crumb (an article title, which the h1 right
 * below repeats) so the trail stays one line.
 */
export default function Crumbs({ items, label, compact = false }) {
  return (
    <nav aria-label={label}>
      <div role='list' className='m-0 flex list-none flex-wrap items-center gap-x-2 p-0 text-[0.9375rem] leading-[1.4]'>
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <div
              role='listitem'
              key={`${item.label}-${i}`}
              className={`flex min-w-0 items-center gap-x-2 ${last ? 'max-w-full' : 'whitespace-nowrap'} ${last && compact ? 'max-sm:hidden' : ''}`}
            >
              {i > 0 ? (
                <span aria-hidden='true' className='text-[#5b7180]'>
                  /
                </span>
              ) : null}
              {item.href && !last ? (
                <Link
                  href={item.href}
                  className='hl-crumb inline-flex min-h-11 min-w-11 items-center justify-center rounded-[3px] text-[#3f5868] underline decoration-[rgba(63,88,104,0.45)] underline-offset-4 hover:text-[#1b4560] hover:decoration-[#1b4560]'
                >
                  {item.label}
                </Link>
              ) : (
                <span aria-current={last ? 'page' : undefined} className='inline-flex min-h-11 min-w-0 items-center font-medium text-[#1b4560]'>
                  <span className='truncate'>{item.label}</span>
                </span>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
