import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './Header.module.scss';

function Header() {
  const userDataStorage = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
  const initialActiveUser = userDataStorage.length > 0
    ? [...userDataStorage].find(({ isLogged }) => isLogged === true)
    : '';
  const [activeUserState, setActiveUserState] = useState(initialActiveUser);

  const logoutUser = () => {
    if (userDataStorage.length > 0) {
      const activeUserIndex = userDataStorage.findIndex(({ isLogged }) => isLogged === true);
      const updatedUser = { ...userDataStorage[activeUserIndex], isLogged: false };
      const updatedUsers = [
        ...userDataStorage.slice(0, activeUserIndex),
        updatedUser,
        ...userDataStorage.slice(activeUserIndex + 1),
      ];
      localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
      setActiveUserState('');
    }
  };

  return (
    <header className={styles.header}>
      <h1>
        <Link to="/">
          Movies
        </Link>
      </h1>
      {activeUserState
        ? (
          <Link to="/">
            <button
              onClick={logoutUser}
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

export default Header;
