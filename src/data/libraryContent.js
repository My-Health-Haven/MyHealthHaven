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
    governmentResourcesBody: 'Official information on medical travel, safety, and care planning.',
    pillBasics: 'Medical Travel Basics',
    pillVetting: 'Hospital Vetting',
    pillSafety: 'Safety & Recovery',
    pillUsDoctor: 'Working With Your U.S. Doctor',
    categoryGettingStartedTitle: 'Getting Started',
    categoryGettingStartedDesc: 'Essentials to understand your options and next steps.',
    categoryChoosingTitle: 'Choosing a Provider',
    categoryChoosingDesc: 'How we vet hospitals, surgeons, and care teams.',
    categoryCostsTitle: 'Costs & Planning',
    categoryCostsDesc: 'Transparent guidance on costs, payments, and logistics.',
    categoryRecoveryTitle: 'Recovery & Follow-up',
    categoryRecoveryDesc: 'Safe recovery and ongoing care after you return home.',
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
    categoryGettingStartedDesc: 'Lo esencial para entender sus opciones y proximos pasos.',
    categoryChoosingTitle: 'Eligiendo un Proveedor',
    categoryChoosingDesc: 'Como evaluamos hospitales, cirujanos y equipos de atencion.',
    categoryCostsTitle: 'Costos y Planificacion',
    categoryCostsDesc: 'Guia transparente sobre costos, pagos y logistica.',
    categoryRecoveryTitle: 'Recuperacion y Seguimiento',
    categoryRecoveryDesc: 'Recuperacion segura y atencion continua despues de regresar a casa.',
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
    category: 'Getting Started',
    categorySlug: 'getting-started',
    type: 'Guide',
    featured: true,
    author: 'MyHealth Haven',
    date: '2026-01-15',
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
    category: 'Getting Started',
    categorySlug: 'getting-started',
    type: 'Guide',
    featured: true,
    author: 'MyHealth Haven',
    date: '2026-02-05',
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
    category: 'Getting Started',
    categorySlug: 'getting-started',
    type: 'Guide',
    featured: true,
    author: 'MyHealth Haven',
    date: '2026-02-20',
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
  // PLACEHOLDER ARTICLE — generic, non-clinical sample content. Replace the
  // prose, FAQs, author, and dates with reviewed copy before relying on it.
  {
    slug: 'how-to-prepare-for-your-first-medical-travel-conversation',
    category: 'Getting Started',
    categorySlug: 'getting-started',
    type: 'Guide',
    featured: false,
    author: 'MyHealth Haven',
    date: '2026-03-10',
    updatedDate: '2026-03-24',
    title: 'How to Prepare for Your First Medical Travel Conversation',
    summary:
      'A simple checklist for getting organized before your first conversation about medical travel, so you can ask better questions and compare options calmly.',
    seoTitle: 'How to Prepare for Your First Medical Travel Conversation',
    seoDescription:
      'What to bring, which questions to ask, and what happens next when you have your first conversation about medical travel. A calm, practical preparation guide.',
    imageAlt: 'Notes and questions prepared for a first medical travel conversation',
    content: `A first conversation about medical travel works best when you arrive organized rather than certain. The goal is not to decide everything at once. It is to gather the right information so you can compare options calmly and ask better questions as you go.

## What should I bring to a first medical travel conversation?

Having a few basics ready makes the discussion far more productive. Most people find it helpful to gather:

- A short summary of your diagnosis or the procedure you are considering
- Any recent records, imaging, or test results you already have
- A list of your current medications and relevant medical history
- Your main questions and concerns, written down before the call

You do not need a complete file to begin. Even a rough outline helps a navigator point you toward the next useful step.

## What questions are worth asking early?

Early questions tend to be about process rather than price. It is reasonable to ask how care is coordinated, what a realistic timeline looks like, and how records would move between providers. If you are still deciding whether this path fits at all, the guide [Is Medical Travel Right for Me?](/library/getting-started/is-medical-travel-right-for-me) covers the trade-offs in more detail.

## How do I prepare for the conversation emotionally?

It is normal to feel uncertain. A first conversation is meant to be exploratory, not a commitment. Give yourself permission to ask basic questions, to take notes, and to follow up later once you have had time to think things through.

## What usually happens after the first conversation?

Often the next step is simply gathering any missing records and clarifying open questions with your existing care team. Nothing has to be decided immediately. A good process moves at a pace that lets you stay informed and comfortable at each step.`,
    faqs: [
      {
        question: 'Do I need to decide anything during the first conversation?',
        answer:
          'No. A first conversation is meant to help you gather information and understand the process. You can take as much time as you need to consider your options afterward.',
      },
      {
        question: 'What information is most useful to have ready?',
        answer:
          'A short summary of your diagnosis or the procedure you are considering, any recent records or imaging you already have, and a written list of your questions.',
      },
      {
        question: 'Will this replace the relationship with my current doctor?',
        answer:
          'No. Many patients keep their existing care team involved. Preserving continuity of care before and after travel is an important part of planning.',
      },
    ],
    relatedArticles: ['is-medical-travel-right-for-me', 'how-we-vet-hospitals'],
  },
  {
    slug: 'what-accreditation-actually-means-in-mexico',
    category: 'Getting Started',
    categorySlug: 'getting-started',
    type: 'Article',
    featured: false,
    author: 'MyHealth Haven',
    date: '2026-06-13',
    title: 'What Accreditation Actually Means in Mexico',
    summary:
      '"Accredited" can mean several different things in Mexico. Learn what hospital certification, federal regulation, and physician credentials actually mean before considering care in Mexico.',
    seoTitle: 'Understanding Hospital Accreditation and Standards in Mexico',
    seoDescription:
      '"Accredited" can mean several different things in Mexico. Learn what hospital certification, federal regulation, and physician credentials actually mean before considering care in Mexico.',
    imageAlt: 'Hospital accreditation and certification standards in Mexico',
    content: `If you have started looking into care in Mexico, there is a good chance one question keeps coming back:

**Is the hospital actually held to a real standard?**

That is a fair question. In fact, it may be one of the most important questions a patient can ask.

When care happens close to home, most people do not think much about accreditation. They assume oversight exists somewhere in the background. But the moment care involves another country, that assumption disappears. The question becomes louder: who is making sure this place meets a real standard?

That is exactly the kind of question you should be asking.

The difficulty is that the answer is not as simple as a single yes or no. One reason patients feel uncertain is that the word "accredited" is often used loosely. It can mean several different things, and those things are not interchangeable.

Understanding the difference is what turns a vague worry into a more informed evaluation.

So let's walk through what actually exists.

## The Federal Regulator

Mexico has a federal health authority called COFEPRIS, the Comisión Federal para la Protección contra Riesgos Sanitarios. In function, COFEPRIS plays a role comparable to what the FDA does in the United States.

It is involved in the approval of medications, the registration of medical devices, and aspects of healthcare facility oversight. When people ask whether Mexico has a healthcare regulatory system, COFEPRIS is a major part of the answer.

It exists, and it represents a baseline layer of regulatory oversight.

## The National Hospital Certification

Separate from federal regulation, Mexico also has a national hospital certification process administered by the Consejo de Salubridad General, often shortened to CSG.

The current evaluation framework is known as the MUEC, or Modelo Único de Evaluación de la Calidad. When a hospital is certified through this process, it means the facility has been evaluated against a national quality standard and has met that standard.

Not every facility participates. Certification is also point-in-time, which means issue dates and expiration dates matter. A responsible review should confirm whether a certificate exists, what body issued it, and whether it is current.

## The International Accreditation

A smaller subset of hospitals in Mexico also hold accreditation from Joint Commission International, or JCI. JCI is the international arm of the same accrediting body widely recognized in the United States.

JCI accreditation represents an additional, internationally benchmarked layer of review. It is not held by most facilities, so its presence or absence tells you something specific: this is a research or teaching facility rather than just a hospital.

## The Credentials of the Treating Physician

Accreditation of a facility is not the same thing as the credentials of the person treating you.

In Mexico, a licensed physician holds a cédula profesional, registered through the country's professional credentialing authority. A specialist will also typically hold certification through the relevant specialty council, often a Consejo Mexicano in that field.

A facility can meet a standard while a patient still needs to confirm that the individual physician has the appropriate credentials, training, and scope of practice for the care being considered.

## Why should this matter to patients?

Notice what happened. One question — "Is it accredited?" — became four different questions:

- Is the facility subject to federal oversight?
- Is the hospital nationally certified?
- Does it hold any international accreditation?
- Is the treating physician properly credentialed for the specific care being considered?

That is not a reason for anxiety. It is the opposite. It means there are concrete things to evaluate instead of relying on a feeling, a brochure, or a price.

Here is the part we want to be very honest about: accreditation is an indicator, not a promise.

Regardless of the country, a certificate only tells you that a facility met a defined standard at a defined point in time. It does not guarantee any individual result. No responsible organization should ever suggest otherwise. Healthcare carries uncertainty everywhere in the world.

What accreditation does provide is a more factual basis for evaluating a facility. It helps replace vague reassurance with specific, verifiable information.

This is where MyHealth Haven's role fits.

We do not certify hospitals. We do not practice medicine. We do not diagnose conditions or make clinical decisions. Providers retain full clinical authority.

What we do is help patients understand the landscape and ask better questions:

- Is the facility certified? Which body issued the certification? Is the certificate current?
- Does the treating physician hold the relevant credentials? Is what you were told written down and verifiable?

We believe a patient who understands these distinctions is in a stronger position than one who is simply told not to worry.

That understanding is the difference between feeling uncertain and feeling prepared. This is one of the things that MyHealth Haven helps you navigate.

If you are exploring care in Mexico, you do not need to become an expert in Mexican health regulation. But you do need to know what questions have been asked, the answers have been verified, and where reassurance is supported by documentation.

That is one of the reasons MyHealth Haven exists.

If you want to understand how to evaluate standards at a specific facility, [schedule a Health Navigator consultation](/schedule). We will help you understand what to ask, what to verify, and how to approach the process with more structure and confidence.`,
    faqs: [
      {
        question: 'What is COFEPRIS?',
        answer:
          "COFEPRIS (Comisión Federal para la Protección contra Riesgos Sanitarios) is Mexico's federal health authority. It plays a role comparable to the FDA in the United States, covering medication approval, medical-device registration, and aspects of healthcare facility oversight. It represents a baseline layer of regulatory oversight.",
      },
      {
        question: 'Does hospital accreditation guarantee a good outcome?',
        answer:
          'No. Accreditation is an indicator, not a promise. A certificate only confirms that a facility met a defined standard at a defined point in time; it does not guarantee any individual result. Healthcare carries uncertainty everywhere in the world.',
      },
      {
        question: "Is a hospital's accreditation the same as the treating physician's credentials?",
        answer:
          "No. A facility can meet a standard while you still need to confirm the individual physician's credentials. In Mexico, a licensed physician holds a cédula profesional, and a specialist typically holds certification through the relevant Consejo Mexicano (specialty council) for the care being considered.",
      },
    ],
    relatedArticles: ['how-we-vet-hospitals', 'is-medical-travel-right-for-me'],
  },
];

