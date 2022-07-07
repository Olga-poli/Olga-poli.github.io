import React, { useEffect } from 'react';

const dictionary = {
  en: {
    'app-header-login': 'Login',
    'app-header-title': 'Movies',
    'app-header-logout': 'Logout',
    'app-catalog-banish': 'Login to see content',
  },
  ua: {
    'app-header-login': 'Логін',
    'app-header-title': 'Фільми',
    'app-header-logout': 'Вихід',
    'app-catalog-banish': 'Увійдіть, щоб побачити контент',
  },
};

let currentLanguage = 'en';

const useTranslation = () => {
  const [language, setLanguage] = React.useState(currentLanguage);

  useEffect(() => {
    currentLanguage = language || 'en';
  }, [language]);

  const translate = (key) => dictionary?.[language]?.[key];
  return { translate, setLanguage, language };
};

export default useTranslation;
