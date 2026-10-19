'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronDown } from 'lucide-react';

/* the section links, shared by the side note and the phone fold */
function SectionLinks({ toc, active = -1, onPick }) {
  return (
    <div role='list' className='m-0 flex list-none flex-col p-0'>
      {toc.map((item, i) => (
        <div role='listitem' key={item.id}>
          <a
            href={`#${item.id}`}
            onClick={onPick}
            aria-current={i === active ? 'location' : undefined}
            className={`hl-toc-link flex min-h-11 items-start gap-3 rounded-[3px] py-2 text-[0.9375rem] leading-[1.4] no-underline before:mt-[0.45em] before:block before:h-[8px] before:w-[16px] before:shrink-0 before:rounded-full before:bg-[rgba(27,69,96,0.16)] before:content-[''] hover:text-[#1b4560] hover:underline ${
              i === active ? 'hl-toc-on' : 'text-[#3f5868]'
            }`}
          >
            {item.text}
          </a>
        </div>
      ))}
    </div>
  );
}

/*
 * The article's side note on wide screens (xl up; it sits on the right anchor
 * and stays in view while reading): the way back to the article's category,
 * then, for a long article, its section headings as jump links (the one being
 * read is marked with the teal felt tile), or, for a short one, the article's
 * own meta line set as a small list. Below xl the breadcrumb on top, the
 * ContentsFold and the back link under the article do the job.
 *
 * toc: [{ id, text }] from the article's own ## headings (ids set by the
 * markdown h2 renderer in ArticleDetail); meta: the hero's meta parts.
 */
export default function ArticleRail({ back, toc, tocLabel, meta = [] }) {
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
        className='hp-more inline-flex min-h-11 items-center gap-2 font-semibold text-[#00695c] underline decoration-[rgba(0,105,92,0.7)] underline-offset-4 hover:decoration-[#00695c]'
      >
        <ArrowLeft aria-hidden='true' className='size-4 shrink-0' />
        {back.label}
      </Link>
      {toc.length ? (
        <nav aria-label={tocLabel} className='mt-4 border-0 border-t border-dashed border-[rgba(27,69,96,0.22)] pt-5'>
          <p className='m-0 font-[family-name:var(--font-hh-display)] text-[1.25rem] leading-[1.2] text-[#1b4560]'>{tocLabel}</p>
          <div className='mt-3'>
            <SectionLinks toc={toc} active={active} />
          </div>
        </nav>
      ) : meta.length ? (
        <div role='list' className='m-0 mt-4 flex list-none flex-col gap-2.5 border-0 border-t border-dashed border-[rgba(27,69,96,0.22)] p-0 pt-5'>
          {meta.map((part) => (
            <div role='listitem' key={part} className='hl-rail-meta flex items-start gap-3 text-[0.9375rem] leading-[1.45] text-[#3f5868]'>
              <span aria-hidden='true' className='hp-tile hp-tile-teal !mt-[0.42em] !h-[8px] !w-[16px]' />
              {part}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

/*
 * Below xl, a long article's section list as a fold under the hero (as the
 * legal pages' "On this page"): a native <details>, closed by default, that
 * closes again once a section is picked.
 */
export function ContentsFold({ toc, label }) {
  const ref = useRef(null);
  const close = () => {
    if (ref.current) ref.current.open = false;
  };
  if (!toc.length) return null;
  return (
    <details ref={ref} className='hl-fold mb-10 max-w-[34rem] rounded-[10px] border border-solid border-[rgba(27,69,96,0.24)] bg-[#fffaf1] xl:hidden'>
      <summary className='box-border flex min-h-[52px] cursor-pointer items-center justify-between gap-3 rounded-[10px] px-4 font-semibold text-[#1b4560] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1b4560]'>
        {label}
        <ChevronDown aria-hidden='true' className='hl-fold-chev size-5 shrink-0' />
      </summary>
      <nav aria-label={label} className='border-0 border-t border-dashed border-[rgba(27,69,96,0.22)] px-4 pb-2 pt-1'>
        <SectionLinks toc={toc} onPick={close} />
      </nav>
    </details>
  );
}
