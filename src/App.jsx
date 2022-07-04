import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { fetchMoviesList } from './store/slices/catalog.slice';

import Routes from './Routes/Routes';
import Header from './components/Header';
import Footer from './components/Footer';
import styles from './App.module.scss';

function App() {
  const dispatch = useDispatch();
  const userDataStorage = JSON.parse(localStorage.getItem('registeredUsers')) || [];
  const activeRegisteredUser = userDataStorage.find(({ isLogged }) => isLogged === true);
  const initialActiveUser = userDataStorage.length > 0 && activeRegisteredUser
    ? activeRegisteredUser
    : null;
  const [activeUserState, setActiveUserState] = useState(initialActiveUser);

  useEffect(() => {
    (async () => {
      dispatch(fetchMoviesList());
    })();
  }, []);

  return (
    <Router>
      <div className={styles.App}>
        <Header activeUserState={activeUserState} setActiveUserState={setActiveUserState} />
        <Routes activeUserState={activeUserState} setActiveUserState={setActiveUserState} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
