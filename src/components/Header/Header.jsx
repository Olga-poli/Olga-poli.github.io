import React from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import styles from './Header.module.scss';
import withAuthorization from '../hoc-helpers';

function Header({ isLogged }) {
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

  return (
    <header className={styles.header}>
      <h1>
        <Link to="/">
          Movies
        </Link>
      </h1>
      {isLogged
        ? (
          <Link to="/">
            <button
              onClick={handleLogOutButtonClick}
              className={`${styles.button} btn btn-outline-primary`}
              type="button"
            >
              Log out
            </button>
          </Link>
        )
        : (
          <Link to="/login">
            <button
              className={`${styles.button} btn btn-outline-primary`}
              type="button"
            >
              Log in
            </button>
          </Link>
        )}
    </header>
  );
}

Header.propTypes = {
  isLogged: PropTypes.bool.isRequired,
};

export default compose(withAuthorization)(Header);
