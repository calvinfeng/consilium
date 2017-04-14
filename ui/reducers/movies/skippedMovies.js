'use strict';

/**
 * @copyright Consilium, 2017
 * @author Calvin Feng
 */

import { SKIP_MOVIE } from '../../actions/movies';


export default function skippedMoviesReducer(state = {}, action) {
    switch (action.type) {

        case SKIP_MOVIE:
            const skippedMovies = {};
            skippedMovies[action.movieId] = true;
            return Object.assign({}, state, skippedMovies);

        default:
            return state;
    }
}
