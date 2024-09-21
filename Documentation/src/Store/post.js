/* eslint-disable no-unused-vars */
import { put } from 'redux-saga/effects';
import { createAction, createReducer } from 'redux-smart-actions';

import { createActionType } from '../Utils';
import { getPost } from '../Adapters/PostAdapter';
import { addStatusPageAction } from './main';

const MODULE_NAME = 'post';

// Секция с константами типов действий
// инициализация
const INIT_MAIN_TYPE = createActionType(MODULE_NAME, 'init_main');

const FETCH_POST_TYPE = createActionType(MODULE_NAME, 'fetch_post_user');
const SAVE_POST_TYPE = createActionType(MODULE_NAME, 'save_post_user');
const LOADING_POST_TYPE = createActionType(MODULE_NAME, 'loading_post_user');

const INVENT_IMG_TYPE = createActionType(MODULE_NAME, 'invent_img_user');
const SAVE_INVENT_IMG_TYPE = createActionType(
  MODULE_NAME,
  'save_invent_img_user',
);

// Секция с действиями
export const initMainAction = createAction(INIT_MAIN_TYPE, (data) => ({
  payload: data,
}));
export const savePostAction = createAction(SAVE_POST_TYPE, (data) => ({
  payload: data,
}));
export const loadingPostAction = createAction(LOADING_POST_TYPE, (data) => ({
  payload: data,
}));
export const saveloadingPostAction = createAction(
  SAVE_INVENT_IMG_TYPE,
  (data) => ({
    payload: data,
  }),
);

// https://jsonplaceholder.typicode.com/posts
export const fetchPostAction = createAction(FETCH_POST_TYPE, () => ({
  request: {
    url: '/posts',
  },
  meta: {
    onSuccess: (response, action, store) => {
      const { dispatch } = store;
      dispatch(savePostAction(getPost(response.data)));
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

export const inventImgAction = createAction(INVENT_IMG_TYPE, (file) => ({
  request: {
    url: '/invert-image',
  },
  meta: {
    onRequest: (response, action, store) => {
      return {
        url: '/invert-image',
        method: 'POST',
        responseType: 'blob',
        data: file,
      };
    },
    onSuccess: (response, action, store) => {
      const { dispatch } = store;
      dispatch(saveloadingPostAction(response.data));
      return response;
    },
    onError: (status, err, store) => {
      const { dispatch } = store;
      dispatch(
        addStatusPageAction({
          title: 'Ошибка',
          description: 'ошибка инвертации изображения',
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
    post: [],
    img: null,
  };

  yield put(initMainAction(data));
}

// Секция работы локального хранилища (создаётся при необходимости)
const initialState = '';

const reducer = createReducer(
  {
    [initMainAction]: (state, action) => action.payload,
    [savePostAction]: (state, action) => {
      return {
        ...state,
        post: action.payload,
        loading: false,
      };
    },
    [loadingPostAction]: (state, action) => {
      return {
        ...state,
        loading: action.payload,
      };
    },
    [saveloadingPostAction]: (state, action) => {
      return {
        ...state,
        img: action.payload,
      };
    },
  },
  initialState,
);

export default {
  rootSaga,
  reducer,
};
