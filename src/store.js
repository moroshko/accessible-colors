import { compose, applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import appReducer from 'reducers/app';

export default function configureStore() {
  let store;

  if (DEV) {
    const { devTools } = require('redux-devtools');

    store = compose(applyMiddleware(thunk), devTools())(createStore)(appReducer);

    // Enable Webpack hot module replacement for reducers
    module.hot.accept(['./reducers/app.js', './reducers/color.js'], () => {
      const nextRootReducer = require('./reducers/app');

      store.replaceReducer(nextRootReducer);
    });
  } else {
    store = applyMiddleware(thunk)(createStore)(appReducer);
  }

  return store;
};
