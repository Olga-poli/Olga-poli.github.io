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
    const { rating, movieId, setRatingToMovieItem } = this.props;
    // eslint-disable-next-line react/prop-types,react/destructuring-assignment
    // const { rating } = this.props.moviesItemsList.find(({ id }) => id === movieId);
    // console.log(rating);
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
    // const { rating } = this.props;
    this.index = 0;
    return (
      <div
        // rating={rating}
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
  rating: PropTypes.number.isRequired,
  movieId: PropTypes.number.isRequired,
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
