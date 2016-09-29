"use strict";

const MovieApiUtil = {

  fetchPopularMovies(success) {
    $.ajax({
      url: "api/recommender/new_visitor",
      dataType: "JSON",
      method: "GET",
      success,
      fail(xhr) {
        console.log(xhr);
      }
    });
  },

  fetchRecommendedMovies(ratedMovies, queuedMovies, success) {
    $.ajax({
      url: "api/recommender/recommendations",
      dataType: "JSON",
      method: "GET",
      data: {
        recommender: {
          rated: ratedMovies,
          queue: queuedMovies
        }
      },
      success,
      fail(xhr) {
        console.log(xhr);
      }
    });
  },

  getMovieInfo(imdbId, success) {
    $.ajax({
      url: "https://www.omdbapi.com/",
      dataType: "JSON",
      method: "GET",
      data: {
        i: imdbId, plot: 'short'
      },
      success,
      fail(xhr) {
        console.log(xhr);
      }
    });
  }
};

module.exports = MovieApiUtil;
