'use client';
import React, { useMemo } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft } from 'lucide-react';

import { LIBRARY_CATEGORY_DETAILS, LIBRARY_PAGE_COPY, getLibraryArticleBySlug } from '../data/libraryContent';
import { useLanguage } from '../context/LanguageContext';
import PaperPage from '@/components/paper/PaperPage';
import Sheet from '@/components/paper/Sheet';
import Postcard from '@/components/paper/Postcard';
import { cls } from '@/components/paper/paperStyles';
import { proseComponents } from '@/components/paper/prose';
import LibraryHero from '@/components/library-paper/LibraryHero';
import Crumbs from '@/components/library-paper/Crumbs';
import ArticleNote from '@/components/library-paper/ArticleNote';
import ArticleRail from '@/components/library-paper/ArticleRail';
import ArticleFaqs from '@/components/library-paper/ArticleFaqs';
import NavyCall from '@/components/library-paper/NavyCall';
import { articlePicture } from '@/components/library-paper/libraryImages';
import { LibraryStyles } from '@/components/library-paper/libraryStyles';
import { libraryLabels } from '@/components/library-paper/labels';

// Format an ISO date (YYYY-MM-DD) for display; returns null if absent/invalid.
const formatDate = (value) => {
  if (!value) return null;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// A heading's text as a stable anchor id ("Why U.S. Healthcare Costs So Much
// More" -> "why-us-healthcare-costs-so-much-more").
const headingId = (text) =>
  String(text)
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

const textOf = (children) =>
  React.Children.toArray(children)
    .map((child) => {
      if (typeof child === 'string' || typeof child === 'number') return String(child);
      return child?.props?.children ? textOf(child.props.children) : '';
    })
    .join('');

// The article's own ## headings, read from its Markdown (inline marks removed).
const tocFrom = (content = '') =>
  [...content.matchAll(/^##\s+(.+?)\s*#*\s*$/gm)].map((match) => {
    const text = match[1].replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/[*_`]/g, '');
    return { id: headingId(text), text };
  });

// The reading styles of the paper kit (.hp-prose: lists as role=list divs),
// with this page's own link rule kept: internal links use next/link
// (client-side navigation); external links open in a new tab with
// rel="noopener noreferrer". Section headings get ids for the side note.
const markdownComponents = {
  ...proseComponents,
  a({ href = '', children }) {
    if (/^https?:\/\//i.test(href)) {
      return (
        <a href={href} target='_blank' rel='noopener noreferrer'>
          {children}
        </a>
      );
    }
    return <Link href={href}>{children}</Link>;
  },
  // eslint-disable-next-line no-unused-vars
  h2: ({ node, children, ...props }) => (
    <h2 id={headingId(textOf(children))} {...props}>
      {children}
    </h2>
  ),
};

/* the sheets after the article alternate kraft and cream; the call is navy */
const toneAfter = (index) => (index % 2 === 0 ? 'kraft' : 'cream');

/*
 * A library article as a reading page in the paper world: the title on the
 * first sheet (its picture as a postcard beside it), the article on a cream
 * sheet at a reading measure with a side note on desktop, then its questions,
 * related articles and the call. Copy is the page's own, unchanged; the
 * article content stays English-only, as before.
 */
const ArticleDetail = ({ slug }) => {
  const article = getLibraryArticleBySlug(slug);
  const { language } = useLanguage();
  const labels = libraryLabels(language);
  const toc = useMemo(() => {
    const items = tocFrom(article?.content);
    return items.length >= 3 ? items : [];
  }, [article?.content]);

  if (!article) {
    notFound();
  }

  // Link the category crumb only when that category has a real hub page.
  const categoryHref = LIBRARY_CATEGORY_DETAILS[article.categorySlug]
    ? `/library/${article.categorySlug}`
    : null;
  const metaParts = [
    article.type,
    article.author,
    formatDate(article.date),
    article.readTime,
  ].filter(Boolean);

  const related = (article.relatedArticles || [])
    .map((relatedSlug) => getLibraryArticleBySlug(relatedSlug))
    .filter(Boolean);

  const pic = articlePicture(article.heroImage);
  const back = categoryHref
    ? { href: categoryHref, label: `${labels.backTo} ${article.category}` }
    : { href: '/library', label: `${labels.backTo} ${(LIBRARY_PAGE_COPY[language] || LIBRARY_PAGE_COPY.en).title}` };

  let after = 0;
  const faqTone = article.faqs.length > 0 ? toneAfter(after++) : null;
  const relatedTone = related.length > 0 ? toneAfter(after++) : null;

  return (
    <PaperPage>
      <LibraryStyles />

      <article className='hl-article'>
        <LibraryHero
          tone='kraft'
          crumbs={
            <Crumbs
              label={labels.breadcrumb}
              compact
              items={[
                { label: 'Home', href: '/' },
                { label: 'Library', href: '/library' },
                ...(categoryHref ? [{ label: article.category, href: categoryHref }] : []),
                { label: article.title },
              ]}
            />
          }
          title={article.title}
          lead={article.excerpt}
          meta={
            metaParts.length > 0 ? (
              <p className='m-0 text-[0.9375rem] leading-[1.6] text-[#5b7180]'>
                {metaParts.map((part, i) => (
                  <React.Fragment key={part}>
                    {i > 0 ? '  ·  ' : null}
                    <span className='whitespace-nowrap'>{part}</span>
                  </React.Fragment>
                ))}
              </p>
            ) : null
          }
          media={
            pic ? (
              <Postcard
                src={pic.src}
                srcSet={pic.srcSet}
                sizes='(min-width: 1024px) 540px, 92vw'
                alt={article.heroImageAlt || article.title}
                width={pic.width}
                height={pic.height}
                aspect={pic.width && pic.height ? `${pic.width} / ${pic.height}` : '16 / 9'}
                tilt='1.6deg'
              />
            ) : null
          }
        />

        {/* the side note needs room: it joins the page's right anchor from xl up,
            so the prose keeps its reading measure on small laptops */}
        <Sheet
          tone='cream'
          className='!pt-14 lg:!pt-20'
          innerClassName='grid grid-cols-1 gap-12 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] xl:gap-x-14'
        >
          <div className='min-w-0'>
            {article.content ? (
              <div className='hp-prose'>
                <ReactMarkdown components={markdownComponents}>{article.content}</ReactMarkdown>
              </div>
            ) : (
              <p className={`${cls.body} sm:text-[1.0625rem]`}>Full content coming soon...</p>
            )}
            <div className='mt-10 border-0 border-t border-dashed border-[rgba(27,69,96,0.24)] pt-6'>
              <Link href={back.href} className={`${cls.more} text-[1.0625rem]`}>
                <ArrowLeft aria-hidden='true' className='size-4' />
                {back.label}
              </Link>
            </div>
          </div>
          {toc.length ? (
            <aside className='hidden xl:block'>
              <div className='sticky top-[120px] max-w-[22rem]'>
                <ArticleRail back={back} toc={toc} tocLabel={labels.onThisPage} />
              </div>
            </aside>
          ) : null}
        </Sheet>

        {faqTone ? <ArticleFaqs id='article-faq-title' title='Frequently Asked Questions' faqs={article.faqs} tone={faqTone} /> : null}
      </article>

      {relatedTone ? (
        <Sheet tone={relatedTone} labelledBy='article-related-title'>
          {/* three related articles run in a row under the heading; one or two
              share the row with it, so the row never ends in a gap */}
          <div className={related.length < 3 ? 'grid grid-cols-1 gap-10 xl:grid-cols-3 xl:items-start xl:gap-8' : ''}>
            <div data-reveal='rise' className={related.length < 3 ? 'xl:pt-4' : ''}>
              <h2 id='article-related-title' className={cls.h2}>
                Related Articles
              </h2>
            </div>
            <div
              role='list'
              className={`m-0 grid list-none grid-cols-1 gap-8 p-0 ${
                related.length < 3 ? 'md:grid-cols-2 xl:col-span-2' : 'mt-10 lg:mt-12 xl:grid-cols-3'
              }`}
            >
              {related.map((relatedArticle, index) => (
                <div
                  role='listitem'
                  key={relatedArticle.slug}
                  data-reveal='drop'
                  style={{ '--i': index, '--r': ['-0.8deg', '0.6deg', '-0.5deg'][index % 3] }}
                  className='hp-note-pin'
                >
                  <ArticleNote
                    article={relatedArticle}
                    guideLabel='Guide'
                    readArticleLabel='Read Article'
                    variant={index}
                    wide={related.length >= 3}
                    sizes='(min-width: 1280px) 400px, (min-width: 768px) 440px, 92vw'
                  />
                </div>
              ))}
            </div>
          </div>
        </Sheet>
      ) : null}

      <NavyCall
        id='article-close-title'
        title='Ready to explore your options?'
        href='/schedule'
        label='Speak with a Health Navigator'
      />
    </PaperPage>
  );
};

export default ArticleDetail;
