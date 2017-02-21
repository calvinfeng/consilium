'use strict';

// Copyright 2017 Consilium
// Author(s): Calvin Feng

// Thirdparty imports
import request    from 'axios';

export const TRAINING_MOVIES_FETCH_SUCCESS = 'TRAINING_MOVIES_FETCH_SUCCESS';
export const TRAINING_MOVIES_FETCH_FAIL = 'TRAINING_MOVIES_FETCH_FAIL';

const trainingMoviesFetchSuccess = (movies) => {
    return {
        type: TRAINING_MOVIES_FETCH_SUCCESS,
        movies
    };
};

const trainingMoviesFetchFail = (error) => {
    return {
        type: TRAINING_MOVIES_FETCH_FAIL,
        error
    };
};

export const trainingMoviesFetch = () => (dispatch) => {
    return request
        .get('api/recommender/training_movies')
        .then((res) => {
            dispatch(trainingMoviesFetchSuccess(res.data));
        })
        .catch((error) => {
            dispatch(trainingMoviesFetchFail(error));
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
            'X-CSRF-Token': window.xsrf_token
        }
    };
    return request
        .post('api/recommender/recommended_movies', {
            movie_ratings: movieRatings
        }, config)
        .then((res) => {
            dispatch(recommendedMoviesFetchSuccess(res.data));
        })
        .catch((error) => {
            dispatch(recommendedMoviesFetchFail(error));
        });
};
