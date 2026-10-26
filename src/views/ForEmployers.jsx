'use client';
import { ArrowDown, CalendarDays, Mail, Route } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import PaperPage from '@/components/paper/PaperPage';
import PageHero from '@/components/paper/PageHero';
import Sheet from '@/components/paper/Sheet';
import SectionHead from '@/components/paper/SectionHead';
import TileList from '@/components/paper/TileList';
import ClosingCall from '@/components/paper/ClosingCall';
import { cls } from '@/components/paper/paperStyles';
import { SITE_EMAIL } from '@/lib/siteSeo';

// The employer documentation used to be embedded here from Google Docs. The
// document is not public, so the frame only ever offered visitors a Google
// sign-in box; the section says what the document covers and offers a way to
// ask for it instead.
const REQUEST_MAILTO = `mailto:${SITE_EMAIL}?subject=${encodeURIComponent(
  'Employer documentation request'
)}`;

const COPY = {
  en: {
    title: 'For Employers',
    requestDoc: 'Request the full document',
    metaDescription:
      'Employer resources for evaluating guided cross-border care, cost transparency, and patient support through MyHealth Haven.',
    intro:
      'Review employer-facing information about how MyHealth Haven supports teams exploring structured, guided access to care in Mexico.',
    sectionTitle: 'What guided care looks like',
    sectionEmphasis: 'for your people',
    sectionLead:
      'Employees postpone necessary procedures because of high costs, long wait times, or insurance rules that are hard to read. MyHealth Haven gives them a guided route through care in Mexico rather than a list of options to work out alone.',
    pillars: [
      {
        title: 'One point of contact',
        body: 'Each employee works with a dedicated bilingual Health Navigator™ who stays with them from the first question through recovery, so nobody is coordinating care across two countries on their own.',
      },
      {
        title: 'Costs known before anyone travels',
        body: 'Employees receive an all-inclusive estimate up front, so there are no unpredictable bills and no surprise add-on fees to resolve after the fact.',
      },
      {
        title: 'Vetted hospitals and surgeons',
        body: 'Care takes place in accredited facilities with doctors selected against U.S.-level standards, reviewed before any patient is referred.',
      },
      {
        title: 'Care that continues at home',
        body: 'Once an employee is back, their Health Navigator™ stays available for virtual follow-ups and coordinates with their local physician.',
      },
    ],
    docTitle: 'What the employer document covers',
    highlights: [
      'Program overview and employer-facing documentation',
      'How care coordination, travel support, and patient guidance work',
      'A sample resource your team can download and review offline',
    ],
    closingTitle: 'Talk through what this could look like for your team.',
    closingLead:
      'A Health Navigator can walk you through the program and answer the questions your team is likely to have.',
    closingPrimary: 'Speak with a Health Navigator',
    closingSecondary: 'How medical travel works',
  },
  es: {
    title: 'Para Empleadores',
    requestDoc: 'Solicitar el documento completo',
    metaDescription:
      'Recursos para empleadores sobre atención transfronteriza guiada, claridad de costos y acompañamiento al paciente con MyHealth Haven.',
    intro:
      'Revise información orientada a empleadores sobre cómo MyHealth Haven apoya a equipos que exploran acceso estructurado y guiado a atención en México.',
    sectionTitle: 'Cómo se ve la atención guiada',
    sectionEmphasis: 'para su equipo',
    sectionLead:
      'Muchas personas posponen procedimientos necesarios por los altos costos, los tiempos de espera o reglas de seguro difíciles de entender. MyHealth Haven les ofrece una ruta guiada hacia la atención en México, en lugar de una lista de opciones que deban resolver solas.',
    pillars: [
      {
        title: 'Un solo punto de contacto',
        body: 'Cada empleado trabaja con un Health Navigator™ bilingüe dedicado que lo acompaña desde la primera pregunta hasta la recuperación, para que nadie coordine su atención entre dos países por su cuenta.',
      },
      {
        title: 'Costos claros antes de viajar',
        body: 'Los empleados reciben un estimado todo incluido desde el inicio, sin cuentas impredecibles ni cargos sorpresa que resolver después.',
      },
      {
        title: 'Hospitales y cirujanos verificados',
        body: 'La atención se realiza en instalaciones acreditadas, con médicos seleccionados conforme a estándares de nivel estadounidense y revisados antes de cualquier referencia.',
      },
      {
        title: 'Atención que continúa en casa',
        body: 'Cuando el empleado regresa, su Health Navigator™ sigue disponible para seguimientos virtuales y coordina con su médico local.',
      },
    ],
    docTitle: 'Qué incluye el documento para empleadores',
    highlights: [
      'Resumen del programa y documentación orientada a empleadores',
      'Cómo funcionan la coordinación de atención, el apoyo de viaje y el acompañamiento al paciente',
      'Un recurso de ejemplo que su equipo puede descargar y revisar sin conexión',
    ],
    closingTitle: 'Conversemos sobre lo que esto puede significar para su equipo.',
    closingLead:
      'Un Health Navigator puede explicarle el programa y responder las preguntas que su equipo probablemente tenga.',
    closingPrimary: 'Hablar con un Health Navigator',
    closingSecondary: 'Cómo funciona el viaje médico',
  },
};

