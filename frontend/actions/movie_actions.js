"use strict";

const Dispatcher = require('../dispatcher/dispatcher');
const MovieConstants = require('../constants/movie_constants');
const MovieApiUtil = require('../util/movie_api_util');

const MovieActions = {

  clearRecommendations() {
    Dispatcher.dispatch({
      actionType: MovieConstants.RECOMMENDATIONS_DELETED
    });
  },

  skipMovie(movieId) {
    Dispatcher.dispatch({
      actionType: MovieConstants.SKIP_MOVIE,
      movieId: movieId
    });
  },

  markNotInterested(movieId) {
    Dispatcher.dispatch({
      actionType: MovieConstants.MARK_NOT_INTERESTED,
      movieId: movieId
    });
  },

  fetchMovieByIds(idArray) {
    MovieApiUtil.fetchMovieByIds(idArray, this.receiveMovies);
  },

  fetchPopularMovies() {
    MovieApiUtil.fetchPopularMovies(
      MovieActions.receivePopularMovies);
  },

  fetchRecommendedMovies(ratedMovies, queuedMovies) {
    MovieApiUtil.fetchRecommendedMovies(
      ratedMovies,
      queuedMovies,
      MovieActions.receiveRecommendedMovies
    );
  },

  receiveMovies(movies) {
    Dispatcher.dispatch({
      actionType: MovieConstants.MOVIES_RECEIVED,
      movies: movies
    });
  },

  receiveRecommendedMovies(movies) {
    Dispatcher.dispatch({
      actionType: MovieConstants.RECOMMENDED_MOVIES_RECEIVED,
      movies: movies
    });
  },

  receivePopularMovies(movies){
    Dispatcher.dispatch({
      actionType: MovieConstants.POPULAR_MOVIES_RECEIVED,
      movies: movies
    });
  }

};

module.exports = MovieActions;
