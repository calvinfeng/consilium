const React = require('react');
const ReactDOM = require('react-dom');
const Router = require('react-router').Router;
const Route = require('react-router').Route;
const IndexRoute = require('react-router').IndexRoute;
const hashHistory = require('react-router').hashHistory;

const HomeContent = require('./home_content');
const Graph = require('./graph');

const Consilium = React.createClass({
  render: function() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
});

const routes = (
  <Router history={hashHistory}>
    <Route path="/" component={Consilium}>
      <IndexRoute component={HomeContent}/>
      <Route path="/graph" component={Graph}/>
    </Route>
  </Router>
);

document.addEventListener("DOMContentLoaded", function(){
  ReactDOM.render(routes, document.getElementById("application"));
});