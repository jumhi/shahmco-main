import { createContext, useState, ReactNode, useEffect } from "react";
import { Language, TranslationKeys, isRTL } from "./types";
import { en } from "./en";
import { ar } from "./ar";
import { zh } from "./zh";
import { ru } from "./ru";

const translations: Record<Language, TranslationKeys> = { en, ar, zh, ru };

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationKeys;
  dir: "ltr" | "rtl";
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("shahmco-lang");
    return (saved as Language) || "en";
  });

  useEffect(() => {
    localStorage.setItem("shahmco-lang", language);
    document.documentElement.dir = isRTL(language) ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language]);

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: translations[language],
    dir: isRTL(language) ? "rtl" : "ltr",
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Re-export hook from a separate module for Fast Refresh stability
export { useLanguage } from "./useLanguage";
