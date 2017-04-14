'use strict';

/**
 * @copyright Consilium, 2017
 * @author Calvin Feng
 */

import request from 'axios';

export const MOVIE_TRAILER_FETCH_SUCCESS = 'MOVIE_TRAILER_FETCH_SUCCESS';
export const MOVIE_TRAILER_FETCH_FAIL = 'MOVIE_TRAILER_FETCH_FAIL';

const movieTrailerFetchSuccess = (data, imdbId) => {
    return {
        type: MOVIE_TRAILER_FETCH_SUCCESS,
        data,
        imdbId
    };
};

const movieTrailerFetchFail = (error) => {
    return {
        type: MOVIE_TRAILER_FETCH_FAIL,
        error
    };
};

export const movieTrailerFetch = (imdbId) => (dispatch) => {
    const config = {
        params: {
            api_key: '2afddf218bfb5d06ef460cc103af69bc'
        }
    };

    return request
        .get(`https://api.themoviedb.org/3/movie/${imdbId}/videos`, config)
        .then((res) => {
            dispatch(movieTrailerFetchSuccess(res.data, imdbId));
        })
        .catch((error) => {
            dispatch(movieTrailerFetchFail(error));
        });
};
