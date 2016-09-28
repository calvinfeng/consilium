const React = require('react');
const Loader = require('react-loader');
const MovieIndex = require('./movie_index');
const MovieRatingStore = require('../stores/movie_rating_store');

const MovieRecommender = React.createClass({

  componentDidMount(){
    this.movieRatingListener = MovieRatingStore.addListener(this.collectRating);
  },

  collectRating() {
    console.log("Monitoring Ratings");
    // This is a design decision to make, either make the Recommender component to
    // handle the logic of submitting ratings to backend API or let the MovieIndex
    // component to do it. Personally I'd vote for the Recommender.
  },

  render() {
    return <MovieIndex/>;
  }
});

module.exports = MovieRecommender;
