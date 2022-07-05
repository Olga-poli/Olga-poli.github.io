import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './Register.module.scss';

function Register(props) {
  const [nameState, setNameState] = useState('');
  const [passwordState, setPasswordState] = useState('');
  const { setActiveUserState } = props;

  const registerUser = () => {
    const user = {
      name: nameState,
      password: passwordState,
      isLogged: true,
    };
    const userDataStorage = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    userDataStorage.push(user);
    localStorage.setItem('registeredUsers', JSON.stringify(userDataStorage));
    setActiveUserState(user);
  };

  const submitForm = (event) => {
    event.preventDefault();
    registerUser();
  };

  return (
    <div className={styles.register}>
      <form
        onSubmit={submitForm}
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

        <Link to="/catalog">
          <button
            onClick={registerUser}
            type="submit"
            className="btn btn-primary btn-block mb-4"
          >
            Register
          </button>
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

Register.propTypes = {
  setActiveUserState: PropTypes.func.isRequired,
};

export default Register;
