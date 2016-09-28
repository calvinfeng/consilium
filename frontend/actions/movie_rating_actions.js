"use strict";

const Dispatcher = require('../dispatcher/dispatcher');
const MovieConstants = require('../constants/movie_constants');

const MovieRatingActions = {

  submitRatingToStore(ratingObj) {
    Dispatcher.dispatch({
      actionType: MovieConstants.MOVIE_RATING_RECEIVED,
      ratingObj: ratingObj
    });
  }

};

module.exports = MovieRatingActions;
