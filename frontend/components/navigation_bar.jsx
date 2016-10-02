const React = require('react');
const hashHistory = require('react-router').hashHistory;
const Cookies = require('js-cookie');
const Nav = require('react-bootstrap').Nav;
const NavItem = require('react-bootstrap').NavItem;
const NavDropdown = require('react-bootstrap').NavDropdown;
const MenuItem = require('react-bootstrap').MenuItem;
const Button = require('react-bootstrap').Button;

const NavigationBar = React.createClass({

  getInitialState: function() {
    return {activeKey: 1};
  },

  tabSelect: function(selectedKey) {
    this.setState({activeKey: selectedKey});
    if (selectedKey === 1) {
      hashHistory.push("/");
    } else if (selectedKey === 2) {
      hashHistory.push("/about");
    }
  },

  menuClickHandle: function(selectedKey) {
  },

  deleteCookies: function() {
    Cookies.set("consilium, {}");
    // set cookies to empty first in case the user never rated any movies
    // but decide to clear their cookies anyway.
    Cookies.remove("consilium");
  },

  render: function() {
    return (
      <div>
        <Nav bsStyle="tabs" activeKey={this.state.activeKey} onSelect={this.tabSelect}>
          <NavItem eventKey={1}>Movie Recommender</NavItem>
          <NavItem eventKey={2}>About</NavItem>
          <NavDropdown eventKey={3} id="nav-dropdown" title="Our Team">
            <MenuItem href="https://www.linkedin.com/in/calvin-feng">
              <i className="fa fa-linkedin-square" aria-hidden="true"></i>
                &nbsp;Calvin Feng
            </MenuItem>
            <MenuItem href="https://www.linkedin.com/in/steven-cheong-55404bbb">
              <i className="fa fa-linkedin-square" aria-hidden="true"></i>
                &nbsp;Steven Cheong
            </MenuItem>
            <MenuItem href="https://www.linkedin.com/in/veronica-chau">
              <i className="fa fa-linkedin-square" aria-hidden="true"></i>
                &nbsp;Veronica Chau
            </MenuItem>
          </NavDropdown>
        </Nav>
      </div>
    );
  }
});

module.exports = NavigationBar;
