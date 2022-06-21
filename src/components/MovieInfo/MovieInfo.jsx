import React from 'react';
import './MovieInfo.scss';
import PropTypes from 'prop-types';

function MovieInfo({ activeMovieData }) {
  return activeMovieData
    ? (
      <div className="MovieInfo col">
        <aside>
          <h3>Titanic</h3>
          <span>
            <span>
              Likes:
              <span>4</span>
            </span>
          </span>
        </aside>
        <div>
          <div>
            <img src="" alt="Titanic" />
          </div>
          <div>
            <p>
              Director:
              <span>Cameron</span>
            </p>
            <p>
              Actors:
              <span>Di Caprio</span>
            </p>
            <p>
              Genres:
              <span>Abra</span>
            </p>
            <p>
              Description:
              {/* eslint-disable-next-line max-len */}
              <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis, dolore </span>
            </p>
          </div>
        </div>
      </div>
    )
    : null;
}

MovieInfo.defaultProps = {
  activeMovieData: PropTypes.shape({}),
};

MovieInfo.propTypes = {
  activeMovieData: PropTypes.shape({
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

export default MovieInfo;
