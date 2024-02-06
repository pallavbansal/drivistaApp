// apiConfig.js
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import baseUrl from '../baseUrl';

export const createAPIConfig = () => {
  const instance = axios.create({
    baseURL: baseUrl.API_URL,
    // timeout: 2000 (set your desired timeout)
  });

  // Add a request interceptor
  instance.interceptors.request.use(
    async config => {
      // Check internet connection before making the API call
      const {isConnected} = await NetInfo.fetch();

      if (!isConnected) {
        throw new Error('No internet connection');
      }

      return config;
    },
    error => {
      if (error.message === 'No internet connection') {
        error.response = {isConnected: false, status: 0, data: null};
      }
      return Promise.reject(error);
    },
  );

  // Add a response interceptor
  instance.interceptors.response.use(
    response => {
      response.isConnected = true;
      return response;
    },
    error => {
      return Promise.reject(error);
    },
  );

  return instance;
};
