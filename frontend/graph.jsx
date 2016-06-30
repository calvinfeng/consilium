const React = require('react');

const Graph = React.createClass({
  
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  handleClick: function(event) {
    event.preventDefault();
    this.context.router.replace("/");
  },

  render: function() {
    return (
      <div>
        <h1>Graph</h1>
        <button onClick={this.handleClick}>Home</button>
      </div>
    );
  }
});

module.exports = Graph;
