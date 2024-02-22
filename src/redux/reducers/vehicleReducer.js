/* eslint-disable no-case-declarations */
import {SET_VEHICLE_DATA, SET_NEW_VEHICLE_DATA} from '../constants/ActionTypes';
const initialState = {
  vehicle: [],
};

export const vehicleReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_VEHICLE_DATA:

      return {
        ...state,
        vehicle: action.data,
      };
    case SET_NEW_VEHICLE_DATA:

      return {
        ...state,
      };

    default:
      return state;
  }
};
