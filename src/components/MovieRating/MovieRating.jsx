import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './MovieRating.scss';

class MovieRating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: 0,
    };
  }

  createStarItem() {
    const { hover } = this.state;
    const { rating, movieId, onRatingChange } = this.props;
    const ratingStarClass = (this.index >= rating) && (this.index >= hover)
      ? 'rating-button__star fa fa-star-o'
      : 'rating-button__star fa fa-star';
    this.index += 1;
    const currentIndex = this.index;
    const setHover = (hoveredStarMax) => {
      this.setState(({ hover: hoveredStarMax }));
    };

    return (
      <button
        onClick={() => onRatingChange(movieId, currentIndex)}
        onMouseEnter={() => setHover(currentIndex)}
        onMouseLeave={() => setHover(0)}
        className="rating-button"
        key={`${movieId}_${currentIndex}`}
        type="button"
      >
        <span className={ratingStarClass} />
      </button>
    );
  }

  render() {
    const { rating } = this.props;
    this.index = 0;
    return (
      <div
        rating={rating}
        className="rating"
      >
        {[...Array(5)].map(() => (
          this.createStarItem()
        ))}
      </div>
    );
  }
}

MovieRating.propTypes = {
  rating: PropTypes.number.isRequired,
  movieId: PropTypes.number.isRequired,
  onRatingChange: PropTypes.func.isRequired,
};

export default MovieRating;
