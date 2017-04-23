'use strict';

/**
 * @copyright Consilium, 2017
 * @author Calvin Feng
 */

import React                 from 'react';
import { connect }           from 'react-redux';

import MovieItem             from '../components/MovieItem';

import { movieDetailFetch }  from '../actions/movieDetails';
import { movieTrailerFetch } from '../actions/movieTrailers';

import { skipMovie }         from '../actions/movies';
import { recordMovieRating } from '../actions/movieRatings';


class RatingRecord extends React.Component {
    get ratedMovies() {
        const ratedMovieIds = Object.keys(this.props.movieRatings);
        return ratedMovieIds.map((movieId) => {
            const movie = this.props.mostViewedMovies[movieId] || this.props.recommendedMovies.items[movieId];
            return (
                <MovieItem
                    isRecommendation={false}
                    key={movie.id}
                    movieId={movie.id}
                    imdbId={movie.imdbId}
                    rating={this.props.movieRatings[movieId]}
                    movieDetail={this.props.movieDetails[movie.imdbId]}
                    dispatchSkipMovie={this.props.dispatchSkipMovie}
                    dispatchMovieDetailFetch={this.props.dispatchMovieDetailFetch}
                    dispatchRecordMovieRating={this.props.dispatchRecordMovieRating}
                    dispatchMovieTrailerFetch={this.props.dispatchMovieTrailerFetch} />
            );
        });
    }
    /*
    <div className="header">
        <h1>Rating History</h1>
    </div>
    */
    render() {
        return (
            <div className="rating-record-container">
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
    dispatchSkipMovie: React.PropTypes.func.isRequired,
    dispatchMovieDetailFetch: React.PropTypes.func.isRequired,
    dispatchMovieTrailerFetch: React.PropTypes.func.isRequired,
    dispatchRecordMovieRating: React.PropTypes.func.isRequired
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
        dispatchSkipMovie: (movieId) => dispatch(skipMovie(movieId)),
        dispatchMovieDetailFetch: (imdbId) => dispatch(movieDetailFetch(imdbId)),
        dispatchMovieTrailerFetch: (imdbId) => dispatch(movieTrailerFetch(imdbId)),
        dispatchRecordMovieRating: (movieId, rating) => dispatch(recordMovieRating(movieId, rating))
    };
};

export default connect(mapReduxStateToProps, mapDispatchToProps)(RatingRecord);
