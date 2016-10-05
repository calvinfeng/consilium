"use strict";

const Dispatcher = require('../dispatcher/dispatcher');
const MovieConstants = require('../constants/movie_constants');
const Store = require('flux/utils').Store;
const MovieInfoStore = new Store(Dispatcher);

let _movieInfo = {};
let _poster = {};

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
  _poster[movie.imdb_id] = "https://image.tmdb.org/t/p/w300" + movie.poster_path;
};

MovieInfoStore.getMovieInfo = function(imdbId){
  return _movieInfo[imdbId];
};

MovieInfoStore.getPoster = function(imdbId) {
  return _poster[imdbId];
};



module.exports = MovieInfoStore;
