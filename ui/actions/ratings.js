'use strict';

// Copyright 2017 Consilium
// Author(s): Calvin Feng

// Thirdparty imports

export const MOVIE_RATING_RECORDED = 'MOVIE_RATING_RECORDED';
export const MOVIE_RATING_DELETED = 'MOVIE_RATING_DELETED';

export const movieRatingRecord = (movieId, rating) => (dispatch) => {
    const ratingRecord = {};
    ratingRecord[movieId] = rating;
    dispatch({
        type: MOVIE_RATING_RECORDED,
        data: ratingRecord
    });
};

export const movieRatingDelete = (movieId) => (dispatch) => {
    dispatch({
        type: MOVIE_RATING_DELETED,
        movieId: movieId
    });
};
