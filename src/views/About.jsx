'use client';
import Link from 'next/link';
import { BadgeDollarSign, CalendarDays } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import PaperPage from '@/components/paper/PaperPage';
import PageHero from '@/components/paper/PageHero';
import Sheet from '@/components/paper/Sheet';
import SectionHead from '@/components/paper/SectionHead';
import TileList from '@/components/paper/TileList';
import { FilmWindow } from '@/components/paper/parts';
import { cls } from '@/components/paper/paperStyles';

const pageContent = {
  en: {
    eyebrow: 'About Us',
    title: 'Medical Care Abroad: Structured, Supported, and Personal',
    intro:
      'Seeking medical care outside the United States can feel uncertain. Patients often face unfamiliar healthcare systems, language barriers, complex travel logistics, and questions about what happens after the procedure is complete.',
    introFollow: 'MyHealth Haven exists to remove that uncertainty.',
    sectionTitle: 'How MyHealth Haven Helps',
    sectionIntro:
      'MyHealth Haven provides a structured, patient-first navigation model designed to support every stage of the experience.',
    pillars: [
      {
        label: 'Personalized Care Coordination',
        description:
          'From the first inquiry through recovery, your Health Navigator\u2122 coordinates the process so you always know what comes next.',
      },
      {
        label: 'Trusted Physicians and Accredited Facilities',
        description:
          'We connect patients with carefully selected doctors, hospitals, and clinics that meet rigorous professional and safety standards.',
      },
      {
        label: 'End-to-End Travel and Recovery Planning',
        description:
          'Travel arrangements, lodging, scheduling, and recovery logistics are organized in advance so patients and families can focus on care.',
      },
      {
        label: 'Language and Cultural Navigation',
        description:
          'Clear communication matters in healthcare. Our team helps bridge language and cultural differences to ensure patients feel confident and understood.',
      },
    ],
    promiseTitle: 'Our Promise',
    closing:
      'MyHealth Haven is not a travel agency. We are a cross-border care navigation partner.',
    closingBody:
      'We guide patients through the entire process, from first conversation to safe recovery, so that medical care abroad is not only more accessible, but also more organized, transparent, and humane.',
    supportLine:
      'Our role is simple: reduce uncertainty, protect the patient experience, and help people move through care with confidence.',
    estimateCta: 'Free Estimate',
    contactCta: 'Speak with a Health Navigator\u2122',
    metaTitle: 'About MyHealth Haven | Patient-First Medical Travel Support',
    metaDescription:
      'Learn how MyHealth Haven helps patients navigate medical care abroad with trusted providers, care coordination, and end-to-end support.',
  },
  es: {
    eyebrow: 'Sobre Nosotros',
    title: 'Atencion Medica en el Extranjero: Estructurada, Acompanada y Personal',
    intro:
      'Buscar atencion medica fuera de Estados Unidos puede generar incertidumbre. Los pacientes suelen enfrentar sistemas de salud desconocidos, barreras de idioma, logistica de viaje compleja y preguntas sobre que sucede despues del procedimiento.',
    introFollow: 'MyHealth Haven existe para eliminar esa incertidumbre.',
    sectionTitle: 'Como Ayuda MyHealth Haven',
    sectionIntro:
      'MyHealth Haven ofrece un modelo de navegacion estructurado, centrado en el paciente, disenado para apoyar cada etapa de la experiencia.',
    pillars: [
      {
        label: 'Coordinacion de Atencion Personalizada',
        description:
          'Desde la primera consulta hasta la recuperacion, su Health Navigator\u2122 coordina el proceso para que siempre sepa que viene despues.',
      },
      {
        label: 'Medicos de Confianza e Instalaciones Acreditadas',
        description:
          'Conectamos a los pacientes con medicos, hospitales y clinicas cuidadosamente seleccionados que cumplen rigurosos estandares profesionales y de seguridad.',
      },
      {
        label: 'Planificacion Integral de Viaje y Recuperacion',
        description:
          'Los arreglos de viaje, hospedaje, agenda y logistica de recuperacion se organizan con anticipacion para que los pacientes y sus familias puedan enfocarse en la atencion.',
      },
      {
        label: 'Navegacion Linguistica y Cultural',
        description:
          'La comunicacion clara es fundamental en la atencion medica. Nuestro equipo ayuda a superar las diferencias de idioma y cultura para que los pacientes se sientan seguros y comprendidos.',
      },
    ],
    promiseTitle: 'Nuestro Compromiso',
    closing:
      'MyHealth Haven no es una agencia de viajes. Somos un socio de navegacion de atencion transfronteriza.',
    closingBody:
      'Guiamos a los pacientes a traves de todo el proceso, desde la primera conversacion hasta una recuperacion segura, para que la atencion medica en el extranjero no solo sea mas accesible, sino tambien mas organizada, transparente y humana.',
    supportLine:
      'Nuestro rol es simple: reducir la incertidumbre, proteger la experiencia del paciente y ayudar a las personas a transitar su atencion con confianza.',
    estimateCta: 'Presupuesto Gratis',
    contactCta: 'Hable con un Navegador de Salud\u2122',
    metaTitle: 'Sobre MyHealth Haven | Apoyo centrado en el paciente',
    metaDescription:
      'Conozca como MyHealth Haven ayuda a los pacientes a navegar la atencion medica en el extranjero con proveedores confiables, coordinacion y apoyo completo.',
  },
};

