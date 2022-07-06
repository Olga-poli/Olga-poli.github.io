import React from 'react';
import { Link } from 'react-router-dom';
// import { compose } from 'redux';
// import PropTypes from 'prop-types';

import styles from './Header.module.scss';
// import withAuthorization from '../hoc-helpers';

function Header() {
  const isLogged = true;
  // const [activeUserState, setActiveUserState] = useState(true);
  // const loggedOutUser = () => {
  //   if (userDataStorage.length > 0) {
  //     const activeUserIndex = userDataStorage
  //       .findIndex(({ name }) => name === activeUserState.name);
  //     const updatedUser = { ...userDataStorage[activeUserIndex], isLogged: false };
  //     const updatedUsers = [
  //       ...userDataStorage.slice(0, activeUserIndex),
  //       updatedUser,
  //       ...userDataStorage.slice(activeUserIndex + 1),
  //     ];
  //     localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
  //     setActiveUserState(null);
  //   }
  // };

  // useEffect(() => {
  //   const userDataStorage = JSON.parse(localStorage.getItem('registeredUsers')) || [];
  //   if (userDataStorage.length > 1) {
  //     const activeUser = userDataStorage.find(({ isLoggedIn }) => isLoggedIn === true);
  //   }
  // }, [activeUserState]);

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
              // onClick={loggedOutUser}
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

// Header.propTypes = {
//   isLogged: PropTypes.bool.isRequired,
// };

export default Header;
