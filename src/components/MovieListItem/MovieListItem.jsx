import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  setActiveMovieIdAction,
  addLikeToMovieItemAction,
  removeLikeFromMovieItemAction,
} from '../../store/actions/actions';
import MovieRating from '../MovieRating';
import styles from './MovieListItem.module.scss';

function MovieListItem(props) {
  const {
    setActiveMovieId,
    addLikeToMovieItem,
    removeLikeFromMovieItem,
    movieData: {
      title, poster_path: posterPath, id, currentLikesCount = 0,
    },
  } = props;

  return (
    <div className={`card ${styles.moviesListItem}`}>
      <div className={`card-body ${styles.cardBody}`}>
        <p
          onClick={() => setActiveMovieId(id)}
          onKeyUp={setActiveMovieId}
          className={`mb-3 ${styles.cardTitle}`}
        >
          <Link to={`/catalog/${id}`}>{title}</Link>
        </p>
        <div className={`d-flex ${styles.cardContent}`}>
          <div className={styles.cardLikes}>
            <div className={` mb-3 ${styles.buttons}`}>
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
          <div className={styles.imageContainer}>
            <img src={`https://image.tmdb.org/t/p/w500/${posterPath}`} alt={title} />
          </div>
        </div>
        <MovieRating
          movieId={id}
        />
      </div>
    </div>
  );
}

MovieListItem.propTypes = {
  addLikeToMovieItem: PropTypes.func.isRequired,
  removeLikeFromMovieItem: PropTypes.func.isRequired,
  setActiveMovieId: PropTypes.func.isRequired,
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
    toShow: PropTypes.bool,
  }).isRequired,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  setActiveMovieId: setActiveMovieIdAction,
  addLikeToMovieItem: addLikeToMovieItemAction,
  removeLikeFromMovieItem: removeLikeFromMovieItemAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieListItem);
