"use strict";
const Dispatcher = require('../dispatcher/dispatcher');
const MovieConstants = require('../constants/movie_constants');
const Store = require('flux/utils').Store;
const MovieStore = new Store(Dispatcher);

let _popularMovies = {};
let _recommendedMovies = {};
let _skippedMovies = {};
let _notInterestedMovies = {};

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
    case MovieConstants.SKIP_MOVIE:
    MovieStore.setSkippedMovie(payload.movieId);
    MovieStore.__emitChange();
    break;
  }
};

MovieStore.setSkippedMovie = function(movieId) {
  _skippedMovies[movieId] = true;
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

// Well the queue is the list of recommended movies that is currently being shown
// to viewers, so we haven't defined that yet
MovieStore.getQueue = function() {
  return JSON.parse(JSON.stringify(_recommendedMovies));
};

MovieStore.getSkippedMovies = function() {
  return JSON.parse(JSON.stringify(_skippedMovies));
};

MovieStore.isMovieSkipped = function(movieId) {
  if (_skippedMovies[movieId]) {
    return true;
  } else {
    return false;
  }
};

MovieStore.notInterested = function(movieId) {
  if (_notInterestedMovies[movieId]) {
    return true;
  } else {
    return false;
  }
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
