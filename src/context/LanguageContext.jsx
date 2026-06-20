import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { translations } from '../data/translations';

const LanguageContext = createContext();
const FALLBACK_LANGUAGE = 'en';
const SUPPORTED_LANGUAGES = new Set(['en', 'es']);

const normalizeLanguage = (value) => {
  if (typeof value !== 'string') return null;
  const normalized = value.trim().toLowerCase();
  return SUPPORTED_LANGUAGES.has(normalized) ? normalized : null;
};

const getBrowserLanguage = () => {
  if (typeof window === 'undefined') return FALLBACK_LANGUAGE;
  const browserLanguage = window.navigator?.language?.split('-')[0];
  return normalizeLanguage(browserLanguage) || FALLBACK_LANGUAGE;
};

const getInitialLanguage = () => {
  if (typeof window === 'undefined') return FALLBACK_LANGUAGE;
  const storedLanguage = normalizeLanguage(window.localStorage.getItem('appLanguage'));
  return storedLanguage || getBrowserLanguage();
};

const getNestedTranslation = (languageData, key) => {
  if (!languageData || typeof key !== 'string') return undefined;

  const keys = key.split('.');
  let value = languageData;

  for (const keyPart of keys) {
    if (value == null || !Object.hasOwn(value, keyPart)) {
      return undefined;
    }
    value = value[keyPart];
  }

  return value;
};

export const LanguageProvider = ({ children }) => {
  // Always start with fallback language to avoid SSR/client hydration mismatch.
  // The stored/browser language is applied after mount via useEffect.
  const [language, setLanguage] = useState(FALLBACK_LANGUAGE);

  // Keep first render crawlable: do not block content behind a mandatory modal.
  const showModal = false;

  // On mount, sync language from localStorage or browser preference.
  useEffect(() => {
    const stored = getInitialLanguage();
    if (stored !== language) {
      setLanguage(stored);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const normalizedLanguage = normalizeLanguage(language) || FALLBACK_LANGUAGE;
    window.localStorage.setItem('appLanguage', normalizedLanguage);
  }, [language]);

  const selectLanguage = (lang) => {
    const normalizedLanguage = normalizeLanguage(lang);
    if (normalizedLanguage) setLanguage(normalizedLanguage);
  };

  // Translation helper
  const t = useCallback(
    (key) => {
      const activeLanguage = normalizeLanguage(language) || FALLBACK_LANGUAGE;
      const activeTranslation = getNestedTranslation(translations[activeLanguage], key);
      if (activeTranslation !== undefined) return activeTranslation;

      const fallbackTranslation = getNestedTranslation(translations[FALLBACK_LANGUAGE], key);
      return fallbackTranslation !== undefined ? fallbackTranslation : key;
    },
    [language]
  );

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

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
