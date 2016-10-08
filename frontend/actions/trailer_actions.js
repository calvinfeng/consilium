const Dispatcher = require('../dispatcher/dispatcher');
const MovieConstants = require('../constants/movie_constants');
const MovieApiUtil = require('../util/movie_api_util');

const apiKey = "2afddf218bfb5d06ef460cc103af69bc";
const TrailerActions = {

  fetchMovieTrailer(imdbId) {
    $.ajax({
      url: `https://api.themoviedb.org/3/movie/${imdbId}/videos`,
      dataType: "JSON",
      method: "GET",
      data: {
        api_key: apiKey
      },
      success: function(data) {
        let results = data.results;
        let srcs = [];
        for (let i = 0; i < results.length; i++) {
          let url = `https://www.youtube.com/watch?v=${results[i].key}`;
          srcs.push(url);
        }
        Dispatcher.dispatch({
          actionType: MovieConstants.TRAILERS_RECEIVED,
          videoSrcs: srcs,
          imdbId: imdbId
        });
      },
      fail(xhr) {
        console.log(xhr);
      }
    });
  },
};

module.exports = TrailerActions;
