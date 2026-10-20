'use client';
import Link from 'next/link';
import { CalendarDays } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import PaperPage from '@/components/paper/PaperPage';
import PageHero from '@/components/paper/PageHero';
import Sheet from '@/components/paper/Sheet';
import TileList from '@/components/paper/TileList';
import VideoWindow from '@/components/paper/VideoWindow';
import { cls } from '@/components/paper/paperStyles';
import NavigatorWork from '@/components/navigators-paper/NavigatorWork';
import FifteenClock from '@/components/navigators-paper/FifteenClock';
import { NAV_CSS } from '@/components/navigators-paper/navStyles';

/* UI labels and alt text only; every other word on the page is the site's own copy
   (navigatorsPage.* and home.meetNavigatorsTitle in src/data/translations.js) */
const UI = {
  en: {
    heroAlt:
      "Illustration from the MyHealth Haven film: a laptop screen shows a Health Navigator's portrait beside the patient's journey, a path of stops from care to home.",
    play: 'Play the video Meet Your Health Navigator, 2 minutes 10 seconds',
    video: 'Meet Your Health Navigator, 2 minutes 10 seconds',
    close: 'Close the video',
  },
  es: {
    heroAlt:
      'Ilustración de la película de MyHealth Haven: la pantalla de una laptop muestra el retrato de una Health Navigator junto al recorrido del paciente, un camino de paradas desde la atención hasta el hogar.',
    play: 'Reproducir el video Conozca a su Health Navigator, 2 minutos 10 segundos',
    video: 'Conozca a su Health Navigator, 2 minutos 10 segundos',
    close: 'Cerrar el video',
  },
};

/* where the hero title breaks onto its underlined line, and the words the "what
   they do" heading underlines; if the copy changes, the text simply runs plain */
const HERO_HEAD = { en: 'Your advocate', es: 'Su defensor' };
const STEP_WORDS = { en: 'every step', es: 'cada paso' };

const splitAt = (text, phrase) => {
  if (typeof text !== 'string' || !phrase) return null;
  const at = text.indexOf(phrase);
  return at < 0 ? null : [text.slice(0, at), phrase, text.slice(at + phrase.length)];
};

/*
 * Your Health Navigator, in the paper world of the home page. The copy is the
 * site's own, unchanged; the old eyebrow label is not shown (the heading leads;
 * it names the path for screen readers instead).
 *
 * 1. hero: the Navigator's laptop with the patient's journey, and the call
 * 2. kraft: what the Navigator does (the Navigator's card + a path of five stops)
 * 3. cream: the Navigator video in a window, with the three promises
 * 4. navy: the fifteen-minute conversation
 */
