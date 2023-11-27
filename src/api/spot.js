import { getUserAccessToken } from '../utils/storage';
import { createApiConfig, createApiConfigForTrade } from './config';
import { SPOT_PRE_TRADE_GUEST, SPOT_PRE_TRADE_USER, MARKET_DATA, POST_ORDER, CHART_OHLC } from './routes';
import axios from 'axios';

const apiConfig = createApiConfigForTrade();

const token = getUserAccessToken();

// Login APIs

export const getSpotData = (inputs) => {
  return apiConfig.post(token ? SPOT_PRE_TRADE_USER : SPOT_PRE_TRADE_GUEST, inputs);
};

export const getSpotURL = () => {
  return token
    ? `${process.env.REACT_APP_TRADE_API_URL}${SPOT_PRE_TRADE_USER}`
    : `${process.env.REACT_APP_TRADE_API_URL}${SPOT_PRE_TRADE_GUEST}`;
};

export const postOrder = (inputs) => {
  return apiConfig.post(POST_ORDER, inputs);
};

export const getMarketURL = () => {
  return `${process.env.REACT_APP_SYSTEM_API_URL}${MARKET_DATA}`;
};

export const getChartURL = (type) => {
  return `${process.env.REACT_APP_SYSTEM_API_URL}${CHART_OHLC}${type}`;
};

export const fetcher = async (url, input) => {
  // console.log({ input });
  const res = await apiConfig.post(url, input);
  return res.data;
};

export const chartFetcher = async (url, input) => {
  // console.log({ input });
  const res = await apiConfig.get(url);
  return res.data;
};
