'use strict';

// Copyright 2017 Consilium
// Author(s): Calvin Feng

import React                 from 'react';
import { connect }           from 'react-redux';

import MovieItem             from '../components/MovieItem';

import { movieDetailFetch }  from '../actions/movieDetails';

import { skipMovie }         from '../actions/movies';
import { recordMovieRating } from '../actions/movieRatings';


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
                    dispatchSkipMovie={this.props.dispatchSkipMovie}
                    dispatchRecordMovieRating={this.props.dispatchRecordMovieRating}
                    dispatchMovieDetailFetch={this.props.dispatchMovieDetailFetch} />
            );
        });
    }

    render() {
        return (
            <div className="recommendation-container">
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
    dispatchSkipMovie: React.PropTypes.func.isRequired,
    dispatchMovieDetailFetch: React.PropTypes.func.isRequired,
    dispatchRecordMovieRating: React.PropTypes.func.isRequired
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
        dispatchSkipMovie: (movieId) => dispatch(skipMovie(movieId)),
        dispatchMovieDetailFetch: (imdbId) => dispatch(movieDetailFetch(imdbId)),
        dispatchRecordMovieRating: (movieId, rating) => dispatch(recordMovieRating(movieId, rating))
    };
};


export default connect(mapReduxStateToProps, mapDispatchToProps)(Recommendation);
