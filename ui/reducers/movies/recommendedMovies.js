'use strict';

// Copyright 2017 Consilium
// Author(s): Calvin Feng

import { RECOMMENDED_MOVIES_FETCH_SUCCESS } from '../../actions/movies';
import { RECOMMENDED_MOVIES_FETCH_FAIL }    from '../../actions/movies';

// Key Actions - Fetch
export default function recommendedMoviesReducer(state = {}, action) {
    switch (action.type) {

        case RECOMMENDED_MOVIES_FETCH_SUCCESS:
            const movieList = action.movies;

            const recommendedMovies = {};
            movieList.forEach((movie) => {
                recommendedMovies[movie.id] = movie;
            });

            return Object.assign({}, state, recommendedMovies);

        case RECOMMENDED_MOVIES_FETCH_FAIL:
            return state;

        default:
            return state;
    }
}
