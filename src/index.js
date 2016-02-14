import React from 'react';
import { render } from 'react-dom';
import configureStore from 'store';
import { Provider } from 'react-redux';
import TrackLinks from 'TrackLinks/TrackLinks';
import App from 'App/App';

const store = configureStore();

render(
  <div>
    <TrackLinks>
      <Provider store={store}>
        <App />
      </Provider>
    </TrackLinks>
  </div>,
  document.getElementById('accessible-colors')
);
