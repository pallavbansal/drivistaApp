import {createAPIConfig} from './config/apiConfig';

const apiConfig = createAPIConfig();

// Example enhanced error handling
export const loginService = async params => {
  console.log('login user:', params);
  return await apiConfig.post('auth/login', params);
};

export const registerService = async params => {
  console.log('register user:', params);
  return await apiConfig.post('auth/register', params);
};

export const registerVerifyService = async params => {
  console.log('register user registerVerifyService:', params);
  return await apiConfig.post('auth/register/verify', params);
};

export const forgotPasswordService = async params => {
  console.log('register user:', params);
  return await apiConfig.post('auth/forget-password', params);
};

export const forgetPassVerifyService = async params => {
  console.log('register user 2:', params);
  return await apiConfig.post('auth/forget-password/verify', params);
};

export const fetchProfileService = async config => {
  return await apiConfig.get('profile/me', config);
};

export const changePasswordService = async params => {
  return await apiConfig.post('auth/forget-password/change-password', params);
};

export const changeProfilePasswordService = async (params, config) => {
  return await apiConfig.post('auth/change-password', params, config);
};

export const updateUserProfileService = async (params, config) => {
  return await apiConfig.post('profile/me/edit', params, config);
};

export const fetchOnlineDriversService = async config => {
  return await apiConfig.post('driver/online', '', config);
};

export const fetchVehicleListService = async config => {
  return await apiConfig.post('vehicles/fetch-vehicle-by-user', '', config);
};
export const deleteVehicleService = async (params, config) => {
  return await apiConfig.post('vehicles/delete', params, config);
};

export const updateVehicleDetailsService = async (params, config) => {
  return await apiConfig.post('vehicles/update', params, config);
};

export const saveVehicleDetailsService = async (params, config) => {
  return await apiConfig.post('vehicles/add', params, config);
};

//driver
export const fetchDriverListService = async config => {
  return await apiConfig.post('driver/fetch-drivers-by-parent-id', '', config);
};
export const deleteDriverService = async (params, config) => {
  return await apiConfig.post('driver/delete', params, config);
};
export const saveDriverDetailsService = async (params, config) => {
  return await apiConfig.post('driver/add', params, config);
};

export const updateDriverDetailsService = async (params, config) => {
  return await apiConfig.post('driver/update', params, config);
};

//shift

export const startShiftService = async config => {
  return await apiConfig.post('shift/start', '', config);
};

export const endShiftService = async config => {
  return await apiConfig.post('shift/end', '', config);
};

export const currentShiftService = async config => {
  return await apiConfig.post('shift/current', '', config);
};

export const startEndBreakShiftService = async config => {
  return await apiConfig.post('shift/break/start-end', '', config);
};

export const workHistoryDetailsService = async (params, config) => {
  return await apiConfig.post('driver/shift-details', params, config);
};

export const fetchSubscriptionDataService = async config => {
  return await apiConfig.post('subscription/details', '', config);
};

export const checkoutSessionService = async config => {
  return await apiConfig.post('payment/create-session', '', config);
};




//
