
// Thirdparty imports
import { combineReducers }      from 'redux';

// Consilium imports
import trainingMoviesReducer    from './movies/trainingMovies';
import recommendedMoviesReducer from './movies/recommendedMovies';
import ratingsReducer           from './users/ratings';
import movieDetailsReducer      from './movies/movieDetails';

export default combineReducers({
    trainingMovies: trainingMoviesReducer,
    recommendedMovies: recommendedMoviesReducer,
    movieRatings: ratingsReducer,
    movieDetails: movieDetailsReducer
});
