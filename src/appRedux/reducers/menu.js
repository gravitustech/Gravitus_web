// types
import { SET_ACTIVE_ITEM } from '../../appRedux/constants/action-type';

// initial state
const INIT_STATE = {
  openItem: ['dashboard'],
  defaultId: 'dashboard',
  openComponent: 'buttons',
  drawerOpen: false,
  componentDrawerOpen: true
};

// ==============================|| SLICE - MENU ||============================== //

const MenuReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case SET_ACTIVE_ITEM:
      return {
        ...state,
        openItem: action.payload.openItem
      };
    default:
      return state;
  }
};

export default MenuReducer;
