import React from 'react';
import { useSelector } from 'react-redux';

import Filter from '../../components/Filter';
import MovieListItem from '../../components/MovieListItem';
import styles from './Catalog.module.scss';

function Catalog() {
  const moviesItemsList = useSelector((state) => state.rootReducer.testSlice.moviesItemsList);
  // const isLoading = useSelector((state) => state.rootReducer.testSlice.isLoading);
  // const isError = useSelector((state) => state.rootReducer.testSlice.isError);

  const moviesItems = moviesItemsList.length > 0
    ? moviesItemsList.map((item) => (
      item.toShow
        ? <MovieListItem movieData={item} key={item.id} />
        : null
    ))
    : null;

  return (
    <div>
      <div className={styles.container}>
        <Filter />
        <div className={styles.moviesList}>{moviesItems}</div>
      </div>
    </div>
  );
}

// Catalog.defaultProps = {
//   moviesItemsList: PropTypes.array,
// };
//
// Catalog.propTypes = {
//   moviesItemsList: PropTypes.arrayOf(PropTypes.shape({
//     adult: PropTypes.bool,
//     backdrop_path: PropTypes.string,
//     genre_ids: PropTypes.arrayOf(PropTypes.number),
//     id: PropTypes.number,
//     original_language: PropTypes.string,
//     original_title: PropTypes.string,
//     overview: PropTypes.string,
//     popularity: PropTypes.number,
//     poster_path: PropTypes.string,
//     release_date: PropTypes.string,
//     title: PropTypes.string,
//     video: PropTypes.bool,
//     vote_average: PropTypes.number,
//     vote_count: PropTypes.number,
//     currentLikesCount: PropTypes.number,
//     rating: PropTypes.number,
//     toShow: PropTypes.bool,
//   })),
// };

// const mapStateToProps = (state) => ({
//   moviesItemsList: state.appReducer.moviesItemsList,
//   isLoaded: state.appReducer.isLoaded,
// });
//
// const mapDispatchToProps = {
//   setMoviesList: setMoviesListAction,
// };
// export default connect(mapStateToProps, mapDispatchToProps)(Catalog);

Catalog.defaultProps = {
  moviesItemsList: [],
};

export default Catalog;
