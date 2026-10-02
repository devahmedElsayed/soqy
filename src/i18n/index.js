import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { I18nManager } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import ar from "./ar/translation";
import en from "./en/translation";

const STORAGE_KEY = "app-language";

// يضبط اتجاه الـ native حسب اللغة (بيتطبق بعد restart/reload)
export const applyRTL = (language) => {
  const shouldBeRTL = language === "ar";
  I18nManager.allowRTL(shouldBeRTL);
  I18nManager.forceRTL(shouldBeRTL);
  return shouldBeRTL;
};

const languageDetector = {
  type: "languageDetector",
  async: true,

  init() {},

  detect: async (callback) => {
    try {
      const savedLanguage = (await AsyncStorage.getItem(STORAGE_KEY)) || "ar";

      // لو الاتجاه الحالي مختلف عن المطلوب، اضبطه (هيتطبق في التشغيل الجاي)
      const shouldBeRTL = savedLanguage === "ar";
      if (I18nManager.isRTL !== shouldBeRTL) {
        applyRTL(savedLanguage);
      }

      callback(savedLanguage);
    } catch (error) {
      callback("ar");
    }
  },

  cacheUserLanguage: async (language) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, language);
    } catch (error) {
      console.log("Failed to save language:", error);
    }
  },
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",

    resources: {
      ar: { translation: ar },
      en: { translation: en },
    },

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;