import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import Filter from '../../components/Filter';
import MovieListItem from '../../components/MovieListItem';
import withAuthorization from '../../hocs';
import { useTranslation } from '../../hooks';
import styles from './Catalog.module.scss';

const cx = classNames.bind(styles);

function Catalog({ isLogged }) {
  const moviesItemsList = useSelector((state) => state.catalogReducer.moviesItemsList);
  const isLoading = useSelector((state) => state.catalogReducer.isLoading);
  const isError = useSelector((state) => state.catalogReducer.isError);

  const { translate } = useTranslation();
  const containerClassName = cx('container');
  const moviesListClassName = cx('moviesList');

  if (!isLogged) {
    return (
      <div className={containerClassName}>
        <h2>{translate('app-catalog-banish')}</h2>
        <Link to="/login">{translate('app-form-login-button')}</Link>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={containerClassName}>
        <h2>{translate('app-catalog-error')}</h2>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={containerClassName}>
        <h2>{translate('app-catalog-loading')}</h2>
      </div>
    );
  }

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
