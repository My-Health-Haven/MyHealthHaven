import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import ShieldRoundedIcon from '@mui/icons-material/ShieldRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import MedicalServicesRoundedIcon from '@mui/icons-material/MedicalServicesRounded';
import ExploreRoundedIcon from '@mui/icons-material/ExploreRounded';
import VerifiedUserRoundedIcon from '@mui/icons-material/VerifiedUserRounded';
import CalculateRoundedIcon from '@mui/icons-material/CalculateRounded';
import MonitorHeartRoundedIcon from '@mui/icons-material/MonitorHeartRounded';

// ─── Page copy (EN + ES) ─────────────────────────────────────────────────
// Edit any string here to retitle pills, categories, the trust line, etc.
export const LIBRARY_PAGE_COPY = {
  en: {
    title: 'Learning Library',
    subtitle:
      'Calm, evidence-based guides to cross-border care, helping patients evaluate options with clarity.',
    cta: 'Start With the Basics',
    featuredTopics: 'Featured Topics',
    viewAllArticles: 'View all articles',
    exploreByCategory: 'Explore by Category',
    guideLabel: 'Guide',
    readArticle: 'Read Article',
    trustLine: 'Evidence-based. Patient-focused. Always in your best interest.',
    governmentResourcesTitle: 'Government Resources',
    governmentResourcesBody:
      'Official information on medical travel, safety, and care planning.',
    pillBasics: 'Medical Travel Basics',
    pillVetting: 'Hospital Vetting',
    pillSafety: 'Safety & Recovery',
    pillUsDoctor: 'Working With Your U.S. Doctor',
    categoryGettingStartedTitle: 'Getting Started',
    categoryGettingStartedDesc:
      'Essentials to understand your options and next steps.',
    categoryChoosingTitle: 'Choosing a Provider',
    categoryChoosingDesc:
      'How we vet hospitals, surgeons, and care teams.',
    categoryCostsTitle: 'Costs & Planning',
    categoryCostsDesc:
      'Transparent guidance on costs, payments, and logistics.',
    categoryRecoveryTitle: 'Recovery & Follow-up',
    categoryRecoveryDesc:
      'Safe recovery and ongoing care after you return home.',
  },
  es: {
    title: 'Biblioteca de Aprendizaje',
    subtitle:
      'Guias claras y basadas en evidencia para ayudarle a evaluar opciones de atencion transfronteriza con confianza.',
    cta: 'Comience Con Lo Basico',
    featuredTopics: 'Temas Destacados',
    viewAllArticles: 'Ver todos los articulos',
    exploreByCategory: 'Explorar por Categoria',
    guideLabel: 'Guia',
    readArticle: 'Leer Articulo',
    trustLine: 'Basado en evidencia. Centrado en el paciente. Siempre en su mejor interes.',
    governmentResourcesTitle: 'Recursos Oficiales',
    governmentResourcesBody:
      'Informacion oficial sobre viaje medico, seguridad y planificacion de la atencion.',
    pillBasics: 'Fundamentos de Viaje Medico',
    pillVetting: 'Evaluacion de Hospitales',
    pillSafety: 'Seguridad y Recuperacion',
    pillUsDoctor: 'Trabajando Con Su Medico de EE.UU.',
    categoryGettingStartedTitle: 'Primeros Pasos',
    categoryGettingStartedDesc:
      'Lo esencial para entender sus opciones y proximos pasos.',
    categoryChoosingTitle: 'Eligiendo un Proveedor',
    categoryChoosingDesc:
      'Como evaluamos hospitales, cirujanos y equipos de atencion.',
    categoryCostsTitle: 'Costos y Planificacion',
    categoryCostsDesc:
      'Guia transparente sobre costos, pagos y logistica.',
    categoryRecoveryTitle: 'Recuperacion y Seguimiento',
    categoryRecoveryDesc:
      'Recuperacion segura y atencion continua despues de regresar a casa.',
  },
};

// ─── Hero pills (4) ──────────────────────────────────────────────────────
// To swap an icon: replace the `Icon` reference with any other component
// (MUI icon or your own SVG component). The pill auto-renders <Icon />.
// To swap a label: edit `pillBasics`, `pillVetting`, etc. above.
export const LIBRARY_HERO_PILLS = [
  { key: 'basics', labelKey: 'pillBasics', Icon: MenuBookRoundedIcon },
  { key: 'vetting', labelKey: 'pillVetting', Icon: ShieldRoundedIcon },
  { key: 'safety', labelKey: 'pillSafety', Icon: FavoriteBorderRoundedIcon },
  { key: 'usDoctor', labelKey: 'pillUsDoctor', Icon: MedicalServicesRoundedIcon },
];

