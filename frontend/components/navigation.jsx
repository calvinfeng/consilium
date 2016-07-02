const React = require('react');
const hashHistory = require('react-router').hashHistory;
const Nav = require('react-bootstrap').Nav;
const NavItem = require('react-bootstrap').NavItem;
const NavDropdown = require('react-bootstrap').NavDropdown;
const MenuItem = require('react-bootstrap').MenuItem;

const Navigation = React.createClass({

  getInitialState: function() {
    return {activeKey: 1};
  },

  handleSelect: function(selectedKey) {
    this.setState({activeKey: selectedKey});
    if (selectedKey === 1) {
      hashHistory.push("/");
    }
  },

  redirectToProfile: function(event) {
    event.preventDefault();
    hashHistory.push("/profile");
  },

  redirectToHome: function(event) {
    event.preventDefault();
    hashHistory.push("/home");
  },

  render: function() {
    return (
      <div>
        <Nav bsStyle="tabs" activeKey={this.state.activeKey} onSelect={this.handleSelect}>
          <NavItem eventKey={1}>Regression</NavItem>
          <NavItem eventKey={2}>Placeholder</NavItem>
          <NavItem eventKey={3}>Placeholder</NavItem>
          <NavDropdown eventKey={4} title="Menu" id="nav-dropdown">
            <MenuItem eventKey={4.1} onClick={this.redirectToHome}>Home</MenuItem>
            <MenuItem eventKey={4.2} onClick={this.redirectToProfile}>Profile</MenuItem>
            <MenuItem eventKey={4.3}>Exit</MenuItem>
          </NavDropdown>
        </Nav>
      </div>
    );
  }
});

module.exports = Navigation;
