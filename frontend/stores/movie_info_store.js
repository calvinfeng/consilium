"use strict";

const Dispatcher = require('../dispatcher/dispatcher');
const MovieConstants = require('../constants/movie_constants');
const Store = require('flux/utils').Store;

const MovieInfoStore = new Store(Dispatcher);

let _movieInformation = {};

MovieInfoStore.getMovieInfo = function(imdbId){
  return _movieInformation[imdbId];
};

const receiveMovieInfo = function(movie) {
  _movieInformation[movie.imdbID] = movie;
};

MovieInfoStore.__onDispatch = payload => {
  switch (payload.actionType) {
    case MovieConstants.MOVIE_INFO_RECEIVED:
      receiveMovieInfo(payload.movie);
      MovieInfoStore.__emitChange();
      break;
  }
};

module.exports = MovieInfoStore;
