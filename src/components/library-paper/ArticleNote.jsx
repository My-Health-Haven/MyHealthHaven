import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cls } from '@/components/paper/paperStyles';
import { getLibraryArticlePath } from '@/data/libraryContent';
import ArticleCover from './ArticleCover';

/*
 * Paper version of LibraryArticleCard: the article as a note on the sheet, its
 * picture glued in at the top. Same content as the old card (type, title,
 * category, read time, excerpt, the Read Article link); the type label joins
 * the meta line under the title instead of sitting above it as a badge. The
 * one link is stretched over the whole note, so the note is one tab stop.
 *
 * wide: on tablets and small laptops (md to xl) the picture sits beside the
 * words, not above them.
 */
export default function ArticleNote({ article, guideLabel, readArticleLabel, variant = 0, wide = false, sizes }) {
  const meta = [article.type || guideLabel, article.category, article.readTime].filter(Boolean).join('  ·  ');
  return (
    <article
      className={`hl-card hp-note relative flex h-full flex-col rounded-[6px] p-3 sm:p-3.5 ${
        wide ? 'md:grid md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] md:items-start md:gap-3 xl:flex xl:items-stretch' : ''
      }`}
    >
      <ArticleCover image={article.image} alt={article.imageAlt} variant={variant} sizes={sizes} />
      <div className={`flex flex-1 flex-col px-2.5 pb-2.5 pt-5 sm:px-3.5 ${wide ? 'md:h-full md:pt-3 xl:pt-5' : ''}`}>
        <h3 className={`hl-title ${cls.h3} lg:text-[1.4375rem]`}>{article.title}</h3>
        {meta ? <p className='m-0 mt-2.5 text-[0.875rem] leading-[1.5] text-[#5b7180]'>{meta}</p> : null}
        <p className={`${cls.body} mt-3 flex-1`}>{article.excerpt || article.summary}</p>
        <Link href={getLibraryArticlePath(article)} className={`${cls.more} hl-stretch mt-3 self-start`}>
          {readArticleLabel}
          <ArrowRight aria-hidden='true' className='size-4' />
        </Link>
      </div>
    </article>
  );
}
