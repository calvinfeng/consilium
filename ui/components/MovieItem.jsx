'use strict';

/**
 * @copyright Consilium, 2017
 * @author Calvin Feng
 */

import React              from 'react';
import Spinner            from 'spin';
import Rating             from 'react-rating';
import { Button }         from 'react-bootstrap';
import { OverlayTrigger } from 'react-bootstrap';
import { Popover }        from 'react-bootstrap';
import { Tooltip }        from 'react-bootstrap';

/* global document */
class MovieItem extends React.Component {

    constructor(props) {
        super(props);
        this.handleSkip = this.handleSkip.bind(this);
        this.handleRatingClick = this.handleRatingClick.bind(this);
        this.initLoadingMovieDetail = this.initLoadingMovieDetail.bind(this);
        this.completeLoadingMovieDetail = this.completeLoadingMovieDetail.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.completeLoadingMovieDetail(nextProps);
    }

    componentDidMount() {
        this.initLoadingMovieDetail();
        if (this.props.isRecommendation && this.props.movieTrailers === undefined) {
            this.props.dispatchMovieTrailerFetch(this.props.imdbId);
        }
    }

    initLoadingMovieDetail() {
        // Check if Redux store has movieDetail information
        if (this.props.movieDetail.isDefaultProp) {
            this.spinner = new Spinner().spin();
            document.getElementById(this.props.movieId).appendChild(this.spinner.el);
            this.props.dispatchMovieDetailFetch(this.props.imdbId);
        }
    }

    completeLoadingMovieDetail(nextProps) {
        if (!nextProps.movieDetail.isDefaultProp && this.spinner) {
            this.spinner.stop();
        }
    }

    handleRatingClick(rating) {
        this.props.dispatchRecordMovieRating(this.props.movieId, rating);
    }

    handleSkip() {
        this.props.dispatchSkipMovie(this.props.movieId);
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

    get ratedItemContent() {
        const tooltip = (
            <Tooltip id="tooltip">
                Your rating: <strong>{this.props.rating}</strong>
            </Tooltip>
        );

        return (
            <div className="rated movie-item" id={this.props.movieId}>
                <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={tooltip}>
                    {this.poster}
                </OverlayTrigger>
            </div>
        );
    }

    get recommendedItemContent() {
        const buttons = [];
        if (this.props.movieTrailers && this.props.movieTrailers.length > 0) {
            buttons.push(
                <Button
                    key="play"
                    bsSize="xsmall"
                    className="react-buttons"
                    onClick={this.handleSkip}
                    bsStyle="primary">
                    Play Trailer
                </Button>
            );
        }

        buttons.push(
            <Button
                key="skip"
                bsSize="xsmall"
                className="react-buttons"
                onClick={this.handleSkip}
                bsStyle="primary">
                Not Interested
            </Button>
        );

        return (
            <div className="recommended movie-item" id={this.props.movieId}>
                <div className="content-box">
                    <div className="left">
                        {this.poster}
                    </div>
                    <div className="right">
                        <h3 className="title">
                            <strong>{this.props.movieDetail.title}</strong>
                            {this.props.movieDetail.year}
                        </h3>
                        <div className="plot">
                            {this.props.movieDetail.plot}
                        </div>
                        <div className="rating-toolbar" >
                            <div className="star-toolbar-container">
                                <Rating
                                    fractions={2}
                                    onClick={this.handleRatingClick}
                                    empty={'fa fa-star-o fa-2x'}
                                    full={'fa fa-star fa-2x'}
                                    color={'yellow'} />
                            </div>
                            <div className="button-container">
                                {buttons}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    get mostViewedItemContent() {
        const titleString = this.props.movieDetail.title + ' - ' + this.props.movieDetail.year;
        const popover = (
            <Popover id="popover-trigger-click-root-close" title={titleString}>
                {this.props.movieDetail.plot}
            </Popover>
        );

        return (
            <div className="most-viewed movie-item" id={this.props.movieId}>
                <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={popover}>
                    {this.poster}
                </OverlayTrigger>
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
            </div>
        );
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

    render() {
        if (this.props.rating) {
            return this.ratedItemContent;
        }

        if (this.props.isRecommendation) {
            return this.recommendedItemContent;
        }

        return this.mostViewedItemContent;
    }
}

MovieItem.defaultProps = {
    rating: undefined,
    movieDetail: {
        isDefaultProp: true,
        title: 'Loading...',
        year: '....',
        plot: 'Loading...'
    },
    movieTrailers: undefined
};

MovieItem.propTypes = {
    movieId: React.PropTypes.number.isRequired,
    imdbId: React.PropTypes.string.isRequired,
    isRecommendation: React.PropTypes.bool.isRequired,
    rating: React.PropTypes.number,
    movieDetail: React.PropTypes.object,
    movieTrailers: React.PropTypes.array,
    dispatchSkipMovie: React.PropTypes.func.isRequired,
    dispatchRecordMovieRating: React.PropTypes.func.isRequired,
    dispatchMovieTrailerFetch: React.PropTypes.func.isRequired,
    dispatchMovieDetailFetch: React.PropTypes.func.isRequired
};

export default MovieItem;
