'use strict';

// Copyright 2017 Consilium
// Author(s): Calvin Feng

import { MOST_VIEWED_MOVIES_FETCH_SUCCESS } from '../../actions/movies';
import { MOST_VIEWED_MOVIES_FETCH_FAIL }    from '../../actions/movies';

// Key Actions - Fetch
export default function trainingMoviesReducer(state = {}, action) {
    switch (action.type) {

        case MOST_VIEWED_MOVIES_FETCH_SUCCESS:
            const movieList = action.movies;

            const mostViewedMovies = {};
            movieList.forEach((movie) => {
                mostViewedMovies[movie.id] = movie;
            });

            return Object.assign({}, state, mostViewedMovies);

        case MOST_VIEWED_MOVIES_FETCH_FAIL:
            return state;

        default:
            return state;
    }
}
