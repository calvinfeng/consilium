'use strict';

/**
 * @copyright Consilium, 2017
 * @author Calvin Feng
 */

// Thirdparty imports
import request    from 'axios';

/* global XSRF_TOKEN */
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

export const RECOMMENDED_MOVIES_FETCH_START = 'RECOMMENDED_MOVIES_FETCH_START';
export const RECOMMENDED_MOVIES_FETCH_SUCCESS = 'RECOMMENDED_MOVIES_FETCH_SUCCESS';
export const RECOMMENDED_MOVIES_FETCH_FAIL = 'RECOMMENDED_MOVIES_FETCH_FAIL';

const recommendedMoviesFetchStart = () => {
    return {
        type: RECOMMENDED_MOVIES_FETCH_START
    };
};

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

export const recommendedMoviesFetch = (preferenceVector, yearRange, skippedMovies, movieRatings) => (dispatch) => {
    dispatch(recommendedMoviesFetchStart());
    const config = {
        headers:
        {
            'X-CSRF-Token': XSRF_TOKEN
        }
    };
    // TODO: Don't store it in window!!!
    return request
        .post('api/movies/recommendations', {
            movie_ratings: movieRatings,
            skipped_movies: skippedMovies,
            preference_vector: preferenceVector,
            min_year: yearRange.minYear,
            max_year: yearRange.maxYear
        }, config)
        .then((res) => {
            dispatch(recommendedMoviesFetchSuccess(res.data));
        })
        .catch((error) => {
            dispatch(recommendedMoviesFetchFail(error));
        });
};

// None-request type actions adapt a different naming convention
export const SKIP_MOVIE = 'SKIP_MOVIE';

export const skipMovie = (movieId) => (dispatch) => {
    dispatch({
        type: SKIP_MOVIE,
        movieId
    });
};
