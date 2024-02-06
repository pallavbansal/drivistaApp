/* eslint-disable no-case-declarations */
import {SET_SUBSCRIPTION_USER_DATA} from '../constants/ActionTypes';
const initialState = {
  subscription: {},
};

export const subscriptionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SUBSCRIPTION_USER_DATA:
      console.log('hey shiftReducer :', action.data);
      return {
        ...state,
        subscription: action.data,
      };

    default:
      return state;
  }
};
