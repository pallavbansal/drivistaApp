/* eslint-disable no-case-declarations */
import {
  SET_CURRENT_SHIFT_DATA,
  SET_INCREMENT_TIMER,
} from '../constants/ActionTypes';
const initialState = {
  current: [],
  timer: 0,
  startBreakTime: '',
  location: {},
};

export const shiftReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_SHIFT_DATA:
      return {
        ...state,
        current: action.data,
      };
    case SET_INCREMENT_TIMER:
      const newTimerValue = state.timer + 1;

      return {
        ...state,
        timer: newTimerValue,
      };
    case 'RESET_INCREMENT_TIMER':
      return {
        ...state,
        timer: 0,
      };

    case 'SET_START_BREAK_TIME':
      console.log('hey SET_START_BREAK_TIME :', action.payload);

      return {
        ...state,
        timer: 0,
        startBreakTime: action.payload,
      };

    case 'SET_LOCATION':
      console.log('hey SET_LOCATION :', action.payload);

      return {
        ...state,
        location: action.payload,
      };

    default:
      return state;
  }
};
