import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setRatingToMovieItemAction } from '../../store/actions/actions';
import styles from './MovieRating.module.scss';

function MovieRating(props) {
  const [hoveredStarIndex, setHoveredStarIndex] = useState(0);

  const createStarItem = (index) => {
    const { movieId, moviesItemsList, setRatingToMovieItem } = props;
    const { rating } = moviesItemsList.find(({ id }) => id === movieId);
    const ratingStarClass = (index > rating) && (index > hoveredStarIndex)
      ? `${styles.ratingButtonStar} fa fa-star-o`
      : `${styles.ratingButtonStar} fa fa-star`;

    return (
      <button
        onClick={() => setRatingToMovieItem(movieId, index)}
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
  moviesItemsList: PropTypes.arrayOf(PropTypes.shape({
    adult: PropTypes.bool,
    backdrop_path: PropTypes.string,
    genre_ids: PropTypes.arrayOf(PropTypes.number),
    id: PropTypes.number,
    original_language: PropTypes.string,
    original_title: PropTypes.string,
    overview: PropTypes.string,
    popularity: PropTypes.number,
    poster_path: PropTypes.string,
    release_date: PropTypes.string,
    title: PropTypes.string,
    video: PropTypes.bool,
    vote_average: PropTypes.number,
    vote_count: PropTypes.number,
    currentLikesCount: PropTypes.number,
    rating: PropTypes.number,
  })).isRequired,
  setRatingToMovieItem: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  moviesItemsList: state.appReducer.moviesItemsList,
});

const mapDispatchToProps = {
  setRatingToMovieItem: setRatingToMovieItemAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieRating);
