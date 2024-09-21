/* eslint-disable no-unused-vars */
import { put } from 'redux-saga/effects';
import { createAction, createReducer } from 'redux-smart-actions';
import { createActionType } from '../Utils';
import { addStatusPageAction } from './main';

const MODULE_NAME = 'api';

// Секция с константами типов действий
// инициализация
const INIT_MAIN_TYPE = createActionType(MODULE_NAME, 'init_main');

const FETCH_API_TYPE = createActionType(MODULE_NAME, 'fetch_api');
const SAVE_API_TYPE = createActionType(MODULE_NAME, 'save_api');
const LOADING_API_TYPE = createActionType(MODULE_NAME, 'loading_api');

// Секция с действиями
export const initMainAction = createAction(INIT_MAIN_TYPE, (data) => ({
  payload: data,
}));
export const saveApiAction = createAction(SAVE_API_TYPE, (data) => ({
  payload: data,
}));
export const loadingApiAction = createAction(LOADING_API_TYPE, (data) => ({
  payload: data,
}));

export const fetchApiAction = createAction(FETCH_API_TYPE, () => ({
  request: {
    url: '/openapi.json',
  },
  meta: {
    onSuccess: (response, action, store) => {
      const { dispatch } = store;
      dispatch(saveApiAction(response.data));
      return response;
    },
    onError: (status, err, store) => {
      const { dispatch } = store;
      dispatch(
        addStatusPageAction({
          title: 'Ошибка',
          description: 'посты не были получены',
          status: 'error',
        }),
      );
    },
  },
}));

// Секция с сагами
function* rootSaga() {
  const data = {
    loading: false,
    data: null,
  };

  yield put(initMainAction(data));
}

// Секция работы локального хранилища (создаётся при необходимости)
const initialState = '';

const reducer = createReducer(
  {
    [initMainAction]: (state, action) => action.payload,
    [saveApiAction]: (state, action) => {
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    },
    [loadingApiAction]: (state, action) => {
      return {
        ...state,
        loading: action.payload,
      };
    },
  },
  initialState,
);

export default {
  rootSaga,
  reducer,
};
