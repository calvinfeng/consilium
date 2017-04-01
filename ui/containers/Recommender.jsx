'use strict';

// Copyright 2017 Consilium
// Author(s): Calvin Feng

import React                       from 'react';
import { connect }                 from 'react-redux';

import { recommendedMoviesFetch }  from '../actions/movies';

import RatingRecord                from './RatingRecord';
import MostViewed                  from './MostViewed';
import Recommendation              from './Recommendation';

// Recommender is the only connected component, it's the ultimate parent for all
// redux state information
class Recommender extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isRecommending: false,
            ratingCountNeededForNextRecommendation: 10
        };
    }

    componentWillReceiveProps(nextProps) {
        let isRecommending = false;

        // TODO: Fix the condition for fetching next round of recommendation, the current
        // approach is ugly
        if (
            nextProps.recommendedMovies
            && Object.keys(nextProps.recommendedMovies).length >= this.state.ratingCountNeededForNextRecommendation
        ) {
            isRecommending = true;
        }

        if (Object.keys(nextProps.movieRatings).length >= 10) {
            isRecommending = true;
        }

        if (isRecommending) {
            this.props.dispatchRecommendedMoviesFetch(nextProps.movieRatings);
        }

        this.setState({
            isRecommending,
            ratingCountNeededForNextRecommendation: this.state.ratingCountNeededForNextRecommendation + 10
        });
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
                <MostViewed />
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

Recommender.propTypes = {
    mostViewedMovies: React.PropTypes.object.isRequired,
    recommendedMovies: React.PropTypes.object.isRequired,
    movieRatings: React.PropTypes.object.isRequired,
    movieDetails: React.PropTypes.object.isRequired,
    dispatchRecommendedMoviesFetch: React.PropTypes.func.isRequired
};

const mapReduxStateToProps = (state) => {
    return {
        mostViewedMovies: state.mostViewedMovies,
        recommendedMovies: state.recommendedMovies,
        movieRatings: state.movieRatings,
        movieDetails: state.movieDetails
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchRecommendedMoviesFetch: (movieRatings) => dispatch(recommendedMoviesFetch(movieRatings))
    };
};

export default connect(mapReduxStateToProps, mapDispatchToProps)(Recommender);
