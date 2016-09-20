"use strict";

const Dispatcher = require('../dispatcher/dispatcher');
const MovieConstants = require('../constants/movie_constants');
const Store = require('flux/utils').Store;

const MovieStore = new Store(Dispatcher);

let _popularMovies = {};
let _recommendedMovies = {};

MovieStore.popularMovies = function(){
  return Object.keys(_popularMovies).map( (movieId) => {
    return _popularMovies[movieId];
  });
};

MovieStore.recommendedMovies = function() {
  return Object.keys(_recommendedMovies).map ( (movieId) => {
    return _recommendedMovies[movieId];
  });
};

const getPopularMovies = function(movies) {
  _popularMovies = {};
  movies.forEach( (movie) => {
    _popularMovies[movie.id] = movie;
  });
};

const getRecommendedMovies = function(movies) {
  _popularMovies = {};
  _recommendedMovies = {};
  movies.forEach( (movie) => {
    _recommendedMovies[movie.id] = movie;
  });
};

MovieStore.__onDispatch = payload => {
  switch(payload.actionType) {
    case MovieConstants.POPULAR_MOVIES_RECEIVED:
      getPopularMovies(payload.movies);
      MovieStore.__emitChange();
      break;
    case MovieConstants.RECOMMENDED_MOVIES_RECEIVED:
      getRecommendedMovies(payload.movies);
      MovieStore.__emitChange();
      break;
  }
};
module.exports = MovieStore;
