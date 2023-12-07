import { SET_SOCKET_STATE } from '../constants/action-type';

const INIT_STATE = {
  isSocketConnected: false,
  isSocketAuthenticated: false,
  notifications: [null]
};

const SocketReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case SET_SOCKET_STATE:
      return {
        ...state,
        ...action.payload,
        notifications: [...state.notifications, action.payload.notifications]
      };

    default:
      return state;
  }
};

export default SocketReducer;