import { cls } from '@/components/paper/paperStyles';
import { FilmWindow } from '@/components/paper/parts';
import { FORM_PAPER_CSS } from './formPaperStyles';

/*
 * The opening sheet of a conversion page, in the kit PageHero's grammar (Young
 * Serif title with a felt-underlined second line, load animations, a film frame
 * in a window cut into the paper), with one difference: the working panel (the
 * estimate form, the booking calendar) comes straight after the words, so on a
 * phone it starts in the first screen, and the frame follows it.
 *
 * - layout 'side': on desktop the panel stands beside the words, the frame
 *   under the words (a tall form).
 * - layout 'below': on desktop the frame stands beside the words, the panel
 *   runs the full width under them (a wide calendar).
 * - sub: a second line in the display face; lead: a paragraph in the body face.
 *
 * PageHero cannot do this (its frame always follows the words and it has no
 * panel slot), hence this local version.
 */
export default function FormSheet({
  id,
  title,
  emphasis,
  sub,
  lead,
  frame,
  frameSizes,
  layout = 'side',
  tone = 'cream',
  children,
}) {
  return (
    <section aria-labelledby={id} className={`hp-sheet hp-${tone} hp-first hp-fs hp-fs-${layout}`}>
      <style>{FORM_PAPER_CSS}</style>
      <div className={`${cls.wrap} hp-fs-grid pb-16 pt-7 md:pb-20 md:pt-12 lg:pb-24 lg:pt-14`}>
        <div className='hp-fs-words'>
          <h1 id={id} className={`hp-load ${cls.h1}`}>
            {title}
            {/* as in PageHero, the underlined part starts its own line (the space keeps
                the heading's text whole for search and copy) */}
            {emphasis ? (
              <>
                {title ? (
                  <>
                    {' '}
                    <br />
                  </>
                ) : null}
                <span className='hp-felt-text'>{emphasis}</span>
              </>
            ) : null}
          </h1>
          {sub ? (
            <p className='hp-load hp-load-2 mb-0 mt-4 font-[family-name:var(--font-hh-display)] text-[1.25rem] leading-[1.35] text-[#1b4560] [text-wrap:balance] sm:text-[1.375rem] lg:mt-5'>
              {sub}
            </p>
          ) : null}
          {lead ? (
            <p className={`hp-load hp-load-3 ${cls.lead} mt-3 lg:mt-4 lg:max-w-[36rem]`}>{lead}</p>
          ) : null}
        </div>

        <div className='hp-fs-panel hp-load hp-load-3'>{children}</div>

        {frame ? (
          <div className='hp-fs-frame' data-reveal='slot'>
            <FilmWindow
              src={frame.src}
              alt={frame.alt}
              sizes={frameSizes || '(min-width: 1024px) 600px, 100vw'}
              loading='eager'
              fetchPriority='high'
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}