const Navigators = () => {
  const { t, language } = useLanguage();
  const lang = language === 'es' ? 'es' : 'en';
  const ui = UI[lang];

  const list = t('navigatorsPage.whatTheyDoList');
  const notes = t('navigatorsPage.whatTheyDoDescriptions');
  const item = (i) => ({ title: Array.isArray(list) ? list[i] : '', body: Array.isArray(notes) ? notes[i] : '' });
  /* the Navigator (the advocate, the single point of contact, always reachable) */
  const card = [0, 1, 7].map(item).filter((x) => x.title);
  /* what the Navigator does, in the list's own order */
  const steps = [2, 3, 4, 5, 6].map(item).filter((x) => x.title);

  const title = t('navigatorsPage.title');
  const head = HERO_HEAD[lang];
  const heroSplit = typeof title === 'string' && title.startsWith(head) && title.length > head.length;

  const whatTitle = t('navigatorsPage.whatYouGetTitle');
  const whatParts = splitAt(whatTitle, STEP_WORDS[lang]);
  const heading = whatParts ? (
    <>
      {whatParts[0]}
      <span className='hp-felt-text hp-felt-lines whitespace-nowrap'>{whatParts[1]}</span>
      {whatParts[2]}
    </>
  ) : (
    whatTitle
  );

  const indicators = [t('navigatorsPage.indicatorCompassionate'), t('navigatorsPage.indicatorAdvocate'), t('navigatorsPage.indicatorTrusted')];
  const closer = t('navigatorsPage.meetCloser');
  const closerLines = typeof closer === 'string' ? closer.split(/(?<=\.)\s+/) : [closer];

  const finalTitle = t('navigatorsPage.finalCtaTitle');
  const figure = typeof finalTitle === 'string' ? finalTitle.match(/\d+/)?.[0] : null;
  /* the length of the call ("15-minute", "15 minutos") never breaks across lines */
  const lengthWords = typeof finalTitle === 'string' ? finalTitle.match(/\d+[-\s]\S+/)?.[0] : null;
  const finalParts = lengthWords ? splitAt(finalTitle, lengthWords) : null;
  const finalHeading = finalParts ? (
    <>
      {finalParts[0]}
      <span className='whitespace-nowrap'>{finalParts[1]}</span>
      {finalParts[2]}
    </>
  ) : (
    finalTitle
  );

  return (
    <PaperPage>
      <style>{NAV_CSS}</style>

      <PageHero
        title={heroSplit ? `${head} ` : title}
        emphasis={heroSplit ? title.slice(head.length).trim() : undefined}
        lead={t('navigatorsPage.subtitle')}
        frame={{ src: '/pages/navigators-laptop.webp', alt: ui.heroAlt }}
      >
        <Link href='/schedule' className={cls.btnPrimary}>
          <CalendarDays aria-hidden='true' className='size-5' />
          {t('navigatorsPage.cta')}
        </Link>
      </PageHero>

      <Sheet tone='kraft' labelledBy='nav-does-title'>
        <NavigatorWork
          headingId='nav-does-title'
          heading={heading}
          lead={t('navigatorsPage.whatYouGetSubtitle')}
          card={card}
          steps={steps}
          cta={{ href: '/schedule', label: t('navigatorsPage.cta') }}
          pathLabel={t('navigatorsPage.whatYouGetEyebrow')}
          stepLabel={t('home.step')}
        />
      </Sheet>

      <Sheet tone='cream' labelledBy='nav-meet-title'>
        <div className='grid grid-cols-1 gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:grid-rows-[auto_1fr] xl:gap-x-20'>
          {/* words left, the video right (the closing sheet below puts its figure left); phones: heading, video, promises */}
          <div data-reveal='rise' className='lg:col-start-1 lg:row-start-1'>
            <h2 id='nav-meet-title' className={cls.h2}>
              {t('home.meetNavigatorsTitle')}
            </h2>
            <p className={cls.lead}>{t('navigatorsPage.meetDesc')}</p>
          </div>
          <div data-reveal='slot' className='lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center'>
            <VideoWindow
              src='/Meet Your Health Navigator.mp4'
              poster='/pages/navigators-table.webp'
              duration='2:10'
              labels={{ play: ui.play, video: ui.video, close: ui.close }}
              sizes='(min-width: 1024px) 760px, 100vw'
            />
          </div>
          <div className='lg:col-start-1 lg:row-start-2'>
            <TileList items={indicators.filter(Boolean)} />
            <p data-reveal='rise' className='mb-0 mt-9 border-0 border-t border-solid border-[rgba(27,69,96,0.16)] pt-6 font-[family-name:var(--font-hh-display)] text-[1.375rem] leading-[1.3] text-[#1b4560] sm:text-[1.5rem]'>
              {closerLines.map((line, i) => (
                <span key={i} className='block'>
                  {line}
                  {i < closerLines.length - 1 ? ' ' : null}
                </span>
              ))}
            </p>
          </div>
        </div>
      </Sheet>

      <Sheet tone='navy' labelledBy='nav-close-title'>
        <div className='mx-auto grid max-w-[64rem] grid-cols-1 items-center gap-10 md:grid-cols-[auto_minmax(0,1fr)] md:gap-14 lg:gap-20'>
          {figure ? <FifteenClock figure={figure} /> : null}
          <div data-reveal='rise'>
            <h2 id='nav-close-title' className={`${cls.h2} text-[#f4eee5]`}>
              {finalHeading}
            </h2>
            <p className='mb-0 mt-5 max-w-[36rem] text-[1.0625rem] leading-[1.6] text-[#d3dde2] [text-wrap:pretty] sm:text-[1.1875rem]'>{t('navigatorsPage.finalCtaDesc')}</p>
            <div className='mt-9'>
              <Link
                href='/schedule'
                className='hp-btn inline-flex min-h-[54px] items-center justify-center gap-2.5 rounded-full border-2 border-solid border-transparent bg-[#f4eee5] px-6 text-[1.0625rem] font-semibold text-[#1b4560] no-underline hover:bg-white focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#f4eee5] [&>svg]:shrink-0'
              >
                <CalendarDays aria-hidden='true' className='size-5' />
                {t('navigatorsPage.finalCtaButton')}
              </Link>
            </div>
          </div>
        </div>
      </Sheet>
    </PaperPage>
  );
};

export default Navigators;
