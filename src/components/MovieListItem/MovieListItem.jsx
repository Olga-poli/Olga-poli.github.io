import React, { Component } from 'react';
import './MovieListItem.scss';
import PropTypes from 'prop-types';

class MovieListItem extends Component {
  constructor(props) {
    super(props);
    const { title, poster_path: posterPath } = props.movieData;
    this.state = {
      title,
      poster: `https://image.tmdb.org/t/p/w500/${posterPath}`,
    };
  }

  render() {
    const { title, poster } = this.state;
    return (
      <div className="card movies-list-item">
        <div className="card-body">
          <p className="card-title">{title}</p>
          <div className="d-flex">
            <div className="buttons-group">
              <button type="button" className="btn btn-light btn-sm">
                <i className="fa fa-thumbs-up" />
              </button>
              <button type="button" className="btn btn-light btn-sm">
                <i className="fa fa-thumbs-down" />
              </button>
              <span>likes</span>
              <span>1</span>
            </div>
            <div className="image-container">
              <img src={poster} alt={title} />
            </div>
          </div>
          <div className="ratong">
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
  movieData: PropTypes.shape({}),
};

MovieListItem.propTypes = {
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
