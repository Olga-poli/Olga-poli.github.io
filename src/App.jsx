import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';

import Routes from './Routes/Routes';
import Header from './components/Header';
import Footer from './components/Footer';
import styles from './App.module.scss';

function App() {
  return (
    <Router>
      <div className={styles.App}>
        <Header />
        <Routes />
        <Footer />
      </div>
    </Router>
  );
}

export default connect()(App);
