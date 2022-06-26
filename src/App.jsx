import React, { Component } from 'react';
import styles from './App.module.scss';
import Filter from './components/Filter';
import MovieInfo from './components/MovieInfo';
import Header from './components/Header';
import Footer from './components/Footer';
import MoviesService from './services/MoviesService';
import MovieListItem from './components/MovieListItem';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: null,
      activeMovieId: null,
      searchInputValue: '',
    };
  }

  componentDidMount() {
    this.updateMovies();
  }

  updateMovies = () => {
    MoviesService.getResource()
      .then((res) => {
        this.setState({
          movies: res.results.map((item) => ({
            ...item,
            currentLikesCount: 0,
            rating: 0,
          })),
        });
      });
  };

  onFilterChange = (activeButton) => {
    const { movies } = this.state;
    const map = {
      likes: (a, b) => (
        activeButton.descending
          ? b.currentLikesCount - a.currentLikesCount
          : a.currentLikesCount - b.currentLikesCount
      ),
      rating: (a, b) => (
        activeButton.descending
          ? b.rating - a.rating
          : a.rating - b.rating
      ),
    };
    const sortedMovies = [...movies].sort(map[activeButton.name]);
    this.setState(() => ({ movies: sortedMovies }));
  };

  onRatingChange = (movieId, rating) => {
    const { movies } = this.state;
    const currentMovieIdx = movies.findIndex(({ id }) => id === movieId);
    const updatedMovie = { ...movies[currentMovieIdx], rating };
    this.setState(() => ({
      movies: [
        ...movies.slice(0, currentMovieIdx),
        updatedMovie,
        ...movies.slice(currentMovieIdx + 1),
      ],
    }));
  };

  onMovieTitleClick = (activeMovieId) => {
    this.setState(() => ({ activeMovieId }));
  };

  onLikeClick = (currentMovieId) => {
    this.updateItemLikesCounter(currentMovieId);
  };

  onDislikeClick = (currentMovieId) => {
    this.updateItemLikesCounter(currentMovieId, -1);
  };

  onSearch = (searchInputValue) => {
    this.setState(({ searchInputValue }));
  };

  searchByInputValue(array) {
    const { searchInputValue } = this.state;
    if (searchInputValue.length === 0) {
      return array;
    }
    return array
      .filter(({ title }) => title.toLowerCase().indexOf(searchInputValue.toLowerCase()) > -1);
  }

  updateItemLikesCounter(movieId, shift = 1) {
    const { movies } = this.state;
    const currentMovieIndex = movies.findIndex(({ id }) => id === movieId);
    const currentLikesCount = movies[currentMovieIndex].currentLikesCount + shift;
    const updatedMovie = { ...movies[currentMovieIndex], currentLikesCount };
    this.setState(() => ({
      movies: [
        ...movies.slice(0, currentMovieIndex),
        updatedMovie,
        ...movies.slice(currentMovieIndex + 1),
      ],
    }));
  }

  render() {
    const {
      movies,
      activeMovieId,
    } = this.state;
    const visibleMovies = this.searchByInputValue(movies);
    const activeMovieData = movies && activeMovieId
      ? movies.find(({ id }) => id === activeMovieId)
      : null;
    const moviesItems = visibleMovies
      ? visibleMovies.map((item) => (
        <MovieListItem
          movieData={item}
          key={item.id}
          onMovieTitleClick={this.onMovieTitleClick}
          onLikeClick={this.onLikeClick}
          onDislikeClick={this.onDislikeClick}
          onRatingChange={this.onRatingChange}
        />
      ))
      : null;

    return (
      <div className={styles.App}>
        <Header />
        <div className="container">
          <div className="row">
            <div className="col-8">
              <Filter
                onFilterChange={this.onFilterChange}
                onSearch={this.onSearch}
              />
              <div className={styles.moviesList}>
                {moviesItems}
              </div>
            </div>
            <MovieInfo
              activeMovieData={activeMovieData}
              onRatingChange={this.onRatingChange}
            />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
