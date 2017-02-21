'use strict';

// Copyright 2017 Consilium
// Author(s): Calvin Feng

import { MOVIE_RATING_RECORDED } from '../../actions/ratings';
import { MOVIE_RATING_DELETED }    from '../../actions/ratings';

// Key Actions - Create, Update, Delete, Fetch
export default function ratingsReducer(state = {}, action) {
    switch (action.type) {

        case MOVIE_RATING_RECORDED:
            const newRatingRecord = action.data;
            return Object.assign({}, state, newRatingRecord);

        case MOVIE_RATING_DELETED:
            const movieId = action.movieId;
            const newState = state;
            delete newState[movieId];
            return newState;

        default:
            return state;
    }
}
