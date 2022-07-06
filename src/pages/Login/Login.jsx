import React, { useState } from 'react';
import { compose } from 'redux';
import { Link, Redirect, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import withAuthorization from '../../components/hoc-helpers';
import styles from './Login.module.scss';

function Login({ isLogged }) {
  const history = useHistory();
  const [logMessage, setLogMessage] = useState('');

  const loginUser = (userCredits) => {
    if (!localStorage.getItem('registeredUsers')) {
      localStorage.setItem('registeredUsers', JSON.stringify([]));
    }
    const storage = JSON.parse(localStorage.getItem('registeredUsers'));
    const isRegister = storage.some(({ name }) => name === userCredits.name);
    if (!isRegister) {
      setLogMessage('User didn\'t found. Please, register.');
      return;
    }
    const activeUserIndex = storage.findIndex(({ name }) => name === userCredits.name);
    const updatedUser = { ...storage[activeUserIndex], isLoggedIn: true };
    const updatedUsers = [
      ...storage.slice(0, activeUserIndex),
      updatedUser,
      ...storage.slice(activeUserIndex + 1),
    ];
    localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
    history.push('/catalog');
  };

  const handleLoginFormSubmit = (event) => {
    event.preventDefault();
    const userName = event.target.elements.userName.value;
    const userPassword = event.target.elements.userPassword.value;
    loginUser({ name: userName, password: userPassword, isLoggedIn: true });
  };

  if (isLogged) {
    return (
      <Redirect to="/catalog" />
    );
  }

  return (
    <div className={styles.login}>
      <form
        onSubmit={handleLoginFormSubmit}
        className={styles.form}
      >
        <div className="form-outline mb-4">
          <input
            type="text"
            id="userName"
            name="userName"
            className="form-control"
          />
          <label className="form-label" htmlFor="userName">Username</label>
        </div>

        <div className="form-outline mb-4">
          <input
            type="password"
            id="form2Example2"
            name="userPassword"
            className="form-control"
          />
          <label className="form-label" htmlFor="form2Example2">Password</label>
        </div>

        <button type="submit" className="btn btn-primary btn-block mb-4">Log in</button>

        <div className="text-center">
          <p>
            Not a member?
            <Link to="/register">Register</Link>
          </p>
        </div>
      </form>
      <p>{logMessage}</p>
    </div>
  );
}

Login.propTypes = {
  isLogged: PropTypes.bool.isRequired,
};

export default compose(withAuthorization)(Login);
