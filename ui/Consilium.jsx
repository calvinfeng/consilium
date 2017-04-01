'use strict';

// Copyright 2017 Consilium
// Author(s): Calvin Feng

// Thirdparty imports
import React                                      from 'react';
import ReactDOM                                   from 'react-dom';
import thunk                                      from 'redux-thunk';
import { Provider }                               from 'react-redux';
import { createStore, applyMiddleware }           from 'redux';
import { IndexRoute, hashHistory, Router, Route } from 'react-router';

// Consilium imports
import Recommender                      from './containers/Recommender';
import About                            from './components/About';
import Navigation                       from './components/Navigation';

// Root reducer
import Reducer                          from './reducers/index';

class Consilium extends React.Component {
    render() {
        return (
            <div>
                <Navigation />
                {this.props.children}
            </div>
        );
    }
}

Consilium.propTypes = {
    children: React.PropTypes.object.isRequired
};

const reduxStore = createStore(Reducer, applyMiddleware(thunk));

const Routes = (
    <Provider store={reduxStore}>
        <Router history={hashHistory}>
            <Route path="/" component={Consilium}>
                <IndexRoute component={Recommender} />
                <Route path="/about" component={About} />
            </Route>
        </Router>
    </Provider>
);

/* global document */
document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(Routes, document.getElementById('application'));
});
