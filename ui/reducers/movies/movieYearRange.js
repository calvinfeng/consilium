'use strict';

/**
 * @copyright Consilium, 2017
 * @author Calvin Feng
 */

import { SET_MOVIE_YEAR_RANGE } from '../../actions/movieYearRange';

const defaultState = {
    minYear: 1930,
    maxYear: 2016
};

export default function movieYearRangeReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_MOVIE_YEAR_RANGE:

            return Object.assign({}, state, {
                minYear: action.minYear,
                maxYear: action.maxYear
            });

        default:
            return state;
    }
}
