import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'fr' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="fixed top-4 right-4 z-50 bg-white/10 backdrop-blur-lg px-4 py-2 rounded-full text-white hover:bg-white/20 transition-colors"
    >
      {i18n.language === 'en' ? 'FR' : 'EN'}
    </button>
  );
}

export default LanguageSwitcher;