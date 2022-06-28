import { combineReducers } from 'redux';
import movieItemsReducer from './reducers/movieItemsReducer';

const rootReducer = combineReducers({
  appReducer: movieItemsReducer,
});

export default rootReducer;
