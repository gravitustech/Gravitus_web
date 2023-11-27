import {
  LOGOUT_USER,
  SET_ADMIN_USER_STATE,
} from "../constants/action-type";

export const setAdminUserStateAction = (userStatePayload) => {
  return {
    type: SET_ADMIN_USER_STATE,
    payload: userStatePayload,
  };
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  // localStorage.removeItem("USER_ESSENTIALS_LOCATION");
  return {
    type: LOGOUT_USER,
  };
};

