import { useSelector } from 'react-redux';

const dictionary = {
  en: {
    'app-header-login': 'Login',
    'app-header-title': 'Movies',
    'app-header-logout': 'Logout',

    'app-form-label-login': 'Login',
    'app-form-label-password': 'Password',
    'app-form-login-button': 'Login',
    'app-form-register-button': 'Register',
    'app-login-notexist-message': 'User didn\'t found. Please, register. ',
    'app-login-redirect-message': 'Not a member? ',
    'app-register-redirect-message': 'Already  have an account? ',

    'app-filter-title': 'Sort movies',
    'app-filter-likes-label': 'by likes',
    'app-filter-rating-label': 'by rating',

    'app-catalog-banish': 'Login to see content',
    'app-catalog-error': 'Error...',
    'app-catalog-loading': 'Loading...',
    'app-catalog-back-button': 'Back',

    'app-movie-remove-button': 'Delete',

    'app-movie-edit-button': 'Edit',
    'app-movie-edit-form-submit-button': 'Save',
    'app-movie-edit-subtitle-title': 'Title',
    'app-movie-edit-subtitle-imageurl': 'Image URL',
    'app-movie-edit-subtitle-description': 'Description',

    'app-movie-subtitle-likes': 'Likes: ',
    'app-movie-subtitle-release': 'Release: ',
    'app-movie-subtitle-language': 'Language: ',
    'app-movie-subtitle-genres': 'Genres: ',
    'app-movie-subtitle-director': 'Director: ',
    'app-movie-subtitle-description': 'Description: ',
    'app-movie-subtitle-cast': 'Cast: ',
  },
  ua: {
    'app-header-login': 'Логін',
    'app-header-title': 'Фільми',
    'app-header-logout': 'Вихід',

    'app-form-label-login': 'Логін',
    'app-form-label-password': 'Пароль',
    'app-form-login-button': 'Увійти',
    'app-form-register-button': 'Зареєструватись',
    'app-login-notexist-message': 'Користувача не знайдено. Будь ласка, зареєструйтесь',
    'app-login-redirect-message': 'Нема аккаунту? ',
    'app-register-redirect-message': 'Вже є аккаунт? ',

    'app-filter-title': 'Сортувати фільми',
    'app-filter-likes-label': 'за вподобаннями',
    'app-filter-rating-label': 'за рейтингом',

    'app-catalog-banish': 'Увійдіть, щоб побачити контент',
    'app-catalog-error': 'Помилка...',
    'app-catalog-loading': 'Завантажується...',
    'app-catalog-back-button': 'Повернутися',

    'app-movie-remove-button': 'Видалити',

    'app-movie-edit-button': 'Редагувати',
    'app-movie-edit-form-submit-button': 'Зберегти',
    'app-movie-edit-subtitle-title': 'Назва',
    'app-movie-edit-subtitle-imageurl': 'Зображення',
    'app-movie-edit-subtitle-description': 'Опис',

    'app-movie-subtitle-likes': 'Вподобань: ',
    'app-movie-subtitle-release': 'Реліз: ',
    'app-movie-subtitle-language': 'Мова: ',
    'app-movie-subtitle-genres': 'Жанри: ',
    'app-movie-subtitle-director': 'Постановник: ',
    'app-movie-subtitle-description': 'Опис: ',
    'app-movie-subtitle-cast': 'В ролях: ',
  },
};

const useTranslation = () => {
  const appStateLanguage = useSelector((state) => state.catalogReducer.language);
  const translate = (key) => dictionary?.[appStateLanguage]?.[key];
  return { translate };
};

export default useTranslation;
