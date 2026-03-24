import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { STORAGE_KEYS } from './utilities/constants';
export const languages = ['de', 'en'];
export const defaultLanguage = languages[0];
i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    fallbackLng: localStorage.getItem(STORAGE_KEYS.LANGUAGE_SELECTED)??defaultLanguage,
    supportedLngs: languages,
    interpolation: { escapeValue: false },
    backend: {
      loadPath: '/locales/{{lng}}.json',
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
   