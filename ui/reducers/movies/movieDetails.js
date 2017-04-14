'use strict';

/**
 * @copyright Consilium, 2017
 * @author Calvin Feng
 */

import { MOVIE_DETAIL_FETCH_SUCCESS } from '../../actions/movieDetails';
import { MOVIE_DETAIL_FETCH_FAIL }    from '../../actions/movieDetails';


export default function movieDetailsReducer(state = {}, action) {
    switch (action.type) {

        case MOVIE_DETAIL_FETCH_SUCCESS:
            const data = action.data;
            const newDetail = {};
            newDetail[data.imdb_id] = {
                title: data.title,
                year: data.release_date.slice(0, 4),
                plot: data.overview,
                poster: `https://image.tmdb.org/t/p/w300${data.poster_path}`
            };
            return Object.assign({}, state, newDetail);

        case MOVIE_DETAIL_FETCH_FAIL:
            return state;

        default:
            return state;
    }
}
