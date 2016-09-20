const React = require('react');
const MovieItem = require('./movie_item');
const MovieStore = require('../stores/movie_store');
const MovieActions = require('../actions/movie_actions');

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
    this.setState({
      popularMovies: MovieStore.popularMovies(),
      firstTenMovies: MovieStore.tenMovies()
    });
  },
  getMovies() {
    let movies = this.state.firstTenMovies;
    return movies.map(function(movie) {
      return <MovieItem key={movie.id} title={movie.title} movieId={movie.id}/>;
    });
  },
  render() {
    return <div className="movie-index">{this.getMovies()}</div>;
  }



});

module.exports = MovieIndex;
