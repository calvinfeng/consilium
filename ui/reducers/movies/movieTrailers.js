'use strict';

/**
 * @copyright Consilium, 2017
 * @author Calvin Feng
 */

import { MOVIE_TRAILER_FETCH_SUCCESS } from '../../actions/movieTrailers';
import { MOVIE_TRAILER_FETCH_FAIL }    from '../../actions/movieTrailers';


export default function movieTrailersReducer(state = {}, action) {
    switch (action.type) {

        case MOVIE_TRAILER_FETCH_SUCCESS:
            const trailerSearchResults = action.data.results;

            const videoSourceURLs = [];
            trailerSearchResults.forEach((trailerSearchResult) => {
                if (trailerSearchResult.site === 'YouTube') {
                    videoSourceURLs.push(`https://www.youtube.com/watch?v=${trailerSearchResult.key}`);
                }
            });

            const trailerMap = {};

            if (videoSourceURLs.length > 0) {
                trailerMap[action.imdbId] = videoSourceURLs;
            }

            return Object.assign({}, state, trailerMap);

        case MOVIE_TRAILER_FETCH_FAIL:
            return state;

        default:
            return state;
    }
}
