'use strict';

/**
 * @copyright Consilium, 2017
 * @author Calvin Feng
 */

import request from 'axios';

/* global XSRF_TOKEN */
export const USER_PREFERENCE_FETCH_START = 'USER_PREFERENCE_FETCH_START';
export const USER_PERFERENCE_FETCH_SUCCESS = 'USER_PERFERENCE_FETCH_SUCCESS';
export const USER_PREFERENCE_FETCH_FAIL = 'USER_PREFERENCE_FETCH_FAIL';

const userPreferenceFetchStart = () => {
    return {
        type: USER_PREFERENCE_FETCH_START
    };
};

const userPreferenceFetchSuccess = (data, imdbId) => {
    return {
        type: USER_PERFERENCE_FETCH_SUCCESS,
        data,
        imdbId
    };
};

const userPreferenceFetchFail = (error) => {
    return {
        type: USER_PREFERENCE_FETCH_FAIL,
        error
    };
};

export const userPreferenceFetch = (movieRatings) => (dispatch) => {
    dispatch(userPreferenceFetchStart());
    const config = {
        headers:
        {
            'X-CSRF-Token': XSRF_TOKEN
        }
    };
    // TODO: Don't store it in window!!!
    return request
        .post('api/users/preference', {
            movie_ratings: movieRatings
        }, config)
        .then((res) => {
            debugger
            dispatch(userPreferenceFetchSuccess(res.data));
        })
        .catch((error) => {
            dispatch(userPreferenceFetchFail(error));
        });
};
