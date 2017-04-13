'use strict';

// Copyright 2017 Consilium
// Author(s): Calvin Feng

import { SKIP_MOVIE } from '../../actions/movies';

// Key Actions - Fetch
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
