import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import languages from "./translations/languages";

i18n.use(initReactI18next).init({
  resources: languages,
  fallbackLng: 'pt',
  keySeparator: false, // we do not use keys in form messages.welcome
  interpolation: {
    escapeValue: false // react already safes from xss
  }
});

export default i18n;
