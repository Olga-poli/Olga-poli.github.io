import React, { useEffect } from 'react';

const dictionary = {
  en: {
    login: 'Login',
    header: 'Movies',
    logout: 'Logout',
  },
  ua: {
    login: 'Логін',
    header: 'Фільми',
    logout: 'Вихід',
  },
};

let currentLanguage = 'en';

const useTranslation = () => {
  const [language, setLanguage] = React.useState(currentLanguage);
  const languages = Object.keys(dictionary);

  useEffect(() => {
    currentLanguage = language || 'en';
  }, [language]);

  const translate = (key) => dictionary?.[language]?.[key];
  return {
    translate, setLanguage, language, languages,
  };
};

export default useTranslation;
