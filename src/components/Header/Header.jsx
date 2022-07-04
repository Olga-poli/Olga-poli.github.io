import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './Header.module.scss';

function Header(props) {
  const userDataStorage = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
  const { activeUserState, setActiveUserState } = props;

  const logoutUser = () => {
    if (userDataStorage.length > 0) {
      const activeUserIndex = userDataStorage
        .findIndex(({ name }) => name === activeUserState.name);
      const updatedUser = { ...userDataStorage[activeUserIndex], isLogged: false };
      const updatedUsers = [
        ...userDataStorage.slice(0, activeUserIndex),
        updatedUser,
        ...userDataStorage.slice(activeUserIndex + 1),
      ];
      localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
      setActiveUserState(null);
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

Header.defaultProps = {
  activeUserState: PropTypes.shape({}),
};

Header.propTypes = {
  activeUserState: PropTypes.shape({
    name: PropTypes.string,
    password: PropTypes.string,
    isLogged: PropTypes.bool,
  }),
  setActiveUserState: PropTypes.func.isRequired,
};

export default Header;
