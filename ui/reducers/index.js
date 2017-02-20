
// Thirdparty imports
import { combineReducers } from 'redux';

// Consilium imports
import trainingMoviesReducer from './movies/trainingMovies';
import ratingsReducer        from './users/ratings';

export default combineReducers({
    trainingMovies: trainingMoviesReducer,
    movieRatings: ratingsReducer
});
