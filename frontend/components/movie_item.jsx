const React = require('react');
const Loader = require('react-loader');
const FormGroup = require('react-bootstrap').FormGroup;
const FormControl = require('react-bootstrap').FormControl;
const ControlLabel = require('react-bootstrap').ControlLabel;
const HelpBlock = require('react-bootstrap').HelpBlock;


const MovieInfoStore = require('../stores/movie_info_store');
const MovieInfoActions = require('../actions/movie_info_action');
// Please use Open Movie Database for movie information
// Or if you prefer, use the node package IMDb-API because IMBd doens't provide
// a well-documented API
const MovieItem = React.createClass({

  getInitialState() {
    return {
      ratingValue: "",
      movieInfo: {},
    };
  },

  componentDidMount() {
    console.log(this.props);
    this.movieInfoListener = MovieInfoStore.addListener(this.receiveMovieInfo);
    MovieInfoActions.fetchMovieInfo(this.props.imdbId);
  },

  componentWillUnmount() {
    this.movieInfoListener.remove();
  },

  receiveMovieInfo(){
    this.setState({ movieInfo: MovieInfoStore.getMovieInfo(this.props.imdbId)});
  },

  handleChange(e) {
    this.setState({ ratingValue: e.target.value });
  },

  getValidationState() {
    const length = this.state.ratingValue.length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
  },

  render() {
    let currentMovie = this.state.movieInfo;
    return (
      <div className="movie-item">
        <h3>{currentMovie.Title}</h3>
        <div>Plot outline: {currentMovie.Plot}</div>
        <img src={currentMovie.Poster}/>
        <form>
          <FormGroup
            controlId="formBasicText"
            validationState={this.getValidationState()}
            >
            <ControlLabel>Name</ControlLabel>
            <FormControl type="text" value={this.state.ratingValue} placeholder="Enter Rating"
              onChange={this.handleChange}/>
            <FormControl.Feedback />
            <HelpBlock>Validation is based on string length</HelpBlock>
          </FormGroup>
        </form>
      </div>
    );
  }

});

module.exports = MovieItem;
