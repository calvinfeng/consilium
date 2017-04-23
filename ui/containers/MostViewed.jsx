'use strict';

/**
 * @copyright Consilium, 2017
 * @author Calvin Feng
 */

import React                     from 'react';
import { connect }               from 'react-redux';
import _                         from 'lodash';

import { ProgressBar }           from 'react-bootstrap';
import { Button }                from 'react-bootstrap';

// Components
import PosterSlider              from '../components/PosterSlider';
import MovieItem                 from '../components/MovieItem';

import { mostViewedMoviesFetch } from '../actions/movies';
import { movieDetailFetch }      from '../actions/movieDetails';
import { movieTrailerFetch }     from '../actions/movieTrailers';

import { skipMovie }             from '../actions/movies';
import { recordMovieRating }     from '../actions/movieRatings';


class MostViewed extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            moviesOnDisplay: {},
            ratingCount: 0
        };

        this.handleClickMoreMovies = this.handleClickMoreMovies.bind(this);
        this.randomlySetMoviesOnDisplay = this.randomlySetMoviesOnDisplay.bind(this);
    }

    componentDidMount() {
        this.props.dispatchMostViewedMoviesFetch();
    }

    componentWillReceiveProps(nextProps) {
        if (Object.keys(this.state.moviesOnDisplay).length === 0) {
            this.randomlySetMoviesOnDisplay(nextProps.mostViewedMovies);
        }
    }

    get instruction() {
        const instruction = `These are some of the most viewed American films. We think it is very likely that you have
        seen at least some of them.  If you have seen them, whether you like or dislike them, let us know and give them
        ratings! It will help our backend machine learning algorithm to learn your taste and preference`;

        if (this.state.ratingCount === 0) {
            return (
                <div className="instruction">
                    <p>{instruction}</p>
                    <h4>
                        As soon as 10 movies are rated, the recommender system will get to work!
                    </h4>
                </div>
            );
        }

        return (
            <div className="instruction">
                <p>{instruction}</p>
                <h4>Rate <strong>{10 - this.state.ratingCount}</strong> more movies</h4>
            </div>
        );
    }

    get mostViewedMovies() {
        const movieRatings = this.props.movieRatings;

        // Only serve movies that haven't been rated
        const unratedMovieIds = Object.keys(this.state.moviesOnDisplay).filter((movieId) => {
            return movieRatings[movieId] === undefined;
        });

        return unratedMovieIds.sort().map((movieId) => {
            const movie = this.state.moviesOnDisplay[movieId];
            return (
                <MovieItem
                    isRecommendation={false}
                    key={movie.id}
                    movieId={movie.id}
                    imdbId={movie.imdbId}
                    movieDetail={this.props.movieDetails[movie.imdbId]}
                    dispatchSkipMovie={this.props.dispatchSkipMovie}
                    dispatchRecordMovieRating={this.props.dispatchRecordMovieRating}
                    dispatchMovieDetailFetch={this.props.dispatchMovieDetailFetch}
                    dispatchMovieTrailerFetch={this.props.dispatchMovieTrailerFetch}  />
            );
        });
    }

    randomlySetMoviesOnDisplay(mostViewedMovies) {
        if (Object.keys(mostViewedMovies).length > 0) {
            const moviesOnDisplay = {};
            _.shuffle(Object.keys(mostViewedMovies)).slice(0, 12).forEach((movieId) => {
                const movie = mostViewedMovies[movieId];
                moviesOnDisplay[movieId] = movie;
            });
            this.setState({ moviesOnDisplay });
        }
    }

    handleClickMoreMovies() {
        this.randomlySetMoviesOnDisplay(this.props.mostViewedMovies);
    }

    render() {
        const progressPercentage = (100 * Object.keys(this.props.movieRatings).length) / 10;
        return (
            <div className="most-viewed-container">
                <div className="header">
                    <h1>Popular Movies</h1>
                </div>
                <PosterSlider
                    movies={this.state.moviesOnDisplay}
                    movieDetails={this.props.movieDetails} />
                {this.instruction}
                <ProgressBar now={progressPercentage} />
                <div className="movies">
                    { this.mostViewedMovies }
                </div>
                <div className="footer">
                    <Button
                        disabled={this.state.isMovieSetLoading}
                        bsSize="xsmall"
                        className="react-buttons"
                        onClick={this.handleClickMoreMovies}
                        bsStyle="primary">
                        Load more movies
                    </Button>
                </div>
            </div>
        );
    }
}

MostViewed.propTypes = {
    movieDetails: React.PropTypes.object.isRequired,
    movieRatings: React.PropTypes.object.isRequired,
    mostViewedMovies: React.PropTypes.object.isRequired,
    dispatchSkipMovie: React.PropTypes.func.isRequired,
    dispatchMovieDetailFetch: React.PropTypes.func.isRequired,
    dispatchMovieTrailerFetch: React.PropTypes.func.isRequired,
    dispatchRecordMovieRating: React.PropTypes.func.isRequired,
    dispatchMostViewedMoviesFetch: React.PropTypes.func.isRequired
};

const mapReduxStateToProps = (state) => {
    return {
        mostViewedMovies: state.mostViewedMovies,
        movieDetails: state.movieDetails,
        movieRatings: state.movieRatings
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchMostViewedMoviesFetch: () => dispatch(mostViewedMoviesFetch()),
        dispatchSkipMovie: (movieId) => dispatch(skipMovie(movieId)),
        dispatchMovieDetailFetch: (imdbId) => dispatch(movieDetailFetch(imdbId)),
        dispatchMovieTrailerFetch: (imdbId) => dispatch(movieTrailerFetch(imdbId)),
        dispatchRecordMovieRating: (movieId, rating) => dispatch(recordMovieRating(movieId, rating))
    };
};


export default connect(mapReduxStateToProps, mapDispatchToProps)(MostViewed);
