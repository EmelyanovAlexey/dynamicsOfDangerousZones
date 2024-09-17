/* eslint-disable no-unused-vars */
import { all, put } from 'redux-saga/effects';
import { createAction, createReducer } from 'redux-smart-actions';
import { createActionType } from '../Utils';

import { addStatusPageAction } from './main';

// Store для главного экрана (списка мероприятий)
const MODULE_NAME = 'folderPage';

// ------------------- Секция с константами типов действий
// инициализация
const INIT_MAIN_TYPE = createActionType(MODULE_NAME, 'init_main');

// получить папки
const GET_FOLDERS_TYPE = createActionType(MODULE_NAME, 'get_folders');
const SAVE_FOLDERS_TYPE = createActionType(MODULE_NAME, 'save_folders');
const SET_TYPE_OPEN_MODAL_TYPE = createActionType(
  MODULE_NAME,
  'set_type_open_modal',
);
const SET_LOADING_FOLDER_TYPE = createActionType(
  MODULE_NAME,
  'set_loading_folder',
);

// переименовать папку
const SET_ACTIVE_FOLDER_TYPE = createActionType(
  MODULE_NAME,
  'set_active_folder',
);

// изменение сортировки
const SET_SORT_FOLDER_TYPE = createActionType(
  MODULE_NAME,
  'set_sort_folder_folder',
);

// поиск по строке
const SET_SEARCH_TYPE = createActionType(MODULE_NAME, 'set_search');
const SAVE_CURRENT_FOLDER = createActionType(
  MODULE_NAME,
  'save_current_folder',
);

// ---------------- Секция с действиями
export const initFolderPageAction = createAction(INIT_MAIN_TYPE, (data) => ({
  payload: data,
}));
export const saveFoldersAction = createAction(SAVE_FOLDERS_TYPE, (data) => ({
  payload: data,
}));
export const saveSelectedFolderAction = createAction(
  SAVE_CURRENT_FOLDER,
  (data) => ({
    payload: data,
  }),
);
export const setTypeOpenModalAction = createAction(
  SET_TYPE_OPEN_MODAL_TYPE,
  (data) => ({
    payload: data,
  }),
);
export const setLoadingAction = createAction(
  SET_LOADING_FOLDER_TYPE,
  (data, typeLoad) => ({
    payload: data,
    typeLoad,
  }),
);
export const setSearchAction = createAction(
  SET_SEARCH_TYPE,
  (data, typeLoad) => ({
    payload: data,
    typeLoad,
  }),
);

// Работа с папками
// export const getFoldersAction = createAction(
//   GET_FOLDERS_TYPE,
//   (optionType) => ({
//     request: {
//       url: '/Folders/GetFolders',
//     },
//     meta: {
//       onRequest: (response, action, store) => {
//         return {
//           url: '/Folders/GetFolders',
//           method: 'POST',
//           data: FoldersAdapter(store).getDataForSend(
//             store.getState().folderPage,
//             optionType,
//           ),
//         };
//       },
//       onSuccess: (response, action, store) => {
//         const { dispatch } = store;
//         dispatch(
//           saveFoldersAction({
//             data: FoldersAdapter(store).getFolders(response.data),
//             optionType,
//           }),
//         );
//         return response;
//       },
//       onError: (status, err, store) => {
//         const { dispatch } = store;
//         dispatch(
//           addStatusPageAction({
//             title: 'Ошибка',
//             description: 'Папки не были получены',
//             status: 'error',
//           }),
//         );
//       },
//     },
//   }),
// );

// export const setActiveFolderAction = createAction(
//   SET_ACTIVE_FOLDER_TYPE,
//   (data) => ({
//     payload: data,
//   }),
// );

// export const setSortFolderAction = createAction(
//   SET_SORT_FOLDER_TYPE,
//   (data) => ({
//     payload: data,
//   }),
// );

function* rootSaga() {
  const data = {
    data: {
      loading: true,
    },
  };

  yield all([put(initFolderPageAction(data))]);
}

// Секция работы локального хранилища (создаётся при необходимости)
const initialState = '';

const reducer = createReducer(
  {
    [initFolderPageAction]: (state, action) => action.payload,
    [setSearchAction]: (state, action) => {
      return {
        ...state,
        search: {
          ...state.search,
          text: action.payload,
        },
      };
    },
    [setTypeOpenModalAction]: (state, action) => {
      return {
        ...state,
        typeOpenModal: action.payload,
      };
    },
  },
  initialState,
);

export default {
  rootSaga,
  reducer,
};
