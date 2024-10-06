/* eslint-disable no-undef */
import { put } from 'redux-saga/effects';
import { createAction, createReducer } from 'redux-smart-actions';
import { createActionType } from '../Utils';

// Store для главного экрана (списка мероприятий)
const MODULE_NAME = 'main';

// Секция с константами типов действий
// инициализация
const INIT_MAIN_TYPE = createActionType(MODULE_NAME, 'init_main');

const ADD_STATUS_PAGE_TYPE = createActionType(MODULE_NAME, 'add_status_page');
const DELETE_STATUS_PAGE_TYPE = createActionType(
  MODULE_NAME,
  'delete_status_page',
);
const UPDATE_INFO_TIME_TYPE = createActionType(MODULE_NAME, 'update_info_time');

// Секция с действиями
export const initMainAction = createAction(INIT_MAIN_TYPE, (data) => ({
  payload: data,
}));

export const addStatusPageAction = createAction(
  ADD_STATUS_PAGE_TYPE,
  (data) => ({
    payload: data,
  }),
);
export const deleteStatusPageAction = createAction(
  DELETE_STATUS_PAGE_TYPE,
  (data) => ({
    payload: data,
  }),
);

export const updatePageAction = createAction(
  UPDATE_INFO_TIME_TYPE,
  (param) => ({
    request: {
      url: `/update-time-page/`, // URL для POST-запроса
      method: 'POST', // Метод POST
      responseType: 'json', // Ожидаем JSON ответ
      data: param, // Отправляем параметры
    },
    meta: {
      onRequest: () => {
        return {
          url: `/update-time-page/`,
          method: 'POST',
          responseType: 'json',
          data: param,
        };
      },
      onError: (status, err, store) => {
        const { dispatch } = store;
        dispatch(
          addStatusPageAction({
            title: 'Ошибка',
            description: 'Время не было зафиксировано',
            status: 'error',
          }),
        );
      },
    },
  }),
);

// Секция с сагами
function* rootSaga() {
  const data = {
    status: [],
  };

  yield put(initMainAction(data));
}

// Секция работы локального хранилища (создаётся при необходимости)
const initialState = '';

const reducer = createReducer(
  {
    [initMainAction]: (state, action) => action.payload,
    [addStatusPageAction]: (state, action) => {
      const arrStatus = [...state.status];
      arrStatus.push({
        id: new Date().toISOString(),
        status: action.payload.status,
        title: action.payload.title,
        description: action.payload.description,
      });
      return {
        ...state,
        status: arrStatus,
      };
    },
    [deleteStatusPageAction]: (state, action) => {
      const arrStatus = [];
      state.status.forEach((status) => {
        if (status.id !== action.payload) {
          arrStatus.push(status);
        }
      });
      return {
        ...state,
        status: arrStatus,
      };
    },
  },
  initialState,
);

export default {
  rootSaga,
  reducer,
};
