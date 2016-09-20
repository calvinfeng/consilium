const React = require('react');
const MovieItem = require('./movie_item');
const MovieStore = require('../stores/movie_store');
const MovieActions = require('../actions/movie_actions');

const MovieIndex = React.createClass({
  getInitialState(){
    return { popularMovies: [] };
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
      popularMovies: MovieStore.popularMovies()
    });
  },
  getMovies() {
    let movies = [
      {id: 1, title: "Toy Story"},
      {id: 2, title: "Inception"},
      {id: 3, title: "Shutter Island"},
      {id: 4, title: "Interstellar"},
      {id: 5, title: "Fight Club"}
    ];
    return movies.map(function(movie) {
      return <MovieItem key={movie.id} title={movie.title} movieId={movie.id}/>;
    });
  },

  render() {
    return <div className="movie-index">{this.getMovies()}</div>;
  }



});

module.exports = MovieIndex;
