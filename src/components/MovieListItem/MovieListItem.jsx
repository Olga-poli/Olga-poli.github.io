import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MovieRating from '../MovieRating';
import './MovieListItem.scss';

function MovieListItem(props) {
  const {
    addLikeToMovieItem,
    removeLikeFromMovieItem,
    onMovieTitleClick,
    onRatingChange,
    movieData: {
      title, poster_path: posterPath, id, currentLikesCount = 0, rating = 0,
    },
  } = props;

  return (
    <div className="card movies-list-item">
      <div className="card-body">
        <p
          onClick={() => onMovieTitleClick(id)}
          onKeyUp={onMovieTitleClick}
          className="card-title mb-3"
        >
          {title}
        </p>
        <div className="card-content d-flex">
          <div className="card-likes">
            <div className="buttons mb-3">
              <button
                onClick={() => addLikeToMovieItem(id)}
                type="button"
                className="btn btn-outline-dark btn-sm"
              >
                <i className="fa fa-thumbs-up" />
              </button>
              <button
                onClick={() => removeLikeFromMovieItem(id)}
                type="button"
                className="btn btn-outline-dark btn-sm"
              >
                <i className="fa fa-thumbs-down" />
              </button>
            </div>
            <span>likes</span>
            <span>{` ${currentLikesCount}`}</span>
          </div>
          <div className="image-container">
            <img src={`https://image.tmdb.org/t/p/w500/${posterPath}`} alt={title} />
          </div>
        </div>
        <MovieRating
          rating={rating}
          movieId={id}
          onRatingChange={onRatingChange}
        />
      </div>
    </div>
  );
}

MovieListItem.defaultProps = {
  movieData: PropTypes.shape({}),
};

MovieListItem.propTypes = {
  onMovieTitleClick: PropTypes.func.isRequired,
  addLikeToMovieItem: PropTypes.func.isRequired,
  removeLikeFromMovieItem: PropTypes.func.isRequired,
  onRatingChange: PropTypes.func.isRequired,
  movieData: PropTypes.shape({
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
  }),
};

const mapStateToProps = (state) => ({
  searchInputValue: state.appReducer.searchInputValue,
});

const mapDispatchToProps = (dispatch) => ({
  addLikeToMovieItem: (currentMovieId) => dispatch({
    type: 'ADD_LIKE_TO_MOVIE_ITEM',
    payload: currentMovieId,
  }),
  removeLikeFromMovieItem: (currentMovieId) => dispatch({
    type: 'REMOVE_LIKE_FROM_MOVIE_ITEM',
    payload: currentMovieId,
  }),
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieListItem);
