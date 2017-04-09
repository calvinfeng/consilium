'use strict';

// Copyright 2017 Consilium
// Author(s): Calvin Feng

import React                 from 'react';
import { connect }           from 'react-redux';

import MovieItem             from '../components/MovieItem';

import { movieSkip }         from '../actions/movies';
import { movieDetailFetch }  from '../actions/movieDetails';
import { movieRatingRecord } from '../actions/ratings';

class Recommendation extends React.Component {
    get recommendedMovies() {
        const recommendedMovieIds = Object.keys(this.props.recommendedMovies).filter((movieId) => {
            return !this.props.skippedMovies[movieId];
        }).sort();

        return recommendedMovieIds.map((movieId) => {
            const movie = this.props.recommendedMovies[movieId];
            return (
                <MovieItem
                    isRecommendation={true}
                    key={movie.id}
                    movieId={movie.id}
                    imdbId={movie.imdbId}
                    movieDetail={this.props.movieDetails[movie.imdbId]}
                    dispatchMovieSkip={this.props.dispatchMovieSkip}
                    dispatchMovieRatingRecord={this.props.dispatchMovieRatingRecord}
                    dispatchMovieDetailFetch={this.props.dispatchMovieDetailFetch} />
            );
        });
    }

    render() {
        return (
            <div className="recommendation">
                <div className="header">
                    <h1>Recommendations</h1>
                </div>
                <div className="movies">
                    {this.recommendedMovies}
                </div>
            </div>
        );
    }
}

Recommendation.propTypes = {
    movieDetails: React.PropTypes.object.isRequired,
    skippedMovies: React.PropTypes.object.isRequired,
    recommendedMovies: React.PropTypes.object.isRequired,
    dispatchMovieSkip: React.PropTypes.func.isRequired,
    dispatchMovieDetailFetch: React.PropTypes.func.isRequired,
    dispatchMovieRatingRecord: React.PropTypes.func.isRequired
};

const mapReduxStateToProps = (state) => {
    return {
        movieDetails: state.movieDetails,
        skippedMovies: state.skippedMovies,
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


export default connect(mapReduxStateToProps, mapDispatchToProps)(Recommendation);
