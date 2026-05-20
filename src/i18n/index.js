import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import uz from './uz.js';
import en from './en.js';
import ru from './ru.js';

const savedLang = localStorage.getItem('cvcraft_language') || 'uz';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      uz: { translation: uz },
      en: { translation: en },
      ru: { translation: ru },
    },
    lng: savedLang,
    fallbackLng: 'uz',
    supportedLngs: ['uz', 'en', 'ru'],
    detection: {
      order: ['localStorage'],
      caches: ['localStorage'],
      lookupLocalStorage: 'cvcraft_language',
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
