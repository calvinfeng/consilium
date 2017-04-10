'use strict';

// Copyright 2017 Consilium
// Author(s): Calvin Feng

import React                 from 'react';
import { connect }           from 'react-redux';

import MovieItem             from '../components/MovieItem';

import { movieSkip }         from '../actions/movies';
import { movieDetailFetch }  from '../actions/movieDetails';
import { movieRatingRecord } from '../actions/ratings';


class RatingRecord extends React.Component {
    get ratedMovies() {
        const ratedMovieIds = Object.keys(this.props.movieRatings);
        return ratedMovieIds.map((movieId) => {
            const movie = this.props.mostViewedMovies[movieId] || this.props.recommendedMovies[movieId];
            return (
                <MovieItem
                    key={movie.id}
                    movieId={movie.id}
                    imdbId={movie.imdbId}
                    isRecommendation={false}
                    rating={this.props.movieRatings[movieId]}
                    movieDetail={this.props.movieDetails[movie.imdbId]}
                    dispatchMovieSkip={this.props.dispatchMovieSkip}
                    dispatchMovieDetailFetch={this.props.dispatchMovieDetailFetch}
                    dispatchMovieRatingRecord={this.props.dispatchMovieRatingRecord} />
            );
        });
    }

    render() {
        return (
            <div className="rating-record-container">
                <div className="header">
                    <h1>Rating History</h1>
                </div>
                <div className="movies">
                    {this.ratedMovies}
                </div>
            </div>
        );
    }
}

RatingRecord.propTypes = {
    movieRatings: React.PropTypes.object.isRequired,
    movieDetails: React.PropTypes.object.isRequired,
    mostViewedMovies: React.PropTypes.object.isRequired,
    recommendedMovies: React.PropTypes.object.isRequired,
    dispatchMovieSkip: React.PropTypes.func.isRequired,
    dispatchMovieDetailFetch: React.PropTypes.func.isRequired,
    dispatchMovieRatingRecord: React.PropTypes.func.isRequired
};

const mapReduxStateToProps = (state) => {
    return {
        movieRatings: state.movieRatings,
        movieDetails: state.movieDetails,
        mostViewedMovies: state.mostViewedMovies,
        recommendedMovies: state.recommendedMovies
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchMovieSkip: (movieId) => dispatch(movieSkip(movieId)),
        dispatchMovieDetailFetch: (imdbId) => dispatch(movieDetailFetch(imdbId)),
        dispatchMovieRatingRecord: (movieId, rating) => dispatch(movieRatingRecord(movieId, rating))
    };
};

export default connect(mapReduxStateToProps, mapDispatchToProps)(RatingRecord);
