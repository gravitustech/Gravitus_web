import { getConfig_sp } from '../utils_ng/localStorage_ng';
import axios from 'axios';

// To be deleted latera
export const axiosMARKETInstance = () => {
  const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_SYSTEM_API_URL,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });

  const superCredits = getConfig_ng('credits');
  if (superCredits != 'none' && superCredits.token != undefined) {
    axiosClient.defaults.headers.Authorization = `${superCredits.token}`;
  }

  return axiosClient;
}

export const axiosSystemInstance = () => {
  const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_SYSTEM_API_URL,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });

  const superCredits = getConfig_sp();
  if (superCredits.token != 'none') {
    axiosClient.defaults.headers.Authorization = `${superCredits.token}`;
  }

  return axiosClient;
}

export const axiosChartInstance = () => {
  const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_SYSTEM_API_URL,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });

  const superCredits = getConfig_sp();
  if (superCredits.token != 'none') {
    axiosClient.defaults.headers.Authorization = `${superCredits.token}`;
  }

  return axiosClient;
}

export const axiosSPOTInstance = () => {
  const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_TRADE_API_URL,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });

  const superCredits = getConfig_sp();
  if (superCredits.token != 'none') {
    axiosClient.defaults.headers.Authorization = `${superCredits.token}`;
  }

  return axiosClient;
}

export const axiosP2PInstance = () => {
  const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_PEER_API_URL,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });

  const superCredits = getConfig_sp();
  if (superCredits.token != 'none') {
    axiosClient.defaults.headers.Authorization = `${superCredits.token}`;
  }

  // Below logic can used in instance where its been called
  // axiosClient.interceptors.request.use(function(config) {
  //   const superCredits = getConfig_sp();

  //   if(superCredits.token != 'none') {
  //     config.headers.Authorization = `${superCredits.token}`;
  //     console.log("Config", config); 
  //   }

  //   return config;
  // }, function(error) {
  //   console.log("Error", error);
  //   return Promise.reject(error);
  // });

  return axiosClient;
}

export const axiosWalletInstance = () => {
  const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_WALLET_API_URL,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });

  const superCredits = getConfig_sp();
  if (superCredits.token != 'none') {
    axiosClient.defaults.headers.Authorization = `${superCredits.token}`;
  }

  return axiosClient;
}