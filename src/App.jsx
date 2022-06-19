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
      <Filter />
      <MoviesList />
      <MovieInfo />
      <Footer />
    </div>
  );
}

export default App;
