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
    image: '/How To Prepare For.png',
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
    image: '/What Acreditation Actually.png',
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
        question: 'What is CSG certification in Mexico?',
        answer:
          "The Consejo de Salubridad General (CSG) administers Mexico's national hospital certification. Its current framework, the MUEC (Modelo Único de Evaluación de la Calidad), evaluates a facility against a national quality standard. Certification is point-in-time, so it is worth confirming that a certificate exists, which body issued it, and whether it is current.",
      },
      {
        question: 'What is JCI accreditation?',
        answer:
          'Joint Commission International (JCI) is the international arm of the accrediting body widely recognized in the United States. JCI accreditation is an additional, internationally benchmarked layer of review, held by only a smaller subset of hospitals in Mexico — often larger research or teaching facilities.',
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
  {
    slug: 'why-the-same-procedure-costs-less-in-mexico',
    category: 'Getting Started',
    categorySlug: 'getting-started',
    type: 'Article',
    featured: false,
    author: 'Darren Anderson',
    date: '2026-07-01',
    title: 'Why the Same Procedure Can Cost 50 Percent Less in Mexico',
    summary:
      'A clear look at why the same medical procedure can cost roughly half as much in Mexico — and why that lower price reflects a different cost structure, not lower-quality care.',
    seoDescription:
      "Why can the same procedure cost about 50% less in Mexico? The gap reflects a different cost structure — private-pay pricing and lower overhead — not lower-quality care. Here's what to verify before you go.",
    imageAlt: 'Comparing medical procedure costs between the United States and Mexico',
    content: `For many Americans, the first reaction to hearing that a medical procedure may cost 50 percent less in Mexico is suspicion.

That reaction is understandable.

In healthcare, a lower price can feel like a warning sign. People are used to thinking that if something costs less, something must have been removed. Maybe the hospital is less capable. Maybe the physician is less qualified. Maybe the equipment is older. Maybe the lower price means the patient is taking on more risk.

Those are fair concerns. They should not be brushed aside.

But in cross-border healthcare, the price difference is often not explained by one simple factor. It is not usually because one hospital "cares less" or one doctor is "worth less." The difference usually comes from the way the entire healthcare economy is built.

## Why U.S. Healthcare Costs So Much More

The United States has the most expensive healthcare system in the world. OECD data reported that U.S. health spending reached about $14,885 per person in 2024, compared with the OECD average of about $5,967. Mexico, by contrast, spent about $1,588 per person on health in 2024, also measured in purchasing-power terms. Those figures do not tell you whether one specific hospital or physician is right for one specific patient, but they do show the larger cost environment in which care is delivered. ([OECD](https://www.oecd.org/en/publications/health-at-a-glance-2025_15a55280-en/united-states_3517f35e-en.html))

That larger environment matters.

In the United States, the same service can carry layers of cost that are not always visible to the patient. There may be insurance negotiations, hospital system pricing, administrative overhead, coding complexity, billing departments, prior authorization processes, facility fees, payer contracts, collections systems, and compliance costs. Some of those functions are necessary. Some are the result of how fragmented the U.S. payment system has become. Either way, they become part of the final price.

Research comparing U.S. spending with peer countries has repeatedly found that the United States does not simply use dramatically more healthcare than everyone else. A major driver is price. The Peterson-KFF Health System Tracker has summarized that the U.S. spends roughly twice as much per person as comparable countries, driven largely by higher payments to hospitals and physicians. The Commonwealth Fund has also identified administrative costs, prescription drugs, and physician and nurse compensation as contributors to excess U.S. spending compared with other high-income countries. ([Health System Tracker](https://www.healthsystemtracker.org/brief/what-drives-health-spending-in-the-u-s-compared-to-other-countries/))

That helps explain why the same medical service may cost so much more in the United States than it does elsewhere. The price reflects not only the clinical act itself, but also the financial architecture around it.

## How Pricing Works Differently in Mexico

Mexico operates differently, especially in the private-pay sector used by many international patients. Prices may be presented more directly. Hospitals and physicians may not be navigating the same U.S.-style insurance maze. Administrative staffing and billing complexity may be lower. Real estate, labor, and liability-related expenses may also differ. In many cases, a patient is paying for the procedure, hospital stay, surgeon, anesthesia, labs, imaging, and related services in a more bundled or transparent way.

That does not mean every quote is complete. It does not mean every provider is equal. It does not mean every patient is a good candidate for travel. It simply means the lower price is not automatically irrational.

A 50 percent lower cost can be real.

But it must be understood correctly.

One reason U.S. patients are surprised by international pricing is that they rarely see a true cash price at home. In the United States, a hospital's charge, an insurer's negotiated rate, a Medicare benchmark, and a patient's final out-of-pocket responsibility can all be different numbers. RAND's hospital price transparency work has shown significant variation in the prices paid to U.S. hospitals by private health plans, using Medicare prices as a benchmark. That variation is one reason patients and employers often struggle to understand what a service actually costs. ([RAND Corporation](https://www.rand.org/pubs/research_reports/RRA1144-2-v2.html))

When a patient receives a private-pay quote abroad, the number can seem startlingly low by comparison. But sometimes the international number is not "cheap." It is simply less burdened by the U.S. system's pricing structure.

That distinction matters.

## A Lower Price Should Begin Better Questions

A lower price should not be used as a shortcut around due diligence. It should be the beginning of a better set of questions.

- What exactly is included in the quote?
- Who is performing the procedure?
- Where will the procedure take place?
- What are the physician's credentials?
- What hospital standards apply?
- What preoperative testing is required?
- What happens if the patient needs an extra night?
- What happens if complications arise?
- Who coordinates records before and after care?
- What follow-up is needed after the patient returns home?

These questions matter because medical travel is not just a purchase. It is a care pathway.

## Medical Travel Is a Care Pathway, Not a Purchase

At MyHealth Haven, we believe patients deserve a more serious conversation than "you can save money." Savings may be part of the story. For many people, savings are the reason they can consider care at all. But the real issue is whether the patient can move from fear and confusion into a structured process.

That process should include more than finding a doctor.

It should include medical record preparation, provider matching, quote clarification, travel planning, pre-arrival coordination, appointment sequencing, communication support, discharge planning, and post-return follow-up awareness. It should also include an honest discussion of risk. No responsible organization can promise that nothing will go wrong. That is true in Mexico, in the United States, and everywhere else. Medicine always carries uncertainty.

The difference is whether the patient is improvising or has a plan.

Lower cost can open a door. It should not replace judgment.

## Where Patients Should Be Especially Careful

There are also areas where patients should be especially careful. Cosmetic surgery, dental reconstruction, orthopedic procedures, bariatric surgery, fertility care, and complex chronic-care evaluations can all involve very different timelines, risks, and follow-up requirements. The right setting for one patient may be wrong for another. A healthy person seeking a defined elective procedure is not in the same situation as a medically fragile patient with multiple conditions and limited support.

The CDC notes that U.S. medical travelers commonly go to Mexico, Canada, the Caribbean, and parts of South America, and it advises travelers to consult appropriate clinicians before travel, understand risks, and plan for follow-up care. That is the right mindset. Medical travel should be prepared, not impulsive. ([CDC](https://www.cdc.gov/yellow-book/hcp/health-care-abroad/medical-tourism.html))

This is where MyHealth Haven fits.

We do not replace doctors. We do not diagnose conditions. We do not make clinical decisions. Providers retain full clinical authority. Our role is to help patients understand the process, ask better questions, organize the journey, and avoid treating cross-border care as a simple transaction.

## So, Why Can the Same Procedure Cost Less?

So why can the same procedure cost 50 percent less in Mexico?

Because the underlying cost structure is different. Because private-pay pricing can be more direct. Because administrative and facility costs may be lower. Because U.S. healthcare prices carry layers that patients rarely see clearly. Because the number on a bill is not only a measure of medical skill; it is also a reflection of the system around the care.

But the better question is not whether Mexico can be less expensive.

Often, it can.

The better question is whether the patient has the right information, the right provider, the right plan, and the right support before making a decision.

That is the conversation worth having.

To learn more about structured, trust-first support for care in Mexico, [talk to a Health Navigator](/schedule).`,
    faqs: [
      {
        question: 'Why does the same procedure cost less in Mexico?',
        answer:
          'Mostly because the underlying cost structure is different. Private-pay pricing can be more direct, administrative and facility costs may be lower, and U.S. prices carry layers — insurance negotiations, billing, facility fees, compliance — that patients rarely see. The price reflects the system around the care, not only the medical skill.',
      },
      {
        question: 'Does a lower price mean lower-quality care?',
        answer:
          'Not automatically. A lower price often reflects a less burdened pricing structure rather than reduced quality. It does mean you still need to verify the provider, the facility standards, and exactly what the quote includes before deciding.',
      },
      {
        question: 'How much more does the U.S. spend on healthcare?',
        answer:
          'Per OECD data, U.S. health spending reached about $14,885 per person in 2024, compared with an OECD average of about $5,967 and about $1,588 in Mexico (measured in purchasing-power terms). Research attributes much of the U.S. gap to higher prices rather than more care.',
      },
      {
        question: 'What should I ask before choosing care abroad?',
        answer:
          'Treat a low price as the start of due diligence, not the end. Ask what the quote includes, who performs the procedure and their credentials, what hospital standards apply, what preoperative testing is required, what happens if complications arise or an extra night is needed, and who coordinates records and follow-up before and after care.',
      },
    ],
    relatedArticles: [
      'is-medical-travel-right-for-me',
      'what-accreditation-actually-means-in-mexico',
      'how-we-vet-hospitals',
    ],
  },
  {
    slug: 'insured-but-still-paying-what-coverage-costs',
    category: 'Getting Started',
    categorySlug: 'getting-started',
    type: 'Article',
    featured: false,
    author: 'Darren Anderson',
    date: '2026-07-01',
    title: 'Insured but Still Paying? Understanding What Coverage Really Costs',
    summary:
      "Being covered isn't the same as being able to afford care. Here's a clear look at why many insured Americans still face high out-of-pocket costs — and what that means for your options.",
    seoTitle: 'Insured but Still Paying? What Coverage Really Costs',
    seoDescription:
      "Being covered isn't the same as being able to afford care. Here's why many insured Americans still face high out-of-pocket costs — and what it means for your options.",
    imageAlt: 'Insured patient reviewing a medical bill and out-of-pocket costs',
    content: `If you have ever paid your insurance premium faithfully, walked into an appointment expecting to be covered, and then opened a bill that made your stomach drop — you are not alone, and you did not do anything wrong.

It is one of the most common and least talked-about experiences in American healthcare. You are insured. And you are still paying a lot.

For many people, the quiet assumption underneath this is a sense of personal failure. Maybe I picked the wrong plan. Maybe I should have read the fine print more carefully. Usually, that is not what happened. What happened is that "covered" and "affordable" are not the same thing, and the gap between them is built into how coverage works.

Let us walk through why, calmly and clearly, because understanding this is genuinely useful no matter what you decide to do.

## The Premium Is Only the Beginning

Your monthly premium is what you pay to have insurance at all. It is easy to assume that once it is paid, your costs are mostly handled. In reality, the premium is often just the entry fee. What you pay when you actually use care is shaped by several other pieces, and those pieces are where the surprises usually live.

## The Deductible

A deductible is the amount you pay yourself before your insurance begins to pay a meaningful share. If your plan has a high deductible, you may be responsible for a substantial amount of your care out of pocket before coverage really kicks in. High-deductible plans often come with lower monthly premiums, which is part of why they are appealing and part of why the bills later can feel like a shock.

## Coinsurance and Copays

Even after you meet your deductible, you are often not done paying. Coinsurance means you pay a percentage of the cost, and your insurer pays the rest. A copay is a fixed amount for a visit or service. These continue even when everything is working exactly as designed. Coverage rarely means the cost drops to zero.

## The Out-of-Pocket Maximum

There is a ceiling on what you will pay in a year, called the out-of-pocket maximum. That protection is real and important. It is also worth understanding honestly: for many plans, that ceiling can be high enough that reaching it still represents a serious financial strain for a household.

## In-Network Versus Out-of-Network

Two people can receive the same service and pay very different amounts depending on whether the provider is in their plan's network. Out-of-network care can cost dramatically more, and in some cases may not count toward your deductible or maximum at all. This single detail is behind a large share of surprise bills.

## What Is Not Covered at All

Some services are simply outside what a plan covers. Certain elective procedures, specific treatments, and categories like some dental or specialty care may not be included. In those cases, coverage is not reduced. It is absent, and the full cost falls to the patient.

Put these together, and something becomes clear. Being surprised by a medical bill usually is not a sign that you misunderstood your plan. It is a sign that the system is genuinely complex, with many moving parts that interact in ways few people are ever walked through.

This is where we want to be precise about our role.

MyHealth Haven does not sell you a cheaper version of healthcare, and we are not here to tell you your insurance is bad or to give you financial advice. We are a non-clinical healthcare navigation company. What we do is help people understand the full picture of their real costs and their real options, with transparency and without pressure.

Because here is the deeper point. Once you understand how your actual costs work — premiums, deductibles, coinsurance, networks, and coverage gaps — you are no longer guessing. You can look at any option, including structured cross-border care, and evaluate it on real information rather than assumptions. That understanding is not about finding the lowest price. It is about being able to weigh value, cost, quality, and coordination with clear eyes.

We think people make better healthcare decisions when the math is no longer a mystery. Not rushed decisions. Not fear-driven decisions. Informed ones.

If any of this sounds familiar — if you have ever felt the gap between being covered and being able to afford your care — the most useful first step is simply understanding your own numbers. That is something we are glad to help with. [Make an appointment today](/schedule) with one of our health navigators™.`,
    faqs: [
      {
        question: 'Why am I still paying so much when I have insurance?',
        answer:
          "Your premium only buys the coverage; using care adds costs on top. Deductibles, coinsurance, copays, out-of-network charges, and services that aren't covered at all can each add to what you owe. Being surprised by a bill usually reflects how complex the system is, not a mistake you made.",
      },
      {
        question: 'What is a deductible?',
        answer:
          'A deductible is the amount you pay yourself before your insurance starts paying a meaningful share. High-deductible plans usually have lower monthly premiums, which is why the later bills can feel like a shock.',
      },
      {
        question: "What's the difference between coinsurance and a copay?",
        answer:
          'Coinsurance is a percentage of the cost that you pay while your insurer pays the rest. A copay is a fixed amount for a visit or service. Both can continue even after you meet your deductible, so coverage rarely means your cost drops to zero.',
      },
      {
        question: 'What is an out-of-pocket maximum?',
        answer:
          'It is the ceiling on what you pay in a year. The protection is real, but for many plans that ceiling can be high enough that reaching it is still a serious financial strain for a household.',
      },
      {
        question: 'Why does in-network versus out-of-network matter?',
        answer:
          "Two people can get the same service and pay very different amounts depending on whether the provider is in their plan's network. Out-of-network care can cost dramatically more and may not count toward your deductible or maximum at all, which is behind a large share of surprise bills.",
      },
    ],
    relatedArticles: [
      'why-the-same-procedure-costs-less-in-mexico',
      'is-medical-travel-right-for-me',
      'what-accreditation-actually-means-in-mexico',
    ],
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
