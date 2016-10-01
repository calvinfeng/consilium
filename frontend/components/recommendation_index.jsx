const React = require('react');
const Loader = require('react-loader');
const MovieItem = require('./movie_item');
const MovieStore = require('../stores/movie_store');
const MovieRatingStore = require('../stores/movie_rating_store');
const MovieActions = require('../actions/movie_actions');
const MovieInfoActions = require('../actions/movie_info_actions');

const RecommendationIndex = React.createClass({

  getInitialState() {
    return {recommendationOnDisplay: {}, loaded: false};
  },

  componentDidMount() {
    this.movieStoreListener = MovieStore.addListener(this.recommendationsOnChange);
    this.movieRatingStoreListener = MovieRatingStore.addListener(this.updateRecommendationSet);
  },

  componentWillUnmount() {
    this.movieStoreListener.remove();
    this.movieRatingStoreListener.remove();
  },

  updateRecommendationSet() {
    if (MovieStore.remainingRecommendationCount() >= 5) {
      let recommendedMovies = MovieStore.getRecommendedMovies();
      let ids = Object.keys(recommendedMovies).sort();
      let i = 0, items = {};
      while (Object.keys(items).length < 5) {
        if (!MovieStore.notInterested(ids[i]) && !MovieRatingStore.hasRated(ids[i])) {
          items[ids[i]] = recommendedMovies[ids[i]];
        }
        i += 1;
      }
      this.setState({recommendationOnDisplay: items});
    }
  },

  recommendationsOnChange() {
    if (MovieStore.remainingRecommendationCount() >= 5) {
      let recommendedMovies = MovieStore.getRecommendedMovies();
      let ids = Object.keys(recommendedMovies).sort();
      let i = 0, items = {};
      while (Object.keys(items).length < 5) {
        if (!MovieStore.notInterested(ids[i]) && !MovieRatingStore.hasRated(ids[i])) {
          items[ids[i]] = recommendedMovies[ids[i]];
        }
        i += 1;
      }
      this.setState({recommendationOnDisplay: items, loaded: true});
    }
  },

  renderRecommendations() {
    let displayItems = this.state.recommendationOnDisplay;
    return Object.keys(displayItems).map((movieId) => {
      let movie = displayItems[movieId];
      return (
        <MovieItem
          key={movie.id}
          movieId={movie.id}
          imdbId={movie.imdbId}
          recommended={true}/>
      );
    });
  },

  render() {
    return (
      <div>
        <h1>Recommendations</h1>
        <Loader loaded={this.state.loaded}>
          <div className="movie-index">
            {this.renderRecommendations()}
          </div>
        </Loader>
      </div>
    );
  }
});

module.exports = RecommendationIndex;
