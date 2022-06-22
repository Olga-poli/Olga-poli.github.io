import React, { Component } from 'react';
import './MovieRating.scss';
import PropTypes from 'prop-types';

class MovieRating extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.idx = 0;
  }

  createStarItem() {
    const { movieId } = this.props;
    this.idx += 1;
    return (
      <span
        className="fa fa-star-o"
        key={`${movieId}_${this.idx}`}
      />
    );
  }

  render() {
    const { rating } = this.props;
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
};

export default MovieRating;
