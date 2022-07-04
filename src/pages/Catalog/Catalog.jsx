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
        <div>
          {isLoading
            ? (<img src="../../assets/images/loader.gif" alt="loader" width="200" />)
            : (
              <>
                <Filter />
                <div className={styles.moviesList}>
                  {moviesItemsList.map((item) => (
                    item.toShow
                      ? <MovieListItem movieId={item.id} key={item.id} />
                      : null
                  ))}
                </div>
              </>
            )}
        </div>
      )}
    </div>
  );
}

Catalog.defaultProps = {
  moviesItemsList: [],
};

export default Catalog;
