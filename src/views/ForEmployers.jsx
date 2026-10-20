'use client';
import { ArrowDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import PaperPage from '@/components/paper/PaperPage';
import PageHero from '@/components/paper/PageHero';
import Sheet from '@/components/paper/Sheet';
import { cls } from '@/components/paper/paperStyles';
import { DocumentFolder, OpenDocumentLink } from '@/components/partners-paper/DocumentPanel';

const GOOGLE_DOC_URL =
  'https://docs.google.com/document/d/1jWAls4pNKGwofLfdTIMVhhCrZvdIfwFF9vjJShqG7qs/edit?usp=sharing';
const GOOGLE_DOC_PREVIEW_URL =
  'https://docs.google.com/document/d/1jWAls4pNKGwofLfdTIMVhhCrZvdIfwFF9vjJShqG7qs/preview';

const COPY = {
  en: {
    title: 'For Employers',
    viewerTitle: 'Employer Documentation',
    openFrame: 'Open Document',
    metaDescription:
      'Employer resources for evaluating guided cross-border care, cost transparency, and patient support through MyHealth Haven.',
    intro:
      'Review employer-facing information about how MyHealth Haven supports teams exploring structured, guided access to care in Mexico.',
    highlights: [
      'Program overview and employer-facing documentation',
      'How care coordination, travel support, and patient guidance work',
      'A sample resource your team can download and review offline',
    ],
  },
  es: {
    title: 'Para Empleadores',
    viewerTitle: 'Documentacion para Empleadores',
    openFrame: 'Abrir Documento',
    metaDescription:
      'Recursos para empleadores sobre atencion transfronteriza guiada, claridad de costos y acompanamiento al paciente con MyHealth Haven.',
    intro:
      'Revise informacion orientada a empleadores sobre como MyHealth Haven apoya a equipos que exploran acceso estructurado y guiado a atencion en Mexico.',
    highlights: [
      'Resumen del programa y documentacion orientada a empleadores',
      'Como funcionan la coordinacion de atencion, el apoyo de viaje y el acompanamiento al paciente',
      'Un recurso de ejemplo que su equipo puede descargar y revisar sin conexion',
    ],
  },
};

/* new UI strings only: the hero frame's alt text, the jump to the document and the
   new-tab hint for screen readers */
const UI = {
  en: {
    alt: 'Illustration from the MyHealth Haven film: a patient and her Health Navigator stand side by side among three care scenes: a video call, a treatment chair with a clock, and a path through the countryside.',
    readDoc: 'Read the document',
    newTab: '(opens in a new tab)',
  },
  es: {
    alt: 'Ilustración de la película de MyHealth Haven: una paciente y su Health Navigator, una al lado de la otra, entre tres escenas de atención: una videollamada, un sillón de tratamiento con un reloj y un camino por el campo.',
    readDoc: 'Leer el documento',
    newTab: '(se abre en una pestaña nueva)',
  },
};

/*
 * For Employers, in the paper world of the home page. The copy above is the
 * site's own, unchanged (intro and highlights stay unrendered, as before). The
 * short title reads as one felt-underlined phrase. One action each: the hero
 * leads down to the document, the panel opens it in Google Docs. The Google Doc
 * keeps the same preview src, title and size, now in a manila folder.
 */
const ForEmployers = () => {
  const { language } = useLanguage();
  const copy = COPY[language] || COPY.en;
  const ui = UI[language] || UI.en;

  return (
    <PaperPage>
      <PageHero emphasis={copy.title} frame={{ src: '/pages/employers-pair.webp', alt: ui.alt }}>
        <a href='#employer-doc' className={`${cls.btnPrimary} w-full sm:w-auto`}>
          <ArrowDown aria-hidden='true' className='size-5' />
          {ui.readDoc}
        </a>
      </PageHero>

      <Sheet tone='kraft' id='employer-doc' labelledBy='employer-doc-title'>
        <DocumentFolder
          titleId='employer-doc-title'
          title={copy.viewerTitle}
          action={
            <OpenDocumentLink
              href={GOOGLE_DOC_URL}
              label={copy.openFrame}
              newTabLabel={ui.newTab}
              variant='outline'
            />
          }
        >
          <iframe
            title={copy.viewerTitle}
            src={GOOGLE_DOC_PREVIEW_URL}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 0,
            }}
          />
        </DocumentFolder>
      </Sheet>
    </PaperPage>
  );
};

export default ForEmployers;
