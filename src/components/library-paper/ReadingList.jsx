import { useId } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Postcard from '@/components/paper/Postcard';
import { cls } from '@/components/paper/paperStyles';
import { getLibraryArticlePath } from '@/data/libraryContent';
import { articlePicture } from './libraryImages';
import { LIB_GRID } from './libraryStyles';

const TILT = ['-1.6deg', '1.4deg', '-1deg', '1.8deg', '-1.3deg'];

/*
 * A category hub's articles as a reading list on the sheet, one entry per
 * article in the data's order, on the page's two anchors. An entry with a
 * picture pairs its words with a small postcard, and the postcards change
 * sides down the list on desktop (each one hugs the middle of the page), so
 * the list reads as a run of different beats. An entry without a picture is a
 * ledger line: its title on the left anchor, the excerpt and the link on the
 * right. Same content as the old cards; the Read Article link is stretched
 * over the whole entry and described by the entry's title.
 */
function Entry({ article, index, guideLabel, readArticleLabel }) {
  const titleId = useId();
  const pic = articlePicture(article.image);
  const flip = index % 2 === 1;
  const meta = [article.type || guideLabel, article.category, article.readTime].filter(Boolean).join('  ·  ');
  const title = (
    <h2 id={titleId} className={`hl-title ${cls.h3} text-[1.5rem] lg:text-[1.875rem]`}>
      {article.title}
    </h2>
  );
  const words = (
    <>
      {meta ? <p className='m-0 mt-3 text-[0.875rem] leading-[1.5] text-[#3f5868]'>{meta}</p> : null}
      <p className={`${cls.body} mt-3 max-w-[34rem] sm:text-[1.0625rem]`}>{article.excerpt || article.summary}</p>
      <Link href={getLibraryArticlePath(article)} aria-describedby={titleId} className={`${cls.more} hl-stretch mt-3`}>
        {readArticleLabel}
        <ArrowRight aria-hidden='true' className='size-4' />
      </Link>
    </>
  );

  return (
    <div
      role='listitem'
      data-reveal='rise'
      className={`hl-entry relative ${LIB_GRID} items-center ${pic ? 'gap-7' : 'gap-x-8 gap-y-1'} border-0 border-t border-dashed border-[rgba(27,69,96,0.24)] py-10 lg:py-12`}
    >
      {pic ? (
        <>
          <div className={`order-2 ${flip ? 'lg:order-2' : 'lg:order-1'}`}>
            {title}
            {words}
          </div>
          <div className={`order-1 w-full max-w-[20rem] ${flip ? 'lg:order-1 lg:justify-self-end' : 'lg:order-2'}`}>
            <Postcard
              className='!mx-0'
              src={pic.src}
              srcSet={pic.srcSet}
              sizes='320px'
              alt={article.imageAlt || ''}
              width={pic.width}
              height={pic.height}
              aspect='16 / 9'
              tilt={TILT[index % TILT.length]}
            />
          </div>
        </>
      ) : (
        <>
          <div className='self-start'>{title}</div>
          <div className='self-start'>{words}</div>
        </>
      )}
    </div>
  );
}

export default function ReadingList({ articles, guideLabel, readArticleLabel, label }) {
  return (
    <div role='list' aria-label={label} className='m-0 list-none border-0 border-b border-dashed border-[rgba(27,69,96,0.24)] p-0'>
      {articles.map((article, i) => (
        <Entry key={article.slug} article={article} index={i} guideLabel={guideLabel} readArticleLabel={readArticleLabel} />
      ))}
    </div>
  );
}