/* new UI strings only: the hero frame's alt text, the jump to the document and the
   new-tab hint for screen readers */
const UI = {
  en: {
    alt: 'Illustration from the MyHealth Haven film: a patient and her Health Navigator stand side by side among three care scenes: a video call, a treatment chair with a clock, and a path through the countryside.',
    readDoc: 'See what it covers',
  },
  es: {
    alt: 'Ilustración de la película de MyHealth Haven: una paciente y su Health Navigator, una al lado de la otra, entre tres escenas de atención: una videollamada, un sillón de tratamiento con un reloj y un camino por el campo.',
    readDoc: 'Vea qué incluye',
  },
};

/*
 * For Employers, in the paper world of the home page. The short title reads as
 * one felt-underlined phrase; the hero leads down to what the documentation
 * covers, and that section ends in a way to ask for it.
 *
 * The page used to render only the title and an embedded Google Doc: twelve
 * words of its own, which left it and For Providers all but identical to each
 * other and to nothing else. `intro` and `highlights` already existed here
 * unrendered and now carry the hero and the document sheet; `pillars` says, for
 * this audience, what the rest of the site already says about navigators,
 * estimates, vetting and follow-up.
 */
const ForEmployers = () => {
  const { language } = useLanguage();
  const copy = COPY[language] || COPY.en;
  const ui = UI[language] || UI.en;

  return (
    <PaperPage>
      <PageHero
        emphasis={copy.title}
        lead={copy.intro}
        frame={{ src: '/pages/employers-pair.webp', alt: ui.alt }}
      >
        <a href='#employer-doc' className={`${cls.btnPrimary} w-full sm:w-auto`}>
          <ArrowDown aria-hidden='true' className='size-5' />
          {ui.readDoc}
        </a>
      </PageHero>

      <Sheet tone='kraft' labelledBy='employer-care-title'>
        <SectionHead
          id='employer-care-title'
          title={copy.sectionTitle}
          emphasis={copy.sectionEmphasis}
          lead={copy.sectionLead}
        />
        <TileList className='mt-12 lg:mt-14' columns={2} items={copy.pillars} />
      </Sheet>

      <Sheet tone='cream' id='employer-doc' labelledBy='employer-doc-title'>
        <SectionHead id='employer-doc-title' title={copy.docTitle} />
        <TileList className='mt-10 max-w-[46rem]' items={copy.highlights} />
        <a href={REQUEST_MAILTO} className={`${cls.btnPrimary} mt-12 w-full sm:w-auto`}>
          <Mail aria-hidden='true' className='size-5' />
          {copy.requestDoc}
        </a>
      </Sheet>

      <ClosingCall
        id='employer-close-title'
        tone='kraft'
        title={copy.closingTitle}
        lead={copy.closingLead}
        primary={{ href: '/schedule', label: copy.closingPrimary, icon: CalendarDays }}
        secondary={{ href: '/medical-travel', label: copy.closingSecondary, icon: Route }}
      />
    </PaperPage>
  );
};

export default ForEmployers;
