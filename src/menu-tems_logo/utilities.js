// assets
import { ReactComponent as Logo1 } from '../components/Logo/logo1.svg';

// ==============================|| MENU ITEMS - UTILITIES ||============================== //
const icons = {
  Logo1: Logo1
};

const utilities = {
  id: 'utilities',
  title: 'Utilities',
  type: 'group',
  children: [
    {
      id: 'logo',
      title: 'logo',
      type: 'item',
      url: '/',
      icon: icons.Logo1
    }
  ]
};

export default utilities;
