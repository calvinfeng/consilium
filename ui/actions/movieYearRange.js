'use strict';

/**
 * @copyright Consilium, 2017
 * @author Calvin Feng
 */

// Thirdparty imports

export const SET_MOVIE_YEAR_RANGE = 'SET_MOVIE_YEAR_RANGE';

export const setMovieYearRange = (minYear, maxYear) => (dispatch) => {
    dispatch({
        type: SET_MOVIE_YEAR_RANGE,
        minYear,
        maxYear
    });
};
