import {
  SET_LOGIN_USER_DATA,
  SET_REGISTER_USER_DATA,
  LOGOUT_USER,
  SET_USER_PROFILE_DATA,
  SET_VEHICLE_DATA,
  SET_DRIVERS_DATA,
  SET_CURRENT_SHIFT_DATA,
  SET_INCREMENT_TIMER,
} from '../constants/ActionTypes';
export function setUserData(data) {
  return {
    type: SET_LOGIN_USER_DATA,
    data: data,
  };
}

export function setUserProfileData(data) {
  return {
    type: SET_USER_PROFILE_DATA,
    data: data,
  };
}

export function setVehicleData(data) {
  return {
    type: SET_VEHICLE_DATA,
    data: data,
  };
}

export function setNewVehicleData(data) {
  return {
    type: SET_VEHICLE_DATA,
    data: data,
  };
}

export function setDriversData(data) {
  return {
    type: SET_DRIVERS_DATA,
    data: data,
  };
}

export function setCurrentShiftData(data) {
  return {
    type: SET_CURRENT_SHIFT_DATA,
    data: data,
  };
}

export const setIncrementTimer = value => ({
  type: SET_INCREMENT_TIMER,
  payload: value,
});
export const resetIncrementTimer = value => ({
  type: 'RESET_INCREMENT_TIMER',
  payload: value,
});
export const setStartBreakTime= value => ({
  type: 'SET_START_BREAK_TIME',
  payload: value,
});




export function setRegisterUserData(data) {
  return {
    type: SET_REGISTER_USER_DATA,
    data: data,
  };
}

export function logoutUser() {
  return {
    type: LOGOUT_USER,
  };
}
