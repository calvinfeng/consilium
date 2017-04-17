'use strict';

/**
 * @copyright Consilium, 2017
 * @author Calvin Feng
 */

import { RECOMMENDED_MOVIES_FETCH_START }   from '../../actions/movies';
import { RECOMMENDED_MOVIES_FETCH_SUCCESS } from '../../actions/movies';
import { RECOMMENDED_MOVIES_FETCH_FAIL }    from '../../actions/movies';

const defaultState = {
    isFetching: false,
    error: false,
    items: {}
};

export default function recommendedMoviesReducer(state = defaultState, action) {
    switch (action.type) {
        case RECOMMENDED_MOVIES_FETCH_START:
            return Object.assign({}, state, {
                isFetching: true,
                error: false
            });

        case RECOMMENDED_MOVIES_FETCH_SUCCESS:
            const movieList = action.movies;

            const items = {};
            movieList.forEach((movie) => {
                items[movie.id] = movie;
            });

            return Object.assign({}, state, { items }, {
                isFetching: false,
                error: false
            });

        case RECOMMENDED_MOVIES_FETCH_FAIL:
            return Object.assign({}, state, {
                isFetching: false,
                error: true
            });

        default:
            return state;
    }
}
