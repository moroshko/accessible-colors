import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import appReducer from 'reducers/app';

export default function configureStore() {
  return createStore(appReducer, applyMiddleware(thunk));
};
