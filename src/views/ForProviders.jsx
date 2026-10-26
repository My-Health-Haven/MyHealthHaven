'use client';
import { ArrowDown, CalendarDays, Stethoscope } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import PaperPage from '@/components/paper/PaperPage';
import PageHero from '@/components/paper/PageHero';
import Sheet from '@/components/paper/Sheet';
import SectionHead from '@/components/paper/SectionHead';
import TileList from '@/components/paper/TileList';
import ClosingCall from '@/components/paper/ClosingCall';
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
    sectionTitle: 'What a partnership',
    sectionEmphasis: 'actually involves',
    sectionLead:
      'MyHealth Haven is not a travel agency. We are a cross-border care navigation partner, and the work is to align U.S. quality expectations with Mexican clinical partners. We begin in established medical hubs such as Cancún and expand as hospital partnerships meet our standards.',
    pillars: [
      {
        title: 'Patients arrive prepared',
        body: 'Medical records, imaging and pre-op requirements are coordinated by the patient’s Health Navigator™ before travel, so your team starts with a complete picture.',
      },
      {
        title: 'A bilingual navigator stays with the patient',
        body: 'The navigator who handled the referral remains available to the patient and their family throughout the day, and keeps communication clear between the patient and hospital staff.',
      },
      {
        title: 'Vetting, then ongoing review',
        body: 'Partner hospitals and surgeons are reviewed against U.S.-level standards before any patient is referred, and that review continues for as long as the partnership does.',
      },
      {
        title: 'Follow-up is coordinated, not dropped',
        body: 'After discharge the navigator coordinates follow-up visits, medications and recovery needs, then continues virtual follow-up with the patient’s U.S. physician once they are home.',
      },
    ],
    docTitle: 'What the provider document covers',
    highlights: [
      'Partnership overview and provider-facing documentation',
      'How care coordination, quality standards, and patient handoff work',
      'Details on credentialing, vetting, and ongoing performance review',
    ],
    closingTitle: 'Start a conversation about partnering.',
    closingLead:
      'Credentials, standards and patient coordination are reviewed before any referral is made. A Health Navigator can explain what that process looks like for your facility.',
    closingPrimary: 'Speak with a Health Navigator',
    closingSecondary: 'See the procedures we coordinate',
  },
  es: {
    title: 'Para Proveedores',
    viewerTitle: 'Documentación para Proveedores',
    openFrame: 'Abrir Documento',
    metaDescription:
      'Recursos para proveedores sobre la asociación con MyHealth Haven en atención transfronteriza guiada, coordinación de pacientes y estándares de calidad.',
    intro:
      'Revise información orientada a proveedores sobre cómo MyHealth Haven se asocia con profesionales médicos e instalaciones para brindar atención transfronteriza estructurada y guiada.',
    sectionTitle: 'Lo que implica',
    sectionEmphasis: 'una asociación',
    sectionLead:
      'MyHealth Haven no es una agencia de viajes. Somos un socio de navegación de atención transfronteriza, y nuestro trabajo es alinear las expectativas de calidad de Estados Unidos con los socios clínicos en México. Comenzamos en centros médicos establecidos como Cancún y nos expandimos a medida que las alianzas hospitalarias cumplen nuestros estándares.',
    pillars: [
      {
        title: 'Los pacientes llegan preparados',
        body: 'El Health Navigator™ del paciente coordina expedientes médicos, estudios de imagen y requisitos preoperatorios antes del viaje, para que su equipo comience con un panorama completo.',
      },
      {
        title: 'Un navegador bilingüe acompaña al paciente',
        body: 'El mismo navegador que gestionó la referencia permanece disponible para el paciente y su familia durante el día, y mantiene clara la comunicación entre el paciente y el personal del hospital.',
      },
      {
        title: 'Verificación y revisión continua',
        body: 'Los hospitales y cirujanos asociados se revisan conforme a estándares de nivel estadounidense antes de cualquier referencia, y esa revisión continúa mientras dure la asociación.',
      },
      {
        title: 'El seguimiento se coordina, no se abandona',
        body: 'Tras el alta, el navegador coordina consultas de seguimiento, medicamentos y necesidades de recuperación, y después continúa el seguimiento virtual con el médico del paciente en Estados Unidos.',
      },
    ],
    docTitle: 'Qué incluye el documento para proveedores',
    highlights: [
      'Resumen de la asociación y documentación orientada a proveedores',
      'Cómo funcionan la coordinación de atención, los estándares de calidad y la transferencia de pacientes',
      'Detalles sobre acreditación, verificación y revisión continua de desempeño',
    ],
    closingTitle: 'Iniciemos una conversación sobre la asociación.',
    closingLead:
      'Revisamos credenciales, estándares y coordinación de pacientes antes de realizar cualquier referencia. Un Health Navigator puede explicarle cómo es ese proceso para su institución.',
    closingPrimary: 'Hablar con un Health Navigator',
    closingSecondary: 'Ver los procedimientos que coordinamos',
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
 * For Providers, in the paper world of the home page. The short title reads as
 * one felt-underlined phrase; the hero leads down to the document and the panel
 * opens it in Google Docs, which keeps the same preview src, title and size on a
 * clinic clipboard.
 *
 * Like For Employers, this page used to render only its title and the document
 * panel, which left the two pages all but word-for-word identical. `intro` and
 * `highlights` already existed here unrendered; `pillars` puts the handoff this
 * audience actually asks about — records ahead of the patient, the navigator in
 * the building, vetting, follow-up home — in the page's own words.
 */
const ForProviders = () => {
  const { language } = useLanguage();
  const copy = COPY[language] || COPY.en;
  const ui = UI[language] || UI.en;

  return (
    <PaperPage>
      <PageHero
        emphasis={copy.title}
        lead={copy.intro}
        frame={{ src: '/pages/procedures-clinic.webp', alt: ui.alt }}
      >
        <a href='#provider-doc' className={`${cls.btnPrimary} w-full sm:w-auto`}>
          <ArrowDown aria-hidden='true' className='size-5' />
          {ui.readDoc}
        </a>
      </PageHero>

      <Sheet tone='kraft' labelledBy='provider-partnership-title'>
        <SectionHead
          id='provider-partnership-title'
          title={copy.sectionTitle}
          emphasis={copy.sectionEmphasis}
          lead={copy.sectionLead}
        />
        <TileList className='mt-12 lg:mt-14' columns={2} items={copy.pillars} />
      </Sheet>

      <Sheet tone='cream' id='provider-doc' labelledBy='provider-doc-title'>
        <SectionHead id='provider-doc-title' title={copy.docTitle} />
        <TileList className='mt-10 max-w-[46rem]' items={copy.highlights} />
        <div className='mt-14 lg:mt-16'>
          <DocumentClipboard
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
        </div>
      </Sheet>

      <ClosingCall
        id='provider-close-title'
        tone='kraft'
        title={copy.closingTitle}
        lead={copy.closingLead}
        primary={{ href: '/schedule', label: copy.closingPrimary, icon: CalendarDays }}
        secondary={{ href: '/procedures', label: copy.closingSecondary, icon: Stethoscope }}
      />
    </PaperPage>
  );
};

export default ForProviders;
