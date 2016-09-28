const React = require('react');
const MovieItem = require('./movie_item');
const MovieStore = require('../stores/movie_store');
const MovieRatingStore = require('../stores/movie_rating_store');
const MovieActions = require('../actions/movie_actions');
const MovieInfoActions = require('../actions/movie_info_actions');

Array.prototype.shuffle = function() {
  let i = this.length, j, temp;
  if ( i === 0 ) {
    return this;
  }
  while ( --i ) {
     j = Math.floor( Math.random() * ( i + 1 ) );
     temp = this[i];
     this[i] = this[j];
     this[j] = temp;
  }
  return this;
};

const GaugeIndex = React.createClass({

  getInitialState(){
    return { gaugeMovies: {} };
  },

  componentDidMount(){
    this.movieStoreListener = MovieStore.addListener(this.receiveGaugeSet);
    this.movieRatingStoreListener = MovieRatingStore.addListener(this.updateGaugeSet);
    MovieActions.fetchPopularMovies();
  },

  componentWillUnmount(){
    this.movieStoreListener.remove();
  },

  // It is unnecessary for the Index to hold 700ish movies because that's what the store is for.
  receiveGaugeSet(){
    // Once we know that movies are in store, we will then randomly select 10
    let popularMovies = MovieStore.getPopularMovies().shuffle();
    let gaugeMovies = this.state.gaugeMovies;
    let i = 0;
    while (Object.keys(gaugeMovies).length < 10) {
      let movieId = popularMovies[i].id;
      gaugeMovies[movieId] = popularMovies[i];
      i += 1;
    }
    this.setState({gaugeMovies: gaugeMovies});
  },

  updateGaugeSet() {
    let gaugeMovies = this.state.gaugeMovies;
    Object.keys(gaugeMovies).forEach((movieId) => {
      if (MovieRatingStore.hasRated(movieId)) {
        delete gaugeMovies[movieId];
      }
    });
    this.setState({gaugeMovies: gaugeMovies});
  },

  //  Re-named to getGaugeSet() -> It implies this set of movies is for measurement
  //  The idea is that as we improve our algorithm, we probably won't even need 10
  renderGaugeSet() {
    let movies = this.state.gaugeMovies;
    return Object.keys(movies).map((movieId) => {
      let movie = movies[movieId];
      return (
        <MovieItem
          key={movie.id}
          movieId={movie.id}
          imdbId={movie.imdbId}/>
      );
    });
  },

  render() {
    return (
      <div>
        <div className="movie-index">{this.renderGaugeSet()}</div>
      </div>
    );
  }
});

module.exports = GaugeIndex;
