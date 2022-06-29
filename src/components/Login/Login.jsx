import React, { useState } from 'react';

import styles from './Login.module.scss';

function Login() {
  const [nameState, setNameState] = useState('');
  const [passwordState, setPasswordState] = useState('');

  const saveUser = (event) => {
    event.preventDefault();
    const registeredUsers = 'registeredUsers';
    const user = {
      name: nameState,
      password: passwordState,
      isLogged: true,
    };

    const userDataStorage = JSON.parse(window.localStorage.getItem(registeredUsers)) || [];
    const updatedUserDataStorage = [...userDataStorage]
      .map((item) => (item.name !== user.name
        ? { ...item, isLogged: false }
        : { item }));
    updatedUserDataStorage.push(user);
    window.localStorage.setItem(registeredUsers, JSON.stringify(updatedUserDataStorage));
  };

  return (
    <div className={styles.login}>
      <form
        onSubmit={saveUser}
        className={styles.form}
      >
        <div className="form-outline mb-4">
          <input
            type="text"
            id="userName"
            onChange={(event) => setNameState(event.target.value)}
            className="form-control"
          />
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="form-label" htmlFor="userName">Username</label>
        </div>

        <div className="form-outline mb-4">
          <input
            type="password"
            id="form2Example2"
            onChange={(event) => setPasswordState(event.target.value)}
            className="form-control"
          />
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="form-label" htmlFor="form2Example2">Password</label>
        </div>

        <button type="submit" className="btn btn-primary btn-block mb-4">Sign in</button>

        <div className="text-center">
          <p>
            Not a member?
            <a href="#!">Register</a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
