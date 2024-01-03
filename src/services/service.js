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
