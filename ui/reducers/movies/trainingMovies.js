
import { TRAINING_MOVIES_FETCH_SUCCESS } from '../../actions/movies';
import { TRAINING_MOVIES_FETCH_FAIL }    from '../../actions/movies';


// Key Actions - Create, Update, Delete, Fetch
export function trainingMoviesReducer(state = {}, action) {
    switch (action.type) {

        case TRAINING_MOVIES_FETCH_SUCCESS:
            const movieList = action.data;

            const trainingMovies = {};
            movieList.forEach((movie) => {
                trainingMovies[movie.id] = movie;
            });

            return Object.assign({}, state, trainingMovies);

        case TRAINING_MOVIES_FETCH_FAIL:
            return state;

        default:
            return {};
    }
}
