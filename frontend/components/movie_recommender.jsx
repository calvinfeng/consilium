const React = require('react');
const Loader = require('react-loader');
const MovieIndex = require('./movie_index');

const MovieRecommender = React.createClass({

  render() {
    return <MovieIndex/>;
  }

});

module.exports = MovieRecommender;
