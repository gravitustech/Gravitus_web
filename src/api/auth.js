import { getUserAccessToken } from '../utils/storage';
import { createApiConfig, createApiConfigForSystem } from './config';
import { LOGIN_URL, LOGOUT_URL, RESET_PASSWORD_URL, SIGNUP_URL, REFERRAL_URL } from './routes';

const apiConfig = createApiConfigForSystem();

// const token = getUserAccessToken();

// Login APIs

export const loginUser = (inputs) => {
  return apiConfig.post(LOGIN_URL, inputs);
};

export const logoutUserWithToken = (token) => {
  // console.log({ token });
  return apiConfig.post(`${LOGOUT_URL}${token}`);
};

export const resetPassword = (inputs) => {
  return apiConfig.post(RESET_PASSWORD_URL, inputs);
};

export const signupUser = (inputs) => apiConfig.post(SIGNUP_URL, inputs);

export const validateReferral = (inputs) => {
  return apiConfig.post(REFERRAL_URL, inputs);
};
