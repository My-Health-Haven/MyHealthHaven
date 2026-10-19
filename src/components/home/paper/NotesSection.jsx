'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { cls } from './paperStyles';

/* each note sits a little crooked on the board; hover straightens it */
const TILT = ['-1.1deg', '0.9deg', '1.3deg', '-0.8deg', '0.6deg'];

const COPY = {
  en: { list: 'Patient stories', next: 'Next story', story: (i, n, name) => `Story ${i} of ${n}, ${name}` },
  es: { list: 'Historias de pacientes', next: 'Siguiente historia', story: (i, n, name) => `Historia ${i} de ${n}, ${name}` },
};

function NoteBody({ note, featured }) {
  return (
    <>
      <span aria-hidden='true' className='block h-5 font-[family-name:var(--font-hh-display)] text-[3.25rem] leading-[0.75] text-[#2fa8b0]'>
        “
      </span>
      <blockquote
        className={`m-0 mt-4 flex-1 ${
          featured
            ? 'font-[family-name:var(--font-hh-display)] text-[1.1875rem] leading-[1.45] text-[#1b4560] md:text-[1.375rem] lg:text-[1.625rem]'
            : 'text-[1rem] leading-[1.6] text-[#2f4a5b]'
        }`}
      >
        {note.quote}
      </blockquote>
      <figcaption className='mt-6 border-0 border-t border-dashed border-[rgba(27,69,96,0.22)] pt-4'>
        <span className='block font-semibold text-[#1b4560]'>{note.name}</span>
        <span className='mt-0.5 block text-[0.875rem] text-[#5b7180]'>{note.meta}</span>
      </figcaption>
    </>
  );
}

/*
 * Phones: the five notes lie in one pile (all in the same grid cell, so the pile
 * is as tall as the tallest note). The top note is the story being read; tap it,
 * a dot or Next story and it slides off and tucks to the back of the pile. With
 * reduced motion the next note simply takes its place. Only the top note is
 * exposed to assistive tech, and changes are announced.
 */
function NotesPile({ notes, c }) {
  const [active, setActive] = useState(0);
  const [leaving, setLeaving] = useState(null);
  const timer = useRef(0);
  const n = notes.length;

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const go = (to) => {
    if (to === active || leaving !== null) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setActive(to);
      return;
    }
    setLeaving(active);
    timer.current = window.setTimeout(() => {
      setActive(to);
      setLeaving(null);
    }, 260);
  };
  const next = () => go((active + 1) % n);

  if (!n) return null;

  return (
    <div data-reveal='rise' className='mt-8 md:hidden'>
      <div className='grid pb-6 pt-1' aria-live='polite'>
        {notes.map((note, i) => {
          const depth = (i - active + n) % n;
          return (
            <figure
              key={i}
              aria-hidden={depth !== 0}
              onClick={depth === 0 ? next : undefined}
              className={`hp-note hp-pile-note m-0 flex cursor-pointer flex-col rounded-[6px] p-6 [grid-area:1/1] ${leaving === i ? 'hp-pile-leave' : ''}`}
              style={{ '--d': depth, '--r': TILT[i % TILT.length], zIndex: leaving === i ? n + 1 : n - depth }}
            >
              <NoteBody note={note} featured={i === 0} />
            </figure>
          );
        })}
      </div>
      <div className='mt-2 flex items-center justify-between'>
        <div className='-ml-3 flex'>
          {notes.map((note, i) => (
            <button
              key={i}
              type='button'
              onClick={() => go(i)}
              aria-label={c.story(i + 1, n, note.name)}
              aria-current={i === active ? 'true' : undefined}
              className='grid h-11 w-10 cursor-pointer place-items-center rounded-full border-0 bg-transparent p-0 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#1b4560]'
            >
              <span className={`block size-2.5 rounded-full ${i === active ? 'bg-[#00796b]' : 'bg-[rgba(27,69,96,0.28)]'}`} />
            </button>
          ))}
        </div>
        <button type='button' onClick={next} className={`${cls.more} cursor-pointer border-0 bg-transparent p-0 text-[1rem]`}>
          {c.next}
          <ArrowRight aria-hidden='true' className='size-4' />
        </button>
      </div>
    </div>
  );
}

/*
 * Patient stories as paper notes: on desktop pinned to a board (the first one
 * large, the rest beside and below it), on tablets the first across and the
 * rest two by two, on phones a pile to tap through (no sideways scrolling, about
 * one screen tall). The order is the site's own (no shuffle), so the page
 * renders the same on the server and in the browser.
 */
export default function NotesSection() {
  const { t, language } = useLanguage();
  const c = COPY[language === 'es' ? 'es' : 'en'];
  const notes = Array.isArray(t('home.testimonials')) ? t('home.testimonials') : [];

  return (
    <section aria-labelledby='hp-notes-title' className={`hp-sheet hp-kraft ${cls.pad}`}>
      <div className={cls.wrap}>
        <div data-reveal='rise' className='max-w-[44rem]'>
          <h2 id='hp-notes-title' className={cls.h2}>
            {t('home.testimonialsTitle')}
          </h2>
          <p className={cls.lead}>{t('home.testimonialsSubtitle')}</p>
        </div>

        <NotesPile notes={notes} c={c} />

        {/* tablets: the first note across, the rest two by two; desktop: the six-column board */}
        <div
          role='list'
          aria-label={c.list}
          className='m-0 mt-8 hidden list-none p-0 py-5 md:grid md:grid-cols-2 md:gap-6 lg:mt-12 lg:grid-cols-6 lg:gap-7'
        >
          {notes.map((note, i) => (
            <div
              role='listitem'
              key={i}
              data-reveal='drop'
              style={{ '--i': i, '--r': TILT[i % TILT.length] }}
              className={`hp-note-pin ${i === 0 ? 'md:col-span-2 lg:col-span-4' : 'lg:col-span-2'}`}
            >
              <figure className='hp-note m-0 flex flex-col rounded-[6px] p-6 sm:p-7 md:h-full'>
                <NoteBody note={note} featured={i === 0} />
              </figure>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
