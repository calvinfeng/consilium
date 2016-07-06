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
    } else if (selectedKey === 2) {
      hashHistory.push("/emotion");
    } else if (selectedKey === 3) {
      hashHistory.push("/profile");
    }
  },

  render: function() {
    return (
      <div>
        <Nav bsStyle="tabs" activeKey={this.state.activeKey} onSelect={this.handleSelect}>
          <NavItem eventKey={1}>Regression</NavItem>
          <NavItem eventKey={2}>Emotion Detection</NavItem>
          <NavItem eventKey={3}>Profile</NavItem>
          <NavDropdown eventKey={4} title="Menu" id="nav-dropdown">
            <MenuItem eventKey={4.1}>Menu Item 1</MenuItem>
            <MenuItem eventKey={4.2}>Menu Item 2</MenuItem>
            <MenuItem eventKey={4.3}>Menu Item 3</MenuItem>
          </NavDropdown>
        </Nav>
      </div>
    );
  }
});

module.exports = Navigation;
