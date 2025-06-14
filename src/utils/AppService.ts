import axios from 'axios';

export const BaseURL = 'https://newsdata.io';

const API = axios.create({
  baseURL: BaseURL,
});

API.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default API;
