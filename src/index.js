import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import appReducer from 'flux/reducers/app';
import App from 'App/App';

let store, debugPanel;

if (__DEVTOOLS__) {
  const { compose } = require('redux');
  const { devTools } = require('redux-devtools');
  const { DebugPanel, DevTools } = require('redux-devtools/lib/react');
  const DiffMonitor = require('redux-devtools-diff-monitor');

  store = compose(devTools(), createStore)(appReducer);

  debugPanel = (
    <DebugPanel top left bottom>
      <DevTools store={store} monitor={DiffMonitor} />
    </DebugPanel>
  );
} else {
  store = createStore(appReducer);
}

ReactDOM.render(
  <div>
    <Provider store={store}>
      {() => <App />}
    </Provider>
    {debugPanel}
  </div>,
  document.getElementById('accessible-colors')
);
