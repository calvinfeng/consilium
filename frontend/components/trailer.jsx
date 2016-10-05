const React = require('react');
const TrailerStore = require('../stores/trailer_store');
const ReactPlayer = require('react-player');
const Loader = require('react-loader');

const Trailer = React.createClass({

  getInitialState() {
    return {trailerSrc: undefined, videoFound: false};
  },

  componentDidMount() {
    this.trailerStoreListener = TrailerStore.addListener(this.__onChange);
  },

  __onChange() {
    let src = TrailerStore.getTrailerByIncrement();
    if (src === undefined) {
      this.setState({trailerSrc: src, videoFound: false});
    } else {
      this.setState({trailerSrc: src, videoFound: true});
    }
  },

  render() {
    if (this.state.videoFound) {
      return (
        <ReactPlayer
          width="100%"
          height={$(window).height()*0.50}
          onEnded={this.__onChange}
          url={this.state.trailerSrc}
          playing={true}/>
      );
    } else {
      return (
        <div></div>
      );
    }
  }

});

module.exports = Trailer;
