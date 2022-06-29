import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

function Header() {
  const userDataStorage = JSON.parse(window.localStorage.getItem('registeredUsers'));
  const { isLogged } = userDataStorage
    ? userDataStorage[userDataStorage.length - 1]
    : false;

  const userSignOut = () => {
    const loggedOutUser = { ...userDataStorage[userDataStorage.length - 1], isLogged: false };
    const updatedUserDataStorage = [
      ...userDataStorage.slice(0, userDataStorage.length - 1),
      loggedOutUser,
    ];
    window.localStorage.setItem('registeredUsers', JSON.stringify(updatedUserDataStorage));
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
          <button
            onClick={userSignOut}
            className={`${styles.button} btn btn-outline-primary`}
            type="button"
          >
            Sign out
          </button>
        )
        : (
          <button
            className={`${styles.button} btn btn-outline-primary`}
            type="button"
          >
            Sign in
          </button>
        )}
    </header>
  );
}

export default Header;
