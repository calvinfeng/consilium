'use strict';

// Copyright 2017 Consilium
// Author(s): Calvin Feng

import React                     from 'react';
import { connect }               from 'react-redux';
import _                         from 'lodash';

import { ProgressBar }           from 'react-bootstrap';
import { Button }                from 'react-bootstrap';

// Components
import PosterSlider              from '../components/PosterSlider';
import MovieItem                 from '../components/MovieItem';

import { movieDetailFetch }      from '../actions/movieDetails';
import { mostViewedMoviesFetch } from '../actions/movies';
import { movieRatingRecord }     from '../actions/ratings';


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
        const instruction = `These are some of the most viewed American films. We think it is very likely that
        you have seen at least some of them.  If you have seen them, whether you like or dislike them, let us know and
        give them ratings! It will help our backend machine learning algorithm to learn your taste and preference`;

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
                    dispatchMovieRatingRecord={this.props.dispatchMovieRatingRecord}
                    dispatchMovieDetailFetch={this.props.dispatchMovieDetailFetch} />
            );
        });
    }

    randomlySetMoviesOnDisplay(mostViewedMovies) {
        if (Object.keys(mostViewedMovies).length > 0) {
            const moviesOnDisplay = {};
            _.shuffle(Object.keys(mostViewedMovies)).slice(0, 10).forEach((movieId) => {
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
            <div className="most-viewed">
                <PosterSlider movies={this.props.mostViewedMovies} />
                <div className="header">
                    <h1>Popular Movies</h1>
                </div>
                {this.instruction}
                <ProgressBar now={progressPercentage} />
                <div className="movies">
                    { this.mostViewedMovies }
                </div>
                <div className="footer">
                    <Button
                        disabled={this.state.isMovieSetLoading}
                        bsSize="small"
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
    dispatchMovieDetailFetch: React.PropTypes.func.isRequired,
    dispatchMovieRatingRecord: React.PropTypes.func.isRequired,
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
        dispatchMovieRatingRecord: (movieId, rating) => dispatch(movieRatingRecord(movieId, rating)),
        dispatchMovieDetailFetch: (imdbId) => dispatch(movieDetailFetch(imdbId))
    };
};


export default connect(mapReduxStateToProps, mapDispatchToProps)(MostViewed);
