import React, { Component } from 'react';
import './App.scss';
import Filter from './components/Filter';
import MoviesList from './components/MoviesList';
import MovieInfo from './components/MovieInfo';
import Header from './components/Header';
import Footer from './components/Footer';
import MoviesService from './services/MoviesService';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: '',
      movies: null,
    };
    this.updateMovies();
  }

  updateMovies = () => {
    const movies = new MoviesService();
    movies.getResource()
      .then((res) => {
        this.setState({ movies: res.results });
      });
  };

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  render() {
    const { filter, movies } = this.state;
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
              <MoviesList movies={movies} />
            </div>
            <MovieInfo />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
