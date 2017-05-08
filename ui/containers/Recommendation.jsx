'use strict';

/**
 * @copyright Consilium, 2017
 * @author Calvin Feng
 */

import React                      from 'react';
import { connect }                from 'react-redux';
import CircularProgress           from 'material-ui/CircularProgress';

import MovieItem                  from '../components/MovieItem';
import MovieTrailer               from '../components/MovieTrailer';
import YearRangeSelector          from '../components/YearRangeSelector';
import PopularitySelector         from '../components/PopularitySelector';

import { movieDetailFetch }       from '../actions/movieDetails';
import { movieTrailerFetch }      from '../actions/movieTrailers';

import { skipMovie }                     from '../actions/movies';
import { recordMovieRating }             from '../actions/movieRatings';
import { setMovieRatingCountPercentile } from '../actions/movieRatings';
import { setMovieYearRange }             from '../actions/movieYearRange';


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
        const recommendedMovieIds = Object.keys(this.props.recommendedMovies.items).filter((movieId) => {
            const condition1 = !this.props.skippedMovies[movieId] && !this.props.movieRatings[movieId];
            const condition2 = this.props.movieYearRange.minYear <= this.props.recommendedMovies.items[movieId].year;
            const condition3 = this.props.recommendedMovies.items[movieId].year <= this.props.movieYearRange.maxYear;
            return condition1 && condition2 && condition3;
        }).sort((movieId1, movieId2) => {
            return this.props.recommendedMovies.items[movieId2].predictedRating
                - this.props.recommendedMovies.items[movieId1].predictedRating;
            // Sort by descending order
        });

        return recommendedMovieIds.map((movieId) => {
            const movie = this.props.recommendedMovies.items[movieId];
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

    get movies() {
        if (this.props.recommendedMovies.isFetching) {
            return (
                <div className="movies">
                    <div className="circular-progress" >
                        <h4>
                            Please wait, recommendations are fetching...
                        </h4>
                        <CircularProgress size={100} thickness={7} />
                    </div>
                </div>
            );
        }

        return (
            <div className="movies">
                {this.recommendedMovies}
            </div>
        );
    }

    render() {
        return (
            <div className="recommendation-container">
                <div className="header">
                    <h1>Recommendations</h1>
                </div>
                <div className="filters">
                    <YearRangeSelector
                        disabled={this.props.recommendedMovies.isFetching}
                        movieYearRange={this.props.movieYearRange}
                        dispatchSetMovieYearRange={this.props.dispatchSetMovieYearRange} />
                    <PopularitySelector
                        disabled={this.props.recommendedMovies.isFetching}
                        movieRatingCountPercentile={this.props.movieRatingCountPercentile}
                        dispatchSetMovieRatingCountPercentile={this.props.dispatchSetMovieRatingCountPercentile} />
                </div>
                {this.trailerPlayer}
                {this.movies}
            </div>
        );
    }
}

Recommendation.propTypes = {
    skippedMovies: React.PropTypes.object.isRequired,
    movieDetails: React.PropTypes.object.isRequired,
    movieRatings: React.PropTypes.object.isRequired,
    movieTrailers: React.PropTypes.object.isRequired,
    movieYearRange: React.PropTypes.object.isRequired,
    movieRatingCountPercentile: React.PropTypes.number.isRequired,
    recommendedMovies: React.PropTypes.object.isRequired,
    dispatchSkipMovie: React.PropTypes.func.isRequired,
    dispatchMovieDetailFetch: React.PropTypes.func.isRequired,
    dispatchMovieTrailerFetch: React.PropTypes.func.isRequired,
    dispatchRecordMovieRating: React.PropTypes.func.isRequired,
    dispatchSetMovieYearRange: React.PropTypes.func.isRequired,
    dispatchSetMovieRatingCountPercentile: React.PropTypes.func.isRequired
};

const mapReduxStateToProps = (state) => {
    return {
        movieDetails: state.movieDetails,
        movieTrailers: state.movieTrailers,
        movieRatings: state.movieRatings,
        skippedMovies: state.skippedMovies,
        recommendedMovies: state.recommendedMovies,
        movieYearRange: state.movieYearRange,
        movieRatingCountPercentile: state.movieRatingCountPercentile
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchSkipMovie: (movieId) => dispatch(skipMovie(movieId)),
        dispatchMovieDetailFetch: (imdbId) => dispatch(movieDetailFetch(imdbId)),
        dispatchMovieTrailerFetch: (imdbId) => dispatch(movieTrailerFetch(imdbId)),
        dispatchRecordMovieRating: (movieId, rating) => dispatch(recordMovieRating(movieId, rating)),
        dispatchSetMovieYearRange: (minYear, maxYear) => dispatch(setMovieYearRange(minYear, maxYear)),
        dispatchSetMovieRatingCountPercentile: (percentile) => dispatch(setMovieRatingCountPercentile(percentile))
    };
};


export default connect(mapReduxStateToProps, mapDispatchToProps)(Recommendation);
