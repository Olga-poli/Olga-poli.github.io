import React from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import styles from './Register.module.scss';
import withAuthorization from '../../components/hoc-helpers';

function Register({ isLogged }) {
  const history = useHistory();
  const registerUser = (userCredits) => {
    if (!localStorage.getItem('registeredUsers')) {
      localStorage.setItem('registeredUsers', JSON.stringify([]));
    }
    const storage = JSON.parse(localStorage.getItem('registeredUsers'));
    storage.push(userCredits);
    localStorage.setItem('registeredUsers', JSON.stringify(storage));
    history.push('/catalog');
  };

  const handleRegisterFormSubmit = (event) => {
    event.preventDefault();
    const userName = event.target.elements.userName.value;
    const userPassword = event.target.elements.userPassword.value;
    registerUser({ name: userName, password: userPassword, isLoggedIn: true });
  };

  if (isLogged) {
    return (
      <Redirect to="/catalog" />
    );
  }

  return (
    <div className={styles.register}>
      <form
        onSubmit={handleRegisterFormSubmit}
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
        <button
          type="submit"
          className="btn btn-primary btn-block mb-4"
        >
          Register
        </button>
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
  isLogged: PropTypes.bool.isRequired,
};

export default compose(withAuthorization)(Register);
