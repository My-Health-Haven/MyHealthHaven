'use client';

import { useEffect, useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import PaperPage from '@/components/paper/PaperPage';
import PageHero from '@/components/paper/PageHero';
import Sheet from '@/components/paper/Sheet';
import { proseComponents } from '@/components/paper/prose';

/*
 * A legal page (Privacy Policy, Terms of Use) in the paper world. The view hands
 * over its markdown unchanged; this only decides where each part sits:
 *
 * - the document's own h1 becomes the page title (shown in title case by CSS;
 *   the words in the DOM stay exactly as written), its first paragraph the lead,
 *   and the letterhead and "Last Updated" line sit under it on a dashed rule
 *   (no label above the heading);
 * - the numbered sections are set on a cream page lying on a kraft sheet, with
 *   an in-page list of the section headings built from those same headings
 *   (sticky beside the page on desktop, a fold-out list on phones);
 * - the contact address becomes a mail link; the copyright line is the fine print.
 */

const LABELS = {
  en: { contents: 'On this page' },
  es: { contents: 'En esta página' },
};

const LEGAL_CSS = `
.pl-word { display: inline-block; text-transform: lowercase; }
.pl-word:not(.pl-word-small)::first-letter { text-transform: uppercase; }

/* the page, with the next page of the document just showing under it */
.pl-page { background: #fffaf1;
  box-shadow: 0 1px 0 rgba(70,50,30,.10), 7px 9px 0 #efe7da, 7px 10px 0 rgba(70,50,30,.10), 0 22px 34px -20px rgba(70,50,30,.55); }

.pl-prose h2 { scroll-margin-top: 96px; }
.pl-prose hr + h2 { margin-top: 0; }
.pl-prose hr { margin: 2.4em 0 2.2em; }
.pl-num { color: #00796b; font-variant-numeric: lining-nums; }
.pl-prose > p:last-child { margin: 2.6em 0 0; font-size: .875rem; color: #5b7180; }
.pl-mail { display: inline-flex; min-height: 44px; align-items: center; }

.pl-toc-link { color: #3f5868; text-decoration: none; }
.pl-toc-link:hover { color: #1b4560; background: rgba(27,69,96,.06); }
.pl-toc-tile { flex: none; width: 14px; height: 8px; border-radius: 999px; background: #2fa8b0; box-shadow: inset 0 -2px 0 rgba(0,60,70,.22); visibility: hidden; }
.pl-toc-link[aria-current] { color: #1b4560; font-weight: 600; background: #fffaf1; box-shadow: 0 1px 0 rgba(70,50,30,.10), 0 10px 18px -14px rgba(70,50,30,.5); }
.pl-toc-link[aria-current] .pl-toc-tile { visibility: visible; }
.pl-toc-link:focus-visible { outline: 2px solid #1b4560; outline-offset: 2px; }

.pl-toc-m summary { list-style: none; }
.pl-toc-m summary::-webkit-details-marker { display: none; }
.pl-toc-m summary:focus-visible { outline: 2px solid #1b4560; outline-offset: 2px; border-radius: 10px; }
.pl-toc-m[open] .pl-toc-chev { transform: rotate(180deg); }

@media (prefers-reduced-motion: no-preference) {
  .pl-toc-link { transition: background-color .25s ease, color .25s ease, box-shadow .25s ease; }
  .pl-toc-chev { transition: transform .25s var(--hp-ease); }
}
@media (prefers-contrast: more) {
  .pl-toc-link, .pl-prose > p:last-child { color: #1b4560; }
}
@media (forced-colors: active) {
  .pl-page { border: 1px solid CanvasText; }
  .pl-toc-link[aria-current] { outline: 2px solid Highlight; }
}
`;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SMALL_WORDS = new Set(['a', 'an', 'and', 'for', 'in', 'of', 'on', 'or', 'the', 'to']);

const stripMarks = (s) => s.replace(/\*\*|__/g, '').trim();
const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
const textOf = (node) => (node?.type === 'text' ? node.value : (node?.children || []).map(textOf).join(''));
const splitNumber = (text) => {
  const match = text.match(/^(\d+)\.\s+(.+)$/);
  return match ? { num: match[1], label: match[2] } : { num: null, label: text };
};
const sectionId = (text) => `section-${slugify(splitNumber(text).label)}`;

/* front matter (letterhead, h1, Last Updated, intro) | the numbered sections */
function parseLegal(markdown) {
  const [front, ...sections] = markdown.split(/\n---\n/);
  const h1 = front.match(/^#\s+(.+)$/m);
  const body = sections.join('\n---\n');
  if (!h1) return { title: '', letterhead: '', updated: '', intro: [front.trim()], body, headings: [] };
  const [updated = '', ...intro] = front
    .slice(h1.index + h1[0].length)
    .trim()
    .split(/\n\s*\n/);
  const headings = [...body.matchAll(/^##\s+(.+)$/gm)].map((m) => {
    const text = stripMarks(m[1]);
    return { ...splitNumber(text), id: sectionId(text) };
  });
  return { title: stripMarks(h1[1]), letterhead: front.slice(0, h1.index).trim(), updated, intro, body, headings };
}

/* an all-caps document title, shown in title case without changing its words */
function TitleCase({ text }) {
  if (text !== text.toUpperCase()) return text;
  const words = text.split(' ');
  return words.map((word, i) => (
    <span key={i}>
      <span className={`pl-word ${i > 0 && SMALL_WORDS.has(word.toLowerCase()) ? 'pl-word-small' : ''}`}>{word}</span>
      {i < words.length - 1 ? ' ' : null}
    </span>
  ));
}

/* markdown inline in the hero (no wrapping paragraph: PageHero sets its own) */
const inlineComponents = {
  // eslint-disable-next-line no-unused-vars
  p: ({ node, children }) => <>{children}</>,
};

const letterheadComponents = {
  // eslint-disable-next-line no-unused-vars
  p: ({ node, ...props }) => <p className='m-0 leading-[1.5]' {...props} />,
  // eslint-disable-next-line no-unused-vars
  strong: ({ node, ...props }) => <strong className='font-[family-name:var(--font-hh-display)] text-[1.375rem] font-normal leading-[1.4] text-[#1b4560]' {...props} />,
  // eslint-disable-next-line no-unused-vars
  em: ({ node, ...props }) => <em className='text-[1rem] italic text-[#3f5868]' {...props} />,
};

const updatedComponents = {
  // eslint-disable-next-line no-unused-vars
  p: ({ node, ...props }) => <p className='m-0 text-[0.9375rem] leading-[1.5] text-[#3f5868]' {...props} />,
  // eslint-disable-next-line no-unused-vars
  strong: ({ node, ...props }) => <strong className='font-semibold text-[#1b4560]' {...props} />,
};

const bodyComponents = {
  ...proseComponents,
  /* the kit's list item is a flex row, so a bold lead-in and the words after it
     would split into two columns: keep the item's words in one inline run */
  // eslint-disable-next-line no-unused-vars
  li: ({ node, children, ...props }) => (
    <div role='listitem' {...props}>
      <span>{children}</span>
    </div>
  ),
  h2: ({ node, children }) => {
    const text = textOf(node).trim();
    const { num, label } = splitNumber(text);
    return (
      <h2 id={sectionId(text)}>
        {num ? (
          <>
            <span className='pl-num'>{num}.</span> {label}
          </>
        ) : (
          children
        )}
      </h2>
    );
  },
  // eslint-disable-next-line no-unused-vars
  strong: ({ node, children, ...props }) => {
    const only = Array.isArray(children) ? (children.length === 1 ? children[0] : null) : children;
    if (typeof only === 'string' && EMAIL.test(only.trim())) {
      return (
        <strong {...props}>
          <a className='pl-mail' href={`mailto:${only.trim()}`}>
            {only}
          </a>
        </strong>
      );
    }
    return <strong {...props}>{children}</strong>;
  },
};

function ContentsLinks({ headings, active, onPick }) {
  return (
    <div role='list' className='flex flex-col gap-1'>
      {headings.map((h) => (
        <div role='listitem' key={h.id}>
          <a
            href={`#${h.id}`}
            onClick={onPick}
            aria-current={active === h.id ? 'location' : undefined}
            className='pl-toc-link box-border flex min-h-11 items-center gap-2.5 rounded-[8px] px-3 py-2 text-[0.9375rem] leading-[1.35]'
          >
            <span aria-hidden='true' className='pl-toc-tile' />
            {h.num ? <span className='w-[1.6em] shrink-0 font-semibold tabular-nums text-[#00796b]'>{h.num}.</span> : null}
            <span>{h.label}</span>
          </a>
        </div>
      ))}
    </div>
  );
}

export default function LegalDocument({ content }) {
  const { language } = useLanguage();
  const labels = LABELS[language] || LABELS.en;
  const doc = useMemo(() => parseLegal(content), [content]);
  const [active, setActive] = useState(null);

  /* the section being read: the last heading above the top third of the screen */
  useEffect(() => {
    const els = doc.headings.map((h) => document.getElementById(h.id)).filter(Boolean);
    if (!els.length) return undefined;
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.3;
      let current = null;
      for (const el of els) {
        if (el.getBoundingClientRect().top <= line) current = el.id;
        else break;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [doc]);

  /* on phones, fold the list away again once a section is picked */
  const closeFold = (event) => {
    event.currentTarget.closest('details')?.removeAttribute('open');
  };

  const [leadPara, ...moreIntro] = doc.intro;

  return (
    <PaperPage>
      <style>{LEGAL_CSS}</style>
      <PageHero
        emphasis={<TitleCase text={doc.title} />}
        lead={leadPara ? <ReactMarkdown components={inlineComponents}>{leadPara}</ReactMarkdown> : null}
      >
        {moreIntro.length ? (
          <div className='hp-prose mb-8 max-w-[36rem]'>
            <ReactMarkdown components={proseComponents}>{moreIntro.join('\n\n')}</ReactMarkdown>
          </div>
        ) : null}
        <div className='flex max-w-[40rem] flex-col gap-4 border-0 border-t border-dashed border-[rgba(27,69,96,0.28)] pt-6 sm:flex-row sm:items-end sm:justify-between sm:gap-10'>
          {doc.letterhead ? (
            <div>
              <ReactMarkdown components={letterheadComponents}>{doc.letterhead}</ReactMarkdown>
            </div>
          ) : null}
          {doc.updated ? (
            <div className='sm:pb-0.5 sm:text-right'>
              <ReactMarkdown components={updatedComponents}>{doc.updated}</ReactMarkdown>
            </div>
          ) : null}
        </div>
      </PageHero>

      <Sheet tone='kraft'>
        <div className='grid grid-cols-1 gap-10 lg:grid-cols-[15.5rem_minmax(0,1fr)] lg:gap-12 xl:gap-16'>
          {doc.headings.length ? (
            <nav aria-label={labels.contents} className='hidden lg:block'>
              <div data-reveal='rise' className='sticky top-[96px]'>
                <p className='m-0 mb-3 px-3 text-[0.9375rem] font-semibold text-[#1b4560]'>{labels.contents}</p>
                <ContentsLinks headings={doc.headings} active={active} />
              </div>
            </nav>
          ) : null}

          <article aria-labelledby='hp-page-title' data-reveal='rise' className='pl-page w-full rounded-[6px] px-5 py-9 sm:px-10 sm:py-12 lg:max-w-[46rem] lg:px-16 lg:py-16'>
            {doc.headings.length ? (
              <details className='pl-toc-m mb-10 rounded-[10px] border border-solid border-[rgba(27,69,96,0.2)] bg-[#f4eee5] lg:hidden'>
                <summary className='box-border flex min-h-[48px] cursor-pointer items-center justify-between gap-3 px-4 font-semibold text-[#1b4560]'>
                  {labels.contents}
                  <ChevronDown aria-hidden='true' className='pl-toc-chev size-5 shrink-0' />
                </summary>
                <nav aria-label={labels.contents} className='px-1.5 pb-2'>
                  <ContentsLinks headings={doc.headings} active={active} onPick={closeFold} />
                </nav>
              </details>
            ) : null}
            <div className='hp-prose pl-prose max-w-[38rem]'>
              <ReactMarkdown components={bodyComponents}>{doc.body}</ReactMarkdown>
            </div>
          </article>
        </div>
      </Sheet>
    </PaperPage>
  );
}
