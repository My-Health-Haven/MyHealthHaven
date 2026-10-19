'use client';
import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { BadgeDollarSign, CalendarDays, LayoutGrid, List } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useProcedures } from '../lib/useProcedures';
import { SPECIALITY_META, getSpecialityMeta } from '../data/specialityMeta';
import PaperPage from '@/components/paper/PaperPage';
import PageHero from '@/components/paper/PageHero';
import Sheet from '@/components/paper/Sheet';
import { FilmWindow } from '@/components/paper/parts';
import { cls } from '@/components/paper/paperStyles';
import PaperSearch from '@/components/procedures-paper/PaperSearch';
import IndexGroup from '@/components/procedures-paper/IndexGroup';
import IndexDrawer from '@/components/procedures-paper/IndexDrawer';
import { PROC_CSS } from '@/components/procedures-paper/procStyles';

/* UI labels and alt text only (the catalog itself comes from data/procedures) */
const UI = {
  en: {
    about: 'About this procedure',
    nextSteps: 'Next steps',
    consultAlt: 'Illustration from the MyHealth Haven film: a doctor talks with a patient across her desk.',
    labAlt: 'Illustration from the MyHealth Haven film: a lab technician looks through a microscope beside a rack of samples.',
  },
  es: {
    about: 'Acerca de este procedimiento',
    nextSteps: 'Próximos pasos',
    consultAlt: 'Ilustración de la película de MyHealth Haven: una doctora conversa con una paciente en su consultorio.',
    labAlt: 'Ilustración de la película de MyHealth Haven: una técnica de laboratorio mira por un microscopio junto a una gradilla de muestras.',
  },
};

/*
 * Procedures, in the paper world of the home page. The catalog is the heart of
 * the page and is set like an index on paper: the search is cut into the hero
 * sheet beside the film frame, the specialities follow on kraft (grid view: two
 * columns, five entries each until "View more"; list view: one drawer per
 * speciality), and the page's two calls close it on the navy sheet with the lab
 * frame. Search, grouping, the view switch, the drawers and the entries behave
 * exactly as before; only the look changed.
 */
