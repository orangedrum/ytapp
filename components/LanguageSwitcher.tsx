import { useState, useContext, createContext } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

interface Language {
  code: string;
  name: string;
  flag: string;
}

interface LanguageContextType {
  currentLanguage: string;
  setLanguage: (code: string) => void;
  translations: Record<string, Record<string, string>>;
}

const LanguageContext = createContext<LanguageContextType>({
  currentLanguage: 'en',
  setLanguage: () => {},
  translations: {},
});

export const useLanguage = () => useContext(LanguageContext);

const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
];

// Sample translations - in a real app, these would come from a translations service
const translations = {
  en: {
    "Videos": "Videos",
    "About": "About",
    "Services": "Services",
    "Contact": "Contact",
    "Book a Lesson": "Book a Lesson",
    "Latest Lesson": "Latest Lesson",
    "Join Next Workshop": "Join Next Workshop"
  },
  es: {
    "Videos": "Videos",
    "About": "Acerca de",
    "Services": "Servicios", 
    "Contact": "Contacto",
    "Book a Lesson": "Reservar una Lección",
    "Latest Lesson": "Última Lección",
    "Join Next Workshop": "Unirse al Próximo Taller"
  },
  de: {
    "Videos": "Videos",
    "About": "Über uns",
    "Services": "Dienstleistungen",
    "Contact": "Kontakt",
    "Book a Lesson": "Lektion buchen",
    "Latest Lesson": "Neueste Lektion",
    "Join Next Workshop": "Am nächsten Workshop teilnehmen"
  }
};

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const setLanguage = (code: string) => {
    setCurrentLanguage(code);
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};

const LanguageSwitcher = () => {
  const { currentLanguage, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0];

  const handleLanguageChange = (language: Language) => {
    setLanguage(language.code);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 h-8 px-2"
      >
        <span className="text-lg">{currentLang.flag}</span>
        <ChevronDown className="h-3 w-3" />
      </Button>
      
      {isOpen && (
        <div className="absolute top-full right-0 mt-1 bg-background border border-border rounded-md shadow-lg py-1 z-50 min-w-[120px]">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language)}
              className="w-full px-3 py-2 text-left hover:bg-muted flex items-center gap-2 text-sm"
            >
              <span className="text-base">{language.flag}</span>
              <span>{language.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;