// ─── Explore by Category cards (4) ───────────────────────────────────────
// Same swap pattern: replace `Icon` to change the icon; edit copy keys above
// to change titles/descriptions.
export const LIBRARY_CATEGORIES = [
  {
    key: 'gettingStarted',
    titleKey: 'categoryGettingStartedTitle',
    descKey: 'categoryGettingStartedDesc',
    Icon: ExploreRoundedIcon,
  },
  {
    key: 'choosing',
    titleKey: 'categoryChoosingTitle',
    descKey: 'categoryChoosingDesc',
    Icon: VerifiedUserRoundedIcon,
  },
  {
    key: 'costs',
    titleKey: 'categoryCostsTitle',
    descKey: 'categoryCostsDesc',
    Icon: CalculateRoundedIcon,
  },
  {
    key: 'recovery',
    titleKey: 'categoryRecoveryTitle',
    descKey: 'categoryRecoveryDesc',
    Icon: MonitorHeartRoundedIcon,
  },
];

// ─── Featured articles ───────────────────────────────────────────────────
// To add a real hero image: set `image` to a path under /public, e.g.
//   image: '/library/hospital-vetting.webp'
// The card auto-renders next/image. Until then, a gradient placeholder shows.
export const LIBRARY_ARTICLES = [
  {
    slug: 'is-medical-travel-right-for-me',
    title: 'Is Medical Travel Right for Me?',
    summary:
      'A balanced guide to understanding benefits, risks, and the less-obvious questions worth answering before you commit.',
    image: '/Is medical travel right for me.png',
    imageAlt: 'Is medical travel right for me',
    content: `Medical travel is rarely a decision about price alone. Patients usually weigh timing, continuity of care, physician confidence, travel tolerance, and the support they will need before and after treatment.

The right candidate is someone who can evaluate care options methodically. That means reviewing diagnosis details, understanding what part of the journey can happen remotely, and confirming how records, imaging, and follow-up will be shared with providers on both sides of the border.

It is also important to be honest about recovery. Even if the procedure itself is straightforward, the practical questions matter: how long you may need to stay in Mexico, whether you will need a companion, and how quickly you can return to work or regular activity.

If those questions can be answered clearly and the care pathway is well coordinated, medical travel can become a structured alternative instead of a leap into the unknown.`,
  },
  {
    slug: 'how-we-vet-hospitals',
    title: 'How We Vet Hospitals and Surgeons',
    summary:
      'Our standards for evaluating physicians, facilities, and communication so patients are not left guessing.',
    image: '/how we vet hospitals and surgeons.png',
    imageAlt: 'How we vet hospitals and surgeons',
    content: `Vetting starts with credentials, but it cannot stop there. A trustworthy care partner should show clear licensure, relevant procedural experience, and a facility environment that can support the complexity of the case being considered.

We also look for operational clarity. Patients need understandable pricing, realistic timelines, documented pre-op and post-op expectations, and a reliable point of contact who can answer questions before travel begins.

Communication quality matters just as much as clinical quality. When records move across borders, patients need teams that can coordinate imaging, lab work, consultations, and recovery instructions without creating avoidable confusion.

The goal is not to present a long list of providers. It is to narrow the field to options that feel legible, accountable, and appropriate for the patient in front of us.`,
  },
  {
    slug: 'talking-to-your-us-doctor',
    title: 'Talking to Your U.S. Doctor About Care in Mexico',
    summary:
      'Suggested questions and framing that help preserve continuity of care before you travel and after you return home.',
    image: '/talking to your us doctor about care in mexico.png',
    imageAlt: 'Talking to your US doctor about care in Mexico',
    content: `Your U.S. physician may not choose the overseas provider for you, but they can still be an important part of the planning process. A productive conversation usually starts with records, diagnosis details, and a clear explanation of what procedure you are considering and why.

Ask what information they would want from the treating team in Mexico. Imaging reports, operative notes, medication plans, and recovery guidance are often the documents that matter most for continuity once you return.

It is also helpful to discuss follow-up expectations in advance. Understanding who will monitor healing, how complications would be handled, and when you should check back in locally can prevent gaps after travel.

When everyone understands the same plan, the conversation becomes less about geography and more about making sure care stays coordinated from start to finish.`,
  },
];

export const getLibraryArticleBySlug = (slug) =>
  LIBRARY_ARTICLES.find((article) => article.slug === slug) || null;
