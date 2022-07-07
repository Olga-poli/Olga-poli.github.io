import React from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import styles from './Header.module.scss';
import withAuthorization from '../hoc-helpers';
import useTranslation from '../hook-helpers';

function Header({ isLogged }) {
  const {
    language,
    setLanguage,
    translate,
  } = useTranslation();

  const handleLogOutButtonClick = () => {
    if (!localStorage.getItem('registeredUsers')) {
      localStorage.setItem('registeredUsers', JSON.stringify([]));
    }
    const storage = JSON.parse(localStorage.getItem('registeredUsers'));
    if (storage.length < 1) {
      return;
    }
    const updatedStorage = storage.map((user) => ({ ...user, isLoggedIn: false }));
    localStorage.setItem('registeredUsers', JSON.stringify(updatedStorage));
  };

  const handleLangButtonClick = () => {
    const toggleTo = language === 'en' ? 'ua' : 'en';
    setLanguage(toggleTo);
  };

  return (
    <header className={styles.header}>
      <h1>
        <Link to="/">
          {translate('app-header-title')}
        </Link>
      </h1>
      <div>
        <button
          type="button"
          className={`${styles.langButton} btn btn-outline-primary ml-3`}
          onClick={handleLangButtonClick}
        >
          {language}
        </button>
        {isLogged
          ? (
            <Link to="/">
              <button
                onClick={handleLogOutButtonClick}
                className={`${styles.button} btn btn-outline-primary`}
                type="button"
              >
                {translate('app-header-logout')}
              </button>
            </Link>
          )
          : (
            <Link to="/login">
              <button
                className={`${styles.button} btn btn-outline-primary`}
                type="button"
              >
                {translate('app-header-login')}
              </button>
            </Link>
          )}
      </div>
    </header>
  );
}

Header.propTypes = {
  isLogged: PropTypes.bool.isRequired,
};

export default compose(withAuthorization)(Header);
