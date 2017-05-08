'use strict';

/**
 * @copyright Consilium, 2017
 * @author Calvin Feng
 */


import { RECORD_MOVIE_RATING }                   from '../../actions/movieRatings';
import { DELETE_MOVIE_RATING }                   from '../../actions/movieRatings';
import { SET_RATINGS_COUNT_NEEDED_FOR_FETCHING } from '../../actions/movieRatings';
import { SET_MOVIE_RATING_COUNT_PERCENTILE }     from '../../actions/movieRatings';


// Key Actions - Create, Update, Delete, Fetch
export function movieRatingsReducer(state = {}, action) {
    switch (action.type) {
        case RECORD_MOVIE_RATING:
            const newRatingRecord = action.data;
            return Object.assign({}, state, newRatingRecord);

        case DELETE_MOVIE_RATING:
            const movieId = action.movieId;
            const newState = state;
            delete newState[movieId];
            return newState;

        default:
            return state;
    }
}

export function ratingsCountNeededForFetchingReducer(state = 10, action) {
    switch (action.type) {
        case SET_RATINGS_COUNT_NEEDED_FOR_FETCHING:
            return action.count;

        default:
            return state;
    }
}

export function movieRatingCountPercentileReducer(state = 0, action) {
    switch (action.type) {
        case SET_MOVIE_RATING_COUNT_PERCENTILE:
            return action.percentile;

        default:
            return state;
    }
}
