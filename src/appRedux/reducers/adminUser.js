import { LOGOUT_USER, SET_ADMIN_USER_STATE } from '../constants/action-type';
import { getUserEssentials } from '../../utils/storage';

const checkToken = () => {
  if (localStorage.getItem('token')) return true;
  return false;
};

const INIT_STATE = {
  user: getUserEssentials(),
  profile: null,
  isAuthenticated: checkToken(),
  isRegistered: true,
  errorMessage: '',
  token: localStorage.getItem('token')
};

const AdminUserReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case SET_ADMIN_USER_STATE:
      return {
        ...state,
        ...action.payload
      };

    case LOGOUT_USER:
      return {
        ...state,
        isAuthenticated: false,
        token: null
      };

    default:
      return state;
  }
};

export default AdminUserReducer;