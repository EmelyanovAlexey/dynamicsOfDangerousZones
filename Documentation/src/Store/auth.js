/* eslint-disable camelcase */
/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
import { put } from 'redux-saga/effects';
import { createAction, createReducer } from 'redux-smart-actions';
import { parseJWT } from '../Utils/JWT';

import { createActionType } from '../Utils';
import { addStatusPageAction } from './main';

const MODULE_NAME = 'auth';

// Секция с константами типов действий
// инициализация
const INIT_MAIN_TYPE = createActionType(MODULE_NAME, 'init_main');

const FETCH_AUTH_TYPE = createActionType(MODULE_NAME, 'fetch_auth_user');
const FETCH_REG_TYPE = createActionType(MODULE_NAME, 'fetch_reg_user');
const SAVE_USER_TYPE = createActionType(MODULE_NAME, 'save_user');
const LOADING_TYPE = createActionType(MODULE_NAME, 'loading_user');

// Секция с действиями
export const initMainAction = createAction(INIT_MAIN_TYPE, (data) => ({
  payload: data,
}));
export const saveUserAction = createAction(SAVE_USER_TYPE, (data) => ({
  payload: data,
}));
export const loadingAction = createAction(LOADING_TYPE, (data) => ({
  payload: data,
}));

export const authAction = createAction(FETCH_AUTH_TYPE, (data) => ({
  request: {
    url: '/login',
  },
  meta: {
    onRequest: (response, action, store) => {
      return {
        url: '/login',
        method: 'POST',
        data,
      };
    },
    onSuccess: (response, action, store) => {
      const { dispatch } = store;
      dispatch(loadingAction(false));
      dispatch(saveUserAction({ ...response.data, email: data.email }));
      dispatch(
        addStatusPageAction({
          title: 'Успешно',
          description: 'Вы успешно авторизованы',
          status: 'good',
        }),
      );
      return response;
    },
    onError: (status, err, store) => {
      const { dispatch } = store;
      const errorMessage = err?.response?.data?.detail || 'Вы не авторизованы';
      dispatch(
        addStatusPageAction({
          title: 'Ошибка',
          description: errorMessage,
          status: 'error',
        }),
      );
    },
  },
}));

export const registrationAction = createAction(FETCH_REG_TYPE, (data) => ({
  request: {
    url: '/register',
  },
  meta: {
    onRequest: (response, action, store) => {
      return {
        url: '/register',
        method: 'POST',
        data: { ...data, role_id: 1 },
      };
    },
    onSuccess: (response, action, store) => {
      const { dispatch } = store;
      dispatch(loadingAction(false));
      dispatch(saveUserAction({ ...response.data, email: data.email }));
      dispatch(
        addStatusPageAction({
          title: 'Успешно',
          description: 'Вы успешно зарегистрированы',
          status: 'good',
        }),
      );
      return response;
    },
    onError: (status, err, store) => {
      const { dispatch } = store;
      dispatch(
        addStatusPageAction({
          title: 'Ошибка',
          description: 'Ошибка запроса',
          status: 'error',
        }),
      );
    },
  },
}));

// Секция с сагами
function* rootSaga() {
  const data = {
    data: null,
    loading: false,
  };

  yield put(initMainAction(data));
}

// Секция работы локального хранилища (создаётся при необходимости)
const initialState = '';

const reducer = createReducer(
  {
    [initMainAction]: (state, action) => action.payload,
    [loadingAction]: (state, action) => {
      return {
        ...state,
        loading: action.payload,
      };
    },
    [loadingAction]: (state, action) => {
      return {
        ...state,
        loading: action.payload,
      };
    },
    [saveUserAction]: (state, action) => {
      localStorage.setItem('AUTH_DATA', JSON.stringify(action.payload));

      const role = parseJWT(action.payload.access_token)?.role;

      return {
        ...state,
        data: { ...action.payload, role },
      };
    },
  },
  initialState,
);

export default {
  rootSaga,
  reducer,
};
