import { Language } from '../types/language';
import { createContext, PropsWithChildren, useContext, useState } from 'react';

interface LanguageContextType {
  language: Language;
  changeLanguage: (language: Language) => void;
}

const languageDefaultValue: LanguageContextType = {
  language: "UA",
  changeLanguage: () => {},
}

const LanguageContext =
  createContext<LanguageContextType>(languageDefaultValue);

export const LanguageProvider = ({ children }: PropsWithChildren) => {
  const [language, setLanguage] = useState<Language>("UA");

  const handleChangeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
  }

  return (
    <LanguageContext.Provider value={{ language, changeLanguage: handleChangeLanguage }}>{children}</LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
