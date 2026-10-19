import { useId } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cls } from '@/components/paper/paperStyles';
import { getLibraryArticlePath } from '@/data/libraryContent';
import ArticleCover from './ArticleCover';
import { articlePicture } from './libraryImages';

/*
 * Paper version of LibraryArticleCard: the article as a note on the sheet.
 * Same content as the old card (type, title, category, read time, excerpt,
 * the Read Article link); the type label joins the meta line under the title
 * instead of sitting above it as a badge. The one link is stretched over the
 * whole note, so the note is one tab stop, and it is described by the title.
 *
 * - With a picture, the picture is glued in at the top.
 * - Without one, the note is typographic: a felt tile and a larger title, as
 *   the hub's reading list sets its picture-less entries.
 * - wide: on tablets and small laptops (md to xl) the note runs across: the
 *   picture (or the title) beside the words, not above them.
 */
export default function ArticleNote({ article, guideLabel, readArticleLabel, wide = false, sizes }) {
  const titleId = useId();
  const pic = articlePicture(article.image);
  const meta = [article.type || guideLabel, article.category, article.readTime].filter(Boolean).join('  ·  ');
  const across = wide ? 'md:grid md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] md:items-start xl:flex xl:items-stretch' : '';

  const title = (
    <h3 id={titleId} className={`hl-title ${cls.h3} ${pic ? 'lg:text-[1.4375rem]' : 'text-[1.625rem]'}`}>
      {article.title}
    </h3>
  );
  const words = (
    <>
      {meta ? <p className='m-0 mt-2.5 text-[0.875rem] leading-[1.5] text-[#3f5868]'>{meta}</p> : null}
      <p className={`${cls.body} mt-3 flex-1`}>{article.excerpt || article.summary}</p>
      <Link href={getLibraryArticlePath(article)} aria-describedby={titleId} className={`${cls.more} hl-stretch mt-3 self-start`}>
        {readArticleLabel}
        <ArrowRight aria-hidden='true' className='size-4' />
      </Link>
    </>
  );

  if (!pic) {
    return (
      <article className={`hl-card hp-note relative flex h-full flex-col rounded-[6px] p-6 sm:p-7 ${wide ? `${across} md:gap-x-8` : ''}`}>
        <div>
          <span aria-hidden='true' className='hp-tile hp-tile-teal !mt-0 mb-5 block' />
          {title}
        </div>
        <div className={`flex flex-1 flex-col ${wide ? 'md:h-full md:pt-[30px] xl:pt-0' : ''}`}>{words}</div>
      </article>
    );
  }

  return (
    <article className={`hl-card hp-note relative flex h-full flex-col rounded-[6px] p-3 sm:p-3.5 ${wide ? `${across} md:gap-3` : ''}`}>
      <ArticleCover image={article.image} alt={article.imageAlt} sizes={sizes} />
      <div className={`flex flex-1 flex-col px-2.5 pb-2.5 pt-5 sm:px-3.5 ${wide ? 'md:h-full md:pt-3 xl:pt-5' : ''}`}>
        {title}
        {words}
      </div>
    </article>
  );
}
