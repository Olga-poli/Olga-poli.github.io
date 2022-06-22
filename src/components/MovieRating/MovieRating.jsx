import React from 'react';
import './MovieRating.scss';
import PropTypes from 'prop-types';

function MovieRating(props) {
  const { rating } = props;
  let idx = 0;

  const createStarItem = () => {
    const { movieId, onRatingChange } = props;
    const clazz = idx >= rating
      ? 'rating-button__star fa fa-star-o'
      : 'rating-button__star fa fa-star';
    idx += 1;
    const currentIdx = idx;
    return (
      <button
        onClick={() => onRatingChange(movieId, currentIdx)}
        className="rating-button"
        key={`${movieId}_${currentIdx}`}
        type="button"
      >
        <span className={clazz} />
      </button>
    );
  };

  return (
    <div
      rating={rating}
      className="rating"
    >
      {[...Array(5)].map(() => (
        createStarItem()
      ))}
    </div>
  );
}

MovieRating.propTypes = {
  rating: PropTypes.number.isRequired,
  movieId: PropTypes.number.isRequired,
  onRatingChange: PropTypes.func.isRequired,
};

export default MovieRating;
