'use strict';

// Copyright 2017 Consilium
// Author(s): Calvin Feng

import React                       from 'react';
import { connect }                 from 'react-redux';

import { recommendedMoviesFetch }  from '../actions/movies';
import { userPreferenceFetch }     from '../actions/userPreference';
import RatingRecord                from './RatingRecord';
import MostViewed                  from './MostViewed';
import Recommendation              from './Recommendation';


class Recommender extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            numOfRatingsNeededForFetching: 10
        };
    }

    componentWillReceiveProps(nextProps) {
        if (
            Object.keys(nextProps.movieRatings).length === this.state.numOfRatingsNeededForFetching
            && !nextProps.recommendedMovies.isFetching
        ) {
            // Fetching recommendation
            this.props.dispatchRecommendedMoviesFetch(nextProps.movieRatings, nextProps.movieYearRange);
            // Fetching user preference
            this.props.dispatchUserPreferenceFetch(nextProps.movieRatings);

            this.setState({
                numOfRatingsNeededForFetching: this.state.numOfRatingsNeededForFetching + 10
            });
        }
    }

    get content() {
        if (Object.keys(this.props.recommendedMovies.items).length > 0) {
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
        return this.content;
    }
}

Recommender.propTypes = {
    movieRatings: React.PropTypes.object.isRequired,
    movieYearRange: React.PropTypes.object.isRequired,
    recommendedMovies: React.PropTypes.object.isRequired,
    userPreference: React.PropTypes.object.isRequired,
    dispatchUserPreferenceFetch: React.PropTypes.func.isRequired,
    dispatchRecommendedMoviesFetch: React.PropTypes.func.isRequired
};

const mapReduxStateToProps = (state) => {
    return {
        movieYearRange: state.movieYearRange,
        movieRatings: state.movieRatings,
        recommendedMovies: state.recommendedMovies,
        userPreference: state.userPreference
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchUserPreferenceFetch: (movieRatings) => {
            dispatch(userPreferenceFetch(movieRatings));
        },
        dispatchRecommendedMoviesFetch: (movieRatings, yearRange) => {
            dispatch(recommendedMoviesFetch(movieRatings, yearRange));
        }
    };
};

export default connect(mapReduxStateToProps, mapDispatchToProps)(Recommender);
