/* eslint-disable no-case-declarations */
import {
  SET_CURRENT_SHIFT_DATA,
  SET_INCREMENT_TIMER,
} from '../constants/ActionTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
const initialState = {
  current: [],
  time: 0,
};

export const shiftReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_SHIFT_DATA:
      console.log('hey shiftReducer :', action.data);
      return {
        ...state,
        current: action.data,
      };
    case SET_INCREMENT_TIMER:
      console.log('hey SET_INCREMENT_TIMER :', state.time);
      try {
        // Save the updated timer value to AsyncStorage
        //AsyncStorage.setItem('timerValue', String(state.time));
      } catch (error) {
        console.error('Error saving timer value to AsyncStorage:', error);
      }

      return {
        ...state,
        time: state.time + 1,
      };

    default:
      return state;
  }
};
