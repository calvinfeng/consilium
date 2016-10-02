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

const tmdbLogo = `https://www.themoviedb.org/assets/9b3f9c24d9fd5f297ae433eb33d93514
/images/v4/logos/408x161-powered-by-rectangle-green.png`;

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
    this.movieStoreListener = MovieStore.addListener(this.moviesOnChange);
    if (this.state.isRecommending) {
      let cookies = JSON.parse(Cookies.get('consilium'));
      let movieRatings = cookies['ratings'];
      MovieRatingActions.submitMultipleRatingsToStore(movieRatings);
      MovieActions.fetchMovieByIds(Object.keys(movieRatings));
    } else if(Cookies.get('consilium')) {
      Cookies.remove('consilium');
    }
    $(".logo-bar").hide();
    $(".logo-bar").fadeIn("slow");
  },

  componentWillUnmount(){
    this.movieRatingListener.remove();
    this.movieStoreListener.remove();
  },

  moviesOnChange() {
    this.replenlishRecommendations();
  },

  ratingsOnChange() {
    let movieRatings = MovieRatingStore.getRatings();
    this.saveToCookie(movieRatings);
    this.replenlishRecommendations();
  },

  replenlishRecommendations() {
    console.log(`Recommendations in store: ${MovieStore.remainingRecommendationCount()}`);
    let movieRatings = MovieRatingStore.getRatings();
    let notInterested = MovieStore.getNotInterestedMovies();
    if (Object.keys(movieRatings).length >= 10 && MovieStore.remainingRecommendationCount() < 10) {
      MovieActions.fetchRecommendedMovies(movieRatings, notInterested);
      if (!this.state.isRecommending) {
        this.setState({isRecommending: true});
      }
    }
  },

  saveToCookie(ratedMovies, recommendedMovies) {
    Cookies.set('consilium',
      { ratings: ratedMovies },
      { expires: 7}
    );
  },

  renderIndexes() {
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
    return (
      <div style={{width: '100%'}}>
        {this.renderIndexes()}
        <div className="logo-bar">
          <img
            style={{marginRight: "5px", height:"50", marginTop: "5px", marginBottom: "5px"}}
            src={tmdbLogo}>
          </img>
        </div>
      </div>
    );
  }
});

module.exports = MovieRecommender;
