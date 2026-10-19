'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

/*
 * A long article's side note on wide screens (it sits on the right anchor and
 * stays in view while reading): the way back to the article's category and the
 * article's section headings as jump links, the one being read marked with the
 * teal felt tile. Shown from xl up and only when the article has three or more
 * sections; elsewhere the breadcrumb on top and the back link under the
 * article do the job.
 *
 * toc: [{ id, text }] from the article's own ## headings (ids set by the
 * markdown h2 renderer in ArticleDetail).
 */
export default function ArticleRail({ back, toc, tocLabel }) {
  const [active, setActive] = useState(-1);

  useEffect(() => {
    if (!toc.length) return undefined;
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = Math.min(window.innerHeight * 0.3, 260);
      let next = -1;
      toc.forEach((item, i) => {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= line) next = i;
      });
      setActive(next);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [toc]);

  return (
    <div className='hp-note rounded-[8px] p-6'>
      <Link
        href={back.href}
        className='hp-more inline-flex min-h-11 items-center gap-2 font-semibold text-[#00695c] underline decoration-[rgba(0,105,92,0.35)] underline-offset-4 hover:decoration-[#00695c]'
      >
        <ArrowLeft aria-hidden='true' className='size-4 shrink-0' />
        {back.label}
      </Link>
      {toc.length ? (
        <nav aria-label={tocLabel} className='mt-4 border-0 border-t border-dashed border-[rgba(27,69,96,0.22)] pt-5'>
          <p className='m-0 font-[family-name:var(--font-hh-display)] text-[1.25rem] leading-[1.2] text-[#1b4560]'>{tocLabel}</p>
          <div role='list' className='m-0 mt-3 flex list-none flex-col p-0'>
            {toc.map((item, i) => (
              <div role='listitem' key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={i === active ? 'location' : undefined}
                  className={`flex min-h-11 items-start gap-3 rounded-[3px] py-2 text-[0.9375rem] leading-[1.4] no-underline before:mt-[0.45em] before:block before:h-[8px] before:w-[16px] before:shrink-0 before:rounded-full before:bg-[rgba(27,69,96,0.16)] before:content-[''] hover:text-[#1b4560] hover:underline ${
                    i === active ? 'hl-toc-on' : 'text-[#3f5868]'
                  }`}
                >
                  {item.text}
                </a>
              </div>
            ))}
          </div>
        </nav>
      ) : null}
    </div>
  );
}
