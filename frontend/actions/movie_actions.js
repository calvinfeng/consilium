"use strict";

const Dispatcher = require('../dispatcher/dispatcher');
const MovieConstants = require('../constants/movie_constants');
const MovieApiUtil = require('../util/movie_api_util');

const MovieActions = {
  
  fetchPopularMovies() {
    MovieApiUtil.fetchPopularMovies(
      MovieActions.receivePopularMovies);
  },

  fetchRecommendedMovies() {
    MovieApiUtil.fetchRecommendedMovies(
      MovieActions.receiveRecommendedMovies);
  },

  receivePopularMovies(movies){
    Dispatcher.dispatch({
      actionType: MovieConstants.POPULAR_MOVIES_RECEIVED,
      movies: movies
    });
  }

};

module.exports = MovieActions;
