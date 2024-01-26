/* eslint-disable no-case-declarations */
import {
  SET_CURRENT_SHIFT_DATA,
  SET_INCREMENT_TIMER,
} from '../constants/ActionTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
const initialState = {
  current: [],
  timer: 0,
  startBreakTime:""
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
      const newTimerValue = state.timer + 1;
      console.log('hey SET_INCREMENT_TIMER :', action.payload);

      return {
        ...state,
        timer: newTimerValue,
      };
    case 'RESET_INCREMENT_TIMER':
      console.log('hey RESET_INCREMENT_TIMER :', action.payload);

      return {
        ...state,
        timer: 0,
      };

      case 'SET_START_BREAK_TIME':
      console.log('hey SET_START_BREAK_TIME :', action.payload);

      return {
        ...state,
        timer:0,
        startBreakTime: action.payload,
      };



    default:
      return state;
  }
};
