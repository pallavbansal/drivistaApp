import {createAPIConfig} from './config/apiConfig';

const apiConfig = createAPIConfig();

export const loginService = async params => {
  console.log('login user:', params);
  return await apiConfig.post('auth/login', params);
};

export const registerService = async params => {
  console.log('register user:', params);
  return await apiConfig.post('auth/register', params);
};

export const registerVerifyService = async params => {
  console.log('register user:', params);
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

export const fetchVehicleListService = async config => {
  //console.log('fetchVehicleListRequest token:', config);
  // apiConfig.defaults.headers.common['Authorization'] = `Bearer ${'47|YNVKur2y1QCNZx8R6xVOtDW9JDwYyJ79zGHbIkjK70502a5d'}`;
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



