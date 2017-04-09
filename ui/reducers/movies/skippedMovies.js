'use strict';

// Copyright 2017 Consilium
// Author(s): Calvin Feng

import { MOVIE_SKIP_SUCCESS } from '../../actions/movies';

// Key Actions - Fetch
export default function skippedMoviesReducer(state = {}, action) {
    switch (action.type) {

        case MOVIE_SKIP_SUCCESS:
            const skippedMovies = Object.create(null);
            skippedMovies[action.movieId] = true;
            return Object.assign({}, state, skippedMovies);

        default:
            return state;
    }
}
