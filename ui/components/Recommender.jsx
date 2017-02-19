'use strict';

// Copyright 2017 Consilium
// Author(s): Calvin Feng

import React                       from 'react';
import { connect }                 from 'react-redux';

import { trainingMoviesFetch }     from '../actions/movies';

import RatingRecord                 from './RatingRecord';
import TrainingSet                 from './TrainingSet';

class Recommender extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isRecommending: false
        };
    }

    componentDidMount() {
        this.props.dispatchTrainingMoviesFetch();
    }

    componentWillReceiveProps(nextProps) {
        let isRecommending = false;

        if (nextProps.recommendedMovies ) {
            isRecommending = true;
        }

        if (nextProps.ratedMovies && Object.keys(nextProps.ratedMovies).length >= 10) {
            isRecommending = true;
        }

        this.setState({ isRecommending });
    }

    get indexes() {
        if (this.state.isRecommending) {
            return (
                <div className="recommender">
                    <Recommendation />
                    <RatingRecord />
                </div>
            );
        } else {
            return (
                <div className="recommender">
                    <TrainingSet />
                    <RatingRecord />
                </div>
            );
        }
    }

    render() {
        return (
            <div className="recommender-container">
                {this.indexes}
            </div>
        );
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

export default connect(mapReduxStateToProps, mapDispatchToProps)(Recommender);
