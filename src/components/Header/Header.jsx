import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toggleActiveUserAction } from '../../store/actions/actions';

import styles from './Header.module.scss';

function Header(props) {
  const { activeUser, toggleActiveUser } = props;
  const haveActiveUser = !!activeUser;
  const logoutUser = () => {
    toggleActiveUser(activeUser, false);
  };

  return (
    <header className={styles.header}>
      <h1>
        <Link to="/">
          Movies
        </Link>
      </h1>
      {haveActiveUser
        ? (
          <Link to="/">
            <button
              onClick={logoutUser}
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

Header.propTypes = {
  activeUser: PropTypes.string.isRequired,
  toggleActiveUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  toggleActiveUser: toggleActiveUserAction,
};

const mapStateToProps = (state) => ({
  activeUser: state.appReducer.activeUser,
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
