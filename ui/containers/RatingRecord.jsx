'use strict';

// Copyright 2017 Consilium
// Author(s): Calvin Feng

import React                 from 'react';
import { connect }           from 'react-redux';

import MovieItem             from '../components/MovieItem';
import { movieDetailFetch }  from '../actions/movieDetails';
import { movieRatingRecord } from '../actions/ratings';


class RatingRecord extends React.Component {

    get ratedMovies() {
        const ratedMovieIds = Object.keys(this.props.movieRatings);
        return ratedMovieIds.map((movieId) => {
            const movie = this.props.mostViewedMovies[movieId] || this.props.recommendedMovies[movieId];
            return (
                <MovieItem
                    rating={this.props.movieRatings[movieId]}
                    isRecommendation={false}
                    key={movie.id}
                    movieId={movie.id}
                    imdbId={movie.imdbId}
                    movieDetail={this.props.movieDetails[movie.imdbId]}
                    dispatchMovieRatingRecord={this.props.dispatchMovieRatingRecord}
                    dispatchMovieDetailFetch={this.props.dispatchMovieDetailFetch} />
            );
        });
    }

    render() {
        return (
            <div className="rating-record">
                <div className="header">
                    <h1>Rating record is coming soon!</h1>
                </div>
                <div className="movies">
                    {this.ratedMovies}
                </div>
            </div>
        );
    }

}

RatingRecord.propTypes = {
    recommendedMovies: React.PropTypes.object.isRequired,
    movieDetails: React.PropTypes.object.isRequired,
    mostViewedMovies: React.PropTypes.object.isRequired,
    movieRatings: React.PropTypes.object.isRequired,
    dispatchMovieDetailFetch: React.PropTypes.func.isRequired,
    dispatchMovieRatingRecord: React.PropTypes.func.isRequired
};

const mapReduxStateToProps = (state) => {
    return {
        mostViewedMovies: state.mostViewedMovies,
        movieRatings: state.movieRatings,
        movieDetails: state.movieDetails,
        recommendedMovies: state.recommendedMovies
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchMovieRatingRecord: (movieId, rating) => dispatch(movieRatingRecord(movieId, rating)),
        dispatchMovieDetailFetch: (imdbId) => dispatch(movieDetailFetch(imdbId))
    };
};

export default connect(mapReduxStateToProps, mapDispatchToProps)(RatingRecord);
