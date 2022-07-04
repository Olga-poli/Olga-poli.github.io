import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './Login.module.scss';

function Login(props) {
  const [nameState, setNameState] = useState('foo');
  const [passwordState, setPasswordState] = useState('');
  const [logMessage, setLogMessage] = useState('');
  const { setActiveUserState } = props;

  const loginUser = (event) => {
    event.preventDefault();
    const user = {
      name: nameState,
      password: passwordState,
      isLogged: true,
    };

    const userDataStorage = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const isRegister = userDataStorage.some(({ name }) => name === user.name);
    if (!isRegister) {
      setLogMessage('User didn\'t found. Please, register.');
      return;
    }

    const activeUserIndex = userDataStorage.findIndex(({ name }) => name === user.name);
    const updatedUser = { ...userDataStorage[activeUserIndex], isLogged: true };
    const updatedUsers = [
      ...userDataStorage.slice(0, activeUserIndex),
      updatedUser,
      ...userDataStorage.slice(activeUserIndex + 1),
    ];
    localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
    setActiveUserState(user);
    setLogMessage('Log in successfully');
  };

  return (
    <div className={styles.login}>
      <form
        onSubmit={loginUser}
        className={styles.form}
      >
        <div className="form-outline mb-4">
          <input
            type="text"
            id="userName"
            onChange={(event) => setNameState(event.target.value)}
            className="form-control"
          />
          <label className="form-label" htmlFor="userName">Username</label>
        </div>

        <div className="form-outline mb-4">
          <input
            type="password"
            id="form2Example2"
            onChange={(event) => setPasswordState(event.target.value)}
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
        <div>{logMessage}</div>
      </form>
    </div>
  );
}

Login.propTypes = {
  setActiveUserState: PropTypes.func.isRequired,
};

export default Login;
