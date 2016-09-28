const React = require('react');
const Loader = require('react-loader');
const GaugeIndex = require('./gauge_index');
const RatedIndex = require('./rated_index');
const MovieRatingStore = require('../stores/movie_rating_store');
const MovieActions = require('../actions/movie_actions');

const MovieRecommender = React.createClass({

  componentDidMount(){
    this.movieRatingListener = MovieRatingStore.addListener(this.collectRating);
  },

  collectRating() {
    let ratedMovies = MovieRatingStore.getRatings();
    console.log(`Number of rated movies: ${Object.keys(ratedMovies).length}`);
    if (Object.keys(ratedMovies).length === 8) {
      MovieActions.fetchRecommendedMovies(ratedMovies, {});
    }
    // This is a design decision to make, either make the Recommender component to
    // handle the logic of submitting ratings to backend API or let the MovieIndex
    // component to do it. Personally I'd vote for the Recommender.
  },

  render() {
    return (
      <div className="recommender">
        <h1>Popular Movies</h1>
        <h4>
          Here are some popular movies, if you have seen them, rate them! It will help our backend
          machine learning algorithm to learn your taste and preference
        </h4>
        <GaugeIndex/>
        <h1>Rated Movies</h1>
        <RatedIndex/>
      </div>
    );
  }
});

module.exports = MovieRecommender;
