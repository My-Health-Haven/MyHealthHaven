import { cls } from './paperStyles';
import { FilmWindow } from './parts';

/*
 * The opening of an inner page, in the home hero's grammar: Young Serif title
 * with a felt-underlined second part, a short lead, optional actions, and a
 * frame from the brand film in a window cut into the paper. Everything arrives
 * with plain CSS load animations (none with reduced motion).
 *
 * - title: the first part of the h1; emphasis: the underlined part (may wrap).
 * - frame: { src: '/pages/x.webp', alt } (an -800.webp twin must exist), or
 *   media: any node for the right column (a Postcard, a VideoWindow...).
 * - Without frame or media the text runs alone (reading pages).
 */
export default function PageHero({ id = 'hp-page-title', title, emphasis, lead, children, frame, media, tone = 'cream', className = '' }) {
  const side = frame || media;
  return (
    <section aria-labelledby={id} className={`hp-sheet hp-${tone} hp-first ${className}`}>
      <div
        className={`${cls.wrap} grid grid-cols-1 items-center gap-10 pb-16 pt-10 md:pb-20 md:pt-14 ${
          side ? 'lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14 lg:pb-24 lg:pt-16' : 'lg:pb-20 lg:pt-16'
        }`}
      >
        <div className={side ? '' : 'max-w-[52rem]'}>
          <h1 id={id} className={`hp-load ${cls.h1}`}>
            {title}
            {/* like the home hero, the underlined part starts its own line */}
            {emphasis ? (
              <>
                {title ? (
                  <>
                    {' '}
                    <br />
                  </>
                ) : null}
                <span className='hp-felt-text hp-felt-lines'>{emphasis}</span>
              </>
            ) : null}
          </h1>
          {lead ? <p className={`hp-load hp-load-2 ${cls.lead} !mt-7 lg:max-w-[36rem]`}>{lead}</p> : null}
          {children ? <div className='hp-load hp-load-3 mt-8'>{children}</div> : null}
        </div>
        {frame ? (
          <div className='hp-load-window'>
            <FilmWindow src={frame.src} alt={frame.alt} sizes='(min-width: 1024px) 640px, 100vw' loading='eager' fetchPriority='high' />
          </div>
        ) : null}
        {!frame && media ? <div className='hp-load hp-load-3'>{media}</div> : null}
      </div>
    </section>
  );
}
