const React = require('react');
const ReactDOM = require('react-dom');
const Router = require('react-router').Router;
const Route = require('react-router').Route;
const IndexRoute = require('react-router').IndexRoute;
const hashHistory = require('react-router').hashHistory;

const HomeContent = require('./components/home_content');
const Profile = require('./components/profile');
const Navigation = require('./components/navigation');
const Graph = require('./components/graph');

const Consilium = React.createClass({
  render: function() {
    return (
      <div>
        <Navigation/>
        {this.props.children}
      </div>
    );
  }
});

const routes = (
  <Router history={hashHistory}>
    <Route path="/" component={Consilium}>
      <IndexRoute component={Graph}/>
      <Route path="/profile" component={Profile}/>
      <Route path="/home" component={HomeContent}/>
    </Route>
  </Router>
);

document.addEventListener("DOMContentLoaded", function(){
  ReactDOM.render(routes, document.getElementById("application"));
});
