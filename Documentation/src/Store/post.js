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

export const fetchPostAction = createAction(FETCH_POST_TYPE, () => ({
  request: {
    url: 'https://jsonplaceholder.typicode.com/posts',
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
          description: 'Папки не были получены',
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
  },
  initialState,
);

export default {
  rootSaga,
  reducer,
};
