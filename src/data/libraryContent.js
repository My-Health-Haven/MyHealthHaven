export const LIBRARY_PAGE_COPY = {
  en: {
    title: 'Learning Library',
    subtitle:
      'Calm, evidence-based guides to cross-border care, written to help you evaluate options with clarity.',
    cta: 'Start With the Basics',
    featuredTopics: 'Featured Topics',
    guideLabel: 'Guide',
    readArticle: 'Read Article',
    governmentResourcesTitle: 'Government Resources',
    governmentResourcesBody: 'Official information on medical travel, safety, and care planning.',
  },
  es: {
    title: 'Biblioteca de Aprendizaje',
    subtitle:
      'Guias claras y basadas en evidencia para ayudarle a evaluar opciones de atencion transfronteriza con confianza.',
    cta: 'Comience Con Lo Basico',
    featuredTopics: 'Temas Destacados',
    guideLabel: 'Guia',
    readArticle: 'Leer Articulo',
    governmentResourcesTitle: 'Recursos Oficiales',
    governmentResourcesBody:
      'Informacion oficial sobre viaje medico, seguridad y planificacion de la atencion.',
  },
};

export const LIBRARY_ARTICLES = [
  {
    slug: 'is-medical-travel-right-for-me',
    title: 'Is Medical Travel Right for Me?',
    summary:
      'A balanced guide to understanding benefits, risks, and the less-obvious questions worth answering before you commit.',
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
    content: `Your U.S. physician may not choose the overseas provider for you, but they can still be an important part of the planning process. A productive conversation usually starts with records, diagnosis details, and a clear explanation of what procedure you are considering and why.

Ask what information they would want from the treating team in Mexico. Imaging reports, operative notes, medication plans, and recovery guidance are often the documents that matter most for continuity once you return.

It is also helpful to discuss follow-up expectations in advance. Understanding who will monitor healing, how complications would be handled, and when you should check back in locally can prevent gaps after travel.

When everyone understands the same plan, the conversation becomes less about geography and more about making sure care stays coordinated from start to finish.`,
  },
];

export const getLibraryArticleBySlug = (slug) =>
  LIBRARY_ARTICLES.find((article) => article.slug === slug) || null;
