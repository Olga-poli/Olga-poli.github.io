import React from 'react';
import { useSelector } from 'react-redux';
import Filter from '../../components/Filter';
import MovieListItem from '../../components/MovieListItem';
import styles from './Catalog.module.scss';

function Catalog() {
  const moviesItemsList = useSelector((state) => state.catalogReducer.moviesItemsList);
  const isLoading = useSelector((state) => state.catalogReducer.isLoading);
  const isError = useSelector((state) => state.catalogReducer.isError);

  return (
    <div className={styles.container}>
      {isError ? (
        <h2>Error...</h2>
      ) : (
        <>
          <Filter />
          {isLoading
            ? (<img src="../../assets/images/loader.gif" alt="loader" width="200" />)
            : (
              <div className={styles.moviesList}>
                {moviesItemsList.map((item) => (
                  item.toShow
                    ? <MovieListItem movieData={item} key={item.id} />
                    : null
                ))}
              </div>
            )}
        </>
      )}
    </div>
  );
}

Catalog.defaultProps = {
  moviesItemsList: [],
};

export default Catalog;
