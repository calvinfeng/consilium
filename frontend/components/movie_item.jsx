const React = require('react');
const Loader = require('react-loader');
const Rating = require('react-rating');
const MovieInfoStore = require('../stores/movie_info_store');
const MovieInfoActions = require('../actions/movie_info_actions');
const MovieRatingActions = require('../actions/movie_rating_actions');
const TrailerActions = require('../actions/trailer_actions');
const MovieActions = require('../actions/movie_actions');
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
      },
      infoReceived: false
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
    if (this.props.recommended && !this.state.infoReceived) {
      //Only fetch when info is first time received
      TrailerActions.fetchMovieTrailer(this.props.imdbId);
    }
    this.setState({info: movieInfo, infoReceived: true});
  },

  rateClickHandler(rating) {
    MovieRatingActions.submitRatingToStore({
      movieId: this.props.movieId,
      rating: rating
    });
  },

  notInterestedHandler() {
    MovieActions.markNotInterested(this.props.movieId);
  },

  renderInterface() {
    if (this.props.rated) {
      return (
        <div>
          <div className="movie-poster">
            <img src={this.state.info.Poster}/>
          </div>
          <div className="user-rating">
            <div>Your Rating: <strong>{this.props.rating}</strong></div>
          </div>
        </div>
      );
    } else if (this.props.recommended) {
      return (
        <div>
          <div className="movie-poster">
            <img src={this.state.info.Poster}/>
          </div>
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
          <div className="movie-poster">
            <img src={this.state.info.Poster}/>
          </div>
          <div className="movie-plot">{this.state.info.Plot}</div>
          <div className="rating-toolbar">
            <Rating
              fractions={2}
              onClick={this.rateClickHandler}
              empty={'fa fa-star-o fa-3x'}
              full={"fa fa-star fa-3x"}
              color={"yellow"}
              />
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
          {this.renderInterface()}
        </div>
      );
    }

  });

  module.exports = MovieItem;
