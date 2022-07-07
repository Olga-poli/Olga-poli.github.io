import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import { removeMovieItem } from '../../store/slices/catalog.slice';
import MovieRating from '../MovieRating';
import styles from './MovieInfoItem.module.scss';
import useTranslation from '../hook-helpers';

const cx = classNames.bind(styles);

function MovieInfoItem({ movieID }) {
  const dispatch = useDispatch();
  const { translate } = useTranslation();

  const moviesItemsList = useSelector((state) => state.catalogReducer.moviesItemsList);
  const movieData = moviesItemsList.find(({ id }) => id === Number(movieID));

  if (!movieData?.isLoaded) {
    return (<h2>{translate('app-catalog-loading')}</h2>);
  }
  const movieInfoClassName = cx('movieInfo');
  const cardClassName = cx('card');
  const cardBodyClassName = cx('body', 'card-body');
  const genreItemClassName = cx('genresItem');
  const genresClassName = cx('genres');
  const actorsListClassName = cx('actorsList');
  const actorItemClassName = cx('actorsListItems');
  const buttonsClassName = cx('buttons');
  const primaryButtonClassName = cx('button', 'btn btn-primary');
  const deleteButtonClassName = cx('button', 'btn btn-outline-danger');
  const imageContainerClassName = cx('imageContainer');
  const imageClassName = cx('image');

  const {
    title,
    currentLikesCount = 0,
    rating = 0,
    id,
    poster_path: posterPath,
    release_date: releaseDate,
    original_language: language,
    overview,
    genres = [],
    credits: { cast } = { cast: [] },
    credits: { crew } = { crew: [] },
  } = movieData;
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const director = crew.find(({ known_for_department: department }) => department === 'Directing').name;
  const genre = genres.map(({ id: genreID, name }) => (
    <span key={genreID} className={genreItemClassName}>{name}</span>
  ));
  const actors = cast
    .filter(({ known_for_department: knownForDepartment }) => knownForDepartment === 'Acting')
    .map(({ name: actorName }) => (
      <button
        key={actorName}
        className={actorItemClassName}
        type="button"
      >
        <Link to={`/catalog/${movieID}/${actorName}`}>{actorName}</Link>
      </button>
    ));

  return (
    <div className={movieInfoClassName}>
      <div className={cardClassName}>
        <div className={cardBodyClassName}>
          <div>
            <h3>{title}</h3>
            <MovieRating rating={rating} movieId={id} />
            <p>
              <span>
                {translate('app-movie-subtitle-likes')}
                <span>{currentLikesCount}</span>
              </span>
            </p>
            <p>
              {translate('app-movie-subtitle-release')}
              <span>{new Date(releaseDate).toLocaleDateString('en-US', dateOptions)}</span>
            </p>
            <p>
              {translate('app-movie-subtitle-language')}
              <span>{language}</span>
            </p>
            <p className={genresClassName}>
              {translate('app-movie-subtitle-genres')}
              <span>{genre}</span>
            </p>
            <p>
              {translate('app-movie-subtitle-director')}
              <span>{director}</span>
            </p>
            <p>
              {translate('app-movie-subtitle-description')}
              <span>{overview}</span>
            </p>
            <div>
              {translate('app-movie-subtitle-cast')}
              <div className={actorsListClassName}>{actors}</div>
            </div>
            <div className={buttonsClassName}>
              <button
                type="button"
                className={primaryButtonClassName}
              >
                <Link to={`${movieID}/edit`}>
                  {translate('app-movie-edit-button')}
                </Link>
              </button>
              <button
                type="button"
                className={deleteButtonClassName}
              >
                <Link
                  to="/catalog/"
                  onClick={() => {
                    dispatch(removeMovieItem(id));
                  }}
                >
                  {translate('app-movie-remove-button')}
                </Link>
              </button>
            </div>
          </div>
          <div className={imageContainerClassName}>
            <img src={`https://image.tmdb.org/t/p/w500/${posterPath}`} alt={posterPath} className={imageClassName} />
          </div>
        </div>
      </div>
    </div>
  );
}

MovieInfoItem.propTypes = {
  movieID: PropTypes.string.isRequired,
};

export default MovieInfoItem;
