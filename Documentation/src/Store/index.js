import { handleRequests } from '@redux-requests/core';
import axios from 'axios';
import { createDriver } from '@redux-requests/axios';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';

import main from './main';
import post from './post';
import api from './api';
import statisctic from './statisctic';
import auth from './auth';

/**
 * Объединяет все саги из сторов
 * @param  {...any} args общие аргументы
 */
function* rootSaga(...args) {
  yield all([
    // Добавлять root саги из сторов ниже
    main.rootSaga(...args),

    post.rootSaga(...args),
    api.rootSaga(...args),
    statisctic.rootSaga(...args),
    auth.rootSaga(...args),
  ]);
}

/**
 * Настраивает работу хранилища данных
 * @param {Object} history контроллер управления историей браузера
 * @param {String} host API хост
 */
export default function configureStore(history, host) {
  const AUTHORIZATION_HEADER = 'Authorization';

  const storedAuthDataText = localStorage.getItem('AUTH_DATA');
  let storedAuthData = '';

  if (storedAuthDataText) {
    storedAuthData = JSON.parse(storedAuthDataText);
    storedAuthData = storedAuthData?.access_token;
  }

  const axiosInstance = axios.create({
    baseURL: host,
    withCredentials: true,
  });

  axiosInstance.interceptors.request.use((config) => {
    return {
      ...config,
      headers: {
        ...config.headers,
        common: {
          ...config.headers.common,
          [AUTHORIZATION_HEADER]: `Bearer ${storedAuthData}`,
        },
      },
    };
  });

  const { requestsReducer, requestsMiddleware } = handleRequests({
    driver: createDriver(axiosInstance),
  });

  const reducers = combineReducers({
    requests: requestsReducer,
    router: connectRouter(history),
    // Добавлять редюсеры из сторов ниже
    main: main.reducer,
    post: post.reducer,
    api: api.reducer,
    statisctic: statisctic.reducer,
    auth: auth.reducer,
  });

  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [
    sagaMiddleware,
    routerMiddleware(history),
    ...requestsMiddleware,
  ];

  const composeEnhancers =
    (typeof window !== 'undefined' &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

  const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(...middlewares)),
  );

  sagaMiddleware.run(rootSaga);

  return store;
}
