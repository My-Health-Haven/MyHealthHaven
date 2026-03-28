import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { translations } from '../data/translations';
import { LanguageProvider, useLanguage } from './LanguageContext';

const renderUseLanguage = () =>
  renderHook(() => useLanguage(), {
    wrapper: ({ children }) => <LanguageProvider>{children}</LanguageProvider>,
  });

describe('LanguageContext', () => {
  beforeEach(() => {
    let store = {};

    Object.defineProperty(window, 'localStorage', {
      configurable: true,
      value: {
        getItem: vi.fn((key) => store[key] ?? null),
        setItem: vi.fn((key, value) => {
          store[key] = String(value);
        }),
        removeItem: vi.fn((key) => {
          delete store[key];
        }),
        clear: vi.fn(() => {
          store = {};
        }),
      },
    });

    window.localStorage.clear();
  });

  it('returns restored english page copy instead of leaking translation keys', () => {
    window.localStorage.setItem('appLanguage', 'en');

    const { result } = renderUseLanguage();

    expect(result.current.t('contactPage.title')).toBe('Speak with a Health Navigator');
    expect(result.current.t('schedulePage.title')).toBe('Schedule Your Appointment');
    expect(result.current.t('estimatePage.feedback.error')).toBe(
      'We could not send your request right now. Please try again.'
    );
  });

  it('uses the active language when available and falls back to english per key', () => {
    window.localStorage.setItem('appLanguage', 'es');

    const { result } = renderUseLanguage();

    expect(result.current.t('contactPage.title')).toBe('Hable con un Navegador de Salud');
    expect(result.current.t('home.heroTitle')).toBe(translations.en.home.heroTitle);
    expect(result.current.t('missing.section.key')).toBe('missing.section.key');
  });
});
