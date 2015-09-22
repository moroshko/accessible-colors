import React from 'react';
import ReactDOM from 'react-dom';
import { compose, applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import appReducer from 'reducers/app';
import TrackLinks from 'TrackLinks/TrackLinks';
import App from 'App/App';

let store, devToolsComponent;

if (__DEVTOOLS__) {
  const { devTools } = require('redux-devtools');
  const { DebugPanel, DevTools } = require('redux-devtools/lib/react');
  const DiffMonitor = require('redux-devtools-diff-monitor');

  store = compose(applyMiddleware(thunk), devTools())(createStore)(appReducer);

  devToolsComponent = (
    <DevTools store={store} monitor={DiffMonitor} />
  );
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
    {devToolsComponent}
  </div>,
  document.getElementById('accessible-colors')
);
