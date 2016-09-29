"use strict";

const Dispatcher = require('../dispatcher/dispatcher');
const MovieConstants = require('../constants/movie_constants');
const Store = require('flux/utils').Store;
const MovieInfoStore = new Store(Dispatcher);

let _movieInfo = {};

MovieInfoStore.__onDispatch = payload => {
  switch (payload.actionType) {
    case MovieConstants.MOVIE_INFO_RECEIVED:
    MovieInfoStore.setMovieInfo(payload.movie);
    MovieInfoStore.__emitChange();
    break;
  }
};

MovieInfoStore.setMovieInfo = function(movie) {
  _movieInfo[movie.imdb_id] = movie;
};

MovieInfoStore.getMovieInfo = function(imdbId){
  return _movieInfo[imdbId];
};


module.exports = MovieInfoStore;
