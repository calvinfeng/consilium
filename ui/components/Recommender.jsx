'use strict';

// Copyright 2017 Consilium
// Author(s): Calvin Feng

import React                       from 'react';
import { connect }                 from 'react-redux';

import { trainingMoviesFetch }     from '../actions/movies';
import { movieDetailFetch }        from '../actions/movieDetails';
import { movieRatingRecord }       from '../actions/ratings';


import RatingRecord                from './RatingRecord';
import TrainingSet                 from './TrainingSet';
import Recommendation              from './Recommendation';

// Recommender is the only connected component, it's the ultimate parent for all
// redux state information
class Recommender extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isRecommending: false
        };
    }

    componentWillReceiveProps(nextProps) {
        let isRecommending = false;

        if (
            nextProps.recommendedMovies
            && Object.keys(nextProps.recommendedMovies).length >= 10
        ) {
            isRecommending = true;
        }

        if (
            nextProps.movieRatings
            && Object.keys(nextProps.movieRatings).length >= 10
        ) {
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
        }
        return (
            <div className="recommender">
                <TrainingSet
                    dispatchMovieRatingRecord={this.props.dispatchMovieRatingRecord}
                    dispatchTrainingMoviesFetch={this.props.dispatchTrainingMoviesFetch}
                    dispatchMovieDetailFetch={this.props.dispatchMovieDetailFetch}
                    trainingMovies={this.props.trainingMovies}
                    movieRatings={this.props.movieRatings}
                    movieDetails={this.props.movieDetails} />
                <RatingRecord />
            </div>
        );
    }

    render() {
        return (
            <div className="recommender-container">
                {this.indexes}
            </div>
        );
    }

}

/* eslint-disable */
Recommender.propTypes = {
    trainingMovies: React.PropTypes.object,
    recommendedMovies: React.PropTypes.object,
    movieRatings: React.PropTypes.object,
    movieDetails: React.PropTypes.object,
    dispatchTrainingMoviesFetch: React.PropTypes.func.isRequired,
    dispatchMovieRatingRecord: React.PropTypes.func.isRequired,
    dispatchMovieDetailFetch: React.PropTypes.func.isRequired
};
/* eslint-enable */

Recommender.defaultProps = {
    trainingMovies: {},
    recommendedMovies: {},
    movieRatings: {},
    movieDetails: {}
};

const mapReduxStateToProps = (state) => {
    return {
        trainingMovies: state.trainingMovies,
        movieRatings: state.movieRatings,
        movieDetails: state.movieDetails
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchTrainingMoviesFetch: () => dispatch(trainingMoviesFetch()),
        dispatchMovieRatingRecord: (movieId, rating) => dispatch(movieRatingRecord(movieId, rating)),
        dispatchMovieDetailFetch: (imdbId) => dispatch(movieDetailFetch(imdbId))
    };
};

export default connect(mapReduxStateToProps, mapDispatchToProps)(Recommender);
