import {
  SET_ACTIVE_ITEM,
  SET_ACTIVE_COMPONENT,
  SET_OPEN_DRAWER,
  SET_OPEN_COMPONENT_DRAWER
} from "../constants/action-type";


export const setActiveItemAction = (payload) => {
  return {
    type: SET_ACTIVE_ITEM,
    payload,
  };
};

export const setActiveComponentAction = (payload) => {
  return {
    type: SET_ACTIVE_COMPONENT,
    payload,
  };
};

export const setOpenDrawerAction = (payload) => {
  return {
    type: SET_OPEN_DRAWER,
    payload,
  };
};

export const setOpenComponentDrawerAction = (payload) => {
  return {
    type: SET_OPEN_COMPONENT_DRAWER,
    payload,
  };
};

