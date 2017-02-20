'use strict';

// Copyright 2017 Consilium
// Author(s): Calvin Feng

// Thirdparty imports
import request    from 'axios';

export const TRAINING_MOVIES_FETCH_SUCCESS = 'TRAINING_MOVIES_FETCH_SUCCESS';
export const TRAINING_MOVIES_FETCH_FAIL = 'TRAINING_MOVIES_FETCH_FAIL';

const trainingMoviesFetchSuccess = (data) => {
    return {
        type: TRAINING_MOVIES_FETCH_SUCCESS,
        data
    };
};

const trainingMoviesFetchFail = (error) => {
    return {
        type: TRAINING_MOVIES_FETCH_FAIL,
        error
    };
};

export const trainingMoviesFetch = () => (dispatch) => {
    // TODO: Rename new_visitor to training_movies
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

const recommendedMoviesFetchSuccess = (data) => {
    return {
        type: RECOMMENDED_MOVIES_FETCH_SUCCESS,
        data
    };
}

const recommendedMoviesFetchFail = (error) => {
    return {
        type: RECOMMENDED_MOVIES_FETCH_FAIL,
        error
    };
}

export const recommendedMoviesFetch = (movieRatings) => (dispatch) => {
    return request
        .get('api/recommender/')
}
