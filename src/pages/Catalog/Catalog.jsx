import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import Filter from '../../components/Filter';
import MovieListItem from '../../components/MovieListItem';
import withAuthorization from '../../components/hoc-helpers';
import useTranslation from '../../components/hook-helpers';
import styles from './Catalog.module.scss';

function Catalog({ isLogged }) {
  const moviesItemsList = useSelector((state) => state.catalogReducer.moviesItemsList);
  const isLoading = useSelector((state) => state.catalogReducer.isLoading);
  const isError = useSelector((state) => state.catalogReducer.isError);

  const {
    language,
    translate,
  } = useTranslation();

  const [words, setWords] = useState(language);

  useEffect(() => {
    console.log(language);
    setWords(translate('app-catalog-banish'));
  }, [language]);

  if (!isLogged) {
    return (
      <div>
        <h2>{words}</h2>
        <Link to="/login">Go to login page</Link>
      </div>
    );
  }

  if (isError) {
    return (
      <h2>Error...</h2>
    );
  }

  if (isLoading) {
    return (
      <h2>Loading...</h2>
    );
  }

  return (
    <div className={styles.container}>
      <Filter />
      <div className={styles.moviesList}>
        {moviesItemsList.map((item) => (
          item.toShow
            ? <MovieListItem movieId={item.id} key={item.id} />
            : null
        ))}
      </div>
    </div>
  );
}

Catalog.propTypes = {
  isLogged: PropTypes.bool.isRequired,
};

export default compose(withAuthorization)(Catalog);
