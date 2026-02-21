import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { Language, languageNames } from "@/i18n/types";
import { Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages: Language[] = ["en", "ar", "zh", "ru"];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/60 border border-border hover:border-accent/30 transition-all text-sm text-foreground"
      >
        <Globe size={16} className="text-accent" />
        <span className="hidden sm:inline">{languageNames[language]}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute end-0 top-full mt-2 z-50 bg-card border border-border rounded-xl shadow-card overflow-hidden min-w-[160px]"
            >
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => { setLanguage(lang); setIsOpen(false); }}
                  className={`w-full px-4 py-3 text-sm text-start transition-all flex items-center justify-between ${
                    language === lang
                      ? "bg-secondary text-accent font-medium"
                      : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                  }`}
                >
                  <span>{languageNames[lang]}</span>
                  {language === lang && <span className="w-2 h-2 rounded-full bg-accent" />}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;
