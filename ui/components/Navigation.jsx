'use strict';

// Copyright 2017 Consilium
// Author(s): Calvin Feng

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
                            <NavItem eventKey={1} href="https://calvinfeng.github.io/recommender.html">About</NavItem>
                            <NavDropdown eventKey={2} title="Menu" id="basic-nav-dropdown">
                                <MenuItem eventKey={2.1}>Do</MenuItem>
                                <MenuItem eventKey={2.2}>Something</MenuItem>
                                <MenuItem eventKey={2.3}>Here</MenuItem>
                                <MenuItem divider />
                                <MenuItem eventKey={2.4}>Separated link</MenuItem>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }

}

export default Navigation;
