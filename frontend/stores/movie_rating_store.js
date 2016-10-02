"use strict";

const Dispatcher = require('../dispatcher/dispatcher');
const MovieConstants = require('../constants/movie_constants');
const Store = require('flux/utils').Store;
const MovieRatingStore = new Store(Dispatcher);
const MovieStore = require('./movie_store');

let _ratings = {};

MovieRatingStore.__onDispatch = payload => {
  switch (payload.actionType) {
    case MovieConstants.MOVIE_RATING_RECEIVED:
    MovieRatingStore.setRating(payload.ratingObj);
    MovieRatingStore.__emitChange();
    break;
    case MovieConstants.MOVIE_RATINGS_RECEIVED:
    MovieRatingStore.setRatings(payload.ratings);
    MovieRatingStore.__emitChange();
    break;
    case MovieConstants.MOVIE_RATINGS_DELETED:
    MovieRatingStore.removeRatingHistory(payload.ratings);
    MovieRatingStore.__emitChange();
    break;
  }
};

MovieRatingStore.setRating = function(ratingObj) {
  _ratings[ratingObj.movieId] = ratingObj.rating;
};

MovieRatingStore.setRatings = function(ratings) {
  Object.keys(ratings).forEach((movieId) =>{
    _ratings[movieId] = ratings[movieId];
  });
};

MovieRatingStore.getRatings = function() {
  return JSON.parse(JSON.stringify(_ratings));
};

MovieRatingStore.getNumberOfRated = function() {
  return Object.keys(_ratings).length;
};

MovieRatingStore.hasRated = function(movieId) {
  if (_ratings[movieId]) {
    return true;
  } else {
    return false;
  }
};

MovieRatingStore.removeRatingHistory = function() {
  _ratings = {};
};

module.exports = MovieRatingStore;
