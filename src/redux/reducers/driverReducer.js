/* eslint-disable no-case-declarations */
import {SET_DRIVERS_DATA, SET_NEW_VEHICLE_DATA} from '../constants/ActionTypes';
const initialState = {
  drivers: [],
};

export const driverReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DRIVERS_DATA:
      console.log('hey driverReducer :', action.data);
      return {
        ...state,
        drivers: action.data,
      };
    case SET_NEW_VEHICLE_DATA:
      console.log('hey driverReducer 2 :', action.data);
      return {
        ...state,
        // vehicle: action.data,
      };

    default:
      return state;
  }
};
