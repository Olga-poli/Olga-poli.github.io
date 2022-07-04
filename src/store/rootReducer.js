import { combineReducers } from 'redux';
import testSlice from './slices/catalog.slice';

const rootReducer = combineReducers({
  testSlice,
});

export default rootReducer;
