import React, { Component } from 'react';
import './MovieListItem.scss';
import PropTypes from 'prop-types';
import MovieRating from '../MovieRating';

class MovieListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      onMovieTitleClick,
      onLikeClick,
      onDislikeClick,
      movieData: {
        title, poster_path: posterPath, id, currentLikesCount = 0, rating = 0,
      },
    } = this.props;
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
                  onClick={() => onLikeClick(id)}
                  type="button"
                  className="btn btn-light btn-sm"
                >
                  <i className="fa fa-thumbs-up" />
                </button>
                <button
                  onClick={() => onDislikeClick(id)}
                  type="button"
                  className="btn btn-light btn-sm"
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
          />
        </div>
      </div>
    );
  }
}

MovieListItem.defaultProps = {
  onMovieTitleClick: PropTypes.func,
  onLikeClick: PropTypes.func,
  onDislikeClick: PropTypes.func,
  movieData: PropTypes.shape({}),
};

MovieListItem.propTypes = {
  onMovieTitleClick: PropTypes.func,
  onLikeClick: PropTypes.func,
  onDislikeClick: PropTypes.func,
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

export default MovieListItem;
