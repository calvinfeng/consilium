'use strict';

// Copyright 2017 Consilium
// Author(s): Calvin Feng

import React                       from 'react';
import { connect }                 from 'react-redux';

import { trainingMoviesFetch }     from '../actions/movies';

class RecommenderContainer extends React.Component {

    componentDidMount() {
        this.props.dispatchTrainingMoviesFetch();
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.trainingMovies);
    }

    render() {
        return <h1>Hello World, this is Recommender</h1>;
    }

}

const mapReduxStateToProps = (state) => {
    return {
        trainingMovies: state.trainingMovies
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchTrainingMoviesFetch: () => dispatch(trainingMoviesFetch())
    };
};

export default connect(mapReduxStateToProps, mapDispatchToProps)(RecommenderContainer);
