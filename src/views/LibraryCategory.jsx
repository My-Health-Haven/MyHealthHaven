'use client';
import React from 'react';
import { CalendarDays } from 'lucide-react';

import {
  LIBRARY_CATEGORY_DETAILS,
  LIBRARY_PAGE_COPY,
  getArticlesByCategory,
} from '../data/libraryContent';
import { useLanguage } from '../context/LanguageContext';
import PaperPage from '@/components/paper/PaperPage';
import Sheet from '@/components/paper/Sheet';
import LibraryHero from '@/components/library-paper/LibraryHero';
import Crumbs from '@/components/library-paper/Crumbs';
import ReadingList from '@/components/library-paper/ReadingList';
import NavyCall from '@/components/library-paper/NavyCall';
import { LibraryStyles } from '@/components/library-paper/libraryStyles';
import { CATEGORY_FRAMES, libraryLabels } from '@/components/library-paper/labels';

/*
 * A library category hub (/library/getting-started, /library/costs-and-planning)
 * in the paper world: the category's own film frame beside its name, its
 * articles as a reading list, then the call. Copy is the page's own, unchanged
 * (the hub copy lives in LIBRARY_CATEGORY_DETAILS; the call lines were written
 * into this view and stay here).
 */
const LibraryCategory = ({ categorySlug }) => {
  const { language } = useLanguage();
  const pageCopy = LIBRARY_PAGE_COPY[language] || LIBRARY_PAGE_COPY.en;
  const labels = libraryLabels(language);

  const details = LIBRARY_CATEGORY_DETAILS[categorySlug];
  const articles = getArticlesByCategory(categorySlug);
  const frame = CATEGORY_FRAMES[categorySlug];

  return (
    <PaperPage>
      <LibraryStyles />

      {/* ── Hero ── */}
      <LibraryHero
        crumbs={
          <Crumbs
            label={labels.breadcrumb}
            items={[
              { label: 'Home', href: '/' },
              { label: pageCopy.title, href: '/library' },
              { label: details?.name },
            ]}
          />
        }
        emphasis={details?.name}
        lead={details?.intro}
        frame={frame ? { src: frame.src, alt: labels.frames[frame.altKey] } : undefined}
      />

      {/* ── Articles ── */}
      <Sheet tone='kraft' className='!pt-10 lg:!pt-14'>
        <ReadingList
          articles={articles}
          guideLabel={pageCopy.guideLabel}
          readArticleLabel={pageCopy.readArticle}
          label={labels.articles}
        />
      </Sheet>

      {/* ── CTA ── */}
      <NavyCall
        id='library-category-close-title'
        title={details?.ctaTitle || 'Have questions about your options?'}
        lead='A health navigator can walk you through your options and answer questions at your own pace.'
        href='/schedule'
        label='Talk to a Health Navigator'
        icon={CalendarDays}
      />
    </PaperPage>
  );
};

export default LibraryCategory;
