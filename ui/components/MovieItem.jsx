'use strict';

// Copyright 2017 Consilium
// Author(s): Calvin Feng

import React                               from 'react';
import Spinner                             from 'spin';
import Rating                              from 'react-rating';
import { Button, OverlayTrigger, Popover } from 'react-bootstrap';

/* global document */
class MovieItem extends React.Component {

    constructor(props) {
        super(props);
        this.handleRatingClick = this.handleRatingClick.bind(this);
        this.handleSkip = this.handleSkip.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.movieDetail.isDefaultProp && this.spinner) {
            this.spinner.stop();
        }
    }

    componentDidMount() {
        // Check if Redux store has movieDetail information
        if (this.props.movieDetail.isDefaultProp) {
            // Attach spinner to
            this.spinner = new Spinner().spin();
            document.getElementById(this.props.movieId).appendChild(this.spinner.el);
            this.props.dispatchMovieDetailFetch(this.props.imdbId);
        }
    }

    handleRatingClick(rating) {
        this.props.dispatchMovieRatingRecord(this.props.movieId, rating);
    }

    handleSkip() {
        this.props.dispatchMovieSkip(this.props.movieId);
    }

    get title() {
        if (this.props.rating || this.props.isRecommendation) {
            return (
                <h3 className="title">
                    <strong>{this.props.movieDetail.title}</strong>
                    {this.props.movieDetail.year}
                </h3>
            );
        }

        const popover = (
            <Popover id="popover-trigger-click-root-close" title="Overview">
                {this.props.movieDetail.plot}
            </Popover>
        );

        return (
            <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={popover}>
                <h3 className="title">
                    <strong>{this.props.movieDetail.title}</strong>
                    {this.props.movieDetail.year}
                </h3>
            </OverlayTrigger>
        );
    }

    get poster() {
        if (this.props.movieDetail.poster) {
            return (
                <div className="poster">
                    <img
                        id={this.props.movieId}
                        src={this.props.movieDetail.poster}
                        alt="Movie Poster" />
                </div>
            );
        }

        return (
            <div className="poster" />
        );
    }

    get ratingInterface() {
        if (this.props.rating) {
            return (
                <div className="rating-value">
                    <div>Your Rating: <strong>{this.props.rating}</strong></div>
                </div>
            );
        }

        if (this.props.isRecommendation) {
            return (
                <div className="rating-toolbar">
                    <div style={{ width: '100%' }}>
                        <div className="star-toolbar-container">
                            <Rating
                                fractions={2}
                                onClick={this.handleRatingClick}
                                empty={'fa fa-star-o fa-2x'}
                                full={'fa fa-star fa-2x'}
                                color={'yellow'} />
                        </div>
                        <div className="button-container">
                            <Button
                                bsSize="xsmall"
                                className="react-buttons"
                                onClick={this.handleSkip}
                                bsStyle="primary">
                                Not Interested
                            </Button>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="rating-toolbar">
                <div className="star-toolbar-container">
                    <Rating
                        fractions={2}
                        onClick={this.handleRatingClick}
                        empty={'fa fa-star-o fa-2x'}
                        full={'fa fa-star fa-2x'}
                        color={'yellow'} />
                </div>
            </div>
        );
    }

    render() {
        // This is rated item
        if (this.props.rating) {
            return (
                <div className="movie-item" id={this.props.movieId}>
                    {this.poster}
                    {this.ratingInterface}
                </div>
            );
        }

        // This is recommendation
        if (this.props.isRecommendation) {
            return (
                <div className="movie-item recommendation" id={this.props.movieId}>
                    {this.title}
                    {this.poster}
                    <div className="plot">
                        {this.props.movieDetail.plot}
                    </div>
                    {this.ratingInterface}
                </div>
            );
        }

        // This is a most-viewed item
        return (
            <div className="movie-item" id={this.props.movieId}>
                {this.poster}
                {this.ratingInterface}
            </div>
        );
    }
}

MovieItem.defaultProps = {
    rating: undefined,
    movieDetail: {
        isDefaultProp: true,
        title: 'Loading...',
        year: '....',
        plot: 'Loading...'
    }
};

/* eslint-disable */
MovieItem.propTypes = {
    rating: React.PropTypes.number,
    movieDetail: React.PropTypes.object,
    isRecommendation: React.PropTypes.bool.isRequired,
    movieId: React.PropTypes.number.isRequired,
    imdbId: React.PropTypes.string.isRequired,
    dispatchMovieSkip: React.PropTypes.func.isRequired,
    dispatchMovieDetailFetch: React.PropTypes.func.isRequired,
    dispatchMovieRatingRecord: React.PropTypes.func.isRequired
};
/* eslint-enable */

export default MovieItem;
