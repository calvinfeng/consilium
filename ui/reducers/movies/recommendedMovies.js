'use strict';

// Copyright 2017 Consilium
// Author(s): Calvin Feng

import { RECOMMENDED_MOVIES_FETCH_SUCCESS } from '../../actions/movies';
import { RECOMMENDED_MOVIES_FETCH_FAIL }    from '../../actions/movies';

export default function recommendedMoviesReducer(state = {}, action) {
    switch (action.type) {

        case RECOMMENDED_MOVIES_FETCH_SUCCESS:
            const movies = action.movies;
            debugger
            return Object.assign({}, state);

        case RECOMMENDED_MOVIES_FETCH_FAIL:
            return state;

        default:
            return state;
    }
}
