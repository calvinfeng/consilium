const React = require('react');
const MovieItem = require('./movie_item');
const PosterSlider = require('./poster_slider');
const MovieStore = require('../stores/movie_store');
const MovieRatingStore = require('../stores/movie_rating_store');
const MovieActions = require('../actions/movie_actions');

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
    return { gaugeMovies: {}, ratingCount: 0};
  },

  componentDidMount(){
    this.movieStoreListener = MovieStore.addListener(this.gaugeOnChange);
    this.movieRatingStoreListener = MovieRatingStore.addListener(this.updateGaugeSet);
    MovieActions.fetchPopularMovies();
  },

  componentWillUnmount(){
    this.movieStoreListener.remove();
    this.movieRatingStoreListener.remove();
  },

  gaugeOnChange(){
    let gaugeMovies = this.state.gaugeMovies;
    Object.keys(gaugeMovies).forEach(function(movieId) {
      if (MovieStore.isMovieSkipped(movieId) && gaugeMovies[movieId]) {
        delete gaugeMovies[movieId];
      }
    });

    let popularMovies = MovieStore.getPopularMovies().shuffle();
    let i = 0;
    //MovieRatingStore.getNumberOfRated()
    while (Object.keys(gaugeMovies).length < 20 ) {
      let movieId = popularMovies[i].id;
      if (gaugeMovies[movieId] === undefined && !MovieStore.isMovieSkipped(movieId)
        && popularMovies[i].year >= 1990 && !MovieRatingStore.hasRated(movieId)) {
        gaugeMovies[movieId] = popularMovies[i];
      }
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
    this.setState({gaugeMovies: gaugeMovies, ratingCount: MovieRatingStore.getNumberOfRated()});
  },

  renderGaugeSet() {
    let movies = this.state.gaugeMovies;
    return Object.keys(movies).sort().map((movieId) => {
      let movie = movies[movieId];
      return (
        <MovieItem
          key={movie.id}
          movieId={movie.id}
          imdbId={movie.imdbId}/>
      );
    });
  },

  renderDescription() {
    let description = `These are some movies we think you have seen before.
      If you have seen them, whether you like or dislike them, let us know and give
      them ratings! If not, click the skip button and we will give you more choices.
      It will help our backend machine learning algorithm to learn your taste and preference`;
    if (this.state.ratingCount === 0) {
      return (
        <div>
          <p>{description}</p>
          <h4>As soon as 10 movies are rated, the recommender system will get to work!</h4>
        </div>
      );
    } else {
      return (
        <div>
          <p>{description}</p>
          <h4>Rate <strong>{10 - this.state.ratingCount}</strong> more movies</h4>
        </div>
      );
    }
  },

  render() {
    return (
      <div>
        <PosterSlider movies={this.state.gaugeMovies}/>
        <h1>Popular Movies</h1>
        {this.renderDescription()}
        <div className="gauge-index">{this.renderGaugeSet()}</div>
      </div>
    );
  }
});

module.exports = GaugeIndex;
