const React = require('react');
const Loader = require('react-loader');
const Rating = require('react-rating');
const MovieInfoStore = require('../stores/movie_info_store');
const MovieInfoActions = require('../actions/movie_info_actions');
const MovieRatingActions = require('../actions/movie_rating_actions');
const Button = require('react-bootstrap').Button;

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
        Year: "....",
        Plot: "Loading...",
        Poster: "https://cdn.mirs.com/images/tranzit/loading.gif"
      }
    };
  },

  componentDidMount() {
    this.movieInfoListener = MovieInfoStore.addListener(this.receiveMovieInfo);
    if (MovieInfoStore.getMovieInfo(this.props.imdbId) === undefined) {
      MovieInfoActions.fetchMovieInfo(this.props.imdbId);
    } else {
      let tmdbInfo = MovieInfoStore.getMovieInfo(this.props.imdbId);
      this.setInfo(tmdbInfo);
    }
  },

  componentWillUnmount() {
    this.movieInfoListener.remove();
  },

  // let omdbInfo = MovieInfoStore.getMovieInfo(this.props.imdbId);
  // if (omdbInfo.Poster === undefined || omdbInfo.Poster === "N/A") {
  //   omdbInfo.Poster = "https://upload.wikimedia.org/wikipedia/en/d/dc/Academy_Award_trophy.jpg";
  // }
  receiveMovieInfo() {
    if (MovieInfoStore.getMovieInfo(this.props.imdbId)) {
      let tmdbInfo = MovieInfoStore.getMovieInfo(this.props.imdbId);
      this.setInfo(tmdbInfo);
    }
  },

  setInfo(tmdbInfo) {
    let movieInfo = this.state.info;
    movieInfo.Title = tmdbInfo.title;
    movieInfo.Year = tmdbInfo.release_date.slice(0, 4);
    movieInfo.Poster = "https://image.tmdb.org/t/p/w300" + tmdbInfo.poster_path;
    movieInfo.Plot = tmdbInfo.overview;
    this.setState({info: movieInfo});
  },

  rateClickHandler(rating) {
    MovieRatingActions.submitRatingToStore({
      movieId: this.props.movieId,
      rating: rating
    });
  },

  skipClickHandler() {
    MovieActions.skipMovie(this.props.movieId);
  },

  notInterestedHandler() {
    MovieActions.markNotInterested(this.props.movieId);
  },

  renderInterface() {
    if (this.props.rated) {
      return (
        <div className="user-rating">
          <div>Your Rating: {this.props.rating}</div>
        </div>
      );
    } else if (this.props.recommended) {
      return (
        <div>
          <div className="movie-plot">{this.state.info.Plot}</div>
          <div className="movie-rating">
            <div style={{width: "100%"}}>
              <div className="rating-toolbar">
                <Rating
                  fractions={2}
                  onClick={this.rateClickHandler}
                  empty={'fa fa-star-o fa-3x'}
                  full={"fa fa-star fa-3x"}
                  color={"yellow"}
                  />
              </div>
              <div className="button-container">
                <Button
                  bsSize="xsmall"
                  className="react-buttons"
                  onClick={this.notInterestedHandler}
                  bsStyle="primary">
                  Not Interested
                </Button>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="movie-plot">{this.state.info.Plot}</div>
          <div className="rating-toolbar">
            <Rating
              fractions={2}
              onClick={this.rateClickHandler}
              empty={'fa fa-star-o fa-3x'}
              full={"fa fa-star fa-3x"}
              color={"yellow"}
              />
            <Button
              className="react-buttons"
              onClick={this.skipClickHandler}
              bsStyle="danger">
              Skip
            </Button>
          </div>
        </div>);
      }
    },

    render() {
      return (
        <div className="movie-item">
          <h3 className="movie-title">
            <strong>{this.state.info.Title}</strong>
            ({this.state.info.Year})
          </h3>
          <div className="movie-poster">
            <img src={this.state.info.Poster}/>
          </div>
          {this.renderInterface()}
        </div>
      );
    }

  });

  module.exports = MovieItem;
