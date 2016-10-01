const React = require('react');
const MovieItem = require('./movie_item');
const MovieStore = require('../stores/movie_store');
const MovieRatingStore = require('../stores/movie_rating_store');
const MovieActions = require('../actions/movie_actions');
const MovieInfoActions = require('../actions/movie_info_actions');

const RecommendationIndex = React.createClass({

  componentDidMount() {
    this.movieStoreListener = MovieStore.addListener(this.recommendationsOnChange);
  },

  componentWillUnmount() {
    this.movieStoreListener.remove();
  },

  recommendationsOnChange() {
    let recommendedMovies = MovieStore.getRecommendedMovies();
    if (recommendedMovies.length > 5)  {
      this.forceUpdate();
    }
  },

  renderRecommendations() {
    let recommendedMovies = MovieStore.getRecommendedMovies();
    let ids = Object.keys(recommendedMovies);
    if (ids.length > 5) {
      let i = 0, recommendationItems = [];
      while (recommendationItems.length < 5) {
        if (!MovieStore.notInterested(ids[i]) && !MovieRatingStore.hasRated(ids[i])) {
          let movie = recommendedMovies[ids[i]];
          recommendationItems.push(
            <MovieItem
              key={movie.id}
              movieId={movie.id}
              imdbId={movie.imdbId}/>
          );
        }
        i += 1;
      }
      return recommendationItems;
    } else {
      return <div></div>;
    }
  },

  render() {
    return (
      <div>
        <h1>Recommendations</h1>
        <div className="movie-index">
          {this.renderRecommendations()}
        </div>
      </div>
    );
  }
});

module.exports = RecommendationIndex;
