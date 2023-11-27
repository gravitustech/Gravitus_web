import { getUserAccessToken } from '../utils/storage';
import { createApiConfig, createApiConfigForWallet } from './config';
import {
  WALLET_DATA,
  WALLET_DATA_BY_ID,
  WALLET_DATA_HISTORY,
  WALLET_DEPOSIT,
  WALLET_WIDTHDRAW,
  WALLET_SIGN_WIDTHDRAW,
  WALLET_INR_DEPOSIT,
  WALLET_INR_WIDTHDRAW,
  WALLET_INR_DEPOSIT_POST,
  WALLET_INR_WIDTHDRAW_POST
} from './routes';

const apiConfig = createApiConfigForWallet();

export const getWalletData = (inputs) => {
  return apiConfig.post(token ? SPOT_PRE_TRADE_USER : SPOT_PRE_TRADE_GUEST, inputs);
};
export const getWalletDataById = (inputs) => {
  return apiConfig.post(WALLET_DATA_BY_ID, inputs);
};

export const getDepositData = (inputs) => {
  return apiConfig.post(WALLET_DEPOSIT, inputs);
};

export const postWidthdrawData = (inputs) => {
  return apiConfig.post(WALLET_WIDTHDRAW, inputs);
};

export const postINRDepositData = (inputs) => {
  return apiConfig.post(WALLET_INR_DEPOSIT_POST, inputs);
};

export const postINRWithdrawData = (inputs) => {
  return apiConfig.post(WALLET_INR_WIDTHDRAW_POST, inputs);
};

export const getWalletURL = () => {
  return `${process.env.REACT_APP_WALLET_API_URL}${WALLET_DATA}`;
};

export const getWalletURLById = () => {
  return `${process.env.REACT_APP_WALLET_API_URL}${WALLET_DATA_BY_ID}`;
};

export const getWalletURLHistory = () => {
  return `${process.env.REACT_APP_WALLET_API_URL}${WALLET_DATA_HISTORY}`;
};

export const getWalletURLDeposit = () => {
  return `${process.env.REACT_APP_WALLET_API_URL}${WALLET_DEPOSIT}`;
};

export const getWalletURLWidthdraw = () => {
  return `${process.env.REACT_APP_WALLET_API_URL}${WALLET_WIDTHDRAW}`;
};

export const getWalletURLWidthdrawSign = () => {
  return `${process.env.REACT_APP_WALLET_API_URL}${WALLET_SIGN_WIDTHDRAW}`;
};

export const getWalletURLINRWidthdraw = () => {
  return `${process.env.REACT_APP_WALLET_API_URL}${WALLET_INR_WIDTHDRAW}`;
};

export const getWalletURLINRDeposit = () => {
  return `${process.env.REACT_APP_WALLET_API_URL}${WALLET_INR_DEPOSIT}`;
};

export const fetcher = async (url, input) => {
  // console.log({ input });
  const res = await apiConfig.post(url, input);
  return res.data;
};
