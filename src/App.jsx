import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { setMoviesList } from './store/slices/catalog.slice';

import Routes from './Routes/Routes';
import Header from './components/Header';
import Footer from './components/Footer';
import styles from './App.module.scss';
import MoviesService from './services/MoviesService';

function App() {
  const dispatch = useDispatch();
  const userDataStorage = JSON.parse(localStorage.getItem('registeredUsers')) || [];
  const activeRegisteredUser = userDataStorage.find(({ isLogged }) => isLogged === true);
  const initialActiveUser = userDataStorage.length > 0 && activeRegisteredUser
    ? activeRegisteredUser
    : null;
  const [activeUserState, setActiveUserState] = useState(initialActiveUser);

  const getMoviesItemsList = async () => {
    const fetchedData = await MoviesService.getResource();
    return fetchedData.results.map((item) => ({
      ...item,
      currentLikesCount: 0,
      rating: 0,
      toShow: true,
    }));
  };

  useEffect(() => {
    (async () => {
      const data = await getMoviesItemsList();
      dispatch(setMoviesList({ moviesItemsList: data }));
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

// App.propTypes = {
//   setMoviesList: PropTypes.func.isRequired,
//   isLoaded: PropTypes.bool.isRequired,
// };
//
// const mapStateToProps = (state) => ({
//   moviesItemsList: state.appReducer.moviesItemsList,
//   isLoaded: state.appReducer.isLoaded,
// });
//
// const mapDispatchToProps = {
//   setMoviesList: setMoviesListAction,
// };

export default App;
// export default connect(mapStateToProps, mapDispatchToProps)(App);
