import axios from 'axios';
import baseUrl from '../baseUrl';

export const createAPIConfig = () => {
  console.log('Api config file');
  const instance = axios.create({
    baseURL: baseUrl.API_URL,
    //timeout: 2000
  });

  return instance;

};


