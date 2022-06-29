import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';

import Routes from './Routes/Routes';
import Header from './components/Header';
import Footer from './components/Footer';
import styles from './App.module.scss';

function App() {
  const [isLogged, setIsLogged] = useState(false);
  return (
    <Router>
      <div className={styles.App}>
        <Header isLogged={isLogged} setIsLogged={setIsLogged} />
        <Routes isLogged={isLogged} />
        <Footer />
      </div>
    </Router>
  );
}

export default connect()(App);
