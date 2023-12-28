import * as UserConstants from './constants';

const instialState = {
  usersData: {},
  loading: false,
  error: false,
};

export const UserReducer = (state = instialState, action) => {
  switch (action.type) {
    case UserConstants.FETCH_USER:
      return {...state, loading: true};
    case UserConstants.FETCH_USER_SUCCESS:
      return {...state, usersData: action.payload, loading: false};
    case UserConstants.FETCH_USER_ERROR:
      return {...state, loading: false, error: true};
    default:
      return state;
  }
};