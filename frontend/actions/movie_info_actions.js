"use strict";

const Dispatcher = require('../dispatcher/dispatcher');
const MovieConstants = require('../constants/movie_constants');
const MovieApiUtil = require('../util/movie_api_util');

const MovieInfoActions = {
  fetchMovieInfo(imdbId) {
    MovieApiUtil.getMovieInfo(
      imdbId,
      MovieInfoActions.receiveMovieInfo
    );
  },

  receiveMovieInfo(movie){
    Dispatcher.dispatch({
      actionType: MovieConstants.MOVIE_INFO_RECEIVED,
      movie: movie
    });
  }

};

module.exports = MovieInfoActions;
