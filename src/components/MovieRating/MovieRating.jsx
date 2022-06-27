import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './MovieRating.module.scss';

class MovieRating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: 0,
    };
  }

  createStarItem() {
    const { hover } = this.state;
    const { movieId, moviesItemsList, setRatingToMovieItem } = this.props;
    const { rating } = moviesItemsList.find(({ id }) => id === movieId);
    const ratingStarClass = (this.index >= rating) && (this.index >= hover)
      ? `${styles.ratingButtonStar} fa fa-star-o`
      : `${styles.ratingButtonStar} fa fa-star`;
    this.index += 1;
    const currentIndex = this.index;
    const setHover = (hoveredStarMax) => {
      this.setState(({ hover: hoveredStarMax }));
    };

    return (
      <button
        onClick={() => setRatingToMovieItem(movieId, currentIndex)}
        onMouseEnter={() => setHover(currentIndex)}
        onMouseLeave={() => setHover(0)}
        className={styles.ratingButton}
        key={`${movieId}_${currentIndex}`}
        type="button"
      >
        <span className={ratingStarClass} />
      </button>
    );
  }

  render() {
    this.index = 0;
    return (
      <div
        className={styles.rating}
      >
        {[...Array(5)].map(() => (
          this.createStarItem()
        ))}
      </div>
    );
  }
}

MovieRating.propTypes = {
  movieId: PropTypes.number.isRequired,
  moviesItemsList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  setRatingToMovieItem: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  moviesItemsList: state.appReducer.moviesItemsList,
});

const mapDispatchToProps = (dispatch) => ({
  setRatingToMovieItem: (movieId, currentIndex) => dispatch({
    type: 'SET_RATING_TO_MOVIE_ITEM',
    payload: { movieId, currentIndex },
  }),
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieRating);
