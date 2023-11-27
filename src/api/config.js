// First we need to import axios.js
import axios from 'axios';

import { getUserAccessToken } from '../utils/storage';

export const createApiConfigForSystem = () => {
  // Next we make an 'instance' of it
  const token = getUserAccessToken();

  const instance = axios.create({
    // .. where we make our configurations
    baseURL: process.env.REACT_APP_SYSTEM_API_URL
  });
  // Where you would set stuff like your 'Authorization' header, etc ...
  if (token) {
    instance.defaults.headers.common.Authorization = `${token}`;
  }
  // instance.interceptors.response.use(({ data }) => data);
  // Also add/ configure interceptors && all the other cool stuff
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');

      if (token) {
        config.headers.Authorization = `${token}`;
      }
      // console.log("request config", config);
      return config;
    },
    (error) =>
      // console.log("request error", error);
      Promise.reject(error)
  );
  return instance;
};

export const createApiConfigForWallet = () => {
  // Next we make an 'instance' of it
  const token = getUserAccessToken();

  const instance = axios.create({
    // .. where we make our configurations
    baseURL: process.env.REACT_APP_WALLET_API_URL
  });
  // Where you would set stuff like your 'Authorization' header, etc ...
  if (token) {
    instance.defaults.headers.common.Authorization = `${token}`;
  }
  // instance.interceptors.response.use(({ data }) => data);
  // Also add/ configure interceptors && all the other cool stuff
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');

      if (token) {
        config.headers.Authorization = `${token}`;
      }
      // console.log("request config", config);
      return config;
    },
    (error) =>
      // console.log("request error", error);
      Promise.reject(error)
  );
  return instance;
};

export const createApiConfigForTrade = () => {
  // Next we make an 'instance' of it
  const token = getUserAccessToken();

  const instance = axios.create({
    // .. where we make our configurations
    baseURL: process.env.REACT_APP_TRADE_API_URL
  });
  // Where you would set stuff like your 'Authorization' header, etc ...
  if (token) {
    instance.defaults.headers.common.Authorization = `${token}`;
  }
  // instance.interceptors.response.use(({ data }) => data);
  // Also add/ configure interceptors && all the other cool stuff
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');

      if (token) {
        config.headers.Authorization = `${token}`;
      }
      // console.log("request config", config);
      return config;
    },
    (error) =>
      // console.log("request error", error);
      Promise.reject(error)
  );
  return instance;
};

export const createApiConfigForPeer = () => {
  // Next we make an 'instance' of it
  const token = getUserAccessToken();

  const instance = axios.create({
    // .. where we make our configurations
    baseURL: process.env.REACT_APP_PEER_API_URL
  });
  // Where you would set stuff like your 'Authorization' header, etc ...
  if (token) {
    instance.defaults.headers.common.Authorization = `${token}`;
  }
  // instance.interceptors.response.use(({ data }) => data);
  // Also add/ configure interceptors && all the other cool stuff
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');

      if (token) {
        config.headers.Authorization = `${token}`;
      }
      // console.log("request config", config);
      return config;
    },
    (error) =>
      // console.log("request error", error);
      Promise.reject(error)
  );
  return instance;
};

export const createApiConfigForFiles = () => {
  // Next we make an 'instance' of it
  const token = getUserAccessToken();

  const instance = axios.create({
    // .. where we make our configurations
    withCredentials: true,
    baseURL: process.env.REACT_APP_API_URL
  });
  // Where you would set stuff like your 'Authorization' header, etc ...
  if (token) {
    instance.defaults.headers.common.Authorization = `${token}`;
  }
  instance.defaults.headers.common['Content-Type'] = 'multipart/form-data';
  // instance.interceptors.response.use(({ data }) => data);
  // Also add/ configure interceptors && all the other cool stuff
  return instance;
};
