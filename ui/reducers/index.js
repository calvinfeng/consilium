'use strict';

// Copyright 2017 Consilium
// Author(s): Calvin Feng

// Thirdparty imports
import { combineReducers }      from 'redux';

// Consilium imports
import mostViewedMoviesReducer  from './movies/mostViewedMovies';
import recommendedMoviesReducer from './movies/recommendedMovies';
import skippedMoviesReducer     from './movies/skippedMovies';
import movieDetailsReducer      from './movies/movieDetails';
import movieTrailersReducer     from './movies/movieTrailers';
import movieRatingsReducer      from './users/movieRatings';
import movieYearRangeReducer    from './movies/movieYearRange';

export default combineReducers({
    movieRatings: movieRatingsReducer,
    movieDetails: movieDetailsReducer,
    movieTrailers: movieTrailersReducer,
    movieYearRange: movieYearRangeReducer,
    skippedMovies: skippedMoviesReducer,
    mostViewedMovies: mostViewedMoviesReducer,
    recommendedMovies: recommendedMoviesReducer
});
