/*
 * New strings for the paper Medical Travel page: alt text and UI labels only.
 * Every piece of page copy still comes from translations.js (medicalTravelPage).
 * The Cancún map's English alt is the old page's own alt, unchanged.
 */
export const LABELS = {
  en: {
    heroAlt:
      'Illustration from the MyHealth Haven film: the route from home to the hospital, past the doctor, the paperwork and the calendar, laid out above a map of North America.',
    walkAlt:
      'Illustration from the MyHealth Haven film: the patient and her Health Navigator walk side by side past a procedure room in the hospital.',
    cancunMapAlt: 'Map showing flight path from USA to Cancún, Mexico',
    mapTitle: 'MyHealth Haven Operations Map',
  },
  es: {
    heroAlt:
      'Ilustración de la película de MyHealth Haven: el camino de casa al hospital, pasando por la doctora, los documentos y el calendario, sobre un mapa de Norteamérica.',
    walkAlt:
      'Ilustración de la película de MyHealth Haven: la paciente y su Health Navigator caminan juntas frente a una sala de procedimientos del hospital.',
    cancunMapAlt: 'Mapa que muestra la ruta de vuelo de EE.UU. a Cancún, México',
    mapTitle: 'Mapa de operaciones de MyHealth Haven',
  },
};

export const labelsFor = (language) => LABELS[language === 'es' ? 'es' : 'en'];
