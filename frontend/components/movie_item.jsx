const React = require('react');
const Loader = require('react-loader');
const Rating = require('react-rating');
const MovieInfoStore = require('../stores/movie_info_store');
const MovieInfoActions = require('../actions/movie_info_actions');
const MovieRatingActions = require('../actions/movie_rating_actions');

//npm - https://github.com/dreyescat/react-rating
const ratingStyle = {
  color: "yellow",
  empty: 'fa fa-star-o fa-2x',
  full: 'fa fa-star fa-2x'
};

const MovieItem = React.createClass({

  getInitialState() {
    return {
      ratingValue: "",
      info: {
        Title: "Loading...",
        Plot: "Loading...",
        Poster: "http://cdn.mirs.com/images/tranzit/loading.gif"
      }
    };
  },

  componentDidMount() {
    this.movieInfoListener = MovieInfoStore.addListener(this.receiveMovieInfo);
    if (MovieInfoStore.getMovieInfo(this.props.imdbId) === undefined) {
      MovieInfoActions.fetchMovieInfo(this.props.imdbId);
    } else {
      let omdbInfo = MovieInfoStore.getMovieInfo(this.props.imdbId);
      this.setState({info: omdbInfo});
    }
  },

  componentWillUnmount() {
    this.movieInfoListener.remove();
  },

  receiveMovieInfo() {
    if (MovieInfoStore.getMovieInfo(this.props.imdbId)) {
      let omdbInfo = MovieInfoStore.getMovieInfo(this.props.imdbId);
      if (omdbInfo.Poster === undefined || omdbInfo.Poster === "N/A") {
        omdbInfo.Poster = "https://upload.wikimedia.org/wikipedia/en/d/dc/Academy_Award_trophy.jpg";
      }
      this.setState({info: omdbInfo});
    }
  },

  ratingClickHandler(rating) {
    MovieRatingActions.submitRatingToStore({
      movieId: this.props.movieId,
      rating: rating
    });
  },

  renderRating() {
    if (this.props.rated) {
      return (
        <div>{this.props.rating}</div>
      );
    } else {
      return (
        <Rating
          fractions={2}
          onClick={this.ratingClickHandler}
          empty={'fa fa-star-o fa-3x'}
          full={"fa fa-star fa-3x"}
          color={"yellow"}
          />
      );
    }
  },

  render() {
    return (
      <div className="movie-item">
        <h3 className="movie-title">{this.state.info.Title}({this.state.info.Year})</h3>
        <div className="movie-plot">{this.state.info.Plot}</div>
        <div className="movie-poster">
          <img src={this.state.info.Poster}/>
        </div>
        <div className="movie-rating">
          {this.renderRating()}
        </div>
      </div>
    );
  }

});

module.exports = MovieItem;
