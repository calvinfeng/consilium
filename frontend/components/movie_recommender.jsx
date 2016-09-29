const React = require('react');
const Loader = require('react-loader');
const GaugeIndex = require('./gauge_index');
const RatedIndex = require('./rated_index');
const MovieRatingStore = require('../stores/movie_rating_store');
const MovieStore = require('../stores/movie_store');
const MovieActions = require('../actions/movie_actions');

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
    console.log(`Number of rated movies: ${Object.keys(ratedMovies).length}`);
    if (Object.keys(ratedMovies).length === 8) {
      MovieActions.fetchRecommendedMovies(ratedMovies, queue);
    }
    // This is a design decision to make, either make the Recommender component to
    // handle the logic of submitting ratings to backend API or let the MovieIndex
    // component to do it. Personally I'd vote for the Recommender.
  },

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
