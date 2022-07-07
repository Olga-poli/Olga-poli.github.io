import React from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import withAuthorization from '../../components/hoc-helpers';
import styles from './Register.module.scss';

const cx = classNames.bind(styles);

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

  const registerClassName = cx('register');
  const formClassName = cx('form');
  const inputBlockClassName = cx('mb-4');
  const inputClassName = cx('form-control');
  const labelClassName = cx('form-label');
  const submitButtonClassName = cx('btn btn-primary btn-block mb-4');
  const redirectMessageClassName = cx('text-center');

  return (
    <div className={registerClassName}>
      <form
        onSubmit={handleRegisterFormSubmit}
        className={formClassName}
      >
        <div className={inputBlockClassName}>
          <input
            type="text"
            id="userName"
            name="userName"
            className={inputClassName}
          />
          <label className={labelClassName} htmlFor="userName">Username</label>
        </div>

        <div className={inputBlockClassName}>
          <input
            type="password"
            id="form2Example2"
            name="userPassword"
            className={inputClassName}
          />
          <label className={labelClassName} htmlFor="form2Example2">Password</label>
        </div>
        <button
          type="submit"
          className={submitButtonClassName}
        >
          Register
        </button>
        <div className={redirectMessageClassName}>
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
