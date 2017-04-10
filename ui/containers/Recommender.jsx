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
            numberOfRatingsNeededForNextFetch: 10
        };
    }

    componentWillReceiveProps(nextProps) {
        // First round of fetching
        if (
            Object.keys(nextProps.movieRatings).length >= 10
            && Object.keys(nextProps.recommendedMovies).length === 0
        ) {
            this.props.dispatchRecommendedMoviesFetch(nextProps.movieRatings);
            this.setState({
                numberOfRatingsNeededForNextFetch: this.state.numberOfRatingsNeededForNextFetch + 10
            });
        }

        if (Object.keys(nextProps.movieRatings).length >= this.state.numberOfRatingsNeededForNextFetch) {
            this.props.dispatchRecommendedMoviesFetch(nextProps.movieRatings);
            this.setState({
                numberOfRatingsNeededForNextFetch: this.state.numberOfRatingsNeededForNextFetch + 10
            });
        }
    }

    get content() {
        if (Object.keys(this.props.recommendedMovies).length > 0) {
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
    recommendedMovies: React.PropTypes.object.isRequired,
    dispatchRecommendedMoviesFetch: React.PropTypes.func.isRequired
};

const mapReduxStateToProps = (state) => {
    return {
        movieRatings: state.movieRatings,
        recommendedMovies: state.recommendedMovies
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchRecommendedMoviesFetch: (movieRatings) => dispatch(recommendedMoviesFetch(movieRatings))
    };
};

export default connect(mapReduxStateToProps, mapDispatchToProps)(Recommender);
