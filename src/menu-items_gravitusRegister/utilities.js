// assets
import { ReactComponent as registericon } from '../assets/images/Drawericons/registericon.svg';

// ==============================|| MENU ITEMS - UTILITIES ||============================== //
const icons = {
  registericons: registericon
};

const utilities = {
  id: 'utilities',
  title: 'Utilities',
  type: 'group',
  children: [
    {
      id: 'register1',
      title: 'Register',
      type: 'item',
      url: '/register',
      icon: icons.registericons
    }
  ]
};

export default utilities;
