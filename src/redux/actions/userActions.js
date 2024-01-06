import {SET_LOGIN_USER_DATA,SET_REGISTER_USER_DATA,
   LOGOUT_USER,SET_USER_PROFILE_DATA,
   SET_VEHICLE_DATA,
   SET_NEW_VEHICLE_DATA
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
