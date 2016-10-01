const React = require('react');
const Loader = require('react-loader');
const Cookies = require('js-cookie');
const GaugeIndex = require('./gauge_index');
const RatedIndex = require('./rated_index');
const RecommendationIndex = require('./recommendation_index');
const MovieStore = require('../stores/movie_store');
const MovieActions = require('../actions/movie_actions');
const MovieRatingStore = require('../stores/movie_rating_store');
const MovieRatingActions = require('../actions/movie_rating_actions');

const MovieRecommender = React.createClass({

  getInitialState() {
    if (Cookies.get('consilium')) {
      let movieRatings = JSON.parse(Cookies.get('consilium'))['ratings'];
      if (Object.keys(movieRatings).length >= 10) {
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
    if (this.state.isRecommending) {
      let cookies = JSON.parse(Cookies.get('consilium'));
      let movieRatings = cookies['ratings'];
      MovieRatingActions.submitMultipleRatingsToStore(movieRatings);
      MovieActions.fetchMovieByIds(Object.keys(movieRatings));
    } else if(Cookies.get('consilium')) {
      Cookies.remove('consilium');
    }
  },

  componentWillUnmount(){
    this.movieRatingListener.remove();
    this.movieStoreListener.remove();
  },

  moviesOnChange() {


  },

  ratingsOnChange() {
    let movieRatings = MovieRatingStore.getRatings();
    let recommendations = MovieStore.getRecommendedMovies();
    if (Object.keys(movieRatings).length >= 10) {
      //MovieActions.fetchRecommendedMovies(movieRatings, recommendations);
      //this.setState({isRecommending: true});
    }
    this.saveToCookie(movieRatings);
  },

  saveToCookie(ratedMovies, recommendedMovies) {
    Cookies.set('consilium',
      { ratings: ratedMovies },
      { expires: 365}
    );
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
