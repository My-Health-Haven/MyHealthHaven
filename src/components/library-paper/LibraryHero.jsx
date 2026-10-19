import { cls } from '@/components/paper/paperStyles';
import { FilmWindow } from '@/components/paper/parts';
import { LIB_GRID } from './libraryStyles';

/*
 * The kit's PageHero with what the library pages need around it: a breadcrumb
 * trail above the title, a meta line under the lead, and a strip along the
 * bottom of the sheet. Same grid, type and load animations as PageHero (plain
 * CSS animations that end visible, none with reduced motion).
 *
 * - title / emphasis: as PageHero (the underlined part starts its own line).
 * - frame: { src, alt } film frame in a window, or media: any node (a Postcard).
 * - Without frame or media the text runs alone (reading pages).
 */
export default function LibraryHero({ id = 'hp-page-title', tone = 'cream', crumbs, title, emphasis, lead, meta, children, frame, media, footer }) {
  const side = frame || media;
  return (
    <section aria-labelledby={id} className={`hp-sheet hp-${tone} hp-first`}>
      <div className={`${cls.wrap} pb-16 md:pb-20 ${side || footer ? 'lg:pb-24' : 'lg:pb-20'} ${crumbs ? 'pt-4 md:pt-6' : 'pt-10 md:pt-14 lg:pt-16'}`}>
        {crumbs ? <div className='hp-load'>{crumbs}</div> : null}
        <div className={`${LIB_GRID} items-center gap-10 ${crumbs ? 'pt-3 md:pt-5 lg:pt-6' : ''}`}>
          <div className={side ? '' : 'lg:col-span-2 lg:max-w-[52rem]'}>
            <h1 id={id} className={`hp-load ${cls.h1}`}>
              {title}
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
            {meta ? <div className='hp-load hp-load-2 mt-6'>{meta}</div> : null}
            {children ? <div className='hp-load hp-load-3 mt-8'>{children}</div> : null}
          </div>
          {frame ? (
            <div className='hp-load-window'>
              <FilmWindow src={frame.src} alt={frame.alt} sizes='(min-width: 1024px) 640px, 100vw' loading='eager' fetchPriority='high' />
            </div>
          ) : null}
          {!frame && media ? <div className='hp-load hp-load-3'>{media}</div> : null}
        </div>
        {footer ? <div className='hp-load hp-load-4 mt-12 lg:mt-16'>{footer}</div> : null}
      </div>
    </section>
  );
}
