import { combineReducers } from 'redux';
import catalogReducer from './slices/catalog.slice';

const rootReducer = combineReducers({
  catalogReducer,
});

export default rootReducer;
