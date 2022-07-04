import { configureStore } from '@reduxjs/toolkit';
import catalogReducer from './slices/catalog.slice';

const customThunk = (store) => (dispatch) => (action) => {
  if (typeof action === 'function') {
    action(store.dispatch, store.getState);
  } else {
    dispatch(action);
  }
};

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

export const store = configureStore({
  reducer: { catalogReducer },
  middleware: [customThunk, customLogger],
  devTools: true,
  preloadedState: {},
});

export default store;
