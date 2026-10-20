'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Snackbar } from '@mui/material';
import { useLanguage } from '../context/LanguageContext';
import { display } from '@/components/paper/fonts';
import { PAPER_TEXTURES } from '@/components/paper/paperStyles';

const HEALTH_NAVIGATOR_EMAIL = 'healthnavigator@myhealthhaven.org';
const TIKTOK_URL = 'https://www.tiktok.com/@my.health.haven';

/* brand marks as plain SVG paths (24px box), drawn in currentColor */
const ICONS = {
  instagram:
    'M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.64-.07-4.85s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98 1.28.06 1.69.07 4.95.07s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95C23.73 2.7 21.31.27 16.95.07 15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.41-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z',
  x: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  facebook:
    'M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.32l-.53 3.5h-2.8V24C19.62 23.1 24 18.1 24 12.07',
  youtube:
    'M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z',
  linkedin:
    'M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z',
  tiktok:
    'M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z',
};

const SOCIALS = [
  { key: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/my.healthhaven?igsh=MTBnZzhlM3ozbWtxeg%3D%3D&utm_source=qr' },
  { key: 'x', label: 'X', href: 'https://x.com/myhealthhaven1?s=21' },
  { key: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61586308873245&mibextid=LQQJ4d' },
  { key: 'youtube', label: 'YouTube', href: 'https://youtube.com/@my.health.haven1?si=-SiWbDZCe2FhLvl5' },
  { key: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/company/my-health-haven/?viewAsMember=true' },
  { key: 'tiktok', label: 'TikTok', href: TIKTOK_URL },
];

const { NOISE, EDGE } = PAPER_TEXTURES;

/*
 * The site footer as the last sheet of the paper stack (the world of the redesigned
 * pages): a deep-ink sheet with the same deckled top edge, laid over whatever
 * sheet ends the page; the logo on a cream paper badge (its navy part disappears
 * on dark); the registered office as a cream paper slip. All the old links, text,
 * the copy-email-on-click and its toast are unchanged.
 */
const FOOTER_CSS = `
.hf-footer { background-color: #133147; background-image: ${NOISE}; }
.hf-footer::before { content: ""; position: absolute; left: 0; right: 0; top: -11px; height: 12px; background: inherit;
  -webkit-mask-image: ${EDGE}; mask-image: ${EDGE}; -webkit-mask-size: 240px 12px; mask-size: 240px 12px;
  -webkit-mask-repeat: repeat-x; mask-repeat: repeat-x; -webkit-mask-position: 60px 0; mask-position: 60px 0; pointer-events: none; }
.hf-link { color: #c6d3da; text-decoration: underline; text-decoration-color: transparent; text-underline-offset: 4px; text-decoration-thickness: 1.5px; }
.hf-link:hover { color: #ffffff; text-decoration-color: #71cfcf; }
.hf-footer a:focus-visible { outline: 2px solid #f4eee5; outline-offset: 3px; border-radius: 4px; }
.hf-social { color: #f4eee5; border: 1.5px solid rgba(244,238,229,.38); }
.hf-social:hover { background: #00796b; border-color: #00796b; color: #ffffff; }
.hf-slip { background: #fffaf1; transform: rotate(-1.2deg); box-shadow: 0 1px 0 rgba(0,0,0,.18), 0 22px 34px -22px rgba(0,0,0,.75); }
.hf-badge { background: #f4eee5; box-shadow: inset 0 -2px 0 rgba(70,50,30,.16), 0 6px 14px -8px rgba(0,0,0,.6); }
@media (prefers-reduced-motion: no-preference) {
  .hf-link { transition: color .18s ease, text-decoration-color .18s ease; }
  .hf-social { transition: background-color .18s ease, border-color .18s ease, transform .18s cubic-bezier(.2,.8,.2,1); }
  .hf-social:hover { transform: translateY(-2px); }
}
@media (prefers-contrast: more) {
  .hf-link, .hf-muted { color: #ffffff; }
  .hf-social { border-color: #f4eee5; }
}
@media (forced-colors: active) {
  .hf-footer { border-top: 1px solid CanvasText; }
  .hf-slip { border: 1px solid CanvasText; }
}
`;

function FooterLink({ href, children, external, onClick, className = '' }) {
  const cls = `hf-link inline-flex min-h-11 items-center py-1 text-[0.9375rem] leading-[1.4] lg:min-h-0 ${className}`;
  if (external || href.startsWith('mailto:')) {
    return (
      <a href={href} onClick={onClick} className={cls} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

function Column({ id, title, children, className = '' }) {
  return (
    <div className={className}>
      <h2 id={id} className='m-0 font-[family-name:var(--font-hh-display)] text-[1.25rem] font-normal leading-[1.2] text-[#f4eee5]'>
        {title}
      </h2>
      <div role='list' aria-labelledby={id} className='mt-3 flex flex-col gap-0.5 lg:mt-4 lg:gap-2.5'>
        {children}
      </div>
    </div>
  );
}

const Footer = () => {
  const { language } = useLanguage();
  const [emailCopied, setEmailCopied] = useState(false);
  const handleEmailClick = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(HEALTH_NAVIGATOR_EMAIL).catch(() => {});
    }
    setEmailCopied(true);
  };
  const currentYear = new Date().getFullYear();
  const footerCopy =
    language === 'es'
      ? {
          slogan:
            'Atencion medica transfronteriza guiada con apoyo bilingue, coordinacion clara y enfoque en el paciente.',
          subSlogan:
            'Ayudamos a pacientes de Estados Unidos a navegar opciones medicas confiables en Mexico.',
          addressLabel: 'Oficina Registrada',
          addressCountry: 'Estados Unidos',
          patients: 'Pacientes',
          howItWorks: 'Como funciona',
          procedures: 'Procedimientos',
          medicalTravel: 'Viaje medico',
          faqs: 'Preguntas frecuentes',
          company: 'Empresa',
          aboutUs: 'Nosotros',
          forEmployers: 'Para empleadores',
          forProviders: 'Para proveedores',
          contact: 'Contacto',
          speakWithNavigator: 'Hablar con un navigator',
          whatsapp: 'WhatsApp',
          privacyPolicy: 'Politica de privacidad',
          termsOfUse: 'Terminos de uso',
          legalDisclaimer:
            'La informacion de este sitio es solo para fines informativos generales y no constituye consejo medico ni una oferta vinculante. Todos los servicios requieren consulta con profesionales de la salud calificados. El uso de este sitio no establece una relacion medico-paciente.',
          home: 'MyHealth Haven, inicio',
          social: 'Redes sociales',
          legal: 'Legal',
        }
      : {
          slogan:
            'Guided cross-border care with bilingual support, clear coordination, and patient-first advocacy.',
          subSlogan:
            'We help U.S. patients navigate trusted medical options in Mexico with confidence.',
          addressLabel: 'Registered Office',
          addressCountry: 'United States',
          patients: 'Patients',
          howItWorks: 'How It Works',
          procedures: 'Procedures',
          medicalTravel: 'Medical Travel',
          faqs: 'FAQs',
          company: 'Company',
          aboutUs: 'About Us',
          forEmployers: 'For Employers',
          forProviders: 'For Providers',
          contact: 'Contact',
          speakWithNavigator: 'Speak With a Navigator',
          whatsapp: 'WhatsApp',
          privacyPolicy: 'Privacy Policy',
          termsOfUse: 'Terms of Use',
          legalDisclaimer:
            'Information on this site is provided for general informational purposes only and is not medical advice or a binding offer. All services require consultation with qualified healthcare professionals. Use of this site does not establish a physician-patient relationship.',
          home: 'MyHealth Haven, home',
          social: 'Social media',
          legal: 'Legal',
        };
  const copyrightText =
    language === 'es'
      ? `© ${currentYear} My Health Haven Management, LLC - Todos los derechos reservados.`
      : `© ${currentYear} My Health Haven Management, LLC - All Rights Reserved.`;

  return (
    <footer className={`hf-footer relative ${display.variable}`}>
      <style>{FOOTER_CSS}</style>
      <div className='mx-auto w-full max-w-[1360px] px-4 pb-28 pt-14 sm:px-8 lg:px-12 lg:pb-12 lg:pt-20'>
        <div className='grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.55fr)] lg:gap-20'>
          {/* who we are, and where */}
          <div>
            <Link href='/' aria-label={footerCopy.home} className='inline-flex items-center gap-3.5 rounded-full no-underline'>
              <span className='hf-badge grid size-14 shrink-0 place-items-center rounded-full'>
                <Image src='/logo.png' width={36} height={32} alt='' />
              </span>
              <span className='font-[family-name:var(--font-hh-display)] text-[1.625rem] leading-none text-[#f4eee5]'>MyHealth Haven</span>
            </Link>
            <p className='hf-muted mb-0 mt-6 max-w-[30rem] text-[1rem] leading-[1.6] text-[#c6d3da]'>{footerCopy.slogan}</p>
            <p className='hf-muted mb-0 mt-3 max-w-[30rem] text-[1rem] leading-[1.6] text-[#c6d3da]'>{footerCopy.subSlogan}</p>

            <address
              itemScope
              itemType='https://schema.org/PostalAddress'
              className='hf-slip mt-7 inline-block max-w-full rounded-[6px] px-6 py-5 not-italic'
            >
              <span className='block text-[0.875rem] font-semibold text-[#3f5868]'>{footerCopy.addressLabel}</span>
              <span itemProp='name' className='mt-1.5 block font-[family-name:var(--font-hh-display)] text-[1.125rem] leading-[1.3] text-[#1b4560]'>
                My Health Haven Management, LLC
              </span>
              <span className='mt-1 block text-[0.9375rem] leading-[1.55] text-[#3f5868]'>
                <span itemProp='streetAddress'>30 N Gould St, Ste R</span>
                <br />
                <span itemProp='addressLocality'>Sheridan</span>, <span itemProp='addressRegion'>WY</span>{' '}
                <span itemProp='postalCode'>82801</span>
                <br />
                <span itemProp='addressCountry'>{footerCopy.addressCountry}</span>
              </span>
            </address>
          </div>

          {/* where to go */}
          <div className='grid content-start grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-[1fr_1fr_1.35fr] lg:gap-y-10 lg:pt-2'>
            <Column id='hf-patients' title={footerCopy.patients}>
              <div role='listitem'>
                <FooterLink href='/#how-it-works'>{footerCopy.howItWorks}</FooterLink>
              </div>
              <div role='listitem'>
                <FooterLink href='/procedures'>{footerCopy.procedures}</FooterLink>
              </div>
              <div role='listitem'>
                <FooterLink href='/medical-travel'>{footerCopy.medicalTravel}</FooterLink>
              </div>
              <div role='listitem'>
                <FooterLink href='/#faq'>{footerCopy.faqs}</FooterLink>
              </div>
            </Column>
            <Column id='hf-company' title={footerCopy.company}>
              <div role='listitem'>
                <FooterLink href='/about'>{footerCopy.aboutUs}</FooterLink>
              </div>
              <div role='listitem'>
                <FooterLink href='/employers'>{footerCopy.forEmployers}</FooterLink>
              </div>
              <div role='listitem'>
                <FooterLink href='/providers'>{footerCopy.forProviders}</FooterLink>
              </div>
            </Column>
            <Column id='hf-contact' title={footerCopy.contact} className='col-span-2 sm:col-span-1'>
              <div role='listitem'>
                <FooterLink href='/schedule'>{footerCopy.speakWithNavigator}</FooterLink>
              </div>
              <div role='listitem'>
                <FooterLink href='https://wa.me/12142763928' external>
                  {footerCopy.whatsapp}
                </FooterLink>
              </div>
              <div role='listitem'>
                <FooterLink href={TIKTOK_URL} external>
                  TikTok
                </FooterLink>
              </div>
              <div role='listitem'>
                <FooterLink href={`mailto:${HEALTH_NAVIGATOR_EMAIL}`} onClick={handleEmailClick} className='[overflow-wrap:anywhere]'>
                  {HEALTH_NAVIGATOR_EMAIL}
                </FooterLink>
              </div>
            </Column>

            <div role='list' aria-label={footerCopy.social} className='col-span-2 flex flex-wrap gap-2.5 sm:col-span-3'>
              {SOCIALS.map((s) => (
                <div role='listitem' key={s.key}>
                  <a
                    href={s.href}
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label={s.label}
                    title={s.label}
                    className='hf-social grid size-11 place-items-center rounded-full no-underline'
                  >
                    <svg aria-hidden='true' viewBox='0 0 24 24' className='size-[18px] fill-current'>
                      <path d={ICONS[s.key]} />
                    </svg>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* the small print */}
        <div className='mt-12 border-0 border-t border-solid border-[rgba(244,238,229,0.16)] pt-7 lg:mt-16'>
          <p className='hf-muted m-0 max-w-[62rem] text-[0.8125rem] leading-[1.6] text-[#a9bcc7]'>{footerCopy.legalDisclaimer}</p>
          <div className='mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
            <p className='hf-muted m-0 text-[0.875rem] text-[#a9bcc7]'>{copyrightText}</p>
            <nav aria-label={footerCopy.legal} className='flex flex-wrap gap-x-6'>
              <FooterLink href='/privacy'>{footerCopy.privacyPolicy}</FooterLink>
              <FooterLink href='/terms'>{footerCopy.termsOfUse}</FooterLink>
            </nav>
          </div>
        </div>
      </div>
      <Snackbar
        open={emailCopied}
        autoHideDuration={2500}
        onClose={() => setEmailCopied(false)}
        message={language === 'es' ? 'Correo copiado al portapapeles' : 'Email copied to clipboard'}
      />
    </footer>
  );
};

export default Footer;
