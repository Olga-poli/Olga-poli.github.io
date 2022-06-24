import React, { Component } from 'react';
import './MovieRating.scss';
import PropTypes from 'prop-types';

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
    const clazz = (this.idx >= rating) && (this.idx >= hover)
      ? 'rating-button__star fa fa-star-o'
      : 'rating-button__star fa fa-star';
    this.idx += 1;
    const currentIdx = this.idx;
    const setHover = (hoveredStarMax) => {
      this.setState(({ hover: hoveredStarMax }));
    };

    return (
      <button
        onClick={() => onRatingChange(movieId, currentIdx)}
        onMouseEnter={() => setHover(currentIdx)}
        onMouseLeave={() => setHover(0)}
        className="rating-button"
        key={`${movieId}_${currentIdx}`}
        type="button"
      >
        <span className={clazz} />
      </button>
    );
  }

  render() {
    const { rating } = this.props;
    this.idx = 0;
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
