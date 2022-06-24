import React, { Component } from 'react';
import './App.scss';
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
      activeFilter: '',
      movies: null,
      activeMovieId: null,
      term: '',
    };
    this.filters = [
      {
        name: 'likes',
        label: 'by likes',
      },
      {
        name: 'rating',
        label: 'by rating',
      },
    ];
    this.updateMovies();
    this.search = (arr, term) => {
      if (term.length === 0) {
        return arr;
      }
      return arr
        .filter(({ title }) => title.toLowerCase().indexOf(term.toLowerCase()) > -1);
    };
  }

  sortMovies = (arr) => {
    const { activeFilter } = this.state;
    const map = {
      likes: (a, b) => b.currentLikesCount - a.currentLikesCount,
      rating: (a, b) => b.rating - a.rating,
    };
    return activeFilter ? arr.sort(map[activeFilter]) : arr;
  };

  updateMovies = () => {
    const movies = new MoviesService();
    movies.getResource()
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

  onFilterChange = (activeFilter) => {
    this.setState({ activeFilter });
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

  onSearch = (term) => {
    this.setState(({ term }));
  };

  updateItemLikesCounter(movieId, shift = 1) {
    const { movies } = this.state;
    const currentMovieIdx = movies.findIndex(({ id }) => id === movieId);
    const currentLikesCount = movies[currentMovieIdx].currentLikesCount + shift;
    const updatedMovie = { ...movies[currentMovieIdx], currentLikesCount };
    this.setState(() => ({
      movies: [
        ...movies.slice(0, currentMovieIdx),
        updatedMovie,
        ...movies.slice(currentMovieIdx + 1),
      ],
    }));
  }

  render() {
    const {
      activeFilter,
      movies,
      activeMovieId,
      term,
    } = this.state;
    const visibleMovies = this.sortMovies(
      this.search(movies, term),
    );
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
      <div className="App">
        <Header />
        <div className="container">
          <div className="row">
            <div className="col-8">
              <Filter
                filters={this.filters}
                activeFilter={activeFilter}
                onFilterChange={this.onFilterChange}
                onSearch={this.onSearch}
              />
              <div className="movies-list">
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
