import React from 'react';
import { HeartPulse, Bone, ShieldCheck, Sparkles, Venus } from 'lucide-react';

const ToothIcon = (props) => (
  <svg
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    {...props}
  >
    <path d='M12 2c-3.5 0-6 2-6 5 0 2 .5 3 1 5l1 4c.3 1.2 1 4 2.5 4 1 0 1-1 1.5-3l.5-2c.2-.7.5-1 1-1s.8.3 1 1l.5 2c.5 2 .5 3 1.5 3 1.5 0 2.2-2.8 2.5-4l1-4c.5-2 1-3 1-5 0-3-2.5-5-6-5z' />
  </svg>
);

const StomachIcon = (props) => (
  <svg
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    {...props}
  >
    <path d='M9 3v3a3 3 0 0 1-3 3H5a2 2 0 0 0-2 2v2a6 6 0 0 0 6 6h4a7 7 0 0 0 7-7V8a5 5 0 0 0-5-5h-3a3 3 0 0 0-3 3' />
    <path d='M15 13a2 2 0 1 1-4 0' />
  </svg>
);

/**
 * Ordered list of specialities that drive the /procedures page layout.
 *
 * Each entry maps a `section_group` value from `procedures.js` to its
 * presentation metadata: icon component, color theme, and bilingual description.
 *
 * Order here = display order on the page.
 */
export const SPECIALITY_META = [
  {
    key: 'Bariatric',
    name: { en: 'Bariatric', es: 'Bariátrica' },
    Icon: StomachIcon,
    color: '#F59E0B',
    bgColor: '#FEF3C7',
    description: {
      en: 'Weight loss and bariatric surgery procedures.',
      es: 'Cirugías bariátricas y procedimientos para pérdida de peso.',
    },
  },
  {
    key: 'Cardiology',
    name: { en: 'Cardiology', es: 'Cardiología' },
    Icon: HeartPulse,
    color: '#0EA5A5',
    bgColor: '#CCFBF1',
    description: {
      en: 'Procedures related to the heart and cardiovascular system.',
      es: 'Procedimientos relacionados con el corazón y el sistema cardiovascular.',
    },
  },
  {
    key: 'Cosmetic',
    name: { en: 'Cosmetic', es: 'Estética' },
    Icon: Sparkles,
    color: '#EC4899',
    bgColor: '#FCE7F3',
    description: {
      en: 'Aesthetic and reconstructive cosmetic procedures.',
      es: 'Procedimientos estéticos y reconstructivos.',
    },
  },
  {
    key: 'Dental & Orthodontics',
    name: { en: 'Dental & Orthodontics', es: 'Odontología y Ortodoncia' },
    Icon: ToothIcon,
    color: '#3B82F6',
    bgColor: '#DBEAFE',
    description: {
      en: 'Dental treatments and orthodontic care.',
      es: 'Tratamientos dentales y atención ortodóncica.',
    },
  },
  {
    key: 'Fertility & Women’s Health',
    name: { en: 'Fertility & Women’s Health', es: 'Fertilidad y Salud de la Mujer' },
    Icon: Venus,
    color: '#A855F7',
    bgColor: '#F3E8FF',
    description: {
      en: "Fertility treatments and women's health services.",
      es: 'Tratamientos de fertilidad y servicios de salud para la mujer.',
    },
  },
  {
    key: 'Orthopedic',
    name: { en: 'Orthopedic', es: 'Ortopedia' },
    Icon: Bone,
    color: '#7C3AED',
    bgColor: '#EDE9FE',
    description: {
      en: 'Procedures related to bones, joints, and muscles.',
      es: 'Procedimientos relacionados con huesos, articulaciones y músculos.',
    },
  },
  {
    key: 'Preventative Care/Wellness',
    name: { en: 'Preventative Care/Wellness', es: 'Cuidado Preventivo / Bienestar' },
    Icon: ShieldCheck,
    color: '#10B981',
    bgColor: '#D1FAE5',
    description: {
      en: 'Preventive exams and general wellness diagnostics.',
      es: 'Exámenes preventivos y diagnósticos generales de bienestar.',
    },
  },
];

export const SPECIALITY_META_BY_KEY = SPECIALITY_META.reduce((map, entry) => {
  map[entry.key] = entry;
  return map;
}, {});

const DEFAULT_META = {
  Icon: Sparkles,
  color: '#64748B',
  bgColor: '#E2E8F0',
  description: { en: '', es: '' },
};

export const getSpecialityMeta = (key) => SPECIALITY_META_BY_KEY[key] || DEFAULT_META;
