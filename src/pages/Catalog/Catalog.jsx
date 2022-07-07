import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import Filter from '../../components/Filter';
import MovieListItem from '../../components/MovieListItem';
import withAuthorization from '../../components/hoc-helpers';
import useTranslation from '../../components/hook-helpers';
import styles from './Catalog.module.scss';

const cx = classNames.bind(styles);

function Catalog({ isLogged }) {
  const moviesItemsList = useSelector((state) => state.catalogReducer.moviesItemsList);
  const isLoading = useSelector((state) => state.catalogReducer.isLoading);
  const isError = useSelector((state) => state.catalogReducer.isError);

  const { translate } = useTranslation();

  if (!isLogged) {
    return (
      <div>
        <h2>{translate('app-catalog-banish')}</h2>
        <Link to="/login">Go to login page</Link>
      </div>
    );
  }

  if (isError) {
    return (
      <h2>{translate('app-catalog-error')}</h2>
    );
  }

  if (isLoading) {
    return (
      <h2>{translate('app-catalog-loading')}</h2>
    );
  }

  const containerClassName = cx('container');
  const moviesListClassName = cx('moviesList');

  return (
    <div className={containerClassName}>
      <Filter />
      <div className={moviesListClassName}>
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
