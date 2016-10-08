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

const Tooltip = require('react-bootstrap').Tooltip;
const OverlayTrigger = require('react-bootstrap').OverlayTrigger;

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
  },

  componentWillUnmount(){
    this.movieRatingListener.remove();
    this.movieStoreListener.remove();
  },

  moviesOnChange() {
    this.replenlishRecommendations();
    this.checkState();
  },

  ratingsOnChange() {
    this.saveToCookie(MovieRatingStore.getRatings());
    this.replenlishRecommendations();
    this.checkState();
  },

  checkState() {
    let movieRatings = MovieRatingStore.getRatings();
    if (Object.keys(movieRatings).length < 10) {
      this.setState({isRecommending: false});
    } else if (Object.keys(movieRatings).length >= 10 && MovieStore.remainingRecommendationCount() !== 0) {
      this.setState({isRecommending: true});
    }
  },

  replenlishRecommendations() {
    let movieRatings = MovieRatingStore.getRatings();
    if (MovieStore.remainingRecommendationCount() < 10 && Object.keys(movieRatings).length >= 10) {
      let notInterested = MovieStore.getNotInterestedMovies();
      MovieActions.fetchRecommendedMovies(movieRatings, notInterested);
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
    let movieToolTip = <Tooltip id="tooltip">Movie posters and trailers provided by TMDb</Tooltip>;
    return (
      <div style={{width: '100%'}}>
        {this.renderIndexes()}
        <OverlayTrigger placement="top" overlay={movieToolTip}>
          <div className="logo-bar">
            <img
              id="tmdb-logo"
              style={{marginRight: "5px", height:"0", width: "126"}}
              src={tmdbLogo}>
            </img>
          </div>
        </OverlayTrigger>
      </div>
    );
  }
});

module.exports = MovieRecommender;
