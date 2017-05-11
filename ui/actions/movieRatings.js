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

export const SET_RATINGS_COUNT_NEEDED_FOR_FETCHING = 'SET_RATINGS_COUNT_NEEDED_FOR_FETCHING';

export const setRatingsCountNeededForFetching = (count) => (dispatch) => {
    dispatch({
        type: SET_RATINGS_COUNT_NEEDED_FOR_FETCHING,
        count
    });
};

export const SET_MOVIE_RATING_COUNT_PERCENTILE = 'SET_MOVIE_RATING_COUNT_PERCENTILE';

export const setMovieRatingCountPercentile = (percentile) => (dispatch) => {
    dispatch({
        type: SET_MOVIE_RATING_COUNT_PERCENTILE,
        percentile
    });
};
