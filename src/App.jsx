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
      filter: '',
      movies: null,
      activeMovieId: null,
    };
    this.updateMovies();
  }

  updateMovies = () => {
    const movies = new MoviesService();
    movies.getResource()
      .then((res) => {
        this.setState({ movies: res.results.map((item) => ({ ...item, currentLikesCount: 0 })) });
      });
  };

  onFilterChange = (filter) => {
    this.setState({ filter });
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
    const { filter, movies, activeMovieId } = this.state;
    const activeMovieData = movies && activeMovieId
      ? movies.find(({ id }) => id === activeMovieId)
      : null;
    const moviesItems = movies
      ? movies.map((item) => (
        <MovieListItem
          movieData={item}
          key={item.id}
          onMovieTitleClick={this.onMovieTitleClick}
          onLikeClick={this.onLikeClick}
          onDislikeClick={this.onDislikeClick}
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
                filter={filter}
                onFilterChange={this.onFilterChange}
              />
              <div className="movies-list">
                {moviesItems}
              </div>
            </div>
            <MovieInfo activeMovieData={activeMovieData} />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
