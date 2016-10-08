"use strict";

const omdbUrl = "https://www.omdbapi.com/";
const tmdbUrl = "https://api.themoviedb.org/3/movie/";
const apiKey = "2afddf218bfb5d06ef460cc103af69bc";

const MovieApiUtil = {

  fetchMovieByIds(idArray, success) {
    $.ajax({
      url: "api/recommender/movies_by_ids",
      dataType: "JSON",
      method: "POST",
      data: {
        recommender: {
          movieIds: idArray
        }
      },
      success,
      fail(xhr) {
        console.log(xhr);
      }
    });
  },

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
      method: "POST",
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
      url: tmdbUrl + imdbId,
      dataType: "JSON",
      method: "GET",
      data: {
        api_key: apiKey
      },
      success,
      fail(xhr) {
        console.log(xhr);
      }
    });
  },
};

module.exports = MovieApiUtil;
