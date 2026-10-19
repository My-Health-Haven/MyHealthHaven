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
 * article in the data's order, on the page's two anchors: the words on the
 * left one, the article's picture as a postcard on the right one. An entry
 * without a picture becomes a ledger line instead: its title on the left
 * anchor, the excerpt and the link on the right. Same content as the old
 * cards; the Read Article link is stretched over the whole entry.
 */
export default function ReadingList({ articles, guideLabel, readArticleLabel, label }) {
  return (
    <div role='list' aria-label={label} className='m-0 list-none border-0 border-b border-dashed border-[rgba(27,69,96,0.24)] p-0'>
      {articles.map((article, i) => {
        const pic = articlePicture(article.image);
        const meta = [article.type || guideLabel, article.category, article.readTime].filter(Boolean).join('  ·  ');
        const title = <h2 className={`hl-title ${cls.h3} text-[1.5rem] lg:text-[1.875rem]`}>{article.title}</h2>;
        const words = (
          <>
            {meta ? <p className='m-0 mt-3 text-[0.875rem] leading-[1.5] text-[#5b7180]'>{meta}</p> : null}
            <p className={`${cls.body} mt-3 max-w-[34rem] sm:text-[1.0625rem]`}>{article.excerpt || article.summary}</p>
            <Link href={getLibraryArticlePath(article)} className={`${cls.more} hl-stretch mt-3`}>
              {readArticleLabel}
              <ArrowRight aria-hidden='true' className='size-4' />
            </Link>
          </>
        );
        return (
          <div
            role='listitem'
            key={article.slug}
            data-reveal='rise'
            className={`hl-entry relative ${LIB_GRID} items-center ${pic ? 'gap-8' : 'gap-x-8 gap-y-1'} border-0 border-t border-dashed border-[rgba(27,69,96,0.24)] py-10 lg:py-12`}
          >
            {pic ? (
              <>
                <div className='order-2 lg:order-1'>
                  {title}
                  {words}
                </div>
                <div className='order-1 w-full max-w-[30rem] lg:order-2'>
                  <Postcard
                    className='!mx-0'
                    src={pic.src}
                    srcSet={pic.srcSet}
                    sizes='(min-width: 640px) 480px, 92vw'
                    alt={article.imageAlt || ''}
                    width={pic.width}
                    height={pic.height}
                    aspect='16 / 9'
                    tilt={TILT[i % TILT.length]}
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
      })}
    </div>
  );
}
