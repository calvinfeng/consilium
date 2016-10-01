"use strict";
const Dispatcher = require('../dispatcher/dispatcher');
const MovieConstants = require('../constants/movie_constants');
const Store = require('flux/utils').Store;
const MovieStore = new Store(Dispatcher);
const MovieRatingStore = require('./movie_rating_store');

// Distinction:
// popularMovies are for new visitors
// movies contain movie information for returned vistors
// recommendedMovies are for both new and returned visitors
let _popularMovies = {};
let _skippedMovies = {};

let _recommendedMovies = {};
let _notInterestedMovies = {};
let _movies = {};

MovieStore.__onDispatch = payload => {
  switch (payload.actionType) {
    case MovieConstants.MOVIES_RECEIVED:
    MovieStore.setMovies(payload.movies);
    MovieStore.__emitChange();
    break;
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
    case MovieConstants.MARK_NOT_INTERESTED:
    MovieStore.setNotInterestedMovie(payload.movieId);
    MovieStore.__emitChange();
    break;
  }
};

MovieStore.setNotInterestedMovie = function(movieId) {
  _notInterestedMovies[movieId] = true;
};

MovieStore.setSkippedMovie = function(movieId) {
  _skippedMovies[movieId] = true;
};

MovieStore.setMovies = function(movies) {
  movies.forEach((movie) => {
    _movies[movie.id] = movie;
  });
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
  });
};

MovieStore.getPopularMovies = function(){
  return Object.keys(_popularMovies).map( (movieId) => {
    return _popularMovies[movieId];
  });
};

MovieStore.getRecommendedMovies = function(){
  return JSON.parse(JSON.stringify(_recommendedMovies));
};

MovieStore.getSkippedMovies = function() {
  return JSON.parse(JSON.stringify(_skippedMovies));
};

MovieStore.getNotInterestedMovies = function() {
  return JSON.parse(JSON.stringify(_notInterestedMovies));
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

MovieStore.remainingRecommendationCount = function() {
  let count = 0;
  Object.keys(_recommendedMovies).forEach((movieId) => {
    if (!this.notInterested(movieId) && !MovieRatingStore.hasRated(movieId)) {
      count += 1;
    }
  });
  return count;
};

MovieStore.findMovie = function(movieId) {
  if (_popularMovies[movieId]) {
    return _popularMovies[movieId];
  } else if (_recommendedMovies[movieId]) {
    return _recommendedMovies[movieId];
  } else if (_movies[movieId]) {
    return _movies[movieId];
  } else {
    return undefined;
  }
};

module.exports = MovieStore;
