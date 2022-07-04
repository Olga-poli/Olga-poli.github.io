import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './rootReducer';

const customLogger = (store) => (dispatch) => (action) => {
  console.group(
    `%c${action.type}`,
    'color:#a8329e;font-family:system-ui;font-size:.75rem;font-weight:bold',
    `${new Date(Date.now()).toTimeString().split(' ')[0]}`,
  );
  console.log('%cPrevious state:', 'font-family:system-ui;font-size:.75rem;font-weight:bold', store.getState());
  dispatch(action);
  console.log('%cAction:', 'color:#57d100;font-family:system-ui;font-size:.75rem;font-weight:bold', action);
  console.log('%cNext state:', 'font-family:system-ui;font-size:.75rem;font-weight:bold', store.getState());
  console.groupEnd();
};

const store = createStore(
  rootReducer,
  undefined,
  composeWithDevTools(applyMiddleware(customLogger)),
);

export default store;
