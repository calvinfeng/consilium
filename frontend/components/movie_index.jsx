const React = require('react');
const MovieItem = require('./movie_item');
const MovieStore = require('../stores/movie_store');
const MovieActions = require('../actions/movie_actions');
const MovieInfoActions = require('../actions/movie_info_action');

const MovieIndex = React.createClass({
  getInitialState(){
    return { popularMovies: [], firstTenMovies: [] };
  },
  componentDidMount(){
    this.movieListener = MovieStore.addListener(this.getPopularMovies);
    MovieActions.fetchPopularMovies();
  },

  componentWillUnmount(){
    this.movieListener.remove();
  },

  getPopularMovies(){
    if (this.state.firstTenMovies.length < 10) {
      this.setState({
        popularMovies: MovieStore.popularMovies(),
        firstTenMovies: MovieStore.tenMovies()
      });
    } else {
      this.setState({
        popularMovies: MovieStore.popularMovies()
      });
    }
  },

  convertMovieToImdb(imdbId){
    MovieActions.fetchMovieInfo(imdbId);
    MovieStore.movieInfo(imdbId);
  },

  getMoviesToRate() {
    let movies = this.state.firstTenMovies;
    // movieInfos = store.movie information
    // check length
    let movieInfo;
    if (movies.length === 10) {
      return movies.map(function(movie) {
        return (
        <MovieItem
        key={movie.id}
        movieId={movie.id}
        imdbId={movie.imdbId}/>
      );
      });
    } else {
      return "";
    }
  },
  render() {
    return <div className="movie-index">{this.getMoviesToRate()}</div>;
  }



});

module.exports = MovieIndex;
