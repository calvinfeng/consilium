const React = require('react');
const Loader = require('react-loader');
const GaugeIndex = require('./gauge_index');
const RatedIndex = require('./rated_index');
const MovieRatingStore = require('../stores/movie_rating_store');
const MovieStore = require('../stores/movie_store');
const MovieActions = require('../actions/movie_actions');

import * as Cookies from "js-cookie";

const MovieRecommender = React.createClass({

  componentDidMount(){
    this.movieRatingListener = MovieRatingStore.addListener(this.ratingsOnChange);
    this.movieStoreListener = MovieStore.addListener(this.moviesOnChange);
  },

  moviesOnChange() {
  },

  ratingsOnChange() {
    let ratedMovies = MovieRatingStore.getRatings();
    let queue = MovieStore.getQueue();
    let recommendedMovies;
    console.log(`Number of rated movies: ${Object.keys(ratedMovies).length}`);
    if (Object.keys(ratedMovies).length === 8) {
      recommendedMovies = MovieActions.fetchRecommendedMovies(ratedMovies, queue);
    }
    // This is a design decision to make, either make the Recommender component to
    // handle the logic of submitting ratings to backend API or let the MovieIndex
    // component to do it. Personally I'd vote for the Recommender.
    this.addToCookie(ratedMovies, recommendedMovies);
  },

  addToCookie(ratedMovies, recommendedMovies) {
    let cookies = JSON.parse(Cookies.get('consilium'));
    let ratedMoviesFromCookies;
    let recommendedMoviesFromCookies;
    debugger;
    if (cookies.hasOwnProperty("rated") && cookies.hasOwnProperty("queue")){
      ratedMoviesFromCookies = cookies["rated"]
      recommendedMoviesFromCookies = cookies["queue"]
      ratedMovies = Object.assign(ratedMovies, ratedMoviesFromCookies)
      recommendedMovies = Object.assign(recommendedMovies, recommendedMoviesFromCookies)
    } else if (cookies.hasOwnProperty("rated")){
      ratedMoviesFromCookies = cookies["rated"]
      ratedMovies = Object.assign(ratedMovies, ratedMoviesFromCookies)
    } else if (cookies.hasOwnProperty("queue")){
      recommendedMoviesFromCookies = cookies["queue"]
      recommendedMovies = Object.assign(recommendedMovies, recommendedMoviesFromCookies)
    }
    Cookies.set('consilium', { rated: ratedMovies, queue: recommendedMovies, expires: 365 });
    console.log(Cookies.get('consilium'));
  },

//  Cookie format to be in { rated => { movieId : rating, movieId: rating, etc...} }


  render() {
    return (
      <div className="recommender">
        <GaugeIndex/>
        <RatedIndex/>
      </div>
    );
  }
});

module.exports = MovieRecommender;
