'use strict';

// Copyright 2017 Consilium
// Author(s): Calvin Feng

import React                   from 'react';
import _                       from 'lodash';

import { ProgressBar, Button } from 'react-bootstrap';

// Components
import PosterSlider            from './PosterSlider';
import MovieItem               from './MovieItem';


class TrainingSet extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            displayingMovies: {},
            ratingCount: 0
        };
    }

    componentDidMount() {
        this.props.dispatchMostViewedMoviesFetch();
    }

    componentWillReceiveProps(nextProps) {
        if (Object.keys(this.state.displayingMovies).length === 0) {
            const movies = nextProps.mostViewedMovies;
            const displayingMovies = {};
            _.shuffle(Object.keys(movies)).slice(0, 10).forEach((movieId) => {
                const movie = movies[movieId];
                displayingMovies[movieId] = movie;
            });

            this.setState({ displayingMovies });
        }
    }

    get description() {
        const description = `These are some movies we think you have seen before.
        If you have seen them, whether you like or dislike them, let us know and
        give them ratings! If not, click the skip button and we will give you more
        choices. It will help our backend machine learning algorithm to learn your
        taste and preference`;
        if (this.state.ratingCount === 0) {
            return (
                <div>
                    <p>{description}</p>
                    <h4>
                        As soon as 10 movies are rated, the recommender system will get to work!
                    </h4>
                </div>
            );
        }
        return (
            <div>
                <p>{description}</p>
                <h4>Rate <strong>{10 - this.state.ratingCount}</strong> more movies</h4>
            </div>
        );
    }

    get trainingSet() {
        const movies = this.state.displayingMovies;
        return Object.keys(movies).sort().map((movieId) => {
            const movie = movies[movieId];
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

    render() {
        const progressPercentage = (100 * this.state.ratingCount) / 10;
        return (
            <div className="training-set-container">
                <PosterSlider movies={this.props.mostViewedMovies} />
                <div className="training-set-header">
                    <h1>Popular Movies</h1>
                    <Button
                        disabled={this.state.isMovieSetLoading}
                        bsSize="xsmall"
                        className="react-buttons"
                        onClick={this.skipAll}
                        bsStyle="primary">
                        More Movies
                    </Button>
                </div>
                {this.description}
                <ProgressBar now={progressPercentage} />
                <div className="training-set">
                    { this.trainingSet }
                </div>
            </div>
        );
    }
}

/* eslint-disable */
TrainingSet.propTypes = {
    movieDetails: React.PropTypes.object.isRequired,
    mostViewedMovies: React.PropTypes.object.isRequired,
    movieRatings: React.PropTypes.object.isRequired,
    dispatchMostViewedMoviesFetch: React.PropTypes.func.isRequired,
    dispatchMovieRatingRecord: React.PropTypes.func.isRequired,
    dispatchMovieDetailFetch: React.PropTypes.func.isRequired
};
/* eslint-enable */

export default TrainingSet;