// ─── Category landing pages ──────────────────────────────────────────────
// Display copy for category hub pages (e.g. /library/getting-started).
// Keyed by categorySlug. Currently only "Getting Started" is wired to a route.
export const LIBRARY_CATEGORY_DETAILS = {
  'getting-started': {
    slug: 'getting-started',
    name: 'Getting Started',
    description:
      'Foundational guides that explain how medical travel works and how to evaluate whether it fits your situation.',
    intro:
      'Start here to understand your options, the questions worth asking, and how to prepare before you commit to anything.',
  },
};

// ─── Article helpers ─────────────────────────────────────────────────────
// Rough reading-time estimate (~200 words/min). Pure, no dependencies.
const estimateReadTime = (content = '') => {
  const words = String(content).trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
};

// Fills every field with a sensible default/alias so authors only specify what
// differs. Missing optional dates/images resolve to `undefined` (never null) so
// the SEO schema builders fall back to their own defaults.
export const normalizeArticle = (raw) => {
  if (!raw) return null;
  const summary = raw.summary ?? '';
  const excerpt = raw.excerpt ?? summary;
  const content = raw.content ?? '';
  return {
    slug: raw.slug,
    title: raw.title,
    summary,
    excerpt,
    content,
    category: raw.category ?? 'Getting Started',
    categorySlug: raw.categorySlug ?? 'getting-started',
    type: raw.type ?? 'Guide',
    readTime: raw.readTime ?? estimateReadTime(content),
    author: raw.author ?? undefined,
    date: raw.date ?? undefined,
    updatedDate: raw.updatedDate ?? undefined,
    featured: raw.featured ?? false,
    image: raw.image ?? undefined,
    imageAlt: raw.imageAlt ?? undefined,
    heroImage: raw.heroImage ?? raw.image ?? undefined,
    heroImageAlt: raw.heroImageAlt ?? raw.imageAlt ?? undefined,
    seoTitle: raw.seoTitle ?? raw.title,
    seoDescription: raw.seoDescription ?? excerpt ?? summary,
    faqs: raw.faqs ?? [],
    relatedArticles: raw.relatedArticles ?? [],
  };
};

// Single source of truth for an article's URL. Used by cards, the article
// page, the hero CTA, the sitemap, canonicals, and schema.
export const getLibraryArticlePath = (article) =>
  `/library/${article.categorySlug || 'getting-started'}/${article.slug}`;

export const getNormalizedArticles = () => LIBRARY_ARTICLES.map(normalizeArticle);

export const getArticlesByCategory = (categorySlug) =>
  LIBRARY_ARTICLES.map(normalizeArticle).filter((article) => article.categorySlug === categorySlug);

export const getLibraryArticleBySlug = (slug) => {
  const found = LIBRARY_ARTICLES.find((article) => article.slug === slug);
  return found ? normalizeArticle(found) : null;
};
