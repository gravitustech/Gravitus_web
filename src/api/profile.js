import { getUserAccessToken } from '../utils/storage';
import axios from 'axios';
import { createApiConfig, createApiConfigForFiles, createApiConfigForSystem } from './config';
import {
  PROFILE_DATA,
  MOBILE_UPDATE,
  SEND_OTP,
  UPDATE_PAYMENT,
  UPDATE_IDENTITY,
  SECURITY_FEATURES,
  SEND_MOTP,
  UPDATE_AUTH,
  SEND_OTP_SECURITY,
  ENABLE_SECURITY,
  DISABLE_SECURITY,
  RESET_SECURITY,
  WITHDRAW_SECURITY,
  SIGNIN_SECURITY,
  SET_MOBILE,
  RESET_MOBILE,
  RAISE_TICKET,
  REPLY_TICKET,
  TICKET_HISTORY
} from './routes';

const apiConfig = createApiConfigForSystem();

const apiConfigForFiles = createApiConfigForFiles();

const token = getUserAccessToken();

export const fetcher = async (url, input) => {
  // console.log({ input });
  const res = await apiConfig.post(url, input);
  return res.data;
};

// profile API's

export const getProfileURL = () => {
  return `${process.env.REACT_APP_SYSTEM_API_URL}${PROFILE_DATA}`;
};

export const getTicketHistoryURL = () => {
  return `${process.env.REACT_APP_SYSTEM_API_URL}${TICKET_HISTORY}`;
};

export const updateMobileNumber = (inputs) => {
  return apiConfig.post(MOBILE_UPDATE, inputs);
};

export const sendOTP = (inputs) => {
  return apiConfig.post(SEND_OTP, inputs);
};

export const sendMOTP = (inputs) => {
  return apiConfig.post(SEND_MOTP, inputs);
};

export const setMobileNumber = (inputs) => {
  return apiConfig.post(SET_MOBILE, inputs);
};

export const resetMobileNumber = (inputs) => {
  return apiConfig.post(RESET_MOBILE, inputs);
};

export const updatePayment = (inputs) => {
  return apiConfig.post(UPDATE_PAYMENT, inputs);
};

export const updateIdentity = (inputs) => {
  return apiConfigForFiles.post(UPDATE_IDENTITY, inputs);
};

export const raiseTicket = (inputs) => {
  return apiConfig.post(RAISE_TICKET, inputs);
};

export const replyTicket = (inputs) => {
  return apiConfig.post(REPLY_TICKET, inputs);
};

// Profile Security API's

export const getSecurityURL = () => {
  return `${process.env.REACT_APP_SYSTEM_API_URL}${SECURITY_FEATURES}`;
};

export const updateAuth = (inputs) => {
  return apiConfig.post(UPDATE_AUTH, inputs);
};
export const sendOtpSecurity = (inputs) => {
  return apiConfig.post(SEND_OTP_SECURITY, inputs);
};
export const enableSecurity = (inputs) => {
  return apiConfig.post(ENABLE_SECURITY, inputs);
};
export const disableSecurity = (inputs) => {
  return apiConfig.post(DISABLE_SECURITY, inputs);
};
export const resetSecurity = (inputs) => {
  return apiConfig.post(RESET_SECURITY, inputs);
};
export const withdrawSecurity = (inputs) => {
  return apiConfig.post(WITHDRAW_SECURITY, inputs);
};
export const signinSecurity = (inputs) => {
  return apiConfig.post(SIGNIN_SECURITY, inputs);
};
