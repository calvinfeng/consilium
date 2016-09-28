"use strict";

const Dispatcher = require('../dispatcher/dispatcher');
const MovieConstants = require('../constants/movie_constants');
const Store = require('flux/utils').Store;
const MovieRatingStore = new Store(Dispatcher);

let _ratings = {};

MovieRatingStore.__onDispatch = payload => {
  switch (payload.actionType) {
    case MovieConstants.MOVIE_RATING_RECEIVED:
      MovieRatingStore.setRating(payload.ratingObj);
      MovieRatingStore.__emitChange();
      break;
  }
};

MovieRatingStore.setRating = function(ratingObj) {
  _ratings[ratingObj.movieId] = ratingObj.rating;
};

module.exports = MovieRatingStore;
