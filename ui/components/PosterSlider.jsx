'use strict';

// Copyright 2017 Consilium
// Author(s): Calvin Feng

import React            from 'react';
import { Carousel }     from 'react-bootstrap';
import { CarouselItem } from 'react-bootstrap';

class PosterSlider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posters: []
        };
    }

    componentWillReceiveProps(nextProps) {
        const selectedMovieIds = Object.keys(nextProps.movies).filter((movieId) => {
            const movie = nextProps.movies[movieId];
            if (nextProps.movieDetails[movie.imdbId]) {
                return true;
            }
            return false;
        });

        const posters = selectedMovieIds.map((movieId) => {
            const movie = nextProps.movies[movieId];
            return nextProps.movieDetails[movie.imdbId].poster;
        });

        this.setState({ posters });
    }

    get arePostersLoaded() {
        return this.state.posters.length === Object.keys(this.props.movies).length;
    }

    get carouselItems() {
        const numberPerRow = 4;
        const carouselItems = [];
        for (let i = 0; i < this.state.posters.length; i += 1) {
            if (i % numberPerRow === 0) {
                let j = i;
                const posterRow = [];
                while (j < i + numberPerRow && j < this.state.posters.length) {
                    posterRow.push(<img alt="movie-poster" src={this.state.posters[j]} key={j} />);
                    j += 1;
                }
                carouselItems.push(
                    <CarouselItem key={i}>
                        <div className="item-container">
                            {posterRow}
                        </div>
                    </CarouselItem>
                );
            }
        }
        return carouselItems;
    }

    render() {
        if (this.arePostersLoaded) {
            return (
                <div className="poster-slider">
                    <Carousel interval={3000} style={{ backgroundColor: 'transparent' }}>
                        {this.carouselItems}
                    </Carousel>
                </div>
            );
        }

        return (
            <div className="poster-slider">
                <h1 className="title">Loading...</h1>
            </div>
        );
    }
}

PosterSlider.propTypes = {
    movies: React.PropTypes.object.isRequired,
    movieDetails: React.PropTypes.object.isRequired
};

export default PosterSlider;
