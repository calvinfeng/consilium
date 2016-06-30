const React = require('react');
const hashHistory = require('react-router').hashHistory;
const Nav = require('react-bootstrap').Nav;
const NavItem = require('react-bootstrap').NavItem;

const HomeContent = React.createClass({
  getInitialState: function() {
    return {activeKey: 1};
  },

  handleSelect: function(selectedKey) {
    this.setState({activeKey: selectedKey});
  },

  handleClick: function(event) {
    event.preventDefault();
    hashHistory.push("/graph");
  },

  render: function() {
    return (
      <div>
        <Nav bsStyle="tabs" activeKey={this.state.activeKey} onSelect={this.handleSelect}>
          <NavItem eventKey={1}>Home</NavItem>
          <NavItem eventKey={2}>Graph</NavItem>
          <NavItem eventKey={3}>Login</NavItem>
        </Nav>
        <h1>Home</h1>
        <div>
          <button onClick={this.handleClick}>Graph</button>
        </div>
      </div>
    );
  }

});

module.exports = HomeContent;
