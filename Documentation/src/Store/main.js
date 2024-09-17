import { put } from 'redux-saga/effects';
import { createAction, createReducer } from 'redux-smart-actions';
import { format } from 'date-fns';
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

// сохранение пользователя
const SAVE_CURRENT_USER_TYPE = createActionType(
  MODULE_NAME,
  'save_current_user',
);
const SAVE_CURRENT_USER_PHOTO_TYPE = createActionType(
  MODULE_NAME,
  'save_current_photo_user',
);
const FETCH_HOLIDAYS_TYPE = createActionType(MODULE_NAME, 'fetch_holidays');
const SET_HOLIDAYS_TYPE = createActionType(MODULE_NAME, 'set_holidays');

const GET_CURRENT_USER_TYPE = createActionType(MODULE_NAME, 'get_current_user');
const GET_USER_PHOTO = createActionType(MODULE_NAME, 'get_user_photo');
const SET_HIDDEN_FILTER = createActionType(MODULE_NAME, 'set_hidden_filter');

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
export const setHolidaysAction = createAction(SET_HOLIDAYS_TYPE, (data) => ({
  payload: data,
}));

// сохранить текущего пользователя
export const saveCurrentUserAction = createAction(
  SAVE_CURRENT_USER_TYPE,
  (data) => ({
    payload: data,
  }),
);
export const saveCurrentUserPhotoAction = createAction(
  SAVE_CURRENT_USER_PHOTO_TYPE,
  (data) => ({
    payload: data,
  }),
);

// смена активности фильтра
export const setHiddenFilterAction = createAction(
  SET_HIDDEN_FILTER,
  (data) => ({
    payload: data,
  }),
);

export const getUserPhotoAction = createAction(GET_USER_PHOTO, (id) => ({
  request: {
    url: `Employees/GetEmployeePhotoById?id=${id}&isSmall=true`,
    responseType: 'blob',
  },
  meta: {
    onSuccess: (response, action, store) => {
      const { dispatch } = store;
      dispatch(saveCurrentUserPhotoAction(response));
      return response;
    },
    onError: (status, err, store) => {
      const { dispatch } = store;
      dispatch(
        addStatusPageAction({
          title: 'Ошибка',
          description: 'Фото пользователя не было получено',
          status: 'error',
        }),
      );
    },
  },
}));
export const getCurrentUserAction = createAction(GET_CURRENT_USER_TYPE, () => ({
  request: {
    url: `Employees/GetCurrentEmployee`,
  },
  meta: {
    onSuccess: (response, action, store) => {
      const { dispatch } = store;
      dispatch(getUserPhotoAction(response.data.id));
      return response;
    },
    onError: (status, err, store) => {
      const { dispatch } = store;
      dispatch(
        addStatusPageAction({
          title: 'Ошибка',
          description: 'Текущий пользователь не был получены',
          status: 'error',
        }),
      );
    },
  },
}));
export const getHolidaysAction = createAction(FETCH_HOLIDAYS_TYPE, () => ({
  request: {
    url: `/Calendar/GetHolidays`,
  },
  meta: {
    onRequest: () => {
      const curDate = new Date();
      const year = curDate.getFullYear();
      return {
        url: '/Calendar/GetHolidays',
        method: 'POST',
        data: {
          endDate: `${year + 1}-11-30T00:00:00`,
          startDate: `${year - 2}-01-01T00:00:00`,
        },
      };
    },
    onSuccess: (response, action, store) => {
      const { dispatch } = store;
      dispatch(setHolidaysAction(response.data));
      return response;
    },
    onError: (status, err, store) => {
      const { dispatch } = store;
      dispatch(
        addStatusPageAction({
          title: 'Ошибка',
          description: 'Выходные дни не были полчены',
          status: 'error',
        }),
      );
    },
  },
}));

// Секция с сагами
function* rootSaga() {
  const data = {
    status: [],
    hideFilter: false,
    currentUser: {
      id: null,
      tabelNumber: '',
      fio: '',
      email: '',
      organizationName: '',
      positionName: '',
      departmentName: '',
      roleId: 1,
    },
    holidays: [],
  };

  yield put(initMainAction(data));
}

// Секция работы локального хранилища (создаётся при необходимости)
const initialState = '';

const reducer = createReducer(
  {
    [initMainAction]: (state, action) => action.payload,
    [saveCurrentUserAction]: (state, action) => {
      return {
        ...state,
        currentUser: action.payload,
      };
    },
    [saveCurrentUserPhotoAction]: (state, action) => {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          photo: action.payload,
        },
      };
    },
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
    [setHiddenFilterAction]: (state, action) => {
      return {
        ...state,
        hideFilter: action.payload,
      };
    },
    [setHolidaysAction]: (state, action) => {
      const holidays = action.payload.map((date) => {
        return new Date(date);
      });
      const date = new Date();
      date.setFullYear(date.getFullYear() + 1);
      if (
        holidays.find(
          (holidayItem) => format(holidayItem, 'yyyy') === format(date, 'yyyy'),
        ) === undefined
      ) {
        let dateNextYear = new Date(Number(format(date, 'yyyy')), 0, 1);
        for (let i = 0; i < 370; i += 1) {
          if (dateNextYear.getDay() === 5 || dateNextYear.getDay() === 6) {
            holidays.push(dateNextYear);
          }
          dateNextYear = new Date(
            dateNextYear.setDate(dateNextYear.getDate() + 1),
          );
        }
      }

      return {
        ...state,
        holidays,
      };
    },
  },
  initialState,
);

export default {
  rootSaga,
  reducer,
};
