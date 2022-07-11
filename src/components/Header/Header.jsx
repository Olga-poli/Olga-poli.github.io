import React from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { setAppLanguage } from '../../store/slices/catalog.slice';

import withAuthorization from '../../hocs';
import { useTranslation } from '../../hooks';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

function Header({ isLogged }) {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.catalogReducer.language);
  const { translate } = useTranslation();

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
    dispatch(setAppLanguage(toggleTo));
  };

  const headerClassName = cx('header');
  const langButtonClassName = cx('langButton', 'btn btn-outline-primary ml-3');
  const loginButtonClassName = cx('button', 'btn btn-outline-primary');

  return (
    <header className={headerClassName}>
      <h1>
        <Link to="/">
          {translate('app-header-title')}
        </Link>
      </h1>
      <div>
        <button
          type="button"
          className={langButtonClassName}
          onClick={handleLangButtonClick}
        >
          {language}
        </button>
        {isLogged
          ? (
            <Link to="/">
              <button
                onClick={handleLogOutButtonClick}
                className={loginButtonClassName}
                type="button"
              >
                {translate('app-header-logout')}
              </button>
            </Link>
          )
          : (
            <Link to="/login">
              <button
                className={loginButtonClassName}
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
