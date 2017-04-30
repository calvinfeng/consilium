'use strict';

/**
 * @copyright Consilium, 2017
 * @author Calvin Feng
 */

import React                         from 'react';
import { hashHistory }               from 'react-router';
import { Nav }                       from 'react-bootstrap';
import { NavItem }                   from 'react-bootstrap';
import { Navbar }                    from 'react-bootstrap';


/* global window */
class Navigation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeKey: 1
        };

        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect(selectedKey) {
        this.setState({ activeKey: selectedKey });
        if (selectedKey === 1) {
            hashHistory.push('recommendations');
        } else if (selectedKey === 2) {
            window.open('https://calvinfeng.github.io/recommender.html');
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
                        <Nav pullRight onSelect={this.handleSelect}>
                            <NavItem eventKey={1}>Recommendations</NavItem>
                            <NavItem eventKey={2}>About</NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

export default Navigation;
