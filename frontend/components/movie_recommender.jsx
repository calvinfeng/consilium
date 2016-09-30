const React = require('react');
const Loader = require('react-loader');
const GaugeIndex = require('./gauge_index');
const RatedIndex = require('./rated_index');
const RecommendationIndex = require('./recommendation_index');
const MovieRatingStore = require('../stores/movie_rating_store');
const MovieStore = require('../stores/movie_store');
const MovieActions = require('../actions/movie_actions');
import * as Cookies from "js-cookie";

const MovieRecommender = React.createClass({

  getInitialState() {
    let cookies = JSON.parse(Cookies.get('consilium'));
    if (cookies.hasOwnProperty("rated") && cookies.hasOwnProperty("queue")){
      let ratedMovies = cookies["rated"];
      let queue = cookies["queue"];
      if (Object.keys(cookies["queue"]).length > 5){
        return {isRecommending: false};
      } else {
        MovieActions.fetchRecommendedMovies(ratedMovies, queue);
        return {isRecommending: true};
      }
    } else if (cookies.hasOwnProperty("rated")) {
      if (Object.keys(cookies["rated"]).length >= 10){
        MovieActions.fetchRecommendedMovies(ratedMovies, queue);
        return {isRecommending: true};
      } else {
        return {isRecommending: false};
      }
    } else {
      return {isRecommending: false};
    }
  },

  componentDidMount(){
    this.movieRatingListener = MovieRatingStore.addListener(this.ratingsOnChange);
    this.movieStoreListener = MovieStore.addListener(this.moviesOnChange);
  },

  componentWillUnmount(){
    this.movieRatingListener.remove();
    this.movieStoreListener.remove();
  }
  moviesOnChange() {
  },

  ratingsOnChange() {
    let ratedMovies = MovieRatingStore.getRatings();
    let queue = MovieStore.getQueue();
    console.log(`Number of rated movies: ${Object.keys(ratedMovies).length}`);
    if (Object.keys(ratedMovies).length >= 10) {
      MovieActions.fetchRecommendedMovies(ratedMovies, queue);
      this.setState({isRecommending: true});
    }
    this.addToCookie(ratedMovies, queue);
  },

  // Cookie format to be in { rated => { movieId : rating, movieId: rating, etc...} }
  addToCookie(ratedMovies, recommendedMovies) {

    let cookies = JSON.parse(Cookies.get('consilium'));
    let ratedMoviesFromCookies = {};
    let recommendedMoviesFromCookies = {};
    if (cookies.hasOwnProperty("rated") && cookies.hasOwnProperty("queue")){
      ratedMoviesFromCookies = cookies["rated"];
      recommendedMoviesFromCookies = cookies["queue"];
      ratedMovies = Object.assign(ratedMovies, ratedMoviesFromCookies);
      recommendedMovies = Object.assign(recommendedMovies, recommendedMoviesFromCookies);
    } else if (cookies.hasOwnProperty("rated")){
      ratedMoviesFromCookies = cookies["rated"];
      ratedMovies = Object.assign(ratedMovies, ratedMoviesFromCookies);
    }
    Cookies.set('consilium', { rated: ratedMovies, queue: recommendedMovies, expires: 365 });
  },

  renderIndex() {
    if (this.state.isRecommending) {
      return (
        <div className="recommender">
          <RecommendationIndex/>
          <RatedIndex/>
        </div>
      );
    } else {
      return (
        <div className="recommender">
          <GaugeIndex/>
          <RatedIndex/>
        </div>
      );
    }
  },



  render() {
    return this.renderIndex();
  }
});

module.exports = MovieRecommender;
