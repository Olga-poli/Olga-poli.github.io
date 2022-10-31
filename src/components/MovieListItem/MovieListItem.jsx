import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import {
  addLikeToMovieItem,
  removeLikeFromMovieItem,
} from '../../store/slices/catalog.slice';
import MovieRating from '../MovieRating';
import styles from './MovieListItem.module.scss';

const cx = classNames.bind(styles);

function MovieListItem({ movieId }) {
  const dispatch = useDispatch();
  const moviesList = useSelector((state) => state.catalogReducer.moviesItemsList);
  const movieData = moviesList
    .find(({ id }) => id === movieId);
  const {
    title, poster_path: posterPath, id, currentLikesCount = 0,
  } = movieData;

  const moviesListItemClassName = cx('moviesListItem', 'card');
  const cardBodyClassName = cx('cardBody', 'card-body');
  const cardTitleClassName = cx('cardTitle', 'mb-3');
  const cardContentClassName = cx('cardContent', 'd-flex');
  const cardLikesClassName = cx('cardLikes');
  const buttonsClassName = cx('buttons', 'mb-3');
  const likeButtonClassName = cx('btn btn-outline-dark btn-sm');
  const likeIconClassName = cx('fa fa-thumbs-up');
  const dislikeIconClassName = cx('fa fa-thumbs-down');
  const imageContainerClassName = cx('imageContainer');

  return (
    <div className={moviesListItemClassName}>
      <div className={cardBodyClassName}>
        <Link to={`/catalog/${id}`} className={cardTitleClassName}>
          {title}
        </Link>
        <div>
          <div className={cardContentClassName}>
            <div className={cardLikesClassName}>
              <div className={buttonsClassName}>
                <button
                  onClick={() => dispatch(addLikeToMovieItem(id))}
                  type="button"
                  className={likeButtonClassName}
                >
                  <i className={likeIconClassName} />
                </button>
                <button
                  onClick={() => dispatch(removeLikeFromMovieItem(id))}
                  type="button"
                  className={likeButtonClassName}
                >
                  <i className={dislikeIconClassName} />
                </button>
              </div>
              <span>likes</span>
              <span>{` ${currentLikesCount}`}</span>
            </div>
            <div className={imageContainerClassName}>
              <img src={`https://image.tmdb.org/t/p/w500/${posterPath}`} alt={title} />
            </div>
          </div>
          <MovieRating
            movieId={id}
          />
        </div>
      </div>
    </div>
  );
}

MovieListItem.propTypes = {
  movieId: PropTypes.number.isRequired,
};

export default MovieListItem;
