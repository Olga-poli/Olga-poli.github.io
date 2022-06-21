import React, { Component } from 'react';
import './MovieListItem.scss';
import PropTypes from 'prop-types';
// import MovieTitle from '../MovieTitle';

class MovieListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { onMovieTitleClick, movieData: { title, poster_path: posterPath, id } } = this.props;
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
                <button type="button" className="btn btn-light btn-sm">
                  <i className="fa fa-thumbs-up" />
                </button>
                <button type="button" className="btn btn-light btn-sm">
                  <i className="fa fa-thumbs-down" />
                </button>
              </div>
              <span>likes</span>
              <span>1</span>
            </div>
            <div className="image-container">
              <img src={`https://image.tmdb.org/t/p/w500/${posterPath}`} alt={title} />
            </div>
          </div>
          <div className="rating">
            <span className="fa fa-star" />
            <span className="fa fa-star" />
            <span className="fa fa-star-o" />
            <span className="fa fa-star-o" />
            <span className="fa fa-star-o" />
          </div>
        </div>
      </div>
    );
  }
}

MovieListItem.defaultProps = {
  onMovieTitleClick: PropTypes.func,
  movieData: PropTypes.shape({}),
};

MovieListItem.propTypes = {
  onMovieTitleClick: PropTypes.func,
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
  }),
};

export default MovieListItem;
