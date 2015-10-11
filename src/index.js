import React from 'react';
import { render } from 'react-dom';
import configureStore from 'store';
import { Provider } from 'react-redux';
import TrackLinks from 'TrackLinks/TrackLinks';
import App from 'App/App';

const store = configureStore();

let devTools;

if (DEV) {
  const { DevTools } = require('redux-devtools/lib/react');
  const DiffMonitor = require('redux-devtools-diff-monitor');

  devTools = (
    <DevTools store={store} monitor={DiffMonitor} />
  );
}

render(
  <div>
    <TrackLinks>
      <Provider store={store}>
        <App />
      </Provider>
    </TrackLinks>
    {devTools}
  </div>,
  document.getElementById('accessible-colors')
);
