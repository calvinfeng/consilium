const React = require('react');
const Loader = require('react-loader');
const FormGroup = require('react-bootstrap').FormGroup;
const FormControl = require('react-bootstrap').FormControl;
const ControlLabel = require('react-bootstrap').ControlLabel;
const HelpBlock = require('react-bootstrap').HelpBlock;

// Please use Open Movie Database for movie information
// Or if you prefer, use the node package IMDb-API because IMBd doens't provide
// a well-documented API
const MovieItem = React.createClass({

  getInitialState() {
    return {
      ratingValue: "",
      description: "This is a movie about someone did something and something bad happened...",
      imageURL: "http://ia.media-imdb.com/images/M/MV5BMTk2NTI1MTU4N15BMl5BanBnXkFtZTcwODg0OTY0Nw@@._V1_SX300.jpg"
    };
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
    return (
      <div className="movie-item">
        <h3>{this.props.title}</h3>
        <div>Plot outline: {this.state.description}</div>
        <img src={this.state.imageURL}/>
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
