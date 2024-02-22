/* eslint-disable no-case-declarations */
import {SET_DRIVERS_DATA, SET_NEW_VEHICLE_DATA} from '../constants/ActionTypes';
const initialState = {
  drivers: [],
};

export const driverReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DRIVERS_DATA:
      return {
        ...state,
        drivers: action.data,
      };
    case SET_NEW_VEHICLE_DATA:
      return {
        ...state,
      };

    default:
      return state;
  }
};
