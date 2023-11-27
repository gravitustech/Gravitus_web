import { SET_SOCKET_STATE } from '../constants/action-type';

export const setSocketStateAction = (payload) => {
  return {
    type: SET_SOCKET_STATE,
    payload
  };
};
