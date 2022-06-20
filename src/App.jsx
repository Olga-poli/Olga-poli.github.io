import React from 'react';
import './App.scss';
import Filter from './components/Filter';
import MoviesList from './components/MoviesList';
import MovieInfo from './components/MovieInfo';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-8">
            <Filter />
            <MoviesList />
          </div>
          <MovieInfo />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
