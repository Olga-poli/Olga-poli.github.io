import { combineReducers } from 'redux';
import catalogReducer from './slices/catalog.slice';
// import { movieReducer } from './slices/movie.slice';

const rootReducer = combineReducers({
  catalogReducer,
});

export default rootReducer;
