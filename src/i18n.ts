import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Importar arquivos de tradução
import translationPT from './locales/pt/translation.json';
import translationEN from './locales/en/translation.json';

// Recursos de tradução
const resources = {
  pt: {
    translation: translationPT
  },
  en: {
    translation: translationEN
  }
};

i18n
  // Detectar idioma do usuário
  .use(LanguageDetector)
  // Passar o i18n para o react-i18next
  .use(initReactI18next)
  // Inicializar i18next
  .init({
    resources,
    fallbackLng: 'pt',
    debug: process.env.NODE_ENV === 'development',
    
    interpolation: {
      escapeValue: false, // não é necessário para React
    },
    
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
      lookupQuerystring: 'lng',
      lookupCookie: 'i18next',
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage', 'cookie'],
    }
  });

export default i18n;
