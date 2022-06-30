import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './Register.module.scss';

function Register() {
  const [nameState, setNameState] = useState('');
  const [passwordState, setPasswordState] = useState('');

  const registerUser = (event) => {
    event.preventDefault();
    const user = {
      name: nameState,
      password: passwordState,
      isLogged: true,
    };
    const userDataStorage = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    userDataStorage.push(user);
    localStorage.setItem('registeredUsers', JSON.stringify(userDataStorage));
  };

  return (
    <div className={styles.register}>
      <form
        onSubmit={registerUser}
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

        <Link to="/catalog">
          <button type="submit" className="btn btn-primary btn-block mb-4">Register</button>
        </Link>

        <div className="text-center">
          <p>
            Already  have an account?
            <Link to="/login">Go to login page</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Register;
