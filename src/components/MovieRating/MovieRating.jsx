import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { setRatingToMovieItem } from '../../store/slices/catalog.slice';
import styles from './MovieRating.module.scss';

function MovieRating(props) {
  const dispatch = useDispatch();
  const moviesItemsList = useSelector((state) => state.catalogReducer.moviesItemsList);
  const [hoveredStarIndex, setHoveredStarIndex] = useState(0);

  const createStarItem = (index) => {
    const { movieId } = props;
    const { rating } = moviesItemsList.find(({ id }) => id === movieId);
    const ratingStarClass = (index > rating) && (index > hoveredStarIndex)
      ? `${styles.ratingButtonStar} fa fa-star-o`
      : `${styles.ratingButtonStar} fa fa-star`;

    return (
      <button
        onClick={() => dispatch(setRatingToMovieItem({ movieId, index }))}
        onMouseEnter={() => setHoveredStarIndex(index)}
        onMouseLeave={() => setHoveredStarIndex(0)}
        className={styles.ratingButton}
        key={`${movieId}_${index}`}
        type="button"
      >
        <span className={ratingStarClass} />
      </button>
    );
  };

  return (
    <div
      className={styles.rating}
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
