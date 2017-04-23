'use strict';

// Copyright 2017 Consilium
// Author(s): Calvin Feng

// Thirdparty imports
import React                                      from 'react';
import ReactDOM                                   from 'react-dom';
import { Provider }                               from 'react-redux';
import { IndexRoute, hashHistory, Router, Route } from 'react-router';
import { createStore, applyMiddleware }           from 'redux';
import thunk                                      from 'redux-thunk';

// Consilium imports
import RecommenderPage  from './containers/RecommenderPage';
import LandingPage      from './containers/LandingPage';
import About            from './components/About';
import Navigation       from './components/Navigation';

// Root reducer
import Reducer                          from './reducers/index';

const Consilium = (props) => {
    return (
        <div className="consilium">
            <Navigation />
            {props.children}
        </div>
    );
};

Consilium.propTypes = {
    children: React.PropTypes.object.isRequired
};

const reduxStore = createStore(Reducer, applyMiddleware(thunk));

const Routes = (
    <Provider store={reduxStore}>
        <Router history={hashHistory}>
            <Route path="/" component={Consilium}>
                <IndexRoute component={LandingPage} />
                <Route path="/recommendations" component={RecommenderPage} />
                <Route path="/about" component={About} />
            </Route>
        </Router>
    </Provider>
);

/* global document */
document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(Routes, document.getElementById('application'));
});
