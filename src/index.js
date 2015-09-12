import React from 'react';
import ReactDOM from 'react-dom';
import { compose, applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import appReducer from 'reducers/app';
import TrackLinks from 'TrackLinks/TrackLinks';
import App from 'App/App';

let store, debugPanel;

if (__DEVTOOLS__) {
  //const { devTools } = require('redux-devtools');
  //const { DebugPanel, DevTools, LogMonitor } = require('redux-devtools/lib/react');

  store = compose(applyMiddleware(thunk)/*, devTools()*/)(createStore)(appReducer);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('reducers/app', () => {
      const nextRootReducer = require('reducers/app');

      store.replaceReducer(nextRootReducer);
    });
  }

  /*debugPanel = (
    <DebugPanel top left bottom>
      <DevTools store={store} monitor={LogMonitor} />
    </DebugPanel>
  );*/
} else {
  store = applyMiddleware(thunk)(createStore)(appReducer);
}

ReactDOM.render(
  <div>
    <TrackLinks>
      <Provider store={store}>
        <App />
      </Provider>
    </TrackLinks>
    {debugPanel}
  </div>,
  document.getElementById('accessible-colors')
);
