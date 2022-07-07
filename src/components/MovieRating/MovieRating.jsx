import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import { setRatingToMovieItem } from '../../store/slices/catalog.slice';
import styles from './MovieRating.module.scss';

const cx = classNames.bind(styles);

function MovieRating(props) {
  const dispatch = useDispatch();
  const moviesItemsList = useSelector((state) => state.catalogReducer.moviesItemsList);
  const [hoveredStarIndex, setHoveredStarIndex] = useState(0);
  const ratingClassName = cx('rating');

  const createStarItem = (index) => {
    const { movieId } = props;
    const { rating } = moviesItemsList.find(({ id }) => id === movieId);
    const ratingButtonClassName = cx('ratingButton');
    const ratingStarClassName = cx('fa', {
      'fa-star-o': (index > rating) && (index > hoveredStarIndex),
      'fa-star': !((index > rating) && (index > hoveredStarIndex)),
    });

    return (
      <button
        onClick={() => dispatch(setRatingToMovieItem({ movieId, index }))}
        onMouseEnter={() => setHoveredStarIndex(index)}
        onMouseLeave={() => setHoveredStarIndex(0)}
        className={ratingButtonClassName}
        key={`${movieId}_${index}`}
        type="button"
      >
        <span className={ratingStarClassName} />
      </button>
    );
  };

  return (
    <div
      className={ratingClassName}
    >
      {[...Array(5)].map((item, index) => (
        createStarItem(index + 1)
      ))}
    </div>
  );
}

MovieRating.propTypes = {
  movieId: PropTypes.number.isRequired,
};

export default MovieRating;
