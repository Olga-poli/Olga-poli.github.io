import React from 'react';
import classNames from 'classnames/bind';
import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

function Footer() {
  const footerClassName = cx('footer', 'mt-auto');

  return (
    <footer className={footerClassName}>
      <p>EPAM</p>
    </footer>
  );
}

export default Footer;
