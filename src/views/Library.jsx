'use client';
import React, { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowDown, ArrowRight, ShieldCheck } from 'lucide-react';

import { useLanguage } from '../context/LanguageContext';
import {
  LIBRARY_PAGE_COPY,
  LIBRARY_HERO_PILLS,
  LIBRARY_CATEGORIES,
  LIBRARY_CATEGORY_DETAILS,
  getNormalizedArticles,
  getLibraryArticlePath,
} from '../data/libraryContent';
import PaperPage from '@/components/paper/PaperPage';
import Sheet from '@/components/paper/Sheet';
import { cls } from '@/components/paper/paperStyles';
import LibraryHero from '@/components/library-paper/LibraryHero';
import ArticleNote from '@/components/library-paper/ArticleNote';
import CategoryPath from '@/components/library-paper/CategoryPath';
import ResourceLeaflets from '@/components/library-paper/ResourceLeaflets';
import NavyCall from '@/components/library-paper/NavyCall';
import { LibraryStyles, LIB_GRID } from '@/components/library-paper/libraryStyles';
import { libraryLabels } from '@/components/library-paper/labels';

// How many articles the rotating "Featured Topics" grid shows per visit.
const FEATURED_COUNT = 3;

// Fisher–Yates shuffle (returns a new array). Runs client-side only, so it
// never affects the server-rendered HTML.
const shuffleArray = (input) => {
  const arr = [...input];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const GOVERNMENT_LINKS = [
  { href: 'https://wwwnc.cdc.gov/travel/page/medical-tourism', label: 'CDC Medical Tourism' },
  {
    href: 'https://travel.state.gov/content/travel/en/international-travel/before-you-go/your-health-abroad.html',
    label: 'State Dept. - Health Abroad',
  },
];

/* the featured notes sit a little crooked on the kraft sheet, like the home notes */
const NOTE_TILT = ['-0.9deg', '0.7deg', '-0.5deg'];

/*
 * The Learning Library in the paper world of the home page. Copy and data are
 * the library's own (src/data/libraryContent.js), unchanged; the featured
 * shuffle, the category links and the official links work as before. The
 * closing call reuses the home page's own call (home.ctaTitle and friends).
 */
const Library = () => {
  const { language, t } = useLanguage();
  const pageCopy = LIBRARY_PAGE_COPY[language] || LIBRARY_PAGE_COPY.en;
  const labels = libraryLabels(language);

  const articles = useMemo(() => getNormalizedArticles(), []);
  const curatedFeatured = articles.filter((article) => article.featured);
  // Stable "start here" target for the hero button (never randomized).
  const firstArticle = curatedFeatured[0] || articles[0];

  // Rotating "Featured Topics": the server renders a stable, curated set (good
  // for SEO and to avoid a hydration mismatch); after mount we reshuffle so each
  // visit surfaces a different mix of articles as the library grows.
  const initialFeatured = (curatedFeatured.length ? curatedFeatured : articles).slice(
    0,
    FEATURED_COUNT
  );
  const [displayedArticles, setDisplayedArticles] = useState(initialFeatured);
  useEffect(() => {
    setDisplayedArticles(shuffleArray(articles).slice(0, FEATURED_COUNT));
  }, [articles]);

  // Only categories with a hub page link out (as before).
  const categories = LIBRARY_CATEGORIES.map((cat) => ({
    key: cat.key,
    title: pageCopy[cat.titleKey],
    description: pageCopy[cat.descKey],
    href: LIBRARY_CATEGORY_DETAILS[cat.slug] ? `/library/${cat.slug}` : null,
  }));

  // The title's first word stays plain; the rest carries the felt underline.
  const space = pageCopy.title.indexOf(' ');
  const titleHead = space > 0 ? pageCopy.title.slice(0, space) : '';
  const titleTail = space > 0 ? pageCopy.title.slice(space + 1) : pageCopy.title;

  return (
    <PaperPage>
      <LibraryStyles />

      {/* ── Hero ── */}
      <LibraryHero
        title={titleHead}
        emphasis={titleTail}
        lead={pageCopy.subtitle}
        frame={{ src: '/pages/library-questions.webp', alt: labels.frames.questions }}
        footer={
          <div
            role='list'
            aria-label={labels.topics}
            className='m-0 grid list-none grid-cols-1 gap-x-8 gap-y-4 border-0 border-t border-dashed border-[rgba(27,69,96,0.24)] p-0 pt-7 sm:grid-cols-2 lg:grid-cols-4'
          >
            {LIBRARY_HERO_PILLS.map((pill) => (
              <div role='listitem' key={pill.key} className='flex items-start gap-3.5'>
                <span aria-hidden='true' className='hp-tile hp-tile-teal !mt-[0.42em]' />
                <span className='text-[1rem] font-semibold leading-[1.5] text-[#1b4560]'>{pageCopy[pill.labelKey]}</span>
              </div>
            ))}
          </div>
        }
      >
        <Link href={getLibraryArticlePath(firstArticle)} className={cls.btnPrimary}>
          {pageCopy.cta}
          <ArrowRight aria-hidden='true' className='size-5' />
        </Link>
        <p className='m-0 mt-6 flex max-w-[34rem] items-start gap-2.5 text-[0.9375rem] leading-[1.5] text-[#3f5868]'>
          <ShieldCheck aria-hidden='true' className='mt-[1px] size-[18px] shrink-0 text-[#00796b]' />
          {pageCopy.trustLine}
        </p>
      </LibraryHero>

      {/* ── Featured Topics ── */}
      <Sheet tone='kraft' labelledBy='library-featured-title'>
        <div className='flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end'>
          <div data-reveal='rise'>
            <h2 id='library-featured-title' className={cls.h2}>
              {pageCopy.featuredTopics}
            </h2>
          </div>
          <Link href='#explore' className={`${cls.more} text-[1.0625rem]`}>
            {pageCopy.viewAllArticles}
            <ArrowDown aria-hidden='true' className='size-4' />
          </Link>
        </div>

        <div
          role='list'
          aria-label={labels.featured}
          className='m-0 mt-10 grid list-none grid-cols-1 gap-8 p-0 lg:mt-12 xl:grid-cols-3'
        >
          {displayedArticles.map((article, index) => (
            <div
              role='listitem'
              key={article.slug}
              data-reveal='drop'
              style={{ '--i': index, '--r': NOTE_TILT[index % NOTE_TILT.length] }}
              className={`hp-note-pin ${index === 1 ? 'xl:mt-10' : ''}`}
            >
              <ArticleNote
                article={article}
                guideLabel={pageCopy.guideLabel}
                readArticleLabel={pageCopy.readArticle}
                variant={index}
                wide
                sizes='(min-width: 1280px) 400px, (min-width: 768px) 440px, 92vw'
              />
            </div>
          ))}
        </div>
      </Sheet>

      {/* ── Explore by Category ── */}
      <Sheet tone='cream' id='explore' labelledBy='library-explore-title'>
        <div data-reveal='rise'>
          <h2 id='library-explore-title' className={cls.h2}>
            {pageCopy.exploreByCategory}
          </h2>
        </div>
        <div className='mt-10 lg:mt-12'>
          <CategoryPath items={categories} label={labels.categories} />
        </div>
      </Sheet>

      {/* ── Government Resources ── */}
      <Sheet tone='kraft' labelledBy='library-gov-title' innerClassName={`${LIB_GRID} items-center gap-10`}>
        <div data-reveal='rise'>
          <h2 id='library-gov-title' className={cls.h2}>
            {pageCopy.governmentResourcesTitle}
          </h2>
          <p className={cls.lead}>{pageCopy.governmentResourcesBody}</p>
        </div>
        <ResourceLeaflets links={GOVERNMENT_LINKS} newTabLabel={labels.newTab} />
      </Sheet>

      {/* ── Next step ── */}
      <NavyCall
        id='library-close-title'
        title={t('home.ctaTitle')}
        lead={t('home.ctaDesc')}
        href='/schedule'
        label={t('home.scheduleConsultation')}
      />
    </PaperPage>
  );
};

export default Library;
