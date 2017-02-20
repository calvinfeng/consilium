'use strict';

// Copyright 2017 Consilium
// Author(s): Calvin Feng

// Thirdparty imports
import request    from 'axios';

export const MOVIE_DETAIL_FETCH_SUCCESS = 'MOVIE_DETAIL_FETCH_SUCCESS';
export const MOVIE_DETAIL_FETCH_FAIL = 'MOVIE_DETAIL_FETCH_FAIL';

const movieDetailFetchSuccess = (data) => {
    return {
        type: MOVIE_DETAIL_FETCH_SUCCESS,
        data
    };
};

const movieDetailFetchFail = (error) => {
    return {
        type: MOVIE_DETAIL_FETCH_FAIL,
        error: error
    };
};

// TODO: Mask API Key using ENV variable
export const movieDetailFetch = (imdbId) => (dispatch) => {
    const config = {
        params: {
            api_key: '2afddf218bfb5d06ef460cc103af69bc'
        }
    };

    return request
        .get(`https://api.themoviedb.org/3/movie/${imdbId}`, config)
        .then((res) => {
            dispatch(movieDetailFetchSuccess(res.data));
        })
        .catch((error) => {
            dispatch(movieDetailFetchFail(error));
        });
};
