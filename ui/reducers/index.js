
// Thirdparty imports
import { combineReducers } from 'redux';

// Consilium imports
import { trainingMoviesReducer } from './movies/trainingMovies';

export default combineReducers({
    trainingMovies: trainingMoviesReducer
});
