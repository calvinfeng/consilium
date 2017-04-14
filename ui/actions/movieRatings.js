'use strict';

/**
 * @copyright Consilium, 2017
 * @author Calvin Feng
 */

// Thirdparty imports

export const RECORD_MOVIE_RATING = 'RECORD_MOVIE_RATING';
export const DELETE_MOVIE_RATING = 'DELETE_MOVIE_RATING';

export const recordMovieRating = (movieId, rating) => (dispatch) => {
    const ratingRecord = {};
    ratingRecord[movieId] = rating;

    dispatch({
        type: RECORD_MOVIE_RATING,
        data: ratingRecord
    });
};

export const deleteMovieRating = (movieId) => (dispatch) => {
    dispatch({
        type: DELETE_MOVIE_RATING,
        movieId: movieId
    });
};
