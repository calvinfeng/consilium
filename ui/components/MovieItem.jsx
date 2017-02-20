'use strict';

// Copyright 2017 Consilium
// Author(s): Calvin Feng

import React                               from 'react';
import Loader                              from 'react-loader';
import Rating                              from 'react-rating';
import { Button, OverlayTrigger, Popover } from 'react-bootstrap';

class MovieItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            detailReceived: false
        };

        this.handleRatingClick = this.handleRatingClick.bind(this);
        this.handleSkip = this.handleSkip.bind(this);
    }

    componentDidMount() {
        console.log('Mounted');
        this.props.dispatchMovieDetailFetch(this.props.imdbId);
    }

    handleRatingClick(rating) {
        this.props.dispatchMovieRatingRecord(this.props.movieId, rating);
    }

    handleSkip() {

    }

    // 
    get interface() {
        if (this.props.rating) {
            return (
                <div>
                    <div className="movie-poster">
                        <img
                            src={this.props.detail.poster}
                            alt="Movie Poster" />
                    </div>
                    <div className="user-rating">
                        <div>Your Rating: <strong>{this.props.rating}</strong></div>
                    </div>
                </div>
            );
        }

        if (this.props.isRecommendation) {
            return (
                <div>
                    <div className="movie-poster">
                        src={this.props.detail.poster}
                    </div>
                    <div className="movie-plot">{this.props.detail.plot}</div>
                    <div className="movie-rating">
                        <div style={{ width: '100%' }}>
                            <div className="rating-toolbar">
                                <Rating
                                    fractions={2}
                                    onClick={this.handleRatingClick}
                                    empty={'fa fa-star-o fa-3x'}
                                    full={'fa fa-star fa-3x'}
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
                </div>
            );
        }

        return (
            <div>
                <div className="movie-poster">
                    <img src={this.props.detail.poster}
                        alt="Movie Poster" />
                </div>
                <div className="rating-toolbar">
                    <Rating
                        fractions={2}
                        onClick={this.handleRatingClick}
                        empty={'fa fa-star-o fa-3x'}
                        full={'fa fa-star fa-3x'}
                        color={'yellow'} />
                </div>
            </div>
        );
    }

    render() {
        const popover = (
            <Popover id="popover-trigger-click-root-close" title="Overview">
                {this.props.detail.plot}
            </Popover>
        );
        return (
            <div className="movie-item">
                <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={popover}>
                    <h3 className="movie-title">
                        <strong>{this.props.detail.title}</strong>
                        ({this.props.detail.year})
                    </h3>
                </OverlayTrigger>
                {this.interface}
            </div>
        );
    }
}

MovieItem.defaultProps = {
    rating: undefined,
    detail: {
        title: 'Loading...',
        year: '....',
        plot: 'Loading...',
        poster: 'https://cdn.mirs.com/images/tranzit/loading.gif'
    }
};

/* eslint-disable */
MovieItem.propTypes = {
    rating: React.PropTypes.number,
    detail: React.PropTypes.object,
    isRecommendation: React.PropTypes.bool.isRequired,
    movieId: React.PropTypes.number.isRequired,
    imdbId: React.PropTypes.string.isRequired,
    dispatchMovieRatingRecord: React.PropTypes.func.isRequired,
    dispatchMovieDetailFetch: React.PropTypes.func.isRequired,
};
/* eslint-enable */

export default MovieItem;
