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
  const userDataStorage = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
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

App.defaultProps = {
  moviesItemsList: PropTypes.array,
};

App.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  moviesItemsList: PropTypes.arrayOf(PropTypes.shape({
    adult: PropTypes.bool,
    backdrop_path: PropTypes.string,
    genre_ids: PropTypes.arrayOf(PropTypes.number),
    id: PropTypes.number,
    original_language: PropTypes.string,
    original_title: PropTypes.string,
    overview: PropTypes.string,
    popularity: PropTypes.number,
    poster_path: PropTypes.string,
    release_date: PropTypes.string,
    title: PropTypes.string,
    video: PropTypes.bool,
    vote_average: PropTypes.number,
    vote_count: PropTypes.number,
    currentLikesCount: PropTypes.number,
    rating: PropTypes.number,
    toShow: PropTypes.bool,
  })),
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
