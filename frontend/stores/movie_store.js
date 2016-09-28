"use strict";
const Dispatcher = require('../dispatcher/dispatcher');
const MovieConstants = require('../constants/movie_constants');
const Store = require('flux/utils').Store;
const MovieStore = new Store(Dispatcher);

let _popularMovies = {};
let _recommendedMovies = {};
let _skippedMovies = {};

MovieStore.__onDispatch = payload => {
  switch (payload.actionType) {
    case MovieConstants.POPULAR_MOVIES_RECEIVED:
    MovieStore.setPopularMovies(payload.movies);
    MovieStore.__emitChange();
    break;
    case MovieConstants.RECOMMENDED_MOVIES_RECEIVED:
    MovieStore.setRecommendedMovies(payload.movies);
    MovieStore.__emitChange();
    break;
  }
};

MovieStore.setPopularMovies = function(movies) {
  _popularMovies = {};
  movies.forEach( (movie) => {
    _popularMovies[movie.id] = movie;
  });
};

MovieStore.setRecommendedMovies = function(movies) {
  movies.forEach( (movie) => {
    _recommendedMovies[movie.id] = movie;
    console.log(movie);
  });
};

MovieStore.getPopularMovies = function(){
  return Object.keys(_popularMovies).map( (movieId) => {
    return _popularMovies[movieId];
  });
};

MovieStore.getRecommendedMovies = function(){
  return Object.keys(_recommendedMovies).map ( (movieId) => {
    return _recommendedMovies[movieId];
  });
};

MovieStore.findMovie = function(movieId) {
  if (_popularMovies[movieId]) {
    return _popularMovies[movieId];
  } else if (_recommendedMovies[movieId]) {
    return _recommendedMovies[movieId];
  } else {
    return undefined;
  }
};

module.exports = MovieStore;
