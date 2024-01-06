/* eslint-disable no-case-declarations */
import {SET_VEHICLE_DATA, SET_NEW_VEHICLE_DATA} from '../constants/ActionTypes';
const initialState = {
  vehicle: [],
};

export const vehicleReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_VEHICLE_DATA:
       console.log('hey vehicleReducer :', action.data);
      return {
        ...state,
        vehicle: action.data,
      };
    case SET_NEW_VEHICLE_DATA:
      console.log('hey vehicleReducer 2 :', action.data);
      return {
        ...state,
        // vehicle: action.data,
      };

    default:
      return state;
  }
};