/*
 * About, in the paper world of the home page (branch redesign/without-the-maze-hero).
 * The copy above is the site's own (em dashes rewritten at the owner's request);
 * the old eyebrow label is not shown (the heading leads), and the line breaks
 * after the title's colon, before its underlined second half.
 */
const About = () => {
  const { language } = useLanguage();
  const content = pageContent[language] || pageContent.en;
  const colon = content.title.indexOf(': ');
  const titleHead = colon > 0 ? content.title.slice(0, colon + 1) : content.title;
  const titleTail = colon > 0 ? content.title.slice(colon + 2) : null;
  /* `closing` is two sentences: what MyHealth Haven is not, then what it is */
  const promise = content.closing.split(/(?<=\.)\s+/).filter(Boolean);
  const alt =
    language === 'es'
      ? {
          hero: 'Ilustración de la película de MyHealth Haven: una Health Navigator rodeada de pacientes y familias de todas las edades.',
          clinic: 'Ilustración de la película de MyHealth Haven: una paciente en una clínica mira los retratos de sus médicos.',
        }
      : {
          hero: 'Illustration from the MyHealth Haven film: a Health Navigator surrounded by patients and families of all ages.',
          clinic: 'Illustration from the MyHealth Haven film: a patient in a clinic looks at the portraits of her doctors.',
        };

  return (
    <PaperPage>
      <PageHero title={titleTail ? titleHead : content.title} emphasis={titleTail} lead={content.intro} frame={{ src: '/pages/about-people.webp', alt: alt.hero }}>
        {content.introFollow ? (
          <p className='m-0 max-w-[34rem] font-[family-name:var(--font-hh-display)] text-[1.375rem] leading-[1.35] text-[#1b4560]'>{content.introFollow}</p>
        ) : null}
        {/* one step smaller on phones so the Spanish label fits on one line */}
        <Link href='/schedule' className={`${cls.btnPrimary} mt-7 max-sm:!text-[1rem]`}>
          <CalendarDays aria-hidden='true' className='size-5' />
          {content.contactCta}
        </Link>
      </PageHero>

      <Sheet tone='kraft' labelledBy='about-helps-title'>
        <div className='grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16'>
          <div>
            <SectionHead id='about-helps-title' title={content.sectionTitle} lead={content.sectionIntro} />
            <div data-reveal='slot' className='mt-10 max-w-[34rem]'>
              <FilmWindow src='/pages/about-clinic.webp' alt={alt.clinic} sizes='(min-width: 1024px) 520px, 100vw' />
            </div>
          </div>
          <TileList
            className='max-w-[38rem] self-start lg:pt-3'
            columns={1}
            items={content.pillars.map((pillar) => ({ title: pillar.label || pillar, body: pillar.description }))}
          />
        </div>
      </Sheet>

      {/* the promise as the film's two tiles: the grey maze tile for what MyHealth Haven
          is not, the teal path tile for what it is (the two sentences of `closing`) */}
      <Sheet tone='navy' labelledBy='about-promise-title'>
        <div className='grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-20'>
          <div data-reveal='rise'>
            <h2 id='about-promise-title' className={`${cls.h2} text-[#f4eee5]`}>
              {content.promiseTitle}
            </h2>
            <div role='list' className='mt-8 flex flex-col gap-6'>
              {promise.map((line, i) => (
                <div role='listitem' key={i} className='flex gap-4'>
                  <span aria-hidden='true' className={`hp-tile ${i === promise.length - 1 ? 'hp-tile-teal' : ''}`} />
                  <p
                    className={`m-0 font-[family-name:var(--font-hh-display)] leading-[1.3] [overflow-wrap:break-word] ${
                      i === promise.length - 1 ? 'text-[1.625rem] text-[#9fdcdc] sm:text-[2rem]' : 'text-[1.25rem] text-[#c6d3da] sm:text-[1.5rem]'
                    }`}
                  >
                    {line}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div data-reveal='rise' style={{ '--i': 1 }} className='lg:pt-3'>
            {content.closingBody ? <p className='m-0 max-w-[36rem] text-[1.0625rem] leading-[1.65] text-[#d3dde2]'>{content.closingBody}</p> : null}
            <p className='mb-0 mt-5 max-w-[36rem] text-[1.0625rem] font-medium leading-[1.65] text-[#f4eee5]'>{content.supportLine}</p>
            <div className='mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap'>
              <Link
                href='/schedule'
                className='hp-btn inline-flex min-h-[54px] max-w-full items-center justify-center gap-2.5 rounded-full border-2 border-solid border-transparent bg-[#f4eee5] px-5 text-center text-[1.0625rem] font-semibold text-[#1b4560] no-underline hover:bg-white focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#f4eee5] sm:px-6 [&>svg]:shrink-0'
              >
                <CalendarDays aria-hidden='true' className='size-5' />
                {content.contactCta}
              </Link>
              <Link
                href='/estimate'
                className='hp-btn inline-flex min-h-[54px] max-w-full items-center justify-center gap-2.5 rounded-full border-2 border-solid border-[rgba(244,238,229,0.7)] bg-transparent px-5 text-center text-[1.0625rem] font-semibold text-[#f4eee5] no-underline hover:bg-[rgba(244,238,229,0.08)] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#f4eee5] sm:px-6 [&>svg]:shrink-0'
              >
                <BadgeDollarSign aria-hidden='true' className='size-5' />
                {content.estimateCta}
              </Link>
            </div>
          </div>
        </div>
      </Sheet>
    </PaperPage>
  );
};

export default About;
