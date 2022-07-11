import React, { useState } from 'react';
import { compose } from 'redux';
import { Link, Redirect, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import withAuthorization from '../../hocs';
import styles from './Login.module.scss';
import { useTranslation } from '../../hooks';

const cx = classNames.bind(styles);

function Login({ isLogged }) {
  const history = useHistory();
  const [logMessage, setLogMessage] = useState('');
  const { translate } = useTranslation();

  const loginUser = (userCredits) => {
    if (!localStorage.getItem('registeredUsers')) {
      localStorage.setItem('registeredUsers', JSON.stringify([]));
    }
    const storage = JSON.parse(localStorage.getItem('registeredUsers'));
    const isRegister = storage.some(({ name }) => name === userCredits.name);
    if (!isRegister) {
      setLogMessage('app-login-notexist-message');
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

  const loginClassName = cx('login');
  const formClassName = cx('form');
  const inputBlockClassName = cx('mb-4');
  const inputClassName = cx('form-control');
  const labelClassName = cx('form-label');
  const submitButtonClassName = cx('btn btn-primary btn-block mb-4');
  const redirectMessageClassName = cx('text-center');

  return (
    <div className={loginClassName}>
      <form
        onSubmit={handleLoginFormSubmit}
        className={formClassName}
      >
        <div className={inputBlockClassName}>
          <input
            type="text"
            id="userName"
            name="userName"
            className={inputClassName}
          />
          <label className={labelClassName} htmlFor="userName">
            {translate('app-form-label-login')}
          </label>
        </div>

        <div className={inputBlockClassName}>
          <input
            type="password"
            id="form2Example2"
            name="userPassword"
            className={inputClassName}
          />
          <label className={labelClassName} htmlFor="form2Example2">
            {translate('app-form-label-password')}
          </label>
        </div>

        <button type="submit" className={submitButtonClassName}>
          {translate('app-form-login-button')}
        </button>

        <div className={redirectMessageClassName}>
          <p>
            {translate('app-login-redirect-message')}
            <Link to="/register">
              {translate('app-form-register-button')}
            </Link>
          </p>
        </div>
      </form>
      <p>{translate(logMessage)}</p>
    </div>
  );
}

Login.propTypes = {
  isLogged: PropTypes.bool.isRequired,
};

export default compose(withAuthorization)(Login);
