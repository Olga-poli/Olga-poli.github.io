import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

function Header() {
  return (
    <header className={styles.header}>
      <h1>
        <Link to="/">
          Movies
        </Link>
      </h1>
    </header>
  );
}

export default Header;
