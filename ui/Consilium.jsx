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
import RecommenderContainer             from './components/RecommenderContainer';
import About                            from './components/About';
import NavigationBar                    from './components/NavigationBar';

import Reducer                          from './reducers/index'; // This is the root reducer

class Consilium extends React.Component {
    render() {
        return (
            <div>
                <NavigationBar />
                {this.props.children}
            </div>
        );
    }
}

const reduxStore = createStore(Reducer, applyMiddleware(thunk));

const Routes = (
    <Provider store={reduxStore}>
        <Router history={hashHistory}>
            <Route path="/" component={Consilium}>
                <IndexRoute component={RecommenderContainer}/>
                <Route path="/about" component={About} />
            </Route>
        </Router>
    </Provider>
);

document.addEventListener("DOMContentLoaded", function(){
  ReactDOM.render(Routes, document.getElementById("application"));
});
