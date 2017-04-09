'use strict';

// Copyright 2017 Consilium
// Author(s): Calvin Feng

/* global XSRF_TOKEN */
// Thirdparty imports
import request    from 'axios';

export const MOST_VIEWED_MOVIES_FETCH_SUCCESS = 'MOST_VIEWED_MOVIES_FETCH_SUCCESS';
export const MOST_VIEWED_MOVIES_FETCH_FAIL = 'MOST_VIEWED_MOVIES_FETCH_FAIL';

const mostViewedMoviesFetchSuccess = (movies) => {
    return {
        type: MOST_VIEWED_MOVIES_FETCH_SUCCESS,
        movies
    };
};

const mostViewedMoviesFetchFail = (error) => {
    return {
        type: MOST_VIEWED_MOVIES_FETCH_FAIL,
        error
    };
};

export const mostViewedMoviesFetch = () => (dispatch) => {
    return request
        .get('api/movies/most_viewed')
        .then((res) => {
            dispatch(mostViewedMoviesFetchSuccess(res.data));
        })
        .catch((error) => {
            dispatch(mostViewedMoviesFetchFail(error));
        });
};

export const RECOMMENDED_MOVIES_FETCH_SUCCESS = 'RECOMMENDED_MOVIES_FETCH_SUCCESS';
export const RECOMMENDED_MOVIES_FETCH_FAIL = 'RECOMMENDED_MOVIES_FETCH_FAIL';

const recommendedMoviesFetchSuccess = (movies) => {
    return {
        type: RECOMMENDED_MOVIES_FETCH_SUCCESS,
        movies
    };
};

const recommendedMoviesFetchFail = (error) => {
    return {
        type: RECOMMENDED_MOVIES_FETCH_FAIL,
        error
    };
};

export const recommendedMoviesFetch = (movieRatings) => (dispatch) => {
    // TODO: Don't store it in window!!!
    const config = {
        headers:
        {
            'X-CSRF-Token': XSRF_TOKEN
        }
    };
    return request
        .post('api/movies/recommendations', {
            movie_ratings: movieRatings
        }, config)
        .then((res) => {
            dispatch(recommendedMoviesFetchSuccess(res.data));
        })
        .catch((error) => {
            dispatch(recommendedMoviesFetchFail(error));
        });
};

export const MOVIE_SKIP_SUCCESS = 'MOVIE_SKIP_SUCCESS';

const movieSkipSuccess = (movieId) => {
    return {
        type: MOVIE_SKIP_SUCCESS,
        movieId
    };
};

export const movieSkip = (movieId) => (dispatch) => {
    dispatch(movieSkipSuccess(movieId));
};
