import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { fetchMoviesList } from './store/actions/actions';

import Routes from './Routes/Routes';
import Header from './components/Header';
import Footer from './components/Footer';
import styles from './App.module.scss';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      dispatch(fetchMoviesList());
    })();
  }, []);

  return (
    <Router basename="/movieDB">
      <div className={styles.App}>
        <Header />
        <Routes />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