const Procedures = () => {
  const { language, t } = useLanguage();
  const [expandedSpecialities, setExpandedSpecialities] = useState(() => new Set());
  const [viewMode, setViewMode] = useState('grid');

  const { procedures, searchQuery, selectedFilters, handleSearch, clearFilters } = useProcedures();

  const proceduresBySpeciality = useMemo(() => {
    const groups = new Map();
    for (const meta of SPECIALITY_META) {
      groups.set(meta.key, []);
    }
    for (const procedure of procedures) {
      const key = procedure.section_group;
      if (groups.has(key)) {
        groups.get(key).push(procedure);
      } else if (key) {
        groups.set(key, [procedure]);
      }
    }
    return groups;
  }, [procedures]);

  const isUserSearchingOrFiltering = Boolean(
    searchQuery || Object.keys(selectedFilters).length > 0
  );

  const visibleSpecialities = useMemo(() => {
    return SPECIALITY_META.map((meta) => {
      const list = proceduresBySpeciality.get(meta.key) || [];
      return { meta, procedures: list };
    }).filter(({ procedures: list }) => list.length > 0);
  }, [proceduresBySpeciality]);

  const toggleSpeciality = (key) => {
    setExpandedSpecialities((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const handleViewModeChange = (_event, nextMode) => {
    if (nextMode) setViewMode(nextMode);
  };

  const isSpecialityExpanded = (key) =>
    isUserSearchingOrFiltering ? true : expandedSpecialities.has(key);

  const noResultsLabel =
    t('proceduresPage.noResults') ||
    (language === 'es'
      ? 'No se encontraron procedimientos que coincidan con sus criterios.'
      : 'No procedures found matching your criteria.');

  const buildSpecialityMeta = (meta) => {
    const baseMeta = getSpecialityMeta(meta.key);
    return {
      ...baseMeta,
      displayName: meta.name?.[language] || meta.name?.en || meta.key,
      description: meta.description?.[language] || meta.description?.en || '',
    };
  };

  const viewMoreLabel = (hidden) =>
    language === 'es'
      ? `Ver ${hidden} procedimiento${hidden === 1 ? '' : 's'} más`
      : `View ${hidden} more procedure${hidden === 1 ? '' : 's'}`;

  const viewLessLabel = language === 'es' ? 'Ver menos' : 'Show less';

  const ui = UI[language] || UI.en;
  const [tallyHead, tallyTail = ''] = String(t('proceduresPage.showingResults')).split('{count}');

  return (
    <PaperPage>
      <style>{PROC_CSS}</style>

      <PageHero className='pr-hero' emphasis={t('navbar.procedures')} frame={{ src: '/pages/procedures-consult.webp', alt: ui.consultAlt }}>
        <div className='max-w-[38rem]'>
          <PaperSearch onSearch={handleSearch} initialValue={searchQuery} />
          <div className='mt-5 flex flex-wrap items-center justify-between gap-x-6 gap-y-4'>
            <p className='pr-tally' aria-live='polite'>
              {tallyHead}
              <strong>{procedures.length}</strong>
              {tallyTail}
            </p>
            <div role='group' aria-label={language === 'es' ? 'Vista' : 'View mode'} className='pr-switch'>
              <button type='button' aria-pressed={viewMode === 'list'} onClick={(event) => handleViewModeChange(event, 'list')}>
                <List aria-hidden='true' className='size-[18px]' />
                {language === 'es' ? 'Lista' : 'List'}
              </button>
              <button type='button' aria-pressed={viewMode === 'grid'} onClick={(event) => handleViewModeChange(event, 'grid')}>
                <LayoutGrid aria-hidden='true' className='size-[18px]' />
                {language === 'es' ? 'Cuadrícula' : 'Grid'}
              </button>
            </div>
          </div>
        </div>
      </PageHero>

      <Sheet tone='kraft' className='!pt-14 lg:!pt-20'>
        {visibleSpecialities.length === 0 ? (
          <div data-reveal='rise' className='pr-empty'>
            <p className={`${cls.h3} m-0`}>{noResultsLabel}</p>
            <button type='button' onClick={clearFilters} className={`${cls.btnOutline} mt-7 cursor-pointer`}>
              {t('proceduresPage.clearAll') || 'Clear all filters'}
            </button>
          </div>
        ) : viewMode === 'list' ? (
          <div className='pr-drawers'>
            {visibleSpecialities.map(({ meta, procedures: list }, index) => {
              const fullMeta = buildSpecialityMeta(meta);
              return (
                <IndexDrawer
                  key={meta.key}
                  index={index}
                  speciality={fullMeta}
                  procedures={list}
                  expanded={isSpecialityExpanded(meta.key)}
                  onToggle={() => toggleSpeciality(meta.key)}
                  aboutLabel={ui.about}
                />
              );
            })}
          </div>
        ) : (
          <div className='pr-groups'>
            {visibleSpecialities.map(({ meta, procedures: list }, index) => {
              const fullMeta = buildSpecialityMeta(meta);
              const isLastOddItem =
                index === visibleSpecialities.length - 1 && visibleSpecialities.length % 2 === 1;
              return (
                <IndexGroup
                  key={meta.key}
                  index={index}
                  speciality={fullMeta}
                  procedures={list}
                  viewMoreLabel={viewMoreLabel}
                  viewLessLabel={viewLessLabel}
                  wide={isLastOddItem}
                  forceShowAll={isUserSearchingOrFiltering}
                  aboutLabel={ui.about}
                />
              );
            })}
          </div>
        )}
      </Sheet>

      <section aria-label={ui.nextSteps} className={`hp-sheet hp-navy ${cls.pad}`}>
        <div className={`${cls.wrap} grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16`}>
          <div data-reveal='slot'>
            <FilmWindow src='/pages/procedures-lab.webp' alt={ui.labAlt} sizes='(min-width: 1024px) 720px, 100vw' />
          </div>
          <div data-reveal='rise' className='flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:mx-auto lg:w-full lg:max-w-[24rem] lg:flex-col'>
            <Link
              href='/estimate'
              className='hp-btn inline-flex min-h-[60px] items-center justify-center gap-2.5 rounded-full border-2 border-solid border-transparent bg-[#f4eee5] px-7 text-[1.125rem] font-semibold text-[#1b4560] no-underline hover:bg-white focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#f4eee5] [&>svg]:shrink-0'
            >
              <BadgeDollarSign aria-hidden='true' className='size-5' />
              {t('navbar.freeEstimate')}
            </Link>
            <Link
              href='/schedule'
              className='hp-btn inline-flex min-h-[60px] items-center justify-center gap-2.5 rounded-full border-2 border-solid border-[rgba(244,238,229,0.7)] bg-transparent px-7 text-[1.125rem] font-semibold text-[#f4eee5] no-underline hover:bg-[rgba(244,238,229,0.08)] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#f4eee5] [&>svg]:shrink-0'
            >
              <CalendarDays aria-hidden='true' className='size-5' />
              {t('navbar.schedule')}
            </Link>
          </div>
        </div>
      </section>
    </PaperPage>
  );
};

export default Procedures;
