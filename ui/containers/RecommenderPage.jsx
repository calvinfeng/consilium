'use strict';

/**
 * @copyright Consilium, 2017
 * @author Calvin Feng
 */

import React                                from 'react';
import { connect }                          from 'react-redux';

import { recommendedMoviesFetch }           from '../actions/movies';
import { userPreferenceFetch }              from '../actions/userPreference';
import { setRatingsCountNeededForFetching } from '../actions/movieRatings';

import RatingRecord                         from './RatingRecord';
import Recommendation                       from './Recommendation';


class RecommenderPage extends React.Component {

    componentWillReceiveProps(nextProps) {
        const nextMovieRatingCount = Object.keys(nextProps.movieRatings).length;
        const currentMovieRatingCount = Object.keys(this.props.movieRatings).length;

        if (
            nextMovieRatingCount === this.props.ratingsCountNeededForFetching
            && nextMovieRatingCount > currentMovieRatingCount
            && !this.props.recommendedMovies.isFetching
        ) {
            // Learn user preference
            this.props.dispatchUserPreferenceFetch(nextProps.movieRatings);
            // Increase rating count requirement
            this.props.dispatchSetRatingsCountNeededForFetching(this.props.ratingsCountNeededForFetching + 10);
        }

        const hasPreferenceChanged = this.hasPreferenceChanged(nextProps);
        const hasMovieYearRangeChanged = this.hasMovieYearRangeChanged(nextProps);

        if (hasPreferenceChanged || hasMovieYearRangeChanged) {
            this.props.dispatchRecommendedMoviesFetch(nextProps.movieRatings, nextProps.movieYearRange);
        }
    }

    hasMovieYearRangeChanged(nextProps) {
        const prevRange = this.props.movieYearRange;
        const nextRange = nextProps.movieYearRange;

        if (prevRange.minYear !== nextRange.minYear || prevRange.maxYear !== nextRange.maxYear) {
            return true;
        }

        return false;
    }

    hasPreferenceChanged(nextProps) {
        const prevPref = this.props.userPreference.preferenceVector;
        const nextPref = nextProps.userPreference.preferenceVector;

        if (prevPref.length !== nextPref.length) {
            return true;
        }

        for (let i = 0; i < prevPref.length; i += 1) {
            if (prevPref[i] !== nextPref[i]) {
                return true;
            }
        }

        return false;
    }

    get content() {
        if (Object.keys(this.props.recommendedMovies.items).length === 0) {
            return (
                <div className="recommender-page">
                    <h3>Recommendations are not ready</h3>
                </div>
            );
        }

        return (
            <div className="recommender-page">
                <Recommendation />
                <RatingRecord />
            </div>
        );
    }

    render() {
        return this.content;
    }
}

RecommenderPage.propTypes = {
    userPreference: React.PropTypes.object.isRequired,
    movieRatings: React.PropTypes.object.isRequired,
    movieYearRange: React.PropTypes.object.isRequired,
    recommendedMovies: React.PropTypes.object.isRequired,
    ratingsCountNeededForFetching: React.PropTypes.number.isRequired,
    dispatchUserPreferenceFetch: React.PropTypes.func.isRequired,
    dispatchRecommendedMoviesFetch: React.PropTypes.func.isRequired,
    dispatchSetRatingsCountNeededForFetching: React.PropTypes.func.isRequired
};

const mapReduxStateToProps = (state) => {
    return {
        userPreference: state.userPreference,
        movieYearRange: state.movieYearRange,
        movieRatings: state.movieRatings,
        recommendedMovies: state.recommendedMovies,
        ratingsCountNeededForFetching: state.ratingsCountNeededForFetching
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchUserPreferenceFetch: (movieRatings) => {
            dispatch(userPreferenceFetch(movieRatings));
        },
        dispatchRecommendedMoviesFetch: (movieRatings, yearRange) => {
            dispatch(recommendedMoviesFetch(movieRatings, yearRange));
        },
        dispatchSetRatingsCountNeededForFetching: (count) => {
            dispatch(setRatingsCountNeededForFetching(count));
        }
    };
};

export default connect(mapReduxStateToProps, mapDispatchToProps)(RecommenderPage);
