import { useSelector } from 'react-redux';

const dictionary = {
  en: {
    'app-header-login': 'Login',
    'app-header-title': 'Movies',
    'app-header-logout': 'Logout',
    'app-filter-title': 'Sort movies',
    'app-filter-likes-label': 'by likes',
    'app-filter-rating-label': 'by rating',
    'app-catalog-banish': 'Login to see content',
    'app-catalog-error': 'Error...',
    'app-catalog-loading': 'Loading...',
    'app-catalog-back-button': 'Back',
    'app-movie-remove-button': 'Delete',
    'app-movie-edit-button': 'Edit',
  },
  ua: {
    'app-header-login': 'Логін',
    'app-header-title': 'Фільми',
    'app-header-logout': 'Вихід',
    'app-filter-title': 'Сортувати фільми',
    'app-filter-likes-label': 'за лайками',
    'app-filter-rating-label': 'за рейтингом',
    'app-catalog-banish': 'Увійдіть, щоб побачити контент',
    'app-catalog-error': 'Помилка...',
    'app-catalog-loading': 'Завантажується...',
    'app-catalog-back-button': 'Повернутися',
    'app-movie-remove-button': 'Видалити',
    'app-movie-edit-button': 'Редагувати',
  },
};

const useTranslation = () => {
  const appStateLanguage = useSelector((state) => state.catalogReducer.language);
  const translate = (key) => dictionary?.[appStateLanguage]?.[key];
  return { translate };
};

export default useTranslation;
