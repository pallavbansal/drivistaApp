/* eslint-disable no-case-declarations */
import {
  LOGOUT_USER,
  SET_LOGIN_USER_DATA,
  SET_REGISTER_USER_DATA,
  SET_USER_PROFILE_DATA
} from '../constants/ActionTypes';
const initialState = {
  user: {},
  token: '',
  isAuth: false,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGIN_USER_DATA:
      console.log('hey userReducer :', action.data.token);
      return {
        ...state,
        user: action.data.user,
        token: action.data.token,
        isAuth: true,
      };


      case SET_USER_PROFILE_DATA:
      console.log('hey userReducer :', action.data.user);
      return {
        ...state,
        user: action.data.user,

        isAuth: true,
      };

    case SET_REGISTER_USER_DATA:
      //   console.log('hey userReducer :', action.data);
      return {
        ...state,
        user: action.data,
        token: '',
        isAuth: false,
      };

    case LOGOUT_USER:
      return {
        ...state,
        user: {},
        token:'',
        isAuth: false,
      };

    default:
      return state;
  }
};
