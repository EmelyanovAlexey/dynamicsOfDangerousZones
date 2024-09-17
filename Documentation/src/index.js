import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router';

import reportWebVitals from './reportWebVitals';
import configureStore from './Store';
import App from './App';
import createAPIHost from './Utils/createAPIHost';

import './index.css';

function initializeApplication() {
  const history = createBrowserHistory('/home');
  const store = configureStore(history, createAPIHost());
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
  );
}

initializeApplication();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
