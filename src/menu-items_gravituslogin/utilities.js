// assets
import { ReactComponent as loginicon } from '../assets/images/Drawericons/loginicon.svg';
import { ReactComponent as registericon } from '../assets/images/Drawericons/registericon.svg';

// ==============================|| MENU ITEMS - UTILITIES ||============================== //
const icons = {
  loginicons: loginicon,
  registericons: registericon
};

const utilities = {
  id: 'utilities',
  title: 'Utilities',
  type: 'group',
  children: [
    {
      id: 'login1',
      title: 'Login',
      type: 'item',
      url: '/login',
      icon: icons.loginicons
    }
    // {
    //   id: 'register1',
    //   title: 'Register',
    //   type: 'item',
    //   url: '/register',
    //   icon: icons.registericons,
    // },
  ]
};

export default utilities;
