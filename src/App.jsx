import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setMoviesListAction } from './store/actions/actions';

import Routes from './Routes/Routes';
import Header from './components/Header';
import Footer from './components/Footer';
import styles from './App.module.scss';
import MoviesService from './services/MoviesService';

function App(props) {
  const { setMoviesList, isLoaded } = props;
  const userDataStorage = JSON.parse(localStorage.getItem('registeredUsers')) || [];
  const activeRegisteredUser = userDataStorage.find(({ isLogged }) => isLogged === true);
  const initialActiveUser = userDataStorage.length > 0 && activeRegisteredUser
    ? activeRegisteredUser
    : null;
  const [activeUserState, setActiveUserState] = useState(initialActiveUser);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await MoviesService.getResource();
      setMoviesList(fetchedData.results.map((item) => ({
        ...item,
        currentLikesCount: 0,
        rating: 0,
        toShow: true,
      })));
    };
    if (!isLoaded) {
      fetchData();
    }
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

App.propTypes = {
  setMoviesList: PropTypes.func.isRequired,
  isLoaded: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  moviesItemsList: state.appReducer.moviesItemsList,
  isLoaded: state.appReducer.isLoaded,
});

const mapDispatchToProps = {
  setMoviesList: setMoviesListAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
