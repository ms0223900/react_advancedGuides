import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { fetchPostsIfNeeded } from './actions';
import rootReducer from './reducers';

const loggerMiddleware = createLogger();

export const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware,
  )
);

store
  .dispatch(fetchPostsIfNeeded('reactjs'))
  .then(() => console.log(store.getState()));

