import React from 'react';
import PropTypes from 'prop-types';
import styles from './MovieRating.module.scss';

function MovieRating() {
  // const [hoveredStarIndex, setHoveredStarIndex] = useState(0);

  // const createStarItem = (index) => {
  //   // eslint-disable-next-line react/prop-types
  //   const { movieId, moviesItemsList, setRatingToMovieItem } = props;
  //   const { rating } = moviesItemsList.find(({ id }) => id === movieId);
  //   const ratingStarClass = (index > rating) && (index > hoveredStarIndex)
  //     ? `${styles.ratingButtonStar} fa fa-star-o`
  //     : `${styles.ratingButtonStar} fa fa-star`;
  //
  //   return (
  //     <button
  //       onClick={() => setRatingToMovieItem(movieId, index)}
  //       onMouseEnter={() => setHoveredStarIndex(index)}
  //       onMouseLeave={() => setHoveredStarIndex(0)}
  //       className={styles.ratingButton}
  //       key={`${movieId}_${index}`}
  //       type="button"
  //     >
  //       <span className={ratingStarClass} />
  //     </button>
  //   );
  // };

  return (
    <div
      className={styles.rating}
    >
      rating
    </div>
  );
}

MovieRating.propTypes = {
  moviesItemsList: PropTypes.shape({}),
};

MovieRating.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  movieId: PropTypes.number.isRequired,
  // eslint-disable-next-line react/require-default-props,react/no-unused-prop-types
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
  })),
  // eslint-disable-next-line react/require-default-props
  // setRatingToMovieItem: PropTypes.func,
};

// const mapStateToProps = (state) => ({
//   moviesItemsList: state.appReducer.moviesItemsList,
// });
//
// const mapDispatchToProps = {
//   setRatingToMovieItem: setRatingToMovieItemAction,
// };

export default MovieRating;
