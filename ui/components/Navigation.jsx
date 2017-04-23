'use strict';

/**
 * @copyright Consilium, 2017
 * @author Calvin Feng
 */

import React                         from 'react';
import { hashHistory }               from 'react-router';
import { Nav }                       from 'react-bootstrap';
import { NavItem }                   from 'react-bootstrap';
import { NavDropdown }               from 'react-bootstrap';
import { Navbar }                    from 'react-bootstrap';
import { MenuItem }                  from 'react-bootstrap';
import { Button }                    from 'react-bootstrap';


class Navigation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeKey: 1
        };

        this.handleSelectTab = this.handleSelectTab.bind(this);
    }

    handleSelectTab(selectedKey) {
        this.setState({ activeKey: selectedKey });
        if (selectedKey === 1) {
            hashHistory.push('/');
        } else if (selectedKey === 2) {
            hashHistory.push('/about');
        }
    }

    /*
    <NavDropdown eventKey={3} title="Menu" id="basic-nav-dropdown">
        <MenuItem eventKey={3.1}>Do</MenuItem>
        <MenuItem eventKey={3.2}>Something</MenuItem>
        <MenuItem eventKey={3.3}>Here</MenuItem>
        <MenuItem divider />
        <MenuItem eventKey={3.4}>Separated link</MenuItem>
    </NavDropdown>
    */

    render() {
        return (
            <div className="navigation">
                <Navbar inverse collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="/#">Consilium</a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav pullRight>
                            <NavItem eventKey={1} href="#/about">Recommendations</NavItem>
                            <NavItem eventKey={2} href="https://calvinfeng.github.io/recommender.html">About</NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }

}

export default Navigation;
