import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toggleActiveUserAction } from '../../store/actions/actions';

import styles from './Register.module.scss';

function Register(props) {
  const { toggleActiveUser } = props;
  const [nameState, setNameState] = useState('');
  const [passwordState, setPasswordState] = useState('');

  const registerUser = (event) => {
    event.preventDefault();
    const user = {
      name: nameState,
      password: passwordState,
    };
    const userDataStorage = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    userDataStorage.push(user);
    localStorage.setItem('registeredUsers', JSON.stringify(userDataStorage));
    toggleActiveUser(user.name, true);
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

        <button type="submit" className="btn btn-primary btn-block mb-4">Register</button>

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
  // activeUser: PropTypes.string.isRequired,
  toggleActiveUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  toggleActiveUser: toggleActiveUserAction,
};

const mapStateToProps = (state) => ({
  activeUser: state.appReducer.activeUser,
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
