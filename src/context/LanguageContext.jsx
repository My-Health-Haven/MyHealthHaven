import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { translations } from '../data/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('appLanguage') || null;
  });

  const showModal = !language;

  useEffect(() => {
    if (language) {
      localStorage.setItem('appLanguage', language);
    }
  }, [language]);

  const selectLanguage = (lang) => {
    setLanguage(lang);
  };

  // Translation helper
  const t = useCallback((key) => {
    if (!language) return ''; // or fallback to en?
    const langData = translations[language] || translations['en'];
    
    // Support nested keys like 'navbar.home'
    const keys = key.split('.');
    let value = langData;
    for (const k of keys) {
       if (value && value[k]) {
         value = value[k];
       } else {
         return key; // Return key if not found
       }
    }
    return value;
  }, [language]);

  const getLocalizedHomeContent = useCallback(() => {
    return {
      hero: {
        title: t('home.heroTitle'),
        subtitle: t('home.heroSubtitle'),
      },
      problem: {
        title: t('home.problemTitle'),
        desc: t('home.problemDesc'),
      },
      solution: {
        title: t('home.solutionTitle'),
        desc: t('home.solutionDesc'),
      },
    };
  }, [t]);

  const value = useMemo(
    () => ({ language, selectLanguage, showModal, t, getLocalizedHomeContent }),
    [language, showModal, t, getLocalizedHomeContent]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
