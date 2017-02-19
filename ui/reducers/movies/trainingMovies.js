
import { TRAINING_MOVIES_FETCH_SUCCESS } from '../../actions/movies';
import { TRAINING_MOVIES_FETCH_FAIL }    from '../../actions/movies';


// Key Actions - Create, Update, Delete, Fetch
export function trainingMoviesReducer(state = {}, action) {
    let nextState = {};
    switch (action.type) {
        case TRAINING_MOVIES_FETCH_SUCCESS:
            return nextState;
        case TRAINING_MOVIES_FETCH_FAIL:
            return nextState;
        default:
            return nextState;
    }
}
