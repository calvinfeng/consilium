'use strict';

// Copyright 2017 Consilium
// Author(s): Calvin Feng

import React                         from 'react';
import { hashHistory }               from 'react-router';
import { Nav, NavItem, NavDropdown } from 'react-bootstrap';
import { MenuItem, Button }          from 'react-bootstrap';

class Navigation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeKey: 1
        };

        // TODO: Update to ES7 syntax
        this.handleSelectTab = this.handleSelectTab.bind(this);
    }

    handleSelectTab(selectedKey) {
        this.setState({ activeKey: selectedKey });
        if (selectedKey === 1) {
            hashHistory.push("/");
        } else if (selectedKey === 2) {
            hashHistory.push("/about");
        }
    }

    render() {
        return (
            <div>
                <Nav bsStyle="tabs"
                    activeKey={this.state.activeKey}
                    onSelect={this.handleSelectTab}>
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

}

export default Navigation;
