import { combineReducers } from 'redux';
import { catalogReducer } from './slices/catalog.slice';
import { actorsReducer } from './slices/actors.slice';

const rootReducer = combineReducers({
  catalogReducer, actorsReducer,
});

export default rootReducer;
