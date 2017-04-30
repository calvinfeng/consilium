'use strict';

/**
* @copyright Consilium, 2017
* @author Calvin Feng
*/

import React           from 'react';
import { connect }     from 'react-redux';
import { hashHistory } from 'react-router';
import { Nav }         from 'react-bootstrap';
import { NavItem }     from 'react-bootstrap';
import { Navbar }      from 'react-bootstrap';

import Indicator       from '../components/Indicator';


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
                            <NavItem eventKey={0} id="indicator">
                                <Indicator
                                    isFetching={this.props.userPreference.isFetching} />
                            </NavItem>
                            <NavItem eventKey={1}>Recommendations</NavItem>
                            <NavItem eventKey={2}>About</NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

Navigation.propTypes = {
    userPreference: React.PropTypes.object.isRequired,
};


const mapReduxStateToProps = (state) => {
    return {
        userPreference: state.userPreference
    };
};

const mapDispatchToProps = () => {
    return {};
};

export default connect(mapReduxStateToProps, mapDispatchToProps)(Navigation);
