const Dispatcher = require('../dispatcher/dispatcher');
const MovieConstants = require('../constants/movie_constants');
const MovieApiUtil = require('../util/movie_api_util');

const TrailerActions = {

  fetchMovieTrailer(imdbId) {
    MovieApiUtil.fetchMovieTrailer(imdbId, this.receiveMovieTrailer);
  },

  receiveMovieTrailer(data) {
    let results = data.results;
    let srcs = [];
    for (let i = 0; i < results.length; i++) {
      let url = `https://www.youtube.com/watch?v=${results[i].key}`;
      srcs.push(url);
    }
    Dispatcher.dispatch({
      actionType: MovieConstants.TRAILERS_RECEIVED,
      videoSrcs: srcs
    });
  }
};

module.exports = TrailerActions;
