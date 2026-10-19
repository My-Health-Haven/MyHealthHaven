/*
 * UI labels the paper library pages add (never page copy: that stays in the
 * data and the views). Spanish uses usted, like the rest of the site.
 */
export const LIBRARY_LABELS = {
  en: {
    breadcrumb: 'Breadcrumb',
    articles: 'Articles',
    topics: 'Topics in the library',
    featured: 'Featured articles',
    categories: 'Library categories',
    newTab: '(opens in a new tab)',
    onThisPage: 'In this article',
    backTo: 'Back to',
    frames: {
      questions:
        'Illustration from the MyHealth Haven film: a patient thinks it over, surrounded by thought bubbles of a hospital, a route around the globe, a treatment chair and a talk with a doctor.',
      thinking: 'Illustration from the MyHealth Haven film: a patient thinks it over, picturing a hospital in a thought bubble.',
      planning:
        'Illustration from the MyHealth Haven film: a patient stands among the pieces of her plan, her doctor, records, calendar, home, hospital and map, joined by dashed paths.',
    },
  },
  es: {
    breadcrumb: 'Ruta de navegación',
    articles: 'Artículos',
    topics: 'Temas de la biblioteca',
    featured: 'Artículos destacados',
    categories: 'Categorías de la biblioteca',
    newTab: '(se abre en una pestaña nueva)',
    onThisPage: 'En este artículo',
    backTo: 'Volver a',
    frames: {
      questions:
        'Ilustración de la película de MyHealth Haven: una paciente lo piensa, rodeada de burbujas de pensamiento con un hospital, una ruta alrededor del mundo, un sillón de tratamiento y una conversación con una doctora.',
      thinking: 'Ilustración de la película de MyHealth Haven: una paciente lo piensa e imagina un hospital en una burbuja de pensamiento.',
      planning:
        'Ilustración de la película de MyHealth Haven: una paciente rodeada de las piezas de su plan, su doctora, sus expedientes, el calendario, su casa, el hospital y el mapa, unidas por caminos punteados.',
    },
  },
};

export const libraryLabels = (language) => LIBRARY_LABELS[language === 'es' ? 'es' : 'en'];

/* the film frame for each category hub's hero */
export const CATEGORY_FRAMES = {
  'getting-started': { src: '/pages/library-thinking.webp', altKey: 'thinking' },
  'costs-and-planning': { src: '/pages/library-planning.webp', altKey: 'planning' },
};
