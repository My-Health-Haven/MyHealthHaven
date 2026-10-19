'use client';
import { ArrowDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import PaperPage from '@/components/paper/PaperPage';
import PageHero from '@/components/paper/PageHero';
import Sheet from '@/components/paper/Sheet';
import { cls } from '@/components/paper/paperStyles';
import { DocumentClipboard, OpenDocumentLink } from '@/components/partners-paper/DocumentPanel';

const GOOGLE_DOC_URL =
  'https://docs.google.com/document/d/1nIfNNsPdV0ZApVAkHKaeWnFv-oR8EI9YqQSOMeCWFTY/edit?usp=sharing';
const GOOGLE_DOC_PREVIEW_URL =
  'https://docs.google.com/document/d/1nIfNNsPdV0ZApVAkHKaeWnFv-oR8EI9YqQSOMeCWFTY/preview';

const COPY = {
  en: {
    title: 'For Providers',
    viewerTitle: 'Provider Documentation',
    openFrame: 'Open Document',
    metaDescription:
      'Provider resources for partnering with MyHealth Haven on guided cross-border care, patient coordination, and quality standards.',
    intro:
      'Review provider-facing information about how MyHealth Haven partners with medical professionals and facilities to deliver structured, guided cross-border care.',
    highlights: [
      'Partnership overview and provider-facing documentation',
      'How care coordination, quality standards, and patient handoff work',
      'Details on credentialing, vetting, and ongoing performance review',
    ],
  },
  es: {
    title: 'Para Proveedores',
    viewerTitle: 'Documentacion para Proveedores',
    openFrame: 'Abrir Documento',
    metaDescription:
      'Recursos para proveedores sobre la asociacion con MyHealth Haven en atencion transfronteriza guiada, coordinacion de pacientes y estandares de calidad.',
    intro:
      'Revise informacion orientada a proveedores sobre como MyHealth Haven se asocia con profesionales medicos e instalaciones para brindar atencion transfronteriza estructurada y guiada.',
    highlights: [
      'Resumen de la asociacion y documentacion orientada a proveedores',
      'Como funcionan la coordinacion de atencion, los estandares de calidad y la transferencia de pacientes',
      'Detalles sobre acreditacion, verificacion y revision continua de desempeno',
    ],
  },
};

/* new UI strings only: the hero frame's alt text, the jump to the document and the
   new-tab hint for screen readers */
const UI = {
  en: {
    alt: 'Illustration from the MyHealth Haven film: a clean, well-equipped clinic exam room with monitors, supplies and a treatment bed.',
    readDoc: 'Read the document',
    newTab: '(opens in a new tab)',
  },
  es: {
    alt: 'Ilustración de la película de MyHealth Haven: un consultorio clínico limpio y bien equipado, con monitores, insumos y una camilla.',
    readDoc: 'Leer el documento',
    newTab: '(se abre en una pestaña nueva)',
  },
};

/*
 * For Providers, in the paper world of the home page. The copy above is the
 * site's own, unchanged (intro and highlights stay unrendered, as before). The
 * short title reads as one felt-underlined phrase. One action each: the hero
 * leads down to the document, the panel opens it in Google Docs. The Google Doc
 * keeps the same preview src, title and size, now on a clinic clipboard.
 */
const ForProviders = () => {
  const { language } = useLanguage();
  const copy = COPY[language] || COPY.en;
  const ui = UI[language] || UI.en;

  return (
    <PaperPage>
      <PageHero emphasis={copy.title} frame={{ src: '/pages/procedures-clinic.webp', alt: ui.alt }}>
        <a href='#provider-doc' className={`${cls.btnPrimary} w-full sm:w-auto`}>
          <ArrowDown aria-hidden='true' className='size-5' />
          {ui.readDoc}
        </a>
      </PageHero>

      <Sheet tone='kraft' id='provider-doc' labelledBy='provider-doc-title'>
        <DocumentClipboard
          titleId='provider-doc-title'
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
        </DocumentClipboard>
      </Sheet>
    </PaperPage>
  );
};

export default ForProviders;
