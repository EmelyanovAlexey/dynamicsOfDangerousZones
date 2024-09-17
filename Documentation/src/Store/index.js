import { handleRequests } from '@redux-requests/core';
import axios from 'axios';
import { createDriver } from '@redux-requests/axios';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';

import main from './main';
import folderPage from './folderPage';

/**
 * Объединяет все саги из сторов
 * @param  {...any} args общие аргументы
 */
function* rootSaga(...args) {
  yield all([
    // Добавлять root саги из сторов ниже
    main.rootSaga(...args),

    folderPage.rootSaga(...args),
  ]);
}

/**
 * Настраивает работу хранилища данных
 * @param {Object} history контроллер управления историей браузера
 * @param {String} host API хост
 */
export default function configureStore(history, host) {
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
    folderPage: folderPage.reducer,
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
