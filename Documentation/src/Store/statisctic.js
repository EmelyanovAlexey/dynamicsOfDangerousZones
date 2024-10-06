/* eslint-disable no-unused-vars */
import { put } from 'redux-saga/effects';
import { createAction, createReducer } from 'redux-smart-actions';

import { createActionType } from '../Utils';
import { getStat } from '../Adapters/StatisticAdapter';
import { addStatusPageAction } from './main';

const MODULE_NAME = 'statisctic';

// Секция с константами типов действий
// инициализация
const INIT_MAIN_TYPE = createActionType(MODULE_NAME, 'init_main');

const FETCH_POST_TYPE = createActionType(MODULE_NAME, 'fetch_statistic_user');
const SAVE_STATISTIC_TYPE = createActionType(
  MODULE_NAME,
  'save_statistic_user',
);
const LOADING_STATISTIC_TYPE = createActionType(
  MODULE_NAME,
  'loading_statistic_user',
);

// Секция с действиями
export const initMainAction = createAction(INIT_MAIN_TYPE, (data) => ({
  payload: data,
}));
export const saveStatisticAction = createAction(
  SAVE_STATISTIC_TYPE,
  (data) => ({
    payload: data,
  }),
);
export const loadingStatisticAction = createAction(
  LOADING_STATISTIC_TYPE,
  (data) => ({
    payload: data,
  }),
);

export const fetchStatisticAction = createAction(FETCH_POST_TYPE, () => ({
  request: {
    url: '/kpi/',
  },
  meta: {
    onSuccess: (response, action, store) => {
      const { dispatch } = store;
      dispatch(saveStatisticAction(getStat(response.data)));
      return response;
    },
    onError: (status, err, store) => {
      const { dispatch } = store;
      dispatch(
        addStatusPageAction({
          title: 'Ошибка',
          description: 'Статистика не были получены',
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
    statisctics: [],
  };

  yield put(initMainAction(data));
}

// Секция работы локального хранилища (создаётся при необходимости)
const initialState = '';

const reducer = createReducer(
  {
    [initMainAction]: (state, action) => action.payload,
    [saveStatisticAction]: (state, action) => {
      return {
        ...state,
        statisctics: action.payload,
        loading: false,
      };
    },
    [loadingStatisticAction]: (state, action) => {
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
