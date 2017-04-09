'use strict';

// Copyright 2017 Consilium
// Author(s): Calvin Feng

// Thirdparty imports
import { combineReducers }      from 'redux';

// Consilium imports
import mostViewedMoviesReducer  from './movies/mostViewedMovies';
import recommendedMoviesReducer from './movies/recommendedMovies';
import skippedMoviesReducer     from './movies/skippedMovies';
import ratingsReducer           from './users/ratings';
import movieDetailsReducer      from './movies/movieDetails';

export default combineReducers({
    movieRatings: ratingsReducer,
    movieDetails: movieDetailsReducer,
    skippedMovies: skippedMoviesReducer,
    mostViewedMovies: mostViewedMoviesReducer,
    recommendedMovies: recommendedMoviesReducer
});
