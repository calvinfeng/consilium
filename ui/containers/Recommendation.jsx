'use strict';

// Copyright 2017 Consilium
// Author(s): Calvin Feng

import React                 from 'react';
import { connect }           from 'react-redux';

import MovieItem             from '../components/MovieItem';
import MovieTrailer          from '../components/MovieTrailer';

import { movieDetailFetch }  from '../actions/movieDetails';
import { movieTrailerFetch } from '../actions/movieTrailers';

import { skipMovie }         from '../actions/movies';
import { recordMovieRating } from '../actions/movieRatings';

/* global $ */
class Recommendation extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            activeTrailer: undefined
        };

        this.playTrailer = this.playTrailer.bind(this);
    }

    playTrailer(imdbId) {
        if (this.props.movieTrailers[imdbId] && this.props.movieTrailers[imdbId].length > 0) {
            this.setState({
                activeTrailer: this.props.movieTrailers[imdbId]
            });
        }

        $('html, body').animate({
            scrollTop: 0
        }, 1000);
    }

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
                    movieTrailers={this.props.movieTrailers[movie.imdbId]}
                    playTrailer={this.playTrailer}
                    dispatchSkipMovie={this.props.dispatchSkipMovie}
                    dispatchRecordMovieRating={this.props.dispatchRecordMovieRating}
                    dispatchMovieDetailFetch={this.props.dispatchMovieDetailFetch}
                    dispatchMovieTrailerFetch={this.props.dispatchMovieTrailerFetch} />
            );
        });
    }

    get trailerPlayer() {
        if (this.state.activeTrailer) {
            return (
                <div className="trailer-player">
                    <MovieTrailer
                        videoSourceList={this.state.activeTrailer} />
                </div>
            );
        }

        const movieImdbIds = Object.keys(this.props.movieTrailers);

        if (movieImdbIds.length > 0) {
            const randomIndex = Math.floor(Math.random() * movieImdbIds.length);
            const randomImdbId = movieImdbIds[randomIndex];
            return (
                <div className="trailer-player">
                    <MovieTrailer
                        videoSourceList={this.props.movieTrailers[randomImdbId]} />
                </div>
            );
        }

        return <div className="trailer-player" />;
    }

    render() {
        return (
            <div className="recommendation-container">
                <div className="header">
                    <h1>Recommendations</h1>
                </div>
                {this.trailerPlayer}
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
    movieTrailers: React.PropTypes.object.isRequired,
    recommendedMovies: React.PropTypes.object.isRequired,
    dispatchSkipMovie: React.PropTypes.func.isRequired,
    dispatchMovieDetailFetch: React.PropTypes.func.isRequired,
    dispatchMovieTrailerFetch: React.PropTypes.func.isRequired,
    dispatchRecordMovieRating: React.PropTypes.func.isRequired
};

const mapReduxStateToProps = (state) => {
    return {
        movieDetails: state.movieDetails,
        movieTrailers: state.movieTrailers,
        skippedMovies: state.skippedMovies,
        recommendedMovies: state.recommendedMovies
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchSkipMovie: (movieId) => dispatch(skipMovie(movieId)),
        dispatchMovieDetailFetch: (imdbId) => dispatch(movieDetailFetch(imdbId)),
        dispatchMovieTrailerFetch: (imdbId) => dispatch(movieTrailerFetch(imdbId)),
        dispatchRecordMovieRating: (movieId, rating) => dispatch(recordMovieRating(movieId, rating))
    };
};


export default connect(mapReduxStateToProps, mapDispatchToProps)(Recommendation);